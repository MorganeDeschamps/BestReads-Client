import './App.css';
import axios from 'axios';
import * as apiSearches from "./Services/api.services"
import { useEffect, useState } from 'react';
import AuthorCard from './Components/AuthorCard';
import { BrowserRouter, Link} from 'react-router-dom';

//searchAny needs  {searchType: , subSearch: , searchTerms:}
//searchType: "main" or "notMain"
//subSearch: "searc" / "authors" / "subjects"
//searchTerms:
//- for main {q: "keywords"} / {title:, author:, subject:, place:, person:, language:, publisher:}
//- for authors {q: "keywords"} 
//- for subjects {q: "keywords"} /  {q: "keywords", subject_type: "place" / "time" / "person"}


function App() {

  let emptyDeets = {name: "", bio: {}, wikipedia: "", photos: []}

  const [authorsState, setAuthors] = useState([])
  const [worksState, setWorks] = useState(emptyDeets)
  const [searchState, setSearch] = useState("")
  const [toggle, setToggle] = useState("")


  function findAuthor(searchEntry) {
    apiSearches.searchAny({
      searchType: apiSearches.notMain, 
      subSearch: "authors", 
      searchTerms:{q: searchEntry}})
    .then(res => setAuthors(res))
    .catch(err => console.log(err))

  }

  //console.log("fna: ", fnA)
  //fnA.then(res => res.map(eachDoc => apiSearches.accessAuthorWorks(eachDoc.key))).catch(err => console.log(err))
  //<a href={wikipedia} >Open Library page </a>
  //<Link to={`/works/${props.authorKey}`}><button>See works</button> </Link>



  function find(search) {

    let url = `https://openlibrary.org/search.json?q=${search}`

    axios.get(url)
    .then(result => console.log(result))
    .catch(err => console.log(err))

  }






  function handleChange(event) {
    setSearch(event.target.value)
  }



  function handleSubmit(event) {
    event.preventDefault()
    find(searchState)
  }

  function showWorks(key) {
    apiSearches.getWorks(key)
    .then(res => setWorks(res))
    .then(res => console.log("worksState", worksState))
    .catch(err => console.log(err))
  }

  useEffect(() => console.log("authorsState: ", authorsState), [authorsState])
  

  //<AuthorCard key={eachAuthor.key} details={authorDetails} />
  //https://openlibrary.org/authors/OL2623402A



  return (
    <BrowserRouter>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Search for authors: </label>
        <input type="text" onChange={handleChange} value={searchState} />
        <button type="submit">Search</button>
      </form>

      {(authorsState.length === 0) && <div>Loading...</div>}

      {authorsState.map((eachAuthor) => {
        return (
          <div key={eachAuthor.key}>
            <h4>{eachAuthor.name}</h4>
            <h4>{eachAuthor.work_count} works </h4> {(toggle !== eachAuthor.key) &&<button onClick={event => showWorks(eachAuthor.key)}>Display</button> }
            {(toggle === eachAuthor.key) && 
            <ul>
              {/* {worksState.entries.map(eachWork => <li><Link> {eachWork.title} </Link></li>)} */}

            </ul>}

            <br />
            <a href={`https://openlibrary.org/authors/${eachAuthor.key}`} target="blank" >Open Library page </a>
          </div>
        )
      })}

    </div>
    </BrowserRouter>
  );
}

export default App;
