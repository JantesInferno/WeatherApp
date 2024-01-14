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

const GoogleMapContainer = ({mapSearchInput, windowInfo, center}) => {

  const [marker, setMarker] = useState({lat: 0, lng: 0});
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const OnMapClick = (e) => {
    setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
    mapSearchInput({lat: e.latLng.lat(), lng: e.latLng.lng()});
    setInfoWindowOpen(true);
  };

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
  }, [center])


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

  return (
    <div className='mapContainer'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={marker}
        onClick={OnMapClick}
      >
        <MarkerF position={marker}>
        {infoWindowOpen && (
            <InfoWindowF onCloseClick={() => setInfoWindowOpen(false)}>
              <div className='mapsWindow'>
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