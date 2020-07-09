import React, { useState, useEffect } from "react";

import citiesFile from "./data/cities.json";
import { LocalStorage } from "./data/localStorage";

const citiesList = citiesFile.city;
const storage = new LocalStorage();

export default function App() {
  const [selectedCities, setSelectedCities] = useState(
    storage.readCities() || []
  );
  const [inputText, setInputText] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);
  const [helpCitiesList, setHelpCitiesList] = useState([]);

  useEffect(() => {
    storage.writeCities([...selectedCities]);
  });

  const addButtonHandler = () => {
    if (inputText && findedCiti(inputText).includes(inputText)) {
      setSelectedCities([...selectedCities, inputText]);
      setInputText("");
      setSelectVisible(false);
    }
  };

  const inputChangeHandler = (event) => {
    const inputText = event.target.value;
    setInputText(inputText);
    if (inputText.length >= 3) {
      setSelectVisible(true);
      setHelpCitiesList(findedCiti(inputText));
    } else {
      setSelectVisible(false);
    }
  };

  const deleteButtonHandler = (event) => {
    const buttonId = +event.target.id;
    setSelectedCities(selectedCities.filter((_, index) => index !== buttonId));
  };

  const selectChangeHandler = (event) => {
    const selectedText = event.target.value;
    setInputText(selectedText);
  };

  const findedCiti = (citiName) => {
    let cities = [];
    citiesList.forEach((c) => {
      if (c.name.toLowerCase().includes(citiName.toLowerCase())) {
        cities.push(c.name);
      }
    });
    return cities;
  };

  return (
    <div className="container">
      <h1>Список городов</h1>
      <div>
        <input
          className="input"
          onChange={inputChangeHandler}
          value={inputText}
        />
        <button onClick={addButtonHandler}>Добавить</button>
      </div>
      {selectVisible ? (
        <select
          className="select"
          id="cars"
          name="cars"
          size="3"
          onChange={selectChangeHandler}
        >
          {helpCitiesList.map((c, index) => (
            <option value={c} key={index}>
              {c}
            </option>
          ))}
        </select>
      ) : null}

      <div>
        <ul>
          {selectedCities.map((c, index) => {
            return (
              <li id={index} key={index}>
                {c}
                <button
                  id={index}
                  onClick={deleteButtonHandler}
                  className="deleteButton"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
