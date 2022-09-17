import { useRef, useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";
import { useNavigate } from "react-router-dom";

function Game2() {
    const {library, setLibrary, points, setPoints} = useContext(MainContext);

    const [learnLibrary, setLearnLibrary] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const [correct, setCorrect] = useState(0);
    const wordsPass = useRef()
	const navi = useNavigate()

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

		if (index === learnLibrary.length-1){ 

            // wordsPass.current.innerHTML = 'All words passed' //меняем слово на фразу, чтобы понять, что все слова пройдены
            // window.location.reload()
			navi('/games')
            return};

		index++;
		setCurrentIndex(index);
	}

    

    function check() {
        let checkWord = wordsPass.current.value.toLowerCase()
        let wordLearn = currentWord.translate.toLowerCase()

        let errorCount = errors;
        let correctCount = correct;

        if (checkWord === wordLearn) {
            correctCount++
            setCorrect(correctCount)
            setTimeout(function(){
                next()
            }, 1000)
        } else {
            errorCount++
            setErrors(errorCount)
            console.log(currentWord.translate)
        }
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
		<div className="learn__progress"><span style={widthStyle} ></span></div>
		<div className="learn__info">Errors: {errors}. Correct: {correct}. Points: 0.</div>
        <div > Write a translation on this word</div>
		<div className="learn__percent">{currentWord?.word}</div>
		<input ref={wordsPass} type="text" /> <button onClick={check}>Check</button>
	</div>
	);
}

export default Game2;