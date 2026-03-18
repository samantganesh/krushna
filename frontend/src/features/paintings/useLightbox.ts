import { useCallback, useState } from 'react';

interface UseLightboxReturn {
  activeIndex: number | null;
  open: (index: number) => void;
  close: () => void;
  navigate: (dir: 1 | -1, total: number) => void;
}

export function useLightbox(): UseLightboxReturn {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const navigate = useCallback((dir: 1 | -1, total: number) => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + dir + total) % total;
    });
  }, []);

  return { activeIndex, open, close, navigate };
}
