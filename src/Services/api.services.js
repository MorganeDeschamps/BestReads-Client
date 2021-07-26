import axios from 'axios';
let URI = require('urijs');
let URITemplate = require('urijs/src/URITemplate');



//CREATE URLS FOR SEARCHES

//new URITemplate(`https://app.ticketmaster.com/discovery/v2/{resource}.json{?q*,apikey}`);
/*let searchUri = uriTemplate.expand({
    resource: "events",
    q: {
        size: "50", 
        keyword, 
        city: citySearched,
        localStartDateTime: dateApi
    },
    apikey: apiKey
  })
*/

/*
MainSearch URL = http://openlibrary.org/search.json?{query1}={queryValue1}&{query2}={queryValue2}
=> keyword search : q=
=> specific queries: title, author, subject, place, person, language, publisher

SubjectSearch URL = https://openlibrary.org/search/subjects.json?q={queryValue}+subject_type:{queryValue}
=> subject_type options: place, time, person

AuthorSearch URL = https://openlibrary.org/search/authors.json?q={queryValue1}




https://openlibrary.org/search.json?title=harry+potter+stone&language=eng
https://openlibrary.org/search.json?title=Harry+Potter&language=en
*/

export const main = new URITemplate(`https://openlibrary.org/{subSearch}.json{?q*}`)
export const notMain = new URITemplate(`https://openlibrary.org/search/{subSearch}.json{?q*}`)
//works for authors and subjects




function buildUrl(searchOptions) {
    const {searchType, subSearch, searchTerms} = searchOptions;

    let searchUrl = searchType.expand({
        subSearch: subSearch,
        q: {...searchTerms}
    })
    console.log("url is:", searchUrl)
    return searchUrl
}


const urlbase = axios.create({
    baseURL: `https://openlibrary.org`,
})


export function searchAny(searchProps) {
    
    return axios.get(buildUrl(searchProps))
    .then(res => {return res.data.docs})
    .catch(err => console.log(err))
    
}


export function accessAuthorWorks(key) {
    const url = `/authors/${key}/works.json`

    urlbase.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

}


export function getAuthorDetails(key) {
    const url = `/authors/${key}.json`

    return urlbase.get(url)
    .then(result => {return result.data})
    .catch(err => console.log(err))
}



export function getWorks(key) {
    const url = `/authors/${key}/works.json`

    return urlbase.get(url)
    .then(result => {return result.data})
    .catch(err => console.log(err))
}
