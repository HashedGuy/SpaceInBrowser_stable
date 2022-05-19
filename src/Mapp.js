import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useCallback, useState, useMemo, useEffect, useRef} from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import launchSitesData from './data/launchSites'
import CITIES from './data/cities.json'
import Flag from 'react-world-flags'
import { useRecoilValue } from 'recoil';
import { clickedCBState, launchpads, showActions } from './components/globalState';
import Map from 'react-map-gl';

function ControlPanel(props) {
  const lpKind = useRecoilValue(showActions)
  console.log(lpKind)
  return (
    <div className='pMapp'>
      {lpKind==='satellitePad' ? 

        CITIES.filter(city => city.launch === 'Satellite only').map((city, index) => (
          <div key={`btn-${index}`} className="">
            <button
              className='mapBtn'
              onClick={() => props.onSelectCity(city)}
            >{city.shortName}</button>
          </div>
        ))
      :
        CITIES.filter(city => city.launch === 'Crew/Satellite').map((city, index) => (
          <div key={`btn-${index}`} className="">
            <button
              className='mapBtn'
              onClick={() => props.onSelectCity(city)}
            >{city.shortName}</button>
          </div>
        ))
      }
      
    </div>
  )
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJidXN3IiwiYSI6ImNsM2FrMHFyaDA2ZnIzZHJ3ZXhkbmxucWoifQ.6jUSNrLYk3IEhNTiWcNZZw'; // Set your mapbox token here

const initialViewState = {
  latitude: 25.997053,
  longitude: -97.155281,
  zoom: 16,
  bearing: 0,
  pitch: 0
};


export default function Mapp() {
  const mapRef = useRef()

  const onSelectCity = useCallback(({longitude, latitude}) => {
    mapRef.current?.flyTo({center: [longitude, latitude], duration: 8000});
  }, []);

  return (
    <div className='mapContainer' id='divMap'>
    <ControlPanel onSelectCity={onSelectCity} />
    <Map
      ref={mapRef}
      initialViewState={initialViewState}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{width:"100vw", height:"40vh"}}
    />
   
  </div>
  )
}