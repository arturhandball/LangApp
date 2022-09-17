
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";
import { useNavigate } from "react-router-dom";


function Game3() {
    const {library, setLibrary, points, setPoints} = useContext(MainContext);

    const [learnLibrary, setLearnLibrary] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
	const [wordTmp, setWordTmp] = useState([])
	const [chooseWord, setChooseWord] = useState([])
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


    function shuffleWord() {

		let wordTMP=wordTmp

        let word = currentWord.translate
		console.log(word)

		if (!word) return;

        let wordArray = word.split('')
        wordArray.sort(()=>Math.random()-0.5)
        console.log(wordArray)
        wordTMP = wordArray

		setWordTmp(wordTMP)
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
		setChooseWord([])

		let btnLetter = document.querySelectorAll('.learn__put li button')
		btnLetter = Array.from(btnLetter)
		btnLetter.forEach(item => {
			item.classList.remove('choose_btn')
			item.disabled = false
		})
		
	}

	function checked(){
		let field = document.querySelector('.learn__put_letter')
		field.classList.remove('true')
		field.classList.remove('false')
		let arr1 = chooseWord
		let arr2 = currentWord.translate?.split('')

		if (!arr1) return
		
		for (let i=0; i<arr1.length; i++) {
			if (arr1[i] == arr2[i]) {
				
			} else {
				field.classList.add('false')
				setTimeout(() => {
					let btnLetter = document.querySelectorAll('.learn__put li button')
					btnLetter = Array.from(btnLetter)
					btnLetter.forEach(item => {
						item.classList.remove('choose_btn')
						item.disabled = false
					})
					setChooseWord([])
				}, 1000);
				
			}
		}

		if (arr1.join('') == currentWord.translate) {
			field.classList.add('true')
			setTimeout(() => {
				next()
			}, 1000);
			}
		
	}

	function clickWord(e){
		let litr = e.target.innerHTML
		e.target.disabled = true
		e.target.classList.add('choose_btn')
		// let litr = e
		let arr = chooseWord
		arr.push(litr)
		setChooseWord([...arr])
		console.log(chooseWord)
	}

    useEffect(() => {
		setLearnLibrary(library);
		shuffle();

	}, [library]);

	useEffect(() => {
		setCurrentWord(learnLibrary[0]);
	}, [learnLibrary]);

	useEffect(() => {
		if (!currentWord) return
		shuffleWord()
	}, [currentWord])

	useEffect(() => {
		if (chooseWord[0] === '') return
		checked()
	}, [chooseWord])

    const widthStyle = {
		width: learnLibrary.indexOf(currentWord)*100/(learnLibrary.length-1) + '%'
	};

	return (
	<div className="learn">
		<div className="learn__progress"><span style={widthStyle} ></span></div>
		
        <div > Put together a translation</div>
        {/* <div className="learn__percent">{currentWord?.translate}</div> */}
		<ul className="learn__put_letter">{chooseWord.map((it, index) => {
			return (<li key={index}>{it}</li>)
		})}</ul>
		<ul className="learn__put">{wordTmp.map((item, ind) => {
			return(
				
					<li key={ind}><button onClick={clickWord}>{item}</button></li>
				
			)
		})}</ul>
		<button onClick={next}>Next</button>
        
		
	</div>
	);
}

export default Game3;