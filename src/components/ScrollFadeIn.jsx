import { useEffect, useRef } from "react";


export default function ScrollFadeIn({ children, delay = 0, className = " " }) {
    const ref = useRef(null);

    useEffect( () => {
        const el = ref.current;
        if (!el) return;
        
        const observer = new IntersectionObserver( ([entry]) => {
            if(entry.isIntersecting) {
                el.classList.add("animate-fadein");
                observer.disconnect();
            } 
        }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px"})

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={`opacity-0 ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}