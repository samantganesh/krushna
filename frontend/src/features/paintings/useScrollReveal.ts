import { useEffect, useRef, useState } from 'react';

const INTERSECTION_THRESHOLD = 0.1;

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    if (el !== null) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, revealed };
}
