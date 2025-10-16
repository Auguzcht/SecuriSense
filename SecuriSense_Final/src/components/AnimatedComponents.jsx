import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete
}) => {
  const ref = useRef(null);
  const footerReached = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    // Initial state
    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    });

    // Watch for footer visibility
    const footer = document.querySelector('footer');
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        onEnter: () => {
          footerReached.current = true;
        },
        onLeaveBack: () => {
          footerReached.current = false;
        },
      });
    }

    // Main animation
    const animation = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        end: 'bottom top',
        markers: false,
        onEnter: () => {
          gsap.to(el, {
            [axis]: 0,
            opacity: 1,
            scale: 1,
            duration,
            ease,
          });
        },
        onLeave: () => {
          // Only fade out once footer is reached
          if (footerReached.current) {
            gsap.to(el, {
              [axis]: offset,
              opacity: animateOpacity ? initialOpacity : 1,
              duration,
              ease,
            });
          }
        },
        onEnterBack: () => {
          gsap.to(el, {
            [axis]: 0,
            opacity: 1,
            scale: 1,
            duration,
            ease,
          });
        },
        onLeaveBack: () => {
          if (footerReached.current) {
            gsap.to(el, {
              [axis]: offset,
              opacity: animateOpacity ? initialOpacity : 1,
              duration,
              ease,
            });
          }
        },
      },
    });

    return () => {
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
  ]);

  return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;



