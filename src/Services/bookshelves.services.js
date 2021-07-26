import axios from 'axios';
import * as CONSTS from '../utils/consts';



function internalServerError(err) {
	return {
		status: false,
		errorMessage: 'Internal server error. Please check your server'
	};
}

function successStatus(res) {
	return {
		status: true,
		data: res.data
	};
}


// creates a basic url for every request in this file
const publicService = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/public`,
    withCredentials: true
});


const privateService = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/private`,
    withCredentials: true
});




//PUBLIC
export function getPublicBookshelf(bookshelfId) {
	return publicService
		.get(`/${bookshelfId}`)
		.then(successStatus)
		.catch(internalServerError);
}


export function newPublicBookshelf(form) {
	//form needs {name, books, publicBookshelf}
	return publicService
		.post(`/create`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function editPublicBookshelf(bookshelfId, form) {
	//form needs {bookshelfId, name, books}
	return publicService
		.put(`/${bookshelfId}/edit`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function moveBookPublic(form) {
	//form needs {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo}
	return publicService
		.put(`/moveBook`, form)
		.then(successStatus)
		.catch(internalServerError);

}





//PRIVATE
export function getPrivateBookshelf(bookshelfId) {
	return privateService
		.get(`/${bookshelfId}`)
		.then(successStatus)
		.catch(internalServerError);
}


export function newPrivateBookshelf(form) {
	//form needs {name, books, publicBookshelf}
	return privateService
		.post(`/create`, form)
		.then(successStatus)
		.catch(internalServerError);
}

export function editPrivateBookshelf(bookshelfId, form) {
	//form needs {bookshelfId, name, books}
	return privateService
		.put(`/${bookshelfId}/edit`, form)
		.then(successStatus)
		.catch(internalServerError);
}


export function moveBookPrivate(form) {
	//form needs {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo}
	return privateService
		.put(`/moveBook`, form)
		.then(successStatus)
		.catch(internalServerError);

}







/* 

// CODE FROM BOOKSHELF PROJECT 

const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
} 



export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`)
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`)
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
 */