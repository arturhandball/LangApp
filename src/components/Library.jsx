import { useContext, useRef } from "react";
import { MainContext } from "./Main";

function Library() {
	const  {library, setLibrary} = useContext(MainContext);

	const inputWord = useRef();

	function add() {
		let inputWordValue = inputWord.current.value;

		if (!inputWordValue) return;

		const libraryTmp = library;
		const findWord = libraryTmp.find(item => item.word === inputWordValue);

		if (findWord) return;

		fetch('http://tmp.myitschool.org/API/translate/?source=ru&target=en&word=' + inputWordValue)
		.then(response => response.json())
		.then(result => {
			result.learn = 0;
			libraryTmp.push(result);
			setLibrary([...libraryTmp]);
		});
	}

	function remove(word) {
		const libraryTmp = library.filter(item => item.word !== word);

		setLibrary([...libraryTmp]);
	}

	return (
	<div className="library">
		<h1>Add new word</h1>

		<div className="library__form">
			<input ref={inputWord} type="text" />
			<button onClick={add}>+</button>
		</div>

		<table className="library__list">
			<thead>
				<tr>
					<th>Word</th>
					<th>Translation</th>
					<th>Learn</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{library.map((item, index) => {
					return (
						<tr key={index}>
							<td>{item.word}</td>
							<td>{item.translate}</td>
							<td>{item.learn}</td>
							<td><button onClick={() => { remove(item.word) }}>x</button></td>
						</tr>
					);
				})}
			</tbody>
		</table>
	</div>
	);
}

export default Library;