import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { HeroSliderProps } from './types';
import './HeroSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_DISPLACEMENT_MAP = '/images/Displacements/fluid.jpg';
const DEFAULT_TRANSITION_DURATION = 2;

// --- Vertex Shader ---
const vertexShaderSource = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// --- Fragment Shader ---
const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D currentTexture;
  uniform sampler2D nextTexture;
  uniform sampler2D displacementMap;
  uniform float progress;
  uniform float intensity;
  uniform float direction;

  varying vec2 vUv;

  void main() {
    vec4 displacement = texture2D(displacementMap, vUv);
    float displacementFactor = displacement.r * intensity;
    
    vec2 distortedUV = vUv;
    // Move x-coordinates based on direction
    distortedUV.x = vUv.x + progress * displacementFactor * direction;

    vec2 distortedUV2 = vUv;
    distortedUV2.x = vUv.x - (1.0 - progress) * displacementFactor * direction;
    
    vec4 currentColor = texture2D(currentTexture, distortedUV);
    vec4 nextColor = texture2D(nextTexture, distortedUV2);
    
    gl_FragColor = mix(currentColor, nextColor, progress);
  }
`;

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  autoplayDuration = 7000,
  defaultTransitionDuration = DEFAULT_TRANSITION_DURATION,
  displacementIntensity = 0.7,
  defaultDisplacementMap = DEFAULT_DISPLACEMENT_MAP,
  autoplay = true,
  width = '100%',
  height = '100vh',
}) => {
  /**
   * Refs for Three.js objects
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  /**
   * Timeline & autoplay refs
   */
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * State for current slide and loaded textures
   */
  const [currentIndex, setCurrentIndex] = useState(0);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const displacementMapsRef = useRef<Map<string, THREE.Texture>>(new Map());

  /**
   * Track visibility with IntersectionObserver
   */
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  /**
   * Initialize the slider once it becomes visible
   */
  useEffect(() => {
    if (!isVisible) return;

    let cleanupFn: (() => void) | undefined;
    const initialize = async () => {
      cleanupFn = await init();
    };

    initialize();

    return () => {
      if (cleanupFn) cleanupFn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      // Kill GSAP timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Clear autoplay
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }

      // Dispose textures
      texturesRef.current.forEach((texture) => {
        if (texture.dispose) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Cleanup] Disposing texture');
          }
          texture.dispose();
        }
      });
      texturesRef.current = [];

      // Dispose displacement maps
      displacementMapsRef.current.forEach((texture) => {
        if (texture.dispose) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Cleanup] Disposing displacement map');
          }
          texture.dispose();
        }
      });
      displacementMapsRef.current.clear();

      // Dispose material
      if (materialRef.current) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Cleanup] Disposing material');
        }
        materialRef.current.dispose();
        materialRef.current = null;
      }

      // Dispose geometry and renderer
      if (rendererRef.current) {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;

        if (scene) {
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.geometry) {
                if (process.env.NODE_ENV !== 'production') {
                  console.log('[Cleanup] Disposing geometry');
                }
                object.geometry.dispose();
              }
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach((m) => {
                    if (process.env.NODE_ENV !== 'production') {
                      console.log('[Cleanup] Disposing array material');
                    }
                    m.dispose();
                  });
                } else {
                  if (process.env.NODE_ENV !== 'production') {
                    console.log('[Cleanup] Disposing single material');
                  }
                  object.material.dispose();
                }
              }
            }
          });
        }

        if (process.env.NODE_ENV !== 'production') {
          console.log('[Cleanup] Disposing renderer');
        }
        renderer.dispose();
        renderer.forceContextLoss();
        const gl = renderer.getContext();
        if (gl) {
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) loseContext.loseContext();
        }
        rendererRef.current = null;
      }
    };
  }, []);

  /**
   * Resize handler
   */
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      rendererRef.current.setSize(clientWidth, clientHeight);
      // Re-render one frame to adjust to new size
      renderFrame();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * ---------------------------------------------
   * Touch/Swipe support
   * ---------------------------------------------
   */
  useEffect(() => {
    if (!containerRef.current) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    const threshold = 75; // Increased threshold for more intentional swipes
    const timeThreshold = 300; // Maximum time for a swipe in ms
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        
        // If horizontal movement is greater than vertical, it's likely a swipe
        if (deltaX > deltaY && deltaX > 10) {
          isSwiping = true;
          e.preventDefault(); // Prevent scrolling when swiping
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndTime = Date.now();
      const timeDiff = touchEndTime - touchStartTime;
      
      // Only process swipe if:
      // 1. We detected a horizontal swipe
      // 2. The swipe was fast enough
      // 3. The distance was greater than threshold
      if (isSwiping && timeDiff < timeThreshold) {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > threshold) {
          if (diff < 0) {
            goToNextSlide();
          } else {
            goToPrevSlide();
          }
        }
      }
    };

    const containerEl = containerRef.current;
    
    containerEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    containerEl.addEventListener('touchmove', handleTouchMove, { passive: false }); // non-passive to prevent scroll
    containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      containerEl.removeEventListener('touchstart', handleTouchStart);
      containerEl.removeEventListener('touchmove', handleTouchMove);
      containerEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  /**
   * Initialize scene and load resources
   */
  const init = async () => {
    if (!containerRef.current) return;

    if (process.env.NODE_ENV !== 'production') {
      console.log('[HeroSlider] Starting initialization');
    }
    try {
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Load all slide textures
      const textureLoader = new THREE.TextureLoader();
      const loadTexture = (url: string) =>
        new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            url,
            (texture) => {
              texture.minFilter = THREE.LinearFilter;
              texture.magFilter = THREE.LinearFilter;
              resolve(texture);
            },
            undefined,
            (error) => {
              console.error(`[HeroSlider] Error loading texture ${url}:`, error);
              reject(error);
            }
          );
        });

      const loadedTextures = await Promise.all(
        slides.map((slide) => loadTexture(slide.imageUrl))
      );
      if (!loadedTextures.length) {
        throw new Error('[HeroSlider] No textures loaded');
      }
      texturesRef.current = loadedTextures;

      // Displacement map
      const displacementTexture = await loadTexture(defaultDisplacementMap);
      displacementTexture.wrapS = THREE.RepeatWrapping;
      displacementTexture.wrapT = THREE.RepeatWrapping;
      displacementMapsRef.current.set(defaultDisplacementMap, displacementTexture);

      // Create material (notice we added "direction" to uniforms)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          currentTexture: { value: loadedTextures[0] },
          nextTexture: { value: loadedTextures[1] || loadedTextures[0] },
          displacementMap: { value: displacementTexture },
          progress: { value: 0 },
          intensity: { value: displacementIntensity },
          direction: { value: 1 }, // Default direction
        },
        vertexShader: vertexShaderSource,
        fragmentShader: fragmentShaderSource,
        transparent: true,
        side: THREE.DoubleSide,
      });
      materialRef.current = material;

      // Create mesh
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Render one initial frame
      renderFrame();

      // Start autoplay if enabled
      let autoplayCleanup: (() => void) | null = null;
      if (autoplay) {
        autoplayCleanup = startAutoplay();
      }

      // Return cleanup function for this init
      return () => {
        if (autoplayCleanup) {
          autoplayCleanup();
        }
      };
    } catch (err) {
      console.error('[HeroSlider] Failed to initialize:', err);
      // Clean up partial initialization
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      throw err;
    }
  };

  /**
   * Utility to render a single frame
   */
  const renderFrame = () => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  /**
   * Start autoplay: schedule a transition after `autoplayDuration`
   */
  const startAutoplay = () => {
    if (!materialRef.current || !texturesRef.current.length) return null;

    // Clear existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Clear existing timeout
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    const animateNext = async () => {
      if (!materialRef.current || !texturesRef.current.length) return;

      const nextIndex = (currentIndex + 1) % slides.length;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      const newTimeline = gsap.timeline();
      timelineRef.current = newTimeline;

      try {
        // Update effect
        const effects = await updateSlideEffect(currentIndex, nextIndex);

        if (!effects) return;

        // **Set direction to +1 for next**
        materialRef.current.uniforms.direction.value = 1;

        // Render in a loop during the transition
        startRendering();
        newTimeline.to(materialRef.current.uniforms.progress, {
          value: 1,
          duration: effects.currentEffect.transitionDuration,
          ease: 'power3.inOut',
          onComplete: () => {
            // End of transition
            setCurrentIndex(nextIndex);
            stopRendering(); // Stop continuous rendering
            // Render a final frame
            renderFrame();
          },
        });
      } catch (err) {
        console.error('[HeroSlider] Transition failed:', err);
      }

      // Schedule next if autoplay still enabled
      if (autoplay) {
        autoplayTimeoutRef.current = setTimeout(animateNext, autoplayDuration);
      }
    };

    // Queue up next transition
    autoplayTimeoutRef.current = setTimeout(animateNext, autoplayDuration);

    // Cleanup function
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  };

  /**
   * Start a continuous rendering loop
   * (only used during transitions)
   */
  const renderingRAFRef = useRef<number | null>(null);
  const startRendering = () => {
    stopRendering();
    const renderLoop = () => {
      renderFrame();
      renderingRAFRef.current = requestAnimationFrame(renderLoop);
    };
    renderLoop();
  };
  const stopRendering = () => {
    if (renderingRAFRef.current !== null) {
      cancelAnimationFrame(renderingRAFRef.current);
      renderingRAFRef.current = null;
    }
  };

  /**
   * Determine displacement settings for a given slide
   */
  const getSlideEffect = (index: number) => {
    const slide = slides[index];
    return {
      displacementMap: slide.effect?.displacementMap || defaultDisplacementMap,
      intensity: slide.effect?.intensity || displacementIntensity,
      duration: slide.effect?.duration || autoplayDuration,
      transitionDuration:
        slide.effect?.transitionDuration || DEFAULT_TRANSITION_DURATION,
    };
  };

  /**
   * Lazy-load displacement map if not already loaded
   */
  const loadDisplacementMap = async (url: string) => {
    if (displacementMapsRef.current.has(url)) {
      return displacementMapsRef.current.get(url)!;
    }

    const textureLoader = new THREE.TextureLoader();
    return new Promise<THREE.Texture>((resolve, reject) => {
      textureLoader.load(
        url,
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          displacementMapsRef.current.set(url, texture);
          resolve(texture);
        },
        undefined,
        (err) => {
          console.error('[HeroSlider] Error loading displacement map:', err);
          reject(err);
        }
      );
    });
  };

  /**
   * Update the shader uniforms for the current and next slide
   */
  const updateSlideEffect = async (currentIdx: number, nextIdx: number) => {
    if (!materialRef.current) return null;

    const currentEffect = getSlideEffect(currentIdx);
    const nextEffect = getSlideEffect(nextIdx);

    // We can load both if they differ, but here we only need the immediate one
    const [currentMap] = await Promise.all([
      loadDisplacementMap(currentEffect.displacementMap),
      loadDisplacementMap(nextEffect.displacementMap),
    ]);

    // Reset progress to 0
    materialRef.current.uniforms.progress.value = 0;

    // Switch out textures
    materialRef.current.uniforms.currentTexture.value =
      texturesRef.current[currentIdx];
    materialRef.current.uniforms.nextTexture.value =
      texturesRef.current[nextIdx];
    materialRef.current.uniforms.displacementMap.value = currentMap;
    materialRef.current.uniforms.intensity.value = currentEffect.intensity;

    // Render a frame to update immediately
    renderFrame();

    return {
      currentEffect,
      nextEffect,
      currentMap,
    };
  };

  /**
   * Manually go to next slide (left-to-right)
   */
  const goToNextSlide = async () => {
    if (!materialRef.current || !texturesRef.current.length) return;
    if (timelineRef.current?.isActive()) return;

    // Kill timeline & clear autoplay
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    const nextIndex = (currentIndex + 1) % slides.length;
    const newTimeline = gsap.timeline();
    timelineRef.current = newTimeline;

    const effects = await updateSlideEffect(currentIndex, nextIndex);
    if (!effects) return;

    // **Set direction to +1** for left-to-right
    materialRef.current.uniforms.direction.value = 1;

    startRendering();
    newTimeline.to(materialRef.current.uniforms.progress, {
      value: 1,
      duration: effects.currentEffect.transitionDuration,
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentIndex(nextIndex);
        stopRendering(); // Stop once transition ends
        renderFrame();
        if (autoplay) {
          startAutoplay();
        }
      },
    });
  };

  /**
   * Manually go to previous slide (right-to-left)
   */
  const goToPrevSlide = async () => {
    if (!materialRef.current || !texturesRef.current.length) return;
    if (timelineRef.current?.isActive()) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const newTimeline = gsap.timeline();
    timelineRef.current = newTimeline;

    const effects = await updateSlideEffect(currentIndex, prevIndex);
    if (!effects) return;

    // **Set direction to -1** for right-to-left
    materialRef.current.uniforms.direction.value = -1;

    startRendering();
    newTimeline.to(materialRef.current.uniforms.progress, {
      value: 1,
      duration: effects.currentEffect.transitionDuration,
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentIndex(prevIndex);
        stopRendering();
        renderFrame();
        if (autoplay) {
          startAutoplay();
        }
      },
    });
  };

  return (
    <div className="hero-slider" ref={containerRef} style={{ width, height }}>
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">{slides[currentIndex].title}</h1>
        <p className="hero-slider__description">
          {slides[currentIndex].description}
        </p>
        <div className="hero-slider__buttons">
          {slides[currentIndex].buttonText && slides[currentIndex].buttonLink && (
            <a
              href={slides[currentIndex].buttonLink}
              className="site-button btn btn-lg btnhover20"
            >
              {slides[currentIndex].buttonText}
            </a>
          )}
        </div>
      </div>

      <button
        className="hero-slider__nav hero-slider__nav--prev"
        onClick={goToPrevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <button
        className="hero-slider__nav hero-slider__nav--next"
        onClick={goToNextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default HeroSlider;
