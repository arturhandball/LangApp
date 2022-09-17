import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";

function Learn() {
	const {library} = useContext(MainContext);

	const [learnLibrary, setLearnLibrary] = useState([]);
	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);


	let learnLibraryTmp = [];

	function shuffle() {
		if (library.length === 0) return;

		function random(a) {
			return Math.floor(Math.random() * (a + 1));
		}

		let index = random(library.length-1);
		let item = library[index];

		if (!learnLibraryTmp.includes(item)) {
			learnLibraryTmp.push(item);
		}

		if (library.length !== learnLibraryTmp.length) {
			shuffle();
		} else {
			setLearnLibrary(learnLibraryTmp);
			return;
		}
	}

	function next() {
		let index = currentIndex;

		if (index === 0 && learnLibrary.length > 1) index = 1;

		let word = learnLibrary[index];
		setCurrentWord(word);

		if (index === learnLibrary.length-1) return; 

		index++;
		setCurrentIndex(index);
	}

	function listen() {
		let speech = new SpeechSynthesisUtterance(currentWord.translate);
		speech.voice = window.speechSynthesis.getVoices()[2];
		window.speechSynthesis.speak(speech);
	}

	useEffect(() => {
		setLearnLibrary(library);
		shuffle();
	}, [library]);

	useEffect(() => {
		setCurrentWord(learnLibrary[0]);
	}, [learnLibrary]);

	const widthStyle = {
		width: learnLibrary.indexOf(currentWord)*100/(learnLibrary.length-1) + '%'
	};

	return (
	<div className="learn">
		<div className="learn__progress"><span style={widthStyle}></span></div>
		<div className="learn__percent">{currentWord?.learn}%</div>
		<div className="learn__traslate">{currentWord?.translate}</div>
		<div className="learn__word">{currentWord?.word}</div>
		<button onClick={listen}>Listen</button>
		<button onClick={next}>Next</button>
	</div>
	);
}

export default Learn;