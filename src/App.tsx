import About from "./component/About";
import Skill from "./component/Skill";
import Contact from "./component/Contact";
import Experience from "./component/Experience";
import Footer from "./component/Footer";
import Navbar from "./component/Header";
import Portfolio from "./component/Portfolio";

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
