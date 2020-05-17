import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {FaPlusSquare, FaPen, FaTrash} from 'react-icons/fa';
import "./home.scss"

export default function Home() {

	const [quotes, setQuotes] = useState([]);
	const [randomQuote, setRandomQuote] = useState({});

	const [counter, setCounter] = useState(0)
	const [error, setError] = useState("")
	const [isModalActive, setIsModalActive] = useState(false)


	function getRandomQuote() {
		var item = quotes[Math.floor(Math.random()*quotes.length)];
		setRandomQuote(item)
		let newIndex = quotes.map(e => {
			return e.quote;
		}).indexOf(item.quote);
		setCounter(newIndex)
	}

	function nextQuote() {
		if(counter !== quotes.length) {
			let count = counter + 1
			setCounter(count)
			var item = quotes[counter];
			setRandomQuote(item)
		}
	}

	function prevQuote() {
		if(counter !== 0) {
			let count = counter - 1
			console.log(count);
			setCounter(count)
			var item = quotes[count];
			setRandomQuote(item)

		}
	}

	function showModal() {
		setIsModalActive(true)
	}

	function hideMoal() {
		setIsModalActive(false)
	}

	function deleteQuote(key) {
		console.log(key)
	}

	useEffect(() => {
		axios(`http://localhost:8080/api/quotes`)
		.then((result) => {
				setQuotes(result.data)
				setRandomQuote(result.data[Math.floor(Math.random()*result.data.length)])

				console.log(result.data);
			},
			(error) => {
				setError(error)
			})
	}, [])


	if(Object.keys(randomQuote).length === 0 && randomQuote.constructor === Object) {
		return <div>Loading</div>
	} else {
		return (
			<div className="quote-container">
				<div className="title-wrapper">
					<div className="text">
						<p>STAR</p>
						<p>WARS</p>
					</div>
				</div>

				<div className="quote-wrapper">
					<p className="quote">{randomQuote.quote}</p>
					<p className="owner">{randomQuote.owner}</p>
					<p className="reference-date">{randomQuote.reference} - {randomQuote.created}</p>
				</div>


				<div className="actions-wrapper">
					<p className="jedi-color" onClick={showModal}><FaPlusSquare/></p>
					<p className="force-color" onClick={showModal}><FaPen/></p>
					<p className="sith-color" onClick={() => deleteQuote(randomQuote.key)}><FaTrash/></p>
				</div>

				<div className="button-wrapper">
					<button className="button sith-button" onClick={prevQuote}>Prev</button>
					<button className="button force-button" onClick={getRandomQuote}>Random</button>
					<button className="button jedi-button" onClick={nextQuote}>Next</button>
				</div>
			</div>
		)
	}


}
