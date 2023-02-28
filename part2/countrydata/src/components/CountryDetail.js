import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country, weather }) => {
  return (
    <div>
      <h3>Weather in {country.name.common}</h3>
      {weather && (
        <>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={`${weather.weather[0].icon}'s icon`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

const Info = ({ country }) => {
  return (
    <>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      </div>
    </>
  );
};

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <Info country={country} />
      {Object.keys(weather).length > 0 && (
        <Weather country={country} weather={weather} />
      )}
    </div>
  );
};

export default CountryDetail;
