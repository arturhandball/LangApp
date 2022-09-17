import { BrowserRouter as Router } from 'react-router-dom';

import Header from "./components/Header/Header";
import Main from "./components/Main";

import './style.css';

function App() {
	return (
	<div className="App">
	<Router>
		<Header />
		<Main />
	</Router>
	</div>
	);
}

export default App;