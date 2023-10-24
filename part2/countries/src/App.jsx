import { useState, useEffect } from 'react'
import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const FindCountries = ({handleCountryChange, countryInput}) => {
  return (
    <div>
      <p> Find Countries: </p>
      <input onChange={handleCountryChange} value={countryInput}/>
    </div>
  )
};

const Result = ({country}) => {
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>
        Capital: {country.capital[0]}
      </div>
      <div>
        Area: {country.area}
      </div>
      <div>
        Languages:
        <ul>
          {Object.values(country.languages).map(value => {
              return (
                <li>
                  {value}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div>
        <img src={country.flags.png}/>
      </div>
    </div>
  );
};

const Results = ({countryFilter, allCountries, setCountryFilter}) => {
  const countryMatches = allCountries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));
  if(!countryFilter) return null;
  else if(countryMatches.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(countryMatches.length == 1) {
    return (
      <Result country={countryMatches[0]}/>
    );
  }
  else {
    return (
      <ul>
        {countryMatches.map((country, index) => {
          return (
            <div>
              <li key={index}>
                {country.name.common} &nbsp;
                <button onClick={() => setCountryFilter(country.name.common)}>
                  Show
                </button>
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + '/all')
      .then(res => {
        setAllCountries(res.data)
      })
  }, []);


  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value);
    // const country = event.target.value;
    // if(country && country.length) {
    // }
  }

  return (
    <>
      <FindCountries countryInput={countryFilter} handleCountryChange={handleCountryChange} />
      <Results countryFilter={countryFilter} allCountries={allCountries} setCountryFilter={setCountryFilter}/>
    </>
  )
}

export default App
