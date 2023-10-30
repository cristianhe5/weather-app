import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords,setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  

  const success = position =>{
    console.log(position)
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude

    }
    setCoords(obj)

  }

  useEffect(()=>{
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  },[])//no olvidar poner el array vacio

  console.log(coords);
  
  useEffect(() => {
    if(coords){
      const APIKEY = '366b8865a7c2be2d68b1870bd3464930'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`

      axios.get(url)
      .then(res => {
        const celsius = (res.data.main.temp -273.15).toFixed(1) // toFixed es para poner decimales.
        const fahrenheit = (celsius * 9/5 + 32).toFixed(1)// en este caso res.data es equivalente o igual a weather entonces en ves de poner weather como hacemos en la WeatherCard ponemos res.data
        setTemp({celsius, fahrenheit})
        setWeather(res.data)
      })//data me tranforma a JSON
      .catch(err=>console.log(err))
      .finally(()=>setIsLoading(false))

    }
  }, [coords])// dependo del coords si llega o no 

  
  

  return (
    <div className='app'>
      
      {
        isLoading ? <h2 className='app__loader'>Loading...</h2> 
        :(

          <WeatherCard      
        weather={weather}
        temp = {temp}
         />
        ) 

       }
    </div>
  )
}

export default App

