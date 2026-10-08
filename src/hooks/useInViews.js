import { useEffect, useState, useCallback } from 'react';
/*
export function useInView(options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }) {
  const [node, setNode] = useState(null); // callback ref instead of useRef
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((el) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  return [ref, isVisible];
}
  */
 export function useInView({ threshold = 0, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const [node, setNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useCallback((el) => setNode(el), []);

  useEffect(() => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsVisible(false);
      }
    }, { threshold, rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, rootMargin, once]);

  return [ref, isVisible];
}