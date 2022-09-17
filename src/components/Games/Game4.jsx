
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";
import { useNavigate } from "react-router-dom";


function Game4() {
    const {library, setLibrary, points, setPoints} = useContext(MainContext);

    const [learnLibrary, setLearnLibrary] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [listenWord, setListenWord] = useState('')
    const [errors, setErrors] = useState(0);
    const [correct, setCorrect] = useState(0);
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

            // window.location.reload()

           
            navi('/games')

            return};

		index++;
		setCurrentIndex(index);
        shuffleListen()
		
	}

    function listen() {
		let speech = new SpeechSynthesisUtterance(listenWord);
		speech.voice = window.speechSynthesis.getVoices()[2];
		window.speechSynthesis.speak(speech);
	}

    function shuffleListen() {
        let listenTMP = learnLibrary
        let listenWords = listenTMP.map(item => {
            return item.translate
        })

        let indexSH = Math.floor(Math.random()*listenWords.length);
        
        let listWord = listenWords[indexSH];
        setListenWord(listWord)
    }

    function checkYes() {

        let correctCount = correct
        let errorCount = errors

        if (listenWord == currentWord.translate) {
            correctCount++
            setCorrect(correctCount)
            next()
        } else {
            errorCount++
            setErrors(errorCount)
            next()
        }
    }

    function checkNo() {
        let correctCount = correct
        let errorCount = errors

        if (listenWord != currentWord.translate) {
            correctCount++
            setCorrect(correctCount)
            next()
        } else {
            errorCount++
            setErrors(errorCount)
            next()
        }
    }

	
    useEffect(() => {
		setLearnLibrary(library);
		shuffle();
        
	}, [library]);

	useEffect(() => {
		setCurrentWord(learnLibrary[0]);
        shuffleListen()
	}, [learnLibrary]);


    const widthStyle = {
		width: learnLibrary.indexOf(currentWord)*100/(learnLibrary.length-1) + '%'
	};

	return (
	<div className="learn">
		<div className="learn__progress"><span style={widthStyle} ></span></div>

        <div className="learn__info">Errors: {errors}. Correct: {correct}. Points: 0.</div>
		
        <div > it translates as</div>
        <div className="learn__percent">{currentWord?.word}</div>
		<button onClick={listen}>Listen</button>

        <div className="answer__btn">
            <button onClick={checkYes} className="answer__btn yes">YES</button>
            <button onClick={checkNo} className="answer__btn no">NO</button>
        </div>
        
		
	</div>
	);
}

export default Game4;