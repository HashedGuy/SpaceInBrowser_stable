import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {useCallback, useState, useMemo, useEffect} from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import launchSitesData from './data/launchSites'
import Flag from 'react-world-flags'
import { useRecoilValue } from 'recoil';
import { clickedCBState, launchpads } from './components/globalState';

let center = [25.9875, 17.186389]
const zoom = 2

function DisplayPosition({ map }) {
    const [actInd, setActInd] = useState()
    const [position, setPosition] = useState(() => map.getCenter())
    const launchpad = useRecoilValue(launchpads)

launchSitesData.map(ls=>{
    if (launchpad===ls.abbV) { 
    map.setView([ls.gps.lat, ls.gps.lng], 13)
  }})

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  const responsive = {
    0: { items: 4 },
    568: { items: 8 },
    1024: { items: 12 },
};

const items = [
    launchSitesData.map(ls=>(
        <button 
            key={ls.id}
            className={actInd===ls.id ? "home-btn item selectedSite" : "home-btn item"} 
            data-value={ls.id.toString()} 
            onClick={()=> {
                    map.setView([ls.gps.lat, ls.gps.lng], 13)
                    setActInd(ls.id)
            }}>
            {ls.shortName}</button> 
    ))
];
  return (
    <p className='pMapp'>
          <AliceCarousel
            mouseTracking
            touchTracking
            items={items[0]}
            responsive={responsive}
            controlsStrategy="responsive"
            keyboardNavigation
            activeIndex={actInd}
        />
    </p>
  )
}


export default function Mapp() {
  const [map, setMap] = useState(null)
  const activeObject = useRecoilValue(clickedCBState)
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{"height":"50vh"}}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        />
        {launchSitesData.map(launchSite=> (
           
             <Marker 
                key={launchSite.id}
                position={[launchSite.gps.lat, launchSite.gps.lng]}>
                    <Popup>
                        <span className='launchpadPopName'>{launchSite.fullName}</span><br/><br/>
                        <Flag height={20} className='popFlag' code={ launchSite.country }/><br/>
                        Functionality: {launchSite.launch}<br/>
                        Status: {launchSite.status} {launchSite.status==='Active' ? '🟢' : '🟠'}
                    </Popup>
           
             </Marker>
        ))}
      </MapContainer>
    ),
    [],
  )

  return (
    <div 
       className= {activeObject==='LEO'? 'divMap' : 'noMap'} 
        id='divMap'>
      {map ? <DisplayPosition map={map}/> : null}
      {displayMap}
    </div>
  )
}