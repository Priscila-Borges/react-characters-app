import { useEffect, useState } from 'react'
import axios from "axios";
import { Link, NavLink, Route, Routes } from 'react-router-dom';

import './App.css'
import CharacterDetails from './components/CharacterDetails';

function App() {
  const [characters, setCharacters] = useState(null)



  useEffect(() => {
    getCharactersFromApi();
  }, []);

  const getCharactersFromApi = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/characters`)
      .then(response => {
        setCharacters(response.data);
      })
      .catch((e) => {
        console.log("error getting characters from the API....", e);
      });
  }

  const renderList = () => {
    if (characters === null) {
      return <p>loading....</p>
    }

    return characters.map((characterObj, index) => {
      return (
        <div key={index} className='card' >
          <h3>{characterObj.name}</h3>          
          <Link to={"/characters/" + characterObj.id}>More Details</Link>
          <br />
        </div>
      )
    })
  }

  return (

    <>

      <nav>
        <NavLink to="/">Home</NavLink> |
        <NavLink to="/contact">Contact</NavLink> |
        <NavLink to="/about">About</NavLink> |
      </nav>

      <Routes>
        <Route path='/' element={renderList()} />
        <Route path='/contact' element={<p>this will be the CONTACT PAGE</p>} />
        <Route path='/about' element={<p>this will be the ABOUT PAGE</p>} />
        <Route path='/characters/:characterId' element={<CharacterDetails callbackToUpdateCharacters={getCharactersFromApi} />}/>
      </Routes>

    </>
  )
}

export default App
