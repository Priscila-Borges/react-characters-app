import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CharacterDetails() {

    const {characterId} = useParams();

    const [characterDetails, setCharacterDetails] = useState({});

    useEffect(() => {
        axios.get("https://ih-crud-api.herokuapp.com/characters/" + characterId)
            .then( response => {
                setCharacterDetails(response.data)
            })
            .catch( e => {
                console.log("error getting character details from API", e)
            })
    }, [])



    return (
        <section>
            <h1>{characterDetails.name}</h1>
            <p>Occupation: {characterDetails.occupation}</p>
            <p>Weapon: {characterDetails.weapon}</p>
        </section>
    )
}

export default CharacterDetails;