import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import CurrentComp from './Components/CurrentComp';
import ForecastComp from './Components/ForecastComp';
import '../node_modules/bootstrap/dist/js/bootstrap';
import weatherLogo from './assets/weatherLogo.png';

function App() {
  const [city, setCity] = useState('');
  const [storeCitySuggestion, setStoreCitySuggestion] = useState([]);
  const [clickedCity, setClickedCity] = useState();
  const [current, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState();

  // city Suggestion URL
  const autoCompleteURL = 'https://api.weatherapi.com/v1/search.json?key=b7446ede8c8f4fe39fe125812241510&q=';

  // current & forecast URL
  const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=b7446ede8c8f4fe39fe125812241510&q=${city}&days=3&aqi=no&alerts=no`;
  // take action on change in input box
  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompApi();
    }
  }, [city]);
  // fetch city Suggestion URL
  const fetchAutoCompApi = async () => {
    try {
      const response = await axios.get(autoCompleteURL + city);
      const resData = await response.data;
      console.log(resData);
      const citySuggestion = resData.map((data) => {
        return `${data.name},${data.region},${data.country}`;

      })
      setStoreCitySuggestion(citySuggestion);
    }
    // handle an error when Api wrong or server down
    catch (e) {
      console.log('error', e)
    }
  }
  // call weather Api when click the city suggestion
  const handleSelectedCity = (city) => {
    console.log('selected city', city);
    setClickedCity(city);
    fetchWeatherApi(city);
    // empty the city suggestion
    setStoreCitySuggestion([]);

  }
  // fetch weather Api
  const fetchWeatherApi = async (city) => {
    try {
      const response = await axios.get(weatherURL(city));
      const resData = await response.data;
      setCurrentWeather(resData.current);
      setForecast(resData.forecast);
      setLocation(resData.location);
      console.log('current-->', resData.current);
      console.log('forecast-->', resData.forecast);
      console.log('location-->', resData.location);
    }
    // handle an error when Api wrong or server down
    catch (e) {
      console.log('weather Api error-->', e);
    }

  }

  return (
    <div className='Container'>
      {/* navbar */}
      <nav className="navbar bg-dark">
        <div className="container-fluid d-flex justify-content-start">
          {/* navbar logo */}
          <img src={weatherLogo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
          {/* navbar-App name */}
          <h2 className='appName text-light ms-2'>Forecasta</h2>
        </div>
      </nav>
      {/* container */}
      <div className='container mt-5 p-4 rounded' style={{ background: 'linear-gradient(to right,#032b44,#4682b4)' }}>
        {/* title */}
        <h2 className='title text-center text-light mb-3'>Track Weather</h2>
        {/* search bar */}
        <div className='search-bar'>
          {/* Event handling & empty the city suggestion and content */}
          <input className="form-control text-center" type="search" value={clickedCity} placeholder="Type to Search City.." aria-label="Search" onChange={(e) => {
            setCity(e.target.value);
            setStoreCitySuggestion();
            setClickedCity()
            setCurrentWeather();
            setForecast();
            setLocation();

          }} />
        </div>
        {/* map the function to storeCitySuggestion array */}
        {storeCitySuggestion && storeCitySuggestion.map((data, index) => {
          return (data && <div key={index} className='container d-flex justify-content-center text-light
           bg-light bg-opacity-10 border border-info border-opacity-10 rounded' style={{ cursor: 'pointer' }} onClick={() => { handleSelectedCity(data) }}>
            {/* display the city suggestion */}
            <h6>{data}</h6>
          </div>
          )
        })}
        {/* passing state to current component using props */}
        {current && <CurrentComp current={current} location={location} />}
        {/* passing state to forecast component using props */}
        {forecast && <ForecastComp forecast={forecast} location={location} />}
      </div>
    </div>
  );
}

export default App;
