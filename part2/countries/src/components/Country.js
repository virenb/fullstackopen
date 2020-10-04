import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [hasWeather, setHasWeather] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
        setHasWeather(true);
      });
  }, []);

  return (
    <>
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.iso639_1}>{lang.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          width='100'
          height='75'
        />
        <div>
          <h2>Weather in {country.capital}</h2>
          {hasWeather ? (
            <div>
              <div>temperature {weather.current.temperature} Celsius</div>
              <img
                src={weather.current.weather_icons[0]}
                alt='hi'
                width='100'
                height='75'
              />
              <div>
                wind: {weather.current.wind_speed} mph{' '}
                {weather.current.wind_dir}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Country;
