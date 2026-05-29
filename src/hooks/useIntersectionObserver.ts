import { useEffect, useRef } from "react";

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
	threshold = 0.15
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

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

		const observeNew = () => {
			el.querySelectorAll<HTMLElement>(".reveal:not(.visible)").forEach(
				(t) => observer.observe(t)
			);
		};

		observeNew();

		const mutation = new MutationObserver(observeNew);
		mutation.observe(el, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			mutation.disconnect();
		};
	}, [threshold]);

	return ref;
}
