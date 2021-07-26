import logo from './logo.svg';
import './App.css';
import * as apiSearches from "./Services/api.services"
import { useEffect, useState } from 'react';

//searchAny needs  {searchType: , subSearch: , searchTerms:}
//searchType: "main" or "notMain"
//subSearch: "searc" / "authors" / "subjects"
//searchTerms:
//- for main {q: "keywords"} / {title:, author:, subject:, place:, person:, language:, publisher:}
//- for authors {q: "keywords"} 
//- for subjects {q: "keywords"} /  {q: "keywords", subject_type: "place" / "time" / "person"}


function App() {


  const [authorsState, setAuthors] = useState([])
  const [worksState, setWorks] = useState([])
  const [searchState, setSearch] = useState("")


  function findAuthor(searchEntry) {
    apiSearches.searchAny({
      searchType: apiSearches.notMain, 
      subSearch: "authors", 
      searchTerms:{q: searchEntry}})
    .then(res => setAuthors(res))
    .catch(err => console.log(err))

  }

  //    console.log("fna: ", fnA)
  //fnA.then(res => res.map(eachDoc => apiSearches.accessAuthorWorks(eachDoc.key))).catch(err => console.log(err))


  function handleChange(event) {
    setSearch(event.target.value)
  }



  function handleSubmit(event) {
    event.preventDefault()
    findAuthor(searchState)
  }

  useEffect(() => console.log("authorsState: ", authorsState), [authorsState])


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Search for authors: </label>
        <input type="text" onChange={handleChange} value={searchState} />
        <button type="submit">Search</button>
      </form>

      {(authorsState.length === 0) && <div>Loading...</div>}

      {authorsState.map((eachAuthor) => {
        return <h4>{eachAuthor.name}</h4>
      })}

    </div>
  );
}

export default App;
