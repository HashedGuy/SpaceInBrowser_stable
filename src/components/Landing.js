import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState } from './globalState'
import MarsSound from  "../assets/mars-sound.wav"
import axios from 'axios'

export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    // const [date, setData] = useState()
    // useEffect(() => {
    //   const fetchData = async () => {
    //     const result = await axios(
    //       'https://www.worldpop.org/rest/data',
    //     );
    //     console.log(result)
    //     setData(result.data);
    //   };
  
    //   fetchData();
    // }, []);
    return(
        <Html wrapperClass="annotation" >
        <div className='infoBox'>
          <div>
          <h1>{
          activeObject === 'earth' ? 'Earth' 
          : activeObject === 'moon' ? 'Moon'
          : activeObject === 'mars' ? 'Mars'
          : 'Multiplanetary map'            }
          </h1>
          
          <h4>{
            activeObject === 'earth' ? 'Our current home' 
            : activeObject === 'moon' ? "Gateway to Mars! We've already been here but we're coming again soon."
            : activeObject === 'mars' ? "The planet we're colonizing next" 
            : 'Double-click to discover your next destination'}
          </h4>
          {activeObject === 'mars' ? <p>Let's to listen to Martian wind captured by <em>Perseverance Rover’s SuperCam</em>.</p> 
          : activeObject === 'moon' ? <p>Let's listen to famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
          : activeObject === 'earth' ?<p>There're 7 billions of us here, and only few of us has left the ground and hanging out somewhere in <em>Low Earth Orbit (LEO)</em></p>
          : ''          }
          {(activeObject === '') || (activeObject === 'earth') ? '' : 
            <audio 
              controls 
              src={
                activeObject === 'mars' ? MarsSound : 
                activeObject === 'moon' ? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" : ''}>
            </audio>
          }
          {activeObject === 'earth' ? <a className='home-btn' onClick={()=>setObject('LEO')}>Discover Low Earth Orbit</a>
          : ''

          }
          </div>
          <div className='addInfo'>
            {activeObject === 'earth' ? <a className='home-btn'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? <a className='home-btn'>Population: 12<br/><em className='credits'>Credits: NASA</em></a>
            : activeObject === 'mars' ? <a className='home-btn'>Population: 0</a>
            : ''}
            <a className="home-btn" onClick={()=>setObject('')}>Home</a>
          </div>
        </div>
      </Html>
    )}