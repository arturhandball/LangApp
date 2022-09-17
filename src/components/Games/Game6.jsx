
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../Main";
import { useNavigate } from "react-router-dom";


function Game6() {
    const {library, setLibrary, points, setPoints} = useContext(MainContext);

    const [learnLibrary, setLearnLibrary] = useState([]);
    
    const [currentArray, setCorrentArray] = useState([])
    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)
    const [count, setCount] = useState(0)
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

    function getShuffleArray() {
        let shufArray = learnLibrary
        shufArray.map((item, index) => {
            item.ident = index
        })

        let wordArray = shufArray.map((item) => {
            return (
                {word: item.word,
                check: item.ident}
            )
        })

        let translateArray = shufArray.map((item) => {
            return (
                {word: item.translate,
                check: item.ident}
            )
        })

        let allwords = [...wordArray, ...translateArray]
        allwords.sort(()=>Math.random()-0.5)

        setCorrentArray(allwords)

    }

    function choose(e) {
        let myTry = count
        myTry++
        setCount(myTry)
        if (myTry > 2) return 
        let firstCard = first
        let secCard = second
        if (myTry == 1) {
            firstCard = e.target.dataset.id
            setFirst(firstCard)
            e.target.classList.add('remeber_choose')
            e.target.disabled = true
        }
        if (myTry == 2) {
            secCard = e.target.dataset.id
            setSecond(secCard)
            e.target.classList.add('remeber_choose')
            e.target.disabled = true
        }
    }

    function check() {
        let one = first
        let two = second
        let myTry = count

        if (!one || !two) return

        if (one == two) {
            myTry = 0
            setCount(myTry)
            setFirst(0)
            setSecond(0)
            let chooseBtn = document.querySelectorAll('.remeber_choose')
            chooseBtn = Array.from(chooseBtn)
            chooseBtn.forEach(item => {
            item.classList.add('true')
            item.disabled = true
        })

        nav()
        
        } else {
            myTry = 0
            setCount(myTry)
            setFirst(0)
            setSecond(0)
            let chooseBtn = document.querySelectorAll('.remeber_choose')
            chooseBtn = Array.from(chooseBtn)
            chooseBtn.forEach(item => {
                if (item.classList.contains('true') == false) {
                    item.classList.add('false')
                    item.disabled = true}
                })
            
            setTimeout(() => {
                let chooseBtn = document.querySelectorAll('.remeber_choose.false')
                chooseBtn = Array.from(chooseBtn)
               
                chooseBtn.forEach(item => {
                
                item.classList.remove('false')
                item.classList.remove('remeber_choose')
                item.disabled = false
                })
            }, 1000);
        }
    }

    function nav() {
        let btns = document.querySelectorAll('.remember')
        btns = Array.from(btns)
        let btnToLink = []
        btns.filter(item => {
            if (!item.classList.contains('true')) {
                btnToLink.push(item)
            }           
        })
        if (btnToLink.length == 0) navi('/games')
        console.log(btnToLink)
    }

	
    useEffect(() => {
		setLearnLibrary(library);
		shuffle();
        
	}, [library]);

    useEffect(()=> {
        if (!learnLibrary) return
        getShuffleArray()
    }, [learnLibrary])


    useEffect(()=> {
        if (count == 0) return
        check()
    }, [count])

	return (
	<div className="learn">
		
        <div > Remember translation</div>

        <div className="remember__field">
            {currentArray.map((item, ind) => {
                return(
                    <button key={ind} onClick={choose} data-id={item.check} className="remember">{item.word}</button>
                )
            })}
        </div>
		
	</div>
	);
}

export default Game6;