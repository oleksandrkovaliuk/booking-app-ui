import { useEffect, useRef } from "react";

export const ObservationHandler: React.FC<{
  onObserv: () => void;
  delay?: number;
}> = ({ onObserv, delay = 400 }) => {
  const observRef = useRef(null);

  useEffect(() => {
    let observ: IntersectionObserver | null = null;
    let delayTimer: NodeJS.Timeout | null = null;
    const elem = observRef.current;

    observ = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        delayTimer = setTimeout(() => {
          onObserv();
        }, delay);
      } else if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    });

    if (elem) {
      observ.observe(elem);
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (elem && observ) {
        observ.unobserve(elem);
      }
    };
  }, [onObserv, delay]);
  return <div ref={observRef} />;
};
