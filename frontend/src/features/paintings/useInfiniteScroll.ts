import { useEffect, useRef, useState } from 'react';

const INITIAL_COUNT = 1;
const INTERSECTION_THRESHOLD = 0.1;

export function useInfiniteScroll(total: number) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    let cleanup: (() => void) | undefined;

    if (sentinel !== null && visibleCount < total) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry?.isIntersecting) {
            setVisibleCount((prev) => Math.min(prev + 1, total));
            observer.disconnect();
          }
        },
        { threshold: INTERSECTION_THRESHOLD }
      );
      observer.observe(sentinel);
      cleanup = () => {
        observer.disconnect();
      };
    }

    return cleanup;
  }, [visibleCount, total]);

  return { visibleCount, sentinelRef };
}
