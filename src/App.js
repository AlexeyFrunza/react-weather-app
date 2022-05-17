import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  let requestError = false;
  let errorMessage = ''

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b9c9f7c3df66bdcc6336d13c9a9215bc`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      }).catch((error) => {
        if(error.response.message !== undefined) {
          console.log(error.response.message)
          requestError = true;
          errorMessage = error.response.message
        }
      })

      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={(event) => {setLocation(event.target.value)}}
        onKeyPress={searchLocation}
        placeholder='Enter location'
        type="text" 
        />
      </div>
      <div className="container">
        <div className="top">
          {requestError !== false && 
            <div className="error">
              <h1>{errorMessage}</h1>
            </div>
          }
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.floor((data.main.temp-32)/1.8)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{Math.floor((data.main.feels_like-32)/1.8)}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{Math.floor(data.wind.speed*1.609344)} km/h</p> : null}
              <p>Wind</p>
            </div>
          </div>
          }
      </div>
    </div>
  );
}

export default App;
