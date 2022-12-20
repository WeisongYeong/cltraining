import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(0);
  const [loading, setLoading] = useState(false);  // dirty bit


  const submitForm = e => {
    e.preventDefault();
    // setLoading(true);
    // console.log(loading);
    const api_key = '23afab98195ae0b0ceb09b0f03a46162';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    axios
    .get(url)
    .finally(() => {
      console.log('loading')
    })
    .then(res => {
      console.log(res);
      setTemp(res.data.main.temp);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className='page'>
      <div className='box'>
        <form onSubmit={submitForm} className='weather-form'>
          <label htmlFor='city'>City Name: </label>
          <input
          type='text'
          id='city'
          placeholder='Type a city'
          value={city}
          onChange={e => setCity(e.target.value)}
          />
          <button className='weather-button'>Get Temperature</button>
        </form>
        <div className='temp'>{temp} &#8451;</div>

      </div>
    </div>
  )
}

export default App;
