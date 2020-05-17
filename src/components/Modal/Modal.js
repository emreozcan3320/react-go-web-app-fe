import React, {useState} from 'react'
import "./Modal.scss"
import {createQuote, updateQuote} from "../../services/Quote.service"

const Modal = (props) => {

	const [key, setKey] = useState(props.updatedQuote.key)
	const [quote, setQuote] = useState(props.updatedQuote.quote)
	const [owner, setOwner] = useState(props.updatedQuote.owner)
	const [reference, setReference] = useState(props.updatedQuote.reference)

	const [isAllFieldFilled, setIsAllFieldFilled] = useState(false);
	const [isSending, setIsSending] = useState(false)

	const isAllFieldFilledChecker = () => {
		if(quote.length > 0 &&
			owner.length > 0 &&
			reference.length > 0) {
			setIsAllFieldFilled(true)
			return true;
		}
		setIsAllFieldFilled(true)
		return true;
	}

	const clearModel = () => {
		setQuote("")
		setOwner("")
		setOwner("")
	}

	const closeModel = () => {
		clearModel()
		props.hideModal()
		props.getAllQuotes()
	}

	const submit = (e) => {
		e.preventDefault();
		if(isAllFieldFilledChecker()) {
			setIsSending(true)
			if(Object.keys(props.updatedQuote).length !== 0) {
				updateQuote({
					key: key,
					quote: quote,
					owner: owner,
					reference: reference
				})
				.then(response => {
					setIsSending(false)
					closeModel()
				}, error => {
					setIsSending(false)
					console.log(error)
				})
			} else {
				createQuote({
					quote: quote,
					owner: owner,
					reference: reference
				})
				.then(response => {
					setIsSending(false)
					closeModel()
				}, error => {
					setIsSending(false)
					console.log(error)
				})
			}
		} else {
			setIsSending(false)
		}

	}

	return (
		<div className="modal-container">
			{
				isSending ? <p className="sending">Sending...</p> : <form onSubmit={submit}>
					<label htmlFor="quote">quote</label>
					<textarea rows="4" cols="50" type="text" name="quote" value={quote}
					          onChange={(e) => setQuote(e.target.value)}/>

					<label htmlFor="owner">owner</label>
					<input type="text" name="owner" value={owner}
					       onChange={(e) => setOwner(e.target.value)}/>

					<label htmlFor="reference">reference</label>
					<input type="text" name="reference" value={reference}
					       onChange={(e) => setReference(e.target.value)}/>

					<button type="submit" disabled={isSending}>Submit</button>
					<button type="button" onClick={closeModel}>Close</button>
				</form>
			}

		</div>
	)
}

export default Modal
