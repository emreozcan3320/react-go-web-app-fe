import React, { useState } from 'react';
import axios from 'axios';

const API_URL_DEV = `http://localhost:8080`
const API_URL_CLOUD = `https://golang-web-app-back-end-d6kfnlic2a-uk.a.run.app`

async function listAllQuotes() {
	 return axios (`${API_URL_DEV}/api/quotes`)
}

async function deleteQuoteByKey(key) {
	return axios(
		{
			method: 'delete',
			url: `${API_URL_DEV}/api/quotes/${key}`
		})
}

async function updateQuote(quoteObject) {
	return axios(
		{
			method: 'PUT',
			url: `${API_URL_DEV}/api/quotes`,
			data: {
				key: quoteObject.key,
				quote: quoteObject.quote,
				owner: quoteObject.owner,
				reference: quoteObject.reference
			}
		}
	)
}

async function createQuote(quoteObject) {
	return axios(
		{
			method: 'post',
			url: `${API_URL_DEV}/api/quotes`,
			data: {
				quote: quoteObject.quote,
				owner: quoteObject.owner,
				reference: quoteObject.reference
			}
		}
	)
}


export { createQuote, listAllQuotes, updateQuote, deleteQuoteByKey } ;
