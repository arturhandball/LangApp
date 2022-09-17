import { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Games from './Games';
import Library from './Library';
import Learn from './Learn';
import Game1 from './Games/Game1';
import Game2 from './Games/Game2';
import Game3 from './Games/Game3';
import Game4 from './Games/Game4';
import Game5 from './Games/Game5';
import Game6 from './Games/Game6';

export const MainContext = createContext();

function Main() {
	const [library, setLibrary] = useState([]);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		let libraryLocal = localStorage.getItem('library');

		if (library.length === 0 && libraryLocal && libraryLocal.length > 0) {
			libraryLocal = JSON.parse(libraryLocal);

			if (libraryLocal.length > 0) setLibrary([...libraryLocal]);
		} else {
			libraryLocal = JSON.stringify(library);
			localStorage.setItem('library', libraryLocal);
		}
	}, [library]);

	return (
	<main className="main">
	<MainContext.Provider value={ {library, setLibrary, points, setPoints} }>
	<Routes>
		<Route path="/" element={<Dashboard />} />
		<Route path="/games" element={<Games />} />
		<Route path="/library" element={<Library />} />
		<Route path="/learn" element={<Learn />} />
		<Route path="/games/1" element={<Game1 />} />
		<Route path="/games/2" element={<Game2 />} />
		<Route path="/games/3" element={<Game3 />} />
		<Route path="/games/4" element={<Game4 />} />
		<Route path="/games/5" element={<Game5 />} />
		<Route path="/games/6" element={<Game6 />} />
	</Routes>
	</MainContext.Provider>
	</main>
	);
}

export default Main;