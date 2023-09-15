import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CharacterDetails(props) {

    const { characterId } = useParams();

    const [characterDetails, setCharacterDetails] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/characters/${characterId}`)
            .then(response => {
                setCharacterDetails(response.data)
            })
            .catch(e => {
                console.log("error getting character details from API", e)
            })
    }, [])

    const deleteCharacter = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/characters/${characterId}`)
            .then( response => {
                props.callbackToUpdateCharacters(); // invoke function in the parent component
                navigate("/");
            })
            .catch( e => {
                console.log("error deleting character from API", e)
            })
    }



    return (
        <section className='card'>
            <h1>{characterDetails.name}</h1>
            <p>Occupation: {characterDetails.occupation}</p>
            <p>Weapon: {characterDetails.weapon}</p>

            <button onClick={deleteCharacter}>Delete</button>
        </section>
    )
}

export default CharacterDetails;