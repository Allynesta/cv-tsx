import { useEffect, useRef } from "react";

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
	threshold = 0.15
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const targets = el.querySelectorAll<HTMLElement>(".reveal");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold }
		);
		targets.forEach((t) => observer.observe(t));
		return () => observer.disconnect();
	}, [threshold]);

	return ref;
}
