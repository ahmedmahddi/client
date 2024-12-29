import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { HeroSliderProps } from './types';
import './HeroSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Base64 encoded simple stripe pattern for displacement
const DEFAULT_DISPLACEMENT_MAP = '/images/Displacements/fluid.jpg';
const DEFAULT_TRANSITION_DURATION = 2;

// Shader code as strings
const vertexShaderSource = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D currentTexture;
  uniform sampler2D nextTexture;
  uniform sampler2D displacementMap;
  uniform float progress;
  uniform float intensity;

  varying vec2 vUv;

  void main() {
    vec4 displacement = texture2D(displacementMap, vUv);
    float displacementFactor = displacement.r * intensity;
    
    vec2 distortedUV = vUv;
    distortedUV.x = vUv.x + progress * (displacementFactor);
    
    vec2 distortedUV2 = vUv;
    distortedUV2.x = vUv.x - (1.0 - progress) * (displacementFactor);
    
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  /**
   * We’ll keep one GSAP timelineRef if needed for current transition,
   * but remove repeated calls to `startAutoplay`.
   */
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * We'll track the setTimeout for autoplay in a separate ref 
   * so we can clear it properly and avoid stacking timeouts.
   */
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const displacementMapsRef = useRef<Map<string, THREE.Texture>>(new Map());

  useEffect(() => {
    let cleanupFn: (() => void) | undefined;
    
    const initialize = async () => {
      cleanupFn = await init();
    };

    // Only initialize if the component is mounted and visible
    if (containerRef.current && containerRef.current.offsetParent !== null) {
      console.log('[HeroSlider] Initializing...');
      initialize();
    }

    return () => {
      console.log('[Component Cleanup] Unmounting HeroSlider');

      // Kill any active timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Clear any autoplay timeouts
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }

      // Call the cleanup function returned by init (if any)
      if (cleanupFn) {
        cleanupFn();
      }

      // Dispose of textures
      texturesRef.current.forEach(texture => {
        if (texture && texture.dispose) {
          console.log('[Cleanup] Disposing texture');
          texture.dispose();
        }
      });
      texturesRef.current = [];

      // Dispose of displacement maps
      displacementMapsRef.current.forEach((texture) => {
        if (texture && texture.dispose) {
          console.log('[Cleanup] Disposing displacement map');
          texture.dispose();
        }
      });
      displacementMapsRef.current.clear();

      // Dispose of material
      if (materialRef.current) {
        console.log('[Cleanup] Disposing material');
        materialRef.current.dispose();
        materialRef.current = null;
      }

      // Dispose of geometry and renderer
      if (rendererRef.current) {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        
        if (scene) {
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.geometry) {
                console.log('[Cleanup] Disposing geometry');
                object.geometry.dispose();
              }
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach(material => {
                    console.log('[Cleanup] Disposing array material');
                    material.dispose();
                  });
                } else {
                  console.log('[Cleanup] Disposing single material');
                  object.material.dispose();
                }
              }
            }
          });
        }
        
        console.log('[Cleanup] Disposing renderer');
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
  }, []); // Only run on mount/unmount

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      rendererRef.current.setSize(clientWidth, clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const init = async () => {
    if (!containerRef.current || containerRef.current.offsetParent === null) {
      console.log('[HeroSlider] Container not visible, skipping initialization');
      return;
    }

    console.log('[HeroSlider] Starting initialization');
    try {
      // Initialize Three.js scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Create renderer with power preference for better performance
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Load textures
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
              console.error(`Error loading texture ${url}:`, error);
              reject(error);
            }
          );
        });

      console.log('Loading slide textures...');
      // Load slide textures with progress tracking
      const loadedTextures = await Promise.all(
        slides.map(async (slide, index) => {
          console.log(`Loading texture ${index + 1}/${slides.length}: ${slide.imageUrl}`);
          try {
            const texture = await loadTexture(slide.imageUrl);
            console.log(`Successfully loaded texture ${index + 1}`);
            return texture;
          } catch (error) {
            console.error(`Failed to load texture ${index + 1}:`, error);
            throw error;
          }
        })
      );

      console.log(`Successfully loaded ${loadedTextures.length} textures`);

      if (loadedTextures.length === 0) {
        throw new Error('No textures loaded');
      }

      texturesRef.current = loadedTextures;

      // Create default displacement texture
      console.log('Loading displacement map:', defaultDisplacementMap);
      const displacementTexture = await loadTexture(defaultDisplacementMap);
      displacementTexture.wrapS = THREE.RepeatWrapping;
      displacementTexture.wrapT = THREE.RepeatWrapping;
      displacementMapsRef.current.set(defaultDisplacementMap, displacementTexture);

      // Create shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          currentTexture: { value: loadedTextures[0] },
          nextTexture: { value: loadedTextures[1] || loadedTextures[0] },
          displacementMap: { value: displacementTexture },
          progress: { value: 0 },
          intensity: { value: displacementIntensity }
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

      // Animation loop with RAF ID tracking
      let animationFrameId: number;
      const animate = () => {
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      // Start autoplay if enabled
      let autoplayCleanup: (() => void) | null = null;
      if (autoplay) {
        autoplayCleanup = startAutoplay();
      }

      // Return cleanup function
      return () => {
        console.log('[Cleanup] Canceling animation frame');
        cancelAnimationFrame(animationFrameId);
        if (autoplayCleanup) {
          console.log('[Cleanup] Running autoplay cleanup');
          autoplayCleanup();
        }
      };
    } catch (error) {
      console.error('[Error] Failed to initialize HeroSlider:', error);
      // Attempt cleanup on error
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      throw error;
    }
  };

  /**
   * We’ll keep a single instance of `startAutoplay` running.
   * This function sets a single timeout for the next transition
   * and clears it on cleanup or on subsequent calls.
   */
  const startAutoplay = () => {
    if (!materialRef.current || !texturesRef.current.length) return null;

    // Clear any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Clear any existing autoplay timeout
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    /**
     * Animates to the next slide once the timeout finishes.
     */
    const animateNext = async () => {
      // If there's no material or no textures, abort
      if (!materialRef.current || !texturesRef.current.length) return;

      const nextIndex = (currentIndex + 1) % slides.length;
      console.log(`[Autoplay] Current Index: ${currentIndex}, Next Index: ${nextIndex}`);

      // Kill any current timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Create a new timeline for the transition
      const newTimeline = gsap.timeline();
      timelineRef.current = newTimeline;

      try {
        // Prepare transition uniforms (async load displacement, etc.)
        const effects = await updateSlideEffect(currentIndex, nextIndex);
        if (!effects) return;
        const { currentEffect } = effects;

        // Animate the progress from 0→1
        await new Promise<void>((resolve) => {
          newTimeline
            .to(materialRef.current!.uniforms.progress, {
              value: 0,
              duration: 0,
              ease: 'none'
            })
            .to(materialRef.current!.uniforms.progress, {
              value: 1,
              duration: currentEffect.transitionDuration,
              ease: 'power3.inOut',
              onComplete: () => {
                setCurrentIndex(nextIndex);
                resolve();
              },
            });
        });
      } catch (err) {
        console.error('[Error] Transition failed:', err);
      }

      // After transition completes, schedule next autoplay if still enabled
      if (autoplay) {
        console.log(`[Autoplay] Scheduling next transition in ${autoplayDuration}ms`);
        autoplayTimeoutRef.current = setTimeout(animateNext, autoplayDuration);
      }
    };

    // Immediately queue up the next slide (i.e., wait `autoplayDuration`)
    autoplayTimeoutRef.current = setTimeout(animateNext, autoplayDuration);

    // Return cleanup function to kill timeline / timeout
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

  const getSlideEffect = (index: number) => {
    const slide = slides[index];
    return {
      displacementMap: slide.effect?.displacementMap || defaultDisplacementMap,
      intensity: slide.effect?.intensity || displacementIntensity,
      duration: slide.effect?.duration || autoplayDuration,
      transitionDuration: slide.effect?.transitionDuration || defaultTransitionDuration
    };
  };

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
        reject
      );
    });
  };

  const updateSlideEffect = async (currentIdx: number, nextIdx: number) => {
    if (!materialRef.current) return null;

    console.log(`[Transition Start] From slide ${currentIdx} to ${nextIdx}`);
    console.log('Current slide:', slides[currentIdx]);
    console.log('Next slide:', slides[nextIdx]);

    const currentEffect = getSlideEffect(currentIdx);
    const nextEffect = getSlideEffect(nextIdx);

    console.log('[Effect Settings]', {
      current: {
        displacementMap: currentEffect.displacementMap,
        intensity: currentEffect.intensity,
        duration: currentEffect.duration,
        transitionDuration: currentEffect.transitionDuration
      },
      next: {
        displacementMap: nextEffect.displacementMap,
        intensity: nextEffect.intensity,
        duration: nextEffect.duration,
        transitionDuration: nextEffect.transitionDuration
      }
    });

    const startTime = performance.now();
    const [currentMap, nextMap] = await Promise.all([
      loadDisplacementMap(currentEffect.displacementMap),
      loadDisplacementMap(nextEffect.displacementMap)
    ]);
    const loadTime = performance.now() - startTime;
    console.log(`[Assets Loaded] Took ${loadTime.toFixed(2)}ms`);

    // Update uniforms
    materialRef.current.uniforms.currentTexture.value = texturesRef.current[currentIdx];
    materialRef.current.uniforms.nextTexture.value = texturesRef.current[nextIdx];
    materialRef.current.uniforms.displacementMap.value = currentMap;
    materialRef.current.uniforms.intensity.value = currentEffect.intensity;
    materialRef.current.uniforms.progress.value = 0;

    console.log('[Uniforms Updated]', {
      currentTexture: currentIdx,
      nextTexture: nextIdx,
      intensity: currentEffect.intensity,
      progress: 0
    });

    return {
      currentEffect,
      nextEffect,
      currentMap,
      nextMap
    };
  };

  /**
   * NOTE:
   * We remove the call to `startAutoplay()` inside these next/prev functions
   * to avoid re-initializing the autoplay loop repeatedly.
   */
  const goToNextSlide = async () => {
    if (!materialRef.current || !texturesRef.current.length || timelineRef.current?.isActive()) return;

    // Kill the active timeline if any
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Clear autoplay timeout so it doesn't trigger mid-transition
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }

    const nextIndex = (currentIndex + 1) % slides.length;
    const newTimeline = gsap.timeline();
    timelineRef.current = newTimeline;

    const effects = await updateSlideEffect(currentIndex, nextIndex);
    if (!effects) return;
    const { currentEffect } = effects;

    newTimeline
      .to(materialRef.current.uniforms.progress, {
        value: 0,
        duration: 0,
        ease: 'none'
      })
      .to(materialRef.current.uniforms.progress, {
        value: 1,
        duration: currentEffect.transitionDuration,
        ease: 'power3.inOut',
        onComplete: () => {
          setCurrentIndex(nextIndex);
          // If we still want autoplay after manual navigation:
          if (autoplay) {
            startAutoplay();
          }
        }
      });
  };

  const goToPrevSlide = async () => {
    if (!materialRef.current || !texturesRef.current.length || timelineRef.current?.isActive()) return;

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
    const { currentEffect } = effects;

    newTimeline
      .to(materialRef.current.uniforms.progress, {
        value: 0,
        duration: 0,
        ease: 'none'
      })
      .to(materialRef.current.uniforms.progress, {
        value: 1,
        duration: currentEffect.transitionDuration,
        ease: 'power3.inOut',
        onComplete: () => {
          setCurrentIndex(prevIndex);
          // If we still want autoplay after manual navigation:
          if (autoplay) {
            startAutoplay();
          }
        }
      });
  };

  return (
    <div className="hero-slider" ref={containerRef} style={{ width, height }}>
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">{slides[currentIndex].title}</h1>
        <p className="hero-slider__description">{slides[currentIndex].description}</p>
        <div className="hero-slider__buttons">
          {slides[currentIndex].buttonText && slides[currentIndex].buttonLink && (
            <a href={slides[currentIndex].buttonLink} className="site-button btn btn-lg btnhover20">
              {slides[currentIndex].buttonText}
            </a>
          )}
        </div>
      </div>
      <button className="hero-slider__nav hero-slider__nav--prev" onClick={goToPrevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="hero-slider__nav hero-slider__nav--next" onClick={goToNextSlide}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default HeroSlider;
