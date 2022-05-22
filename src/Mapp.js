import {useCallback, useRef, useState, useMemo, useEffect} from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import CITIES from './data/cities.json'
import { useRecoilValue, useRecoilState } from 'recoil';
import { clickedCBState, launchpads, showActions } from './components/globalState';
import Map, { Marker, Popup, NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

function Pin({size = 20}) {
  return (
    <svg height={size} width={14} viewBox="0 0 24 24" style={{ transform: 'translate(${-size / 2}px,${-size}px)', cursor:'pointer', fill:'#d00', stroke:'none'}}>
      <path d={ICON} />
    </svg>
  );
}

function ControlPanel(props) {
  const [lpKind, setLpKind] = useRecoilState(showActions)
  const [page, setPage] = useRecoilState(clickedCBState)
  const [lp, setLp] = useRecoilState(launchpads)
  const [launchMenu, setLaunchMenu] = useState()
  console.log(lpKind)
  return (
    <div className='pMapp'>
      {(lpKind==='satellitePad')? 
       <>
        {CITIES.filter(city => city.launch === 'Satellite only').map((city, index) => (
          
          <div key={`btn-${index}`} className="">
            <button
              className='mapBtn'
              onClick={() => {
                setLp(`${city.abbV}`)
                props.onSelectCity(city)}}
            >{city.shortName}</button>
          </div>
        ))}
        <button 
            className='mapBtn back' 
            onClick={()=>{
              props.onSelectCity(CITIES[0])
              setLpKind('')
              setLaunchMenu('options')}}>Back</button>
        </>
      
      :
      lpKind==='crewPad' ?
      <>
        {CITIES.filter(city => city.launch === 'Crew/Satellite').map((city, index) => (
          <div key={`btn-${index}`} className="">
            <button
              className='mapBtn'
              onClick={() => props.onSelectCity(city)}
            >{city.shortName}</button>
          </div>
        ))}
          <button 
            className='mapBtn back' 
            onClick={()=>{
              props.onSelectCity(CITIES[0])
              setLpKind('')
              setLaunchMenu('options')}}>Back</button>
      </>
       :
      <div>
        {(launchMenu==='options') && (lpKind==='') ? 
        <>
           <button className='mapBtn' onClick={()=>setLpKind('crewPad')}>Crew Launch Supported</button>
           <button className='mapBtn' onClick={()=>setLpKind('satellitePad')}>Satellite Launch Only</button>
           <button 
            className='mapBtn back' 
            onClick={()=>{
              props.onSelectCity(CITIES[0])
              setLpKind('')
              setLaunchMenu('')}}>Back</button>
        </>
        :
        <>
        <button 
          className='mapBtn' 
          onClick={()=>{
            setPage('LEO')
            setLaunchMenu('options')}}>Rocket Launch Sites</button>
         
              </>}
      </div>}
      
    </div>
  )
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJidXN3IiwiYSI6ImNsM2FrMHFyaDA2ZnIzZHJ3ZXhkbmxucWoifQ.6jUSNrLYk3IEhNTiWcNZZw'; // Set your mapbox token here

const initialViewState = {
  latitude: 25.997053,
  longitude: -97.155281,
  zoom: 1.5,
  bearing: 0,
  pitch: 0
};
console.log(CITIES)


export default function Mapp() {
  const mapRef = useRef()
  const page = useRecoilValue(clickedCBState)
  const [lp, setLp] = useRecoilState(launchpads)

  const onSelectCity = useCallback(({longitude, latitude, zoom}) => {
    mapRef.current?.flyTo({center: [longitude, latitude], zoom: zoom, duration: 8000});
  }, []);

  useEffect(()=> {
    CITIES.map(city => (
      city.abbV === lp ?  mapRef.current?.flyTo({center: [city.longitude, city.latitude], zoom: city.zoom, duration: 8000}) 
      : null
  ))
   
  }, [lp])

  const [popupInfo, setPopupInfo] = useState(null);

const pins = useMemo(
  () =>
    CITIES.map((city, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
        anchor="bottom"
        style={{width:visualViewport.zoom *5, height:visualViewport.zoom *5}}
        offsetTop={-20} 
        offsetLeft={-7} 
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(city);
        }}
      >
        <Pin />
      </Marker>
    )),
  []
);

  return (
    <div className='mapContainer' id='divMap'>
    <ControlPanel onSelectCity={onSelectCity}/>
    <Map
      ref={mapRef}
      initialViewState={initialViewState}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{width:"100vw", height:"60vh"}}
    >
       {/* <GeolocateControl position="top-left" />
       <FullscreenControl position="top-left" />
       <NavigationControl position="top-left" />
       <ScaleControl />
      {pins}
      {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>{popupInfo.state}</div>
          </Popup>
        )} */}
    
    </Map>
  </div>
  )
}