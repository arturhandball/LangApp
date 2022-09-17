import { useRef, useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";

function Game1() {
	const {library, setLibrary, points, setPoints} = useContext(MainContext);

    const learnSpeakElem = useRef();
    const wordsPass = useRef() // хук для элемента learn__translate

	const [learnLibrary, setLearnLibrary] = useState([]);
	const [currentWord, setCurrentWord] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
    const [speakWord, setSpeakWord] = useState('----');
    const [errors, setErrors] = useState(0);
    const [correct, setCorrect] = useState(0);

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

        setSpeakWord('----');
        setErrors(0)
        setCorrect(0)
        
		let index = currentIndex;

		if (index === 0 && learnLibrary.length > 1) index = 1;

		let word = learnLibrary[index];
		setCurrentWord(word);

		if (index === learnLibrary.length-1){ 

            // wordsPass.current.innerHTML = 'All words passed' //меняем слово на фразу, чтобы понять, что все слова пройдены
            window.location.reload()
            return};

		index++;
		setCurrentIndex(index);
	}

    function speak() {

        setSpeakWord('----');

        let SpeechRecognition = new (
            window.SpeechRecognition || 
            window.webkitSpeechRecognition || 
            window.mozSpeechRecognition || 
            window.msSpeechRecognition)();

        SpeechRecognition.lang = "en-EN";

        SpeechRecognition.onresult = function(event){
            let word = event.results[0][0].transcript;

            if (!word) return;

            setSpeakWord(word);

            console.log(word)
        };

        SpeechRecognition.onend = function(){
            SpeechRecognition.stop();
        };

        SpeechRecognition.start();

    }

    function check() {
        let cW = currentWord.translate?.toLowerCase(),
            sW = speakWord?.toLowerCase();

        if (cW === sW) {
             return true
        } else {        
            return false;};
    }

    function setLearnProgress(cor, err) {
        let libraryTMP = library;
        let currentLearnWord = libraryTMP.find(item => {
            return item.translate === currentWord.translate;
        });

        // console.log(currentLearnWord)

        currentLearnWord.correct = cor;
        currentLearnWord.errors = err;

        if (!currentLearnWord.correct) currentLearnWord.correct = 0;
        if (!currentLearnWord.errors) currentLearnWord.errors = 0;

        if ((+currentLearnWord.errors >= +currentLearnWord.correct)) currentLearnWord.learn = 0;
        
        if (+currentLearnWord.errors == 0 && +currentLearnWord.correct > 0) currentLearnWord.learn = 100;

        if (+currentLearnWord.errors > 0 && +currentLearnWord.correct > 0) {
            // currentLearnWord.learn = Math.round((+currentLearnWord.errors*100)/+currentLearnWord.correct);
            currentLearnWord.learn = Math.round(+currentLearnWord.correct / ((+currentLearnWord.errors) + (+currentLearnWord.correct)) * 100);
        }

        console.log(currentLearnWord)
        console.log(currentLearnWord.learn)

        currentWord.learn = currentLearnWord.learn;



        // console.log(currentLearnWord);

        // if (!currentLearnWord.errors && currentLearnWord.correct) currentLearnWord.learn = 100;

        // if (currentLearnWord.errors && currentLearnWord.correct) {
        //     currentLearnWord.learn = Math.round((currentLearnWord.errors*100)/currentLearnWord.correct);
        // }

        // currentWord.learn = currentLearnWord.learn;

        // setLibrary([...libraryTmp]);
    }

    // useEffect(() => {
    //     setSpeakWord('----');
    // }, [currentIndex]);

	useEffect(() => {
		setLearnLibrary(library);
		shuffle();
	}, [library]);

	useEffect(() => {
		setCurrentWord(learnLibrary[0]);
	}, [learnLibrary]);

    useEffect(() => {

        learnSpeakElem.current.classList.remove('true');
        learnSpeakElem.current.classList.remove('false');
        
        if (speakWord === '----') return;

        let errorCount = errors,
            correctCount = correct,
            pointsCount = points;

        if (check()) {
            learnSpeakElem.current.classList.add('true');

            correctCount++;
            pointsCount++;

            setCorrect(correctCount);
            setPoints(pointsCount);
            
            setLearnProgress(correctCount, errorCount);
        } else {
            learnSpeakElem.current.classList.add('false');

            errorCount++;
            pointsCount--;

            setErrors(errorCount);
            setPoints(pointsCount);
            
            setLearnProgress(correctCount, errorCount);
        }
    }, [speakWord]);

	const widthStyle = {
		width: learnLibrary.indexOf(currentWord)*100/(learnLibrary.length-1) + '%'
	};

	return (
	<div className="learn">
		<div className="learn__progress"><span style={widthStyle}></span></div>
		<div className="learn__info">Errors: {errors}. Correct: {correct}. Points: 0.</div>
		<div className="learn__percent">{currentWord?.learn}%</div>
		<div ref={wordsPass} className="learn__traslate">{currentWord?.translate}</div>
		<div ref={learnSpeakElem} className="learn__speak">{speakWord}</div>
        <button onClick={speak}>Speak</button>
		<button onClick={next}>Next</button>
	</div>
	);
}

export default Game1;