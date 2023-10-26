import { useState, useEffect } from 'react'
import axios from 'axios'

const ToMany = () => (
  <div>
    Too many matches, specify another filter
  </div>
)

const NoSearch = () => (
  <div>
    No Search Result
  </div>
)

const MatchCountries = ({handleClickShow, countries}) => (
  <div>
    {countries.map(country => (
      <div key={country.name.common}>
          {country.name.common} 
        <button value={country.name.common} onClick={handleClickShow}>show</button>
      </div>
    ))}
  </div>
)

const CountryDetail = ({country}) => {
  useEffect(() => {
    let date = new Date()
    axios
      .get( `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&date=${date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        // console.log(response);
        country.temp = response.data.current.temp
        country.weather = response.data.current.weather.main
        country.windSpeed = response.data.current.wind_speed
      })
  }, [])
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>captial {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <h3>Weather in {country.capital[0]}</h3>
      <div>temperature {country.temp} Celcius</div>
      <div>weather {country.weather}</div>
      <div>wind {country.windSpeed} m/s</div>
    </div>
  )
}

const SearchContent = ({searchName, selectCountry, handleClickShow, countries}) => {
  if (countries.length === 0) {
    return <div />
  }
  if (Object.keys(selectCountry).length !== 0) {
    // console.log(selectCountry);
    return <CountryDetail country={selectCountry} />
  }
  // console.log(searchName, countries);
  const finds = countries.filter(country => country.name.common.toUpperCase().includes(searchName.toUpperCase()))
  // console.log(finds);
  if (finds.length > 10 ) {
    return <ToMany />
  }
  if (finds.length === 0 ) {
    return <NoSearch />
  }
  if (finds.length === 1) {
    return <CountryDetail country={finds[0]} />
  }
  return <MatchCountries handleClickShow={handleClickShow} countries={finds} />

}
const App = () => {
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  const [searchName, setSeachName] = useState('')
  const [countries, setCountries] = useState([])
  const [selectCountry, setSelectCountry] = useState({})

  const handleSearchName = (event) => {
    setSeachName(event.target.value)
    setSelectCountry({})
  }

  const handleClickShow = (event) => {
    // console.log(event.target.value);
    const showCountry = countries.find(country => country.name.common === event.target.value)
    setSelectCountry(showCountry)
  }

  return (
    <div>
      <div>
        find countries<input value={searchName} onChange={handleSearchName}/>
      </div>
      <div>
        <SearchContent searchName={searchName} selectCountry={selectCountry} handleClickShow={handleClickShow} countries={countries}/>
      </div>
    </div>
  )
}

export default App