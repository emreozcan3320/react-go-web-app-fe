import React, {Fragment, useEffect, useState} from 'react';

import Modal from '../../components/Modal/Modal';
import {deleteQuoteByKey, listAllQuotes} from "../../services/Quote.service"

import {FaPen, FaPlusSquare, FaTrash} from 'react-icons/fa';
import "./Home.scss"

export default function Home() {

	const [quotes, setQuotes] = useState([]);
	const [randomQuote, setRandomQuote] = useState({});
	const [updatedQuote, setUpdatedQuote] = useState({});

	const [counter, setCounter] = useState(0)
	const [error, setError] = useState("")
	const [isModalActive, setIsModalActive] = useState(false)


	const getRandomQuote = () => {
		var item = quotes[Math.floor(Math.random()*quotes.length)];
		setRandomQuote(item)
		let newIndex = quotes.map(e => {
			return e.quote;
		}).indexOf(item.quote);
		setCounter(newIndex)
	}

	const nextQuote = () => {
		if(counter !== quotes.length) {
			let count = counter + 1
			setCounter(count)
			var item = quotes[counter];
			setRandomQuote(item)
		} else {
			setCounter(0)
			var item = quotes[0];
			setRandomQuote(item)
		}
	}

	const prevQuote = () => {
		if(counter !== 0) {
			let count = counter - 1
			setCounter(count)
			var item = quotes[count];
			setRandomQuote(item)

		} else {
			setCounter(quotes.length - 1)
			var item = quotes[quotes.length - 1];
			setRandomQuote(item)
		}
	}

	const showModal = (type) => {
		setIsModalActive(true)
		if(type === "update") {
			setUpdatedQuote(randomQuote)
		} else {
			setUpdatedQuote({})
		}
	}

	const hideModal = () => {
		setIsModalActive(false)
	}

	const getAllQuotes = () => {
		listAllQuotes()
		.then((result) => {
				setQuotes(result.data)
				setRandomQuote(result.data[Math.floor(Math.random()*result.data.length)])
			},
			(error) => {
				setError(error)
			})
	}

	const deleteQuote = (key) => {
		deleteQuoteByKey(key)
		.then(response => {
			getAllQuotes()
			getRandomQuote()
		}, error => {
			console.log(error)
		})
	}

	useEffect(() => {
		getAllQuotes()
	}, [])

	if( error !== "") {
		return <div className="loading">
			<p>Loading...</p>
		</div>
	} else {
		return (
			<div className="quote-container">
				{
					isModalActive
						? <Modal
							hideModal={hideModal}
							getAllQuotes={getAllQuotes}
							updatedQuote={updatedQuote}
						/>
						: <Fragment>
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
								<p className="jedi-color" onClick={() => showModal("add")}><FaPlusSquare/></p>
								<p className="force-color" onClick={() => showModal("update")}><FaPen/></p>
								<p className="sith-color" onClick={() => deleteQuote(randomQuote.key)}><FaTrash/></p>
							</div>

							<div className="button-wrapper">
								<button className="button sith-button" onClick={prevQuote}>Prev</button>
								<button className="button force-button" onClick={getRandomQuote}>Random</button>
								<button className="button jedi-button" onClick={nextQuote}>Next</button>
							</div>
						</Fragment>
				}
			</div>
		)
	}


}
