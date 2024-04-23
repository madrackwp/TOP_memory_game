import { useState } from "react";
import Cards from "./Cards";
import { useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";

import "./App.css";
function App() {
  // const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [win, setWin] = useState(false);

  const imageMappings = {};
  const [imageMappingState, setImageMappings] = useState(imageMappings);

  const pokemonList = [
    "ditto",
    "bulbasaur",
    "glalie",
    "snorunt",
    "mudkip",
    "metagross",
    "torterra",
    "pignite",
    "kyogre",
    "sceptile",
    "latias",
    "azumarill",
  ];

  useEffect(() => {
    // Fetch Pokémon sprites and update imageMappings state
    async function fetchPokemonSprites() {
      const pokemonSprites = await Promise.all(
        pokemonList.map(async (pokemonName) => {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const jsonData = await response.json();
            return jsonData.sprites.front_default;
          } catch (error) {
            console.error("Error fetching data:", error);
            return null;
          }
        })
      );

      const imageMappings = {};
      pokemonSprites.forEach((sprite) => {
        const id = uuidv4();
        imageMappings[id] = sprite;
      });
      setImageMappings(imageMappings);
    }

    fetchPokemonSprites();
  }, []);

  function shuffleKeys(keys) {
    // console.log("SHUFFLING KEYS");
    const shuffledKeys = keys.sort(() => Math.random() - 0.5);
    return shuffledKeys;
  }

  // getPokemonSprite("ditto");

  const [shuffledKeys, setShuffledKeys] = useState(
    shuffleKeys(Object.keys(imageMappingState))
  );

  useEffect(() => {
    setHighScore(Math.max(highScore, selected.length));
    const newKeys = shuffleKeys(Object.keys(imageMappingState));
    setShuffledKeys(newKeys);
    console.log(highScore, pokemonList.length);

    if (highScore == pokemonList.length) {
      console.log("YOU WIN");
      setWin(true);
    }
  }, [selected, highScore, imageMappingState]);

  function clickHandler(userChoice) {
    // console.log(userChoice);
    if (selected.includes(userChoice)) {
      setSelected([]);
      // console.log("WRONG");
    } else {
      // console.log("CORRECT!");
      const newSelect = [...selected];
      newSelect.push(userChoice);
      setSelected(newSelect);
    }
  }

  return (
    <div className="app-container">
      <Cards
        handleClick={clickHandler}
        imageMappings={imageMappingState}
        shuffledKeys={shuffledKeys}
      />
      <p>Your current streak is: {selected.length}</p>
      <p>Your best streak is: {highScore}</p>
      {win && <p>Congrats! You have won!</p>}
    </div>
  );
}

export default App;
