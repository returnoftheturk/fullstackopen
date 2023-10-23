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

const Results = ({countryFilter, allCountries}) => {
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
      <div>
        <h1>
          {countryMatches[0].name.common}
        </h1>
        <div>
          Capital: {countryMatches[0].capital[0]}
        </div>
        <div>
          Area: {countryMatches[0].area}
        </div>
        <div>
          Languages:
          <ul>
            {Object.values(countryMatches[0].languages).map(value => {
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
          <img src={countryMatches[0].flags.png}/>
        </div>
      </div>
    );
  }
  else {
    return (
      <ul>
        {countryMatches.map((country, index) => {
          return <li key={index}>{country.name.common}</li>
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
      <Results countryFilter={countryFilter} allCountries={allCountries}/>
    </>
  )
}

export default App
