import React from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import '../styles/headerContainer.css';


const libraries = ['places'];
const mapContainerStyle = {
  width: '525px',
  height: '300px',
  display: 'flex',
  border: '5px solid #1d1d1d',
  borderRadius: '10px'
};

const GoogleMapContainer = ({mapSearchInput, windowInfo, center, addToFavorites, favorites}) => {

  const [marker, setMarker] = useState({lat: 0, lng: 0});
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const OnMapClick = (e) => {
    setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
    mapSearchInput({lat: e.latLng.lat(), lng: e.latLng.lng()});
    setInfoWindowOpen(true);
  };

  const OnMapLoaded = () => {
    setMapLoaded(true);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) =>{
        const newUserPos = { 
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
         };
        setMarker(newUserPos);
        mapSearchInput(newUserPos);
   }, (err) => {
        console.log(err);
   });
  }, [])

  useEffect(() => {
    setMarker(center);
    console.log(windowInfo.name);
  }, [center])

  useEffect(() => {
    setInfoWindowOpen(true);
  }, [mapLoaded])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  let favoriteContainer;
  if (!favorites.some(item => `${windowInfo.name}, ${windowInfo.region}, ${windowInfo.country}` === item 
  || `${windowInfo.name}, ${windowInfo.region}, ${windowInfo.country}` === item.replace(/[åä]/g,'a').replace(/[ö]/g, 'o').replace(/[ÅÄ]/g, 'A').replace(/Ö/g, 'Ö'))) {
    favoriteContainer =
      <svg onClick={addToFavorites} xmlns="http://www.w3.org/2000/svg" className="heartIcon" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
  }

  return (
    <div className='mapContainer'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={marker}
        onClick={OnMapClick}
        onIdle={OnMapLoaded}
      >

        <MarkerF position={marker}>
        {infoWindowOpen && mapLoaded && (
            <InfoWindowF onCloseClick={() => setInfoWindowOpen(false)}>
              <div className='mapsWindow'>
                {favoriteContainer}
                <h4>{windowInfo.name}</h4>
                <p>{windowInfo.region}</p>
                <p>{windowInfo.country}</p>
                </div>
            </InfoWindowF>
          )}
        </MarkerF>
      </GoogleMap>
    </div>
  );
};

export default GoogleMapContainer;