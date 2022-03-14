import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, showActions } from '../globalState'
import MarsSound from  "../../assets/mars-sound.wav"

export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    return(
        <Html wrapperClass="annotation" >
        <div className='infoBox'>
          <div className='infoBorders'>
          <h1>{
          activeObject === 'earth' ? 'Earth' 
          : activeObject === 'moon' ? 'Moon'
          : activeObject === 'mars' ? 'Mars'
          : activeObject === 'LEO' ? 'Low Earth Orbit'
          : 'Multiplanetary map'            }
          </h1>
          
          <h5>{
            activeObject === 'earth' ? 'Our current home' 
            : activeObject === 'moon' ? "Gateway to Mars! We've already been here but we're coming again soon."
            : activeObject === 'mars' ? "The planet we're colonizing next" 
            : activeObject === 'LEO' ? "This is the place where the most of the crew missions happening."
            : 'You can either double-click the cellestial body or press one of the below buttons to discover your next destination'}
          </h5>

          {activeObject === '' ? 
          <>
            <a className='home-btn' onClick={()=>setObject('earth')}>Earth</a>
            <a className='home-btn' onClick={()=>setObject('moon')}>Moon</a>
            <a className='home-btn' onClick={()=>setObject('mars')}>Mars</a>
          </>
          : ''}
          {activeObject === 'mars' && !activeButton ? <p>Let's to listen to Martian wind captured by <em>Perseverance Rover’s SuperCam</em>.</p> 
          : activeObject === 'moon' && !activeButton ? <p>Let's listen to famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
          : activeObject === 'earth' && !activeButton ? <p>There're 7 billions of us here, and only few of us has left the ground and hanging out somewhere in <em>Low Earth Orbit (LEO)</em></p>
          : activeObject === 'LEO' && !activeButton ? <p>Let's listen to Chorus Radio Waves within Earth's Atmosphere</p>
          : ''          }
          {(activeObject === '') || (activeObject === 'earth') || (activeButton) ? '' : 
            <>
            <audio 
              controls 
              src={
                activeObject === 'mars' ? MarsSound : 
                activeObject === 'moon' ? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" :
                activeObject === 'LEO' ? 'https://www.nasa.gov/mp3/693857main_emfisis_chorus_1.mp3'  : ''}>
            </audio>
            <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p>
            </>
          }
          {activeObject === 'earth' ? <a className='home-btn' onClick={()=>setObject('LEO')}>Discover Low Earth Orbit</a>
          : ''

          }

          {activeObject === 'LEO' ? 
          <div className='viewDiv'>
            <a className='home-btn'>ISS view to the Earth</a>
            <a className='home-btn'>View from Dragon capsule</a>
            <a className='home-btn' onClick={()=>setAction('launchpad')}>Show launch sites</a>
            <a className='home-btn' onClick={()=>setAction('')}>Hide launch sites</a>
          </div> : ''}
          </div>
          <div className='addInfo'>
            {activeObject === 'earth' ? <a className='home-btn'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? <a className='home-btn' onClick={()=> setButton(!activeButton)}>Population: 12<br/><em className='credits'>Credit: NASA</em></a>
            : activeObject === 'mars' ? <a className='home-btn'>Population: 0</a>
            : ''}

            {(activeObject === 'moon') && (activeButton) ? 
            <div className='populationInfo'>
              <p>As part of the Apollo program by NASA, 24 astronauts have flown to the Moon during nine missions between December 1968 and December 1972. During six successful two-man landing missions, 12 men walked on the lunar surface.</p>
              <ul>
                <li><a className="home-btn">Apollo 11</a></li>
                <li><a className="home-btn">Apollo 12</a></li>
                <li><a className="home-btn">Apollo 14</a></li>
                <li><a className="home-btn">Apollo 15</a></li>
                <li><a className="home-btn">Apollo 16</a></li>
                <li><a className="home-btn">Apollo 17</a></li>
              </ul>
            </div> : ''}
            {activeObject === '' ? '' : 
              <a 
                className="home-btn" 
                onClick={()=>{
                  setAction('')
                  setObject('')}}
                  >Home</a>}
          </div>
        </div>
      </Html>
    )}