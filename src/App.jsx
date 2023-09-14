import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [characters, setCharacters] = useState(null)
  

  const baseURL = "https://ih-crud-api.herokuapp.com"

  useEffect(() => {
    axios.get(baseURL + '/characters')
    .then(response => {setCharacters(response.data)
    })
    .catch((e) => {
      console.log(e);
    })
  }, []);

  const renderList = () => {
    return characters.map((characterObj, index) => {
          return (
            <div key={index} >
              <h3>Name: {characterObj.name}</h3>
              <p>Occupation: {characterObj.occupation}</p>
              <p>Weapon: {characterObj.weapon}</p>
              <br/>
            </div>
          )
        })
  }

  return (
    <>

      { characters && <h2>Number of characters in the API: {characters.length}</h2>}

      {

        characters === null
        ? <p>loading....</p>
        : renderList()

      }

    </>
  )
}

export default App
