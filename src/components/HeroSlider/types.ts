export interface SlideEffect {
  displacementMap?: string;
  intensity?: number;
  duration?: number;
  transitionDuration?: number;
}

export interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  effect?: SlideEffect;
}

export interface HeroSliderProps {
  slides: Slide[];
  autoplayDuration?: number;
  defaultTransitionDuration?: number;
  displacementIntensity?: number;
  defaultDisplacementMap?: string;
  autoplay?: boolean;
  width?: string | number;
  height?: string | number;
}
