import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import { Spinner } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')





  const success = position => {
    console.log(position)
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude

    }
    setCoords(obj)

  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])//no olvidar poner el array vacio

  console.log(coords);

  useEffect(() => {
    if (coords) {
      const APIKEY = '366b8865a7c2be2d68b1870bd3464930'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&q=${inputValue}&appid=${APIKEY}`

      axios.get(url)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1) // toFixed es para poner decimales.
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(1)// en este caso res.data es equivalente o igual a weather entonces en ves de poner weather como hacemos en la WeatherCard ponemos res.data
          setTemp({ celsius, fahrenheit })
          setWeather(res.data)
        })//data me tranforma a JSON
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))

    }
  }, [coords, inputValue ])// dependo del coords si llega o no 

  const inputCity = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    setInputValue(inputCity.current.value.toLowerCase().trim())
  }




  console.log(weather);
  if (isLoading) {
    return (<div className='loader'>
      <Spinner color='primary'  />  
    </div> )
      
  } else {
    return (
      <div className='app'>

        <form onSubmit={handleSubmit} className='app__form'>
          <input type="text" ref={inputCity} placeholder='Search City' className='app__input'/>
          <button className='app__btn'><i className='bx bx-search'></i></button>
        </form>

        <WeatherCard
          weather={weather}
          temp={temp}

        />

      </div>
    )
  }
}

export default App


        







