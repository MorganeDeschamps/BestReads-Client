import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"




//see author: https://openlibrary.org/authors/{key}.json
//ex: https://openlibrary.org/authors/OL23919A.json

//see works: https://openlibrary.org/authors/{key}/works.json
//ex: https://openlibrary.org/authors/OL23919A/works.json
//https://covers.openlibrary.org/a/id/5543033-M.jpg


function AuthorCard(props) {
    console.log("props: ", props)
    
    const {name, bio, wikipedia, photos} = props.details


    //const picture = `https://covers.openlibrary.org/a/id/${authorDetails.photos[0]}-M.jpg`
    
    //useEffect(() => getDetails(props.authorKey), [])
    //useEffect(() => console.log("test: ", authorDetails), [authorDetails])


    return (
        <div id="author-card">
            {(photos) &&  <img src={`https://covers.openlibrary.org/a/id/${photos[0]}-M.jpg`} alt={`${name}`} /> }
            <p>Name: {name}</p>
            {(bio) && <p>Description: {bio.value}</p>}

 
        </div>
    )

}

export default AuthorCard