import About from "./component/About";
import Card from "./component/Card";
import Contact from "./component/Contact";
import Experience from "./component/Experience";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";

function App() {
	return (
		<>
			<Navbar />
			<About />
			<Experience />
			<Card />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
