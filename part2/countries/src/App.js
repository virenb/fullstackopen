import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Country from './components/Country';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
    setFilteredCountries(
      countries.filter((c) =>
        c.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleCountryClick = (event) => {
    setCountryFilter(event.target.id.toLowerCase());
    setFilteredCountries(
      countries.filter((c) =>
        c.name.toLowerCase().includes(event.target.id.toLowerCase())
      )
    );
  };

  const renderCountries = () => {
    if (countryFilter.length >= 1 && filteredCountries.length > 10) {
      return <div>Too many countries</div>;
    } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      return (
        <Countries
          countries={filteredCountries}
          handleCountryClick={handleCountryClick}
        />
      );
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <Filter
        countryFilter={countryFilter}
        handleFilterChange={handleFilterChange}
      />
      <div>{renderCountries()}</div>
    </>
  );
}

export default App;
