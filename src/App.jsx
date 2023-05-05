import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherInfo from "./components/WeatherInfo";

// Rutas de imágenes
const IMAGE_PATHS = {
  Clouds: "img/nublado.png",
  Clear: "img/sun.png",
  Rain: "img/lluvia.png",
  Drizzle: "img/llovizna.png",
  Mist: "img/niebla.png",
  Default: "img/nublado.png",
};

// URL de la API
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&appid=9b8d90a3a454dc9316aff890256229fa";

function App() {
  const [data, setData] = useState({});
  const [cityName, setCityName] = useState("Cusco");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather(cityName);
  }, []);

  const fetchWeather = async (city) => {
    const apiUrl = `${API_URL}&q=${city}`;

    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      const { main, weather, name, wind } = weatherData;

      const imagePath = IMAGE_PATHS[weather[0].main] || IMAGE_PATHS.Default;

      setData({
        celcius: Math.round(main.temp),
        description: weather[0].description,
        name,
        humidity: main.humidity,
        speed: wind.speed,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        image: imagePath,
      });

      setError("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("*Nombre de ciudad inválido*");
      } else {
        setError("");
      }
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchWeather(cityName);
  };

  return (
    <div className="flex justify-center items-start py-10 min-h-screen bg-[#141414] font-popins">
      <div className="flex flex-col justify-center place-content-center text-center w-screen sm:w-96 p-4 sm:p-8 rounded-md bg-sky-900 shadow shadow-white">
        <div className="flex gap-4 place-content-center">
          <input
            type="text"
            className="rounded-full px-3 py-2 outline-none w-52 sm:w-full"
            placeholder="Ingrese su ciudad..."
            // value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button className="bg-white rounded-full p-3">
            <img
              className="w-5 h-5"
              src="img/lupa.png"
              alt="Icono de lupa"
              onClick={handleSearch}
            />
          </button>
        </div>

        <div className="text-red-500 flex pt-2 pl-3">
          <p className="text-xs">{error}</p>
        </div>

        <div className="flex flex-col place-items-center py-10 text-3xl text-white font-semibold gap-1">
          <img src={data.image} className=" w-44 h-44 mb-5" alt="" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2 className="capitalize">{data.description}</h2>
          <h3>{data.name}</h3>

          <div className="grid grid-cols-2 items-center place-content-center justify-between gap-5 py-5">
            <WeatherInfo
              icon={"img/baja-temperatura.png"}
              value={`${Math.round(data.tempMin)}°C`}
              label={"Temp. Mínima"}
            />

            <WeatherInfo
              icon="img/alta-temperatura.png"
              value={`${Math.round(data.tempMax)}°C`}
              label="Temp. Máxima"
            />
            <WeatherInfo
              icon="img/humedad.png"
              value={`${Math.round(data.humidity)}%`}
              label="Humedad"
            />
            <WeatherInfo
              icon="img/viento.png"
              value={`${Math.round(data.speed)} km/h`}
              label="Viento"
            />
          </div>
        </div>
        <footer className="flex place-content-center text-sky-200 text-sm italic">
        Creado por Bagse
      </footer>
      </div>
    </div>
  );
}

export default App;
