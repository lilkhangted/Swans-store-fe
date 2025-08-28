import { useEffect, useState } from "react";

export default function useScrollFadeIn(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
    },
      { threshold: 0.3 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref]);

  return isVisible;
}
