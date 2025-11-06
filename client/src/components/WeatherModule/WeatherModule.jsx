import { useState } from "react"
import axios from "axios"

function WeatherModule(){
    const fetchWeather = () => {
        const [weather, setWeather] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const fetchLocation = async(pos) => {
            try{
                const {latitude, longitude} = pos.coords;
                const res = await axios.post("/api/weather", {
                    lat: latitude,
                    lon: longitude
                })
                setWeather(res.data);
            }
            catch(err){
                setError("Failed to Fetch Weather Data");
            }
        }

        if (!navigator.geolocation){
            setError("Couldn't Retrieve Geolocation");
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(fetchLocation, (err) => {
            setError(err.message);
        })
        setLoading(false);
    }

    return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">Weather Info</h2>
      <button
        onClick={fetchWeather}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-all"
      >
        Get Current Weather
      </button>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {weather && (
        <div className="mt-4 text-lg">
          <p>🌤️ Condition: {weather.weather}</p>
          <p>📝 Description: {weather.description}</p>
          <p>🌡️ Temp: {(weather.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
    </div>
    )
}

export default WeatherModule