import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Navbar from "./components/Header";
import Portfolio from "./components/Portfolio";
import AdminApp from "./admin/AdminApp";

const PublicSite = ({
	onToggleDark,
	isDark,
}: {
	onToggleDark: () => void;
	isDark: boolean;
}) => (
	<>
		<Navbar onToggleDark={onToggleDark} isDark={isDark} />
		<About />
		<Experience />
		<Skill />
		<Portfolio />
		<Contact />
		<Footer />
	</>
);

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
		<Routes>
			<Route
				path="/"
				element={
					<PublicSite
						onToggleDark={() => setDark((d) => !d)}
						isDark={dark}
					/>
				}
			/>
			<Route path="/admin/*" element={<AdminApp />} />
		</Routes>
	);
}

export default App;
