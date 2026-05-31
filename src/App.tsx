import { useState, useEffect } from "react";
import About from "./components/About";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Navbar from "./components/Header";
import Portfolio from "./components/Portfolio";

function App() {
	const [dark, setDark] = useState<boolean>(() => {
		try {
			const stored = localStorage.getItem("theme");
			if (stored) return stored === "dark";
		} catch {
			// localStorage unavailable (Safari private browsing)
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			dark ? "dark" : "light"
		);
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch {
			// ignore
		}
	}, [dark]);

	return (
		<>
			<Navbar onToggleDark={() => setDark((d) => !d)} isDark={dark} />
			<About />
			<Experience />
			<Skill />
			<Portfolio />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
