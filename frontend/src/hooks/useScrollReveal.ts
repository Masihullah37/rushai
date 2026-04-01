// src/hooks/useScrollReveal.ts
import { useEffect, useRef } from "react";

export function useScrollReveal(threshold: number = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          entry.target.classList.add("fu", "fu1");
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}