import { useState } from "react";
import {GetWeatherForecast} from '../logic/searchService.js';
import {Header} from './Header.jsx';
import {SearchBar} from './SearchBar.jsx';
import {WeatherList} from './WeatherList';
import GoogleMapContainer from "./GoogleMapContainer.jsx";
import '../styles/headerContainer.css';
import '../styles/contentContainer.css';

const WeatherContainer = () => {

    const [data, setData] = useState({});
    const [days, setDays] = useState({value : 1});
    const [detailedWeather, setDetailedWeather] = useState({active : false});
    const [searchInput, setSearchInput] = useState({name: '', region: '', country: ''});
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});

    const UpdateInputFromMap = (e) => {
        GetWeatherForecast(`${e.lat},${e.lng}`).then(response => {
            setData(response);
            setSearchInput({name: response.location.name, region: response.location.region, country: response.location.country}); 
        });
    }

    const GetData = (input) => {
        GetWeatherForecast(input).then(response => {
            setData(response);
            setCoordinates({lat: response.location.lat, lng: response.location.lon});
        });
    }

    const ShowDetailedWeather = () => {
        if (days.value == 5) {
            setDays({value: 1})
            setDetailedWeather({active : false});
        }
        else {
            setDays({value: 5});
            setDetailedWeather({active : true});
        }
    }

    return(
        <>
        <div className="headerContainer">
            <Header />
            <SearchBar searchButtonClick={GetData} searchInput={searchInput} />
            <GoogleMapContainer mapSearchPlaceholder={UpdateInputFromMap} center={coordinates} windowInfo={searchInput}/>
        </div>
        <div className="contentContainer">
            <WeatherList data={data} numberOfDays={days} detailedWeather={detailedWeather} weatherButton={ShowDetailedWeather}/>
        </div>
        </>
    )
}

export default WeatherContainer;