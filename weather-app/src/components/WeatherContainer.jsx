import { useState, useEffect } from 'react';
import { GetWeatherForecast } from '../logic/searchService.js';
import { Header } from './Header.jsx';
import { SearchBar } from './SearchBar.jsx';
import { WeatherList } from './WeatherList';
import { FavoritesList } from './FavoritesList.jsx';
import GoogleMapContainer from './GoogleMapContainer.jsx';
import '../styles/headerContainer.css';
import '../styles/contentContainer.css';

const WeatherContainer = () => {

    const [data, setData] = useState({});
    const [days, setDays] = useState({value : 1});
    const [listWeather, setListWeather] = useState({active: false});
    const [searchInput, setSearchInput] = useState({name: '', region: '', country: ''});
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [favorites, setFavorites] = useState([]);
    const [favoriteActive, setFavoriteActive] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem("favorites");
        if (data !== null) {
            setFavorites(JSON.parse(data));
        }
        console.log(favorites);
      }, []);
      
      useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
              );
        }
        console.log(favorites);
      }, [favorites]);

    const UpdateInputFromMap = (e) => {
        GetWeatherForecast(`${e.lat},${e.lng}`).then(response => {
            setData(response);
            setSearchInput({name: response.location.name, region: response.location.region, country: response.location.country}); 
        });
    }

    const GetData = (input) => {
        console.log(input);
        GetWeatherForecast(input).then(response => {
            setData(response);
            setCoordinates({lat: response.location.lat, lng: response.location.lon});
            let respName = response.location.name.replace(/[åä]/g,'a').replace(/[ö]/g, 'o').replace(/[ÅÄ]/g, 'A').replace(/Ö/g, 'Ö')
            let respRegion = response.location.region.replace(/[åä]/g,'a').replace(/[ö]/g, 'o').replace(/[ÅÄ]/g, 'A').replace(/Ö/g, 'Ö')
            let respCountry = response.location.country.replace(/[åä]/g,'a').replace(/[ö]/g, 'o').replace(/[ÅÄ]/g, 'A').replace(/Ö/g, 'Ö')
            setSearchInput({name: respName, region: respRegion, country: respCountry});
        });
    }

    const ShowListWeather = () => {
        if (days.value == 5) {
            setDays({value: 1})
            setListWeather({active : false});
        }
        else {
            setDays({value: 5});
            setListWeather({active : true});
        }
    }

    const SaveLocation = () => {
        console.log(favorites);
        if (!favorites.some(item => `${searchInput.name}, ${searchInput.region}, ${searchInput.country}` === item )) {
            setFavorites(prev => [...prev, `${searchInput.name}, ${searchInput.region}, ${searchInput.country}`]);
        }
    }

    const ShowFavorites = () => {
        if (favoriteActive) {
            setFavoriteActive(false);
        }
        else {
            setFavoriteActive(true);
        }
        
    }

    return(
        <>
        <div className="headerContainer">
            <Header />
            <SearchBar searchButtonClick={GetData} searchInput={searchInput} />
            <GoogleMapContainer mapSearchInput={UpdateInputFromMap} center={coordinates} windowInfo={searchInput} addToFavorites={SaveLocation} favorites={favorites}/>
        </div>
        <div className="contentContainer">
            <WeatherList 
                data={data} 
                numberOfDays={days} 
                listWeather={listWeather} 
                weatherListButton={ShowListWeather} 
            />
        </div>
        <div className='favoritesHeartContainer'>
            <svg onClick={ShowFavorites} xmlns="http://www.w3.org/2000/svg" className="heartIcon" width="33" height="33" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.907 6.12" />
                <path d="M19 16v6" />
                <path d="M22 19l-3 3l-3 -3" />
            </svg>
        </div>

        <FavoritesList favorites={favorites} active={favoriteActive} favoriteClick={GetData} />
        </>
    )
}

export default WeatherContainer;