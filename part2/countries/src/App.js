import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [matchingCountries, setMatchingCountries] = useState([]);

  const handleChange = (event) => {
    setCountry(event.target.value);

    setMatchingCountries(
      countries.filter((c) =>
        c['name'].toLowerCase().startsWith(country.toLowerCase())
      )
    );
    console.log(matchingCountries);
  };

  useEffect(() => {
    console.log('useEffected!');
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <Filter
        country={country}
        handleChange={handleChange}
        matchingCountries={matchingCountries}
      />
    </>
  );
}

export default App;
