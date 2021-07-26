import axios from 'axios';


const urlbase = axios.create({
    baseURL: `https://openlibrary.org`,
})


export function getAuthorList() {
    urlbase.get("/search/authors.json?q=rowling")
    .then(res => console.log(res.data.docs))
    .catch(err => console.log(err))
    
}

export function accessAuthorWorks(key) {
    const url = `/${key}/works.json`

    urlbase.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

}