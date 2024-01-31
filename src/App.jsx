import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'

function App() {
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, isLoading] = useState(false);


  const handleSubmit = () => {
    setIsSubmit(true);
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const fetchWeather = async (searchText) => {
    try {
      isLoading(true);
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=2f5c79b01d644ca291d10613243101&q=${searchText}`)
      setData(response.data);
      isLoading(false)
    } catch (error) {
      alert("Failed to fetch weather data");
    }
  }
  useEffect(() => {
    if(isSubmit == true ){
    fetchWeather(searchText);
    setIsSubmit(false);
    // console.log("data fetched")
    }
  },[isSubmit])

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} value={searchText} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {data ? 
          <div className="weather-cards">
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{data.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{data.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{data.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{data.current.wind_kph} kph</p>
            </div>
          </div> : loading ? 
                <p>Loading data...</p>: ""}
    </>
  )
}

export default App
