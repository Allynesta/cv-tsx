import About from "./components/About";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Navbar from "./components/Header";
import Portfolio from "./components/Portfolio";

function App() {
	return (
		<>
			<Navbar />
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
