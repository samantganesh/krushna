import { useEffect, useRef, useState } from 'react';

const INTERSECTION_THRESHOLD = 0.1;

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, revealed };
}
