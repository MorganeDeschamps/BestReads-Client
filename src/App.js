import logo from './logo.svg';
import './App.css';
import * as apiSearches from "./Services/api.services"

function App() {


  function findStuff() {
    const fnA = apiSearches.getAuthorList()
    return fnA.map(eachDoc => apiSearches.accessAuthorWorks(eachDoc.key))
  }






  return (
    <div className="App">
      <button onClick={findStuff}>Search author</button>
    </div>
  );
}

export default App;
