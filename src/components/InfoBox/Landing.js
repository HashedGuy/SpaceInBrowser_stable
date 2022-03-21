import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, showActions } from '../globalState'
import MarsSound from  "../../assets/mars-sound.wav"
import {Howl} from "howler"

export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    const [disabledSpan, setSpan] = useState(true)
    const [activeAudioPlayer, setAudioPlayer] = useState('')

    const MarsSound2 = "https://www.nasa.gov/mp3/640165main_Lookin%20At%20It.mp3"

    const soundPlay = (src) => {
      const sound = new Howl({
        src: activeObject === '' ? "https://www.nasa.gov/mp3/640165main_Lookin%20At%20It.mp3" : "https://www.nasa.gov/mp3/574928main_houston_problem.mp3",
        autoplay:true,
        html5:true,
        onend:()=>setAudioPlayer('')
      })
      sound.play()
    }
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
            : ''}
          </h5>

          {activeObject === '' ? 
          <>
          
          </>
          : ''}
          {activeObject === 'earth' ? <a className='home-btn' onClick={()=>setObject('LEO')}>Discover Low Earth Orbit</a>
          : ''

          }

          {activeObject === 'LEO' ? 
          <div className='viewDiv'>
            <a className='home-btn inActive'>ISS view to the Earth</a>
            <a className='home-btn inActive'>View from Dragon capsule</a>
            <a className='home-btn' onClick={()=>setAction('launchpad')}>Show launch sites</a>
            <a className='home-btn' onClick={()=>setAction('')}>Hide launch sites</a>
          </div> : ''}
          </div>
          <div className='addInfo'>
            {activeObject === 'earth' ? <a className='home-btn'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? 
              <a className={showAction===''?"home-btn inActive" : "hidden-btn"} onClick={()=> setButton(!activeButton)}>
                  Population: 0 (12)
                  <br/>
                  <em className='credits'>Credit: NASA</em>
                  {/* <span style={{"color":'white;', "marginLeft": '3em'}}>&#9651;</span> */}
              </a>
            : activeObject === 'mars' ? <a className='home-btn'>Population: 0</a>
            : ''}

            
            <div className='populationInfo'>
            {(activeObject === 'moon') ? 
            <>
              {showAction === '' ? 
              <p>There's nobody currently living on the Moon but...as part of the Apollo program by NASA, 24 astronauts have flown to the Moon during nine missions between December 1968 and December 1972. During six successful two-man landing missions, 12 men walked on the lunar surface.</p>
              :''}
              <ul>
                <li><a className={showAction==='apollo11'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo11')}>Apollo 11</a></li>
                <li><a className={showAction==='apollo12'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo12')}>Apollo 12</a></li>
                <li><a className={showAction==='apollo14'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo14')}>Apollo 14</a></li>
                <li><a className={showAction==='apollo15'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo15')}>Apollo 15</a></li>
                <li><a className={showAction==='apollo16'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo16')}>Apollo 16</a></li>
                <li><a className={showAction==='apollo17'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo17')}>Apollo 17</a></li>
                <li><a className={showAction==='artemis'? "home-btn btn-selected inActive": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('artemis')}>Artemis III</a></li>
              </ul>

              {showAction === 'apollo11' ? 
                <>
                <p>Apollo 11 (July 16–24, 1969) was the American spaceflight that first landed humans on the Moon. </p> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg" className='infoPic'/>
                <p>Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC, and Armstrong became the first person to step onto the Moon's surface six hours and 39 minutes later, on July 21 at 02:56 UTC. Aldrin joined him 19 minutes later, and they spent about two and a quarter hours together exploring the site they had named Tranquility Base upon landing.</p>
                
                </>
              : showAction === 'apollo12' ? 
                <>
                  <p>Apollo 12 (November 14 – 24, 1969) was the sixth crewed flight in the United States Apollo program and the second to land on the Moon.</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Surveyor_3-Apollo_12.jpg/1920px-Surveyor_3-Apollo_12.jpg" className='infoPic'/>
                  <p>It was launched on November 14, 1969, from the Kennedy Space Center, Florida. Commander Charles "Pete" Conrad and Lunar Module Pilot Alan L. Bean performed just over one day and seven hours of lunar surface activity while Command Module Pilot Richard F. Gordon remained in lunar orbit.</p>
                </>
              : showAction === 'apollo14' ? 
              <>
                <p>Apollo 14 (January 31, 1971 – February 9, 1971) was the eighth crewed mission in the United States Apollo program, the third to land on the Moon, and the first to land in the lunar highlands. </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Apollo_14_Shepard.jpg/1920px-Apollo_14_Shepard.jpg" className='infoPic'/>
                <p>It was the last of the "H missions", landings at specific sites of scientific interest on the Moon for two-day stays with two lunar extravehicular activities (EVAs or moonwalks).</p>
              </>
              : showAction === 'apollo15' ? 
              <>
                <p>Apollo 15 (July 26 – August 7, 1971) was the ninth crewed mission in the United States' Apollo program and the fourth to land on the Moon. </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/AS15-88-11866_-_Apollo_15_flag%2C_rover%2C_LM%2C_Irwin_-_restoration1.jpg" className='infoPic'/>
                <p> It was the first J mission, with a longer stay on the Moon and a greater focus on science than earlier landings. Apollo 15 saw the first use of the Lunar Roving Vehicle.</p>
                
              </>
              : showAction === 'apollo16' ? 
              <>
                <p>Apollo 16 (April 16 – 27, 1972) was the tenth crewed mission in the United States Apollo space program, administered by NASA, and the fifth and next-to-last to land on the Moon.</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/John_W._Young_on_the_Moon.jpg/1920px-John_W._Young_on_the_Moon.jpg" className="infoPic"/>  
                <p>It was the second of Apollo's "J missions", with an extended stay on the lunar surface, a focus on science, and the use of the Lunar Roving Vehicle (LRV). The landing and exploration were in the Descartes Highlands, a site chosen because some scientists expected it to be an area formed by volcanic action, though this proved to not be the case.</p>
              </>
              : showAction === 'apollo17' ? 
              <>
                <p>Apollo 17 (December 7 – 19, 1972) was the final mission of NASA's Apollo program, the most recent time humans have set foot on the Moon or traveled beyond low Earth orbit.</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg/1920px-Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg" className='infoPic'/>
                <p>Commander Eugene Cernan and Lunar Module Pilot Harrison Schmitt walked on the Moon, while Command Module Pilot Ronald Evans orbited above. The mission's heavy emphasis on science meant the inclusion of a number of new experiments, including a biological experiment containing five mice carried in the command module.</p>
              </>
              : showAction === 'artemis' ? 
              <>
                <p>Artemis 3 (officially Artemis III) is the first crewed Moon landing mission of the Artemis program and the third planned flight of NASA's Orion spacecraft on the Space Launch System (SLS).</p>
                  <img src="https://spacenews.com/wp-content/uploads/2021/04/starship-lander-879x485.jpg" className='infoPic'/>
                <p>Scheduled for launch in 2025, Artemis 3 is planned to be the second crewed Artemis mission and the first crewed lunar landing since Apollo 17 in 1972.</p>
                <p>Artemis 3 will land a crew at the Moon's south polar region. It is planned to have two astronauts on the surface of the Moon for about one week. The mission is intended to be the first to place a woman on the Moon.</p>
              </>

              
             
              :''}
              </>
               :              
               activeObject === 'mars'?
               <>
                 <p>Yes, we haven't made it to Mars yet...</p>
               </>
               :              
               activeObject === 'earth'?
               <>
                 <p>Yes, life is here...</p>
               </>
               : ''}
            </div>
            
          
            <a className={showAction===''?"hidden-btn":'home-btn'} onClick={()=>setAction('')}>All lunar crew missions</a>
            {activeObject === '' ? 
          
            <div className='iconSection'>
              <>
              <a href='https://www.patreon.com/multiplanetary' target="_blank" className='patreonBtn'>
                <i className="fab fa-patreon"></i>
              </a>
                <a target="_blank" className='youtubeBtn' title='coming soon...'>
                <i className="fab fa-youtube"></i> 
              </a>
              
              </>

              <a  className='twBtn'>
                <i className="fab fa-twitter" href="https://twitter.com/multiplanet_guy" target="_blank"></i>
              </a>
             
              <p>Built by arbus</p>
            </div>
             :
              <a 
                className="home-btn" 
                onClick={()=>{
                  setAction('')
                  setObject('')}}
                  ><i className="fab fa-solar-system" style={{"color":"white"}}></i>Home</a>}
          </div>
        </div>
        
        <div className='audioSection'>
        <i className="fa-solid fa-headphones" style={{"color":"white", "fontSize":"250%"}}></i>
       
       {activeObject === '' ? 
       <>
        <p>We're in outer space right now. There's no sound here:( <a onClick={()=>setSpan(!disabledSpan)}>You wanna know why?</a></p>
        <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>Sound travels in waves like light or heat does, but unlike them, sound travels by making molecules vibrate. So, in order for sound to travel, there has to be something with molecules for it to travel through. On Earth, sound travels to your ears by vibrating air molecules. In deep space, the large empty areas between stars and planets, there are no molecules to vibrate.</p>
        </>
        : ''}
        
       {activeObject===''?'':
       <a className={activeAudioPlayer==='playing'? 'home-btn inActive':'home-btn'} 
       onClick={()=> {
         soundPlay()
         setAudioPlayer('playing')
         }}>{activeAudioPlayer==='' ? <i className="fa-solid fa-circle-play"></i> : <i className="fa-solid fa-circle-pause"></i>}</a>}
        
        </div>
        
        <div className={(activeObject==='mars') || (activeObject==='earth')?'extraInfo extraWeird' : 'extraInfo'}>
        {(activeObject === 'moon') && (showAction === '') ? 
          <>
            <p>Let's listen to the famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
            <audio 
                  controls 
                  src="https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3">
              </audio>
              <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p>
          </>
        :
        (activeObject === 'mars') ? 
          <>
            <p>Let's to listen to Martian wind captured by <em>Perseverance Rover’s SuperCam</em></p>
            <audio 
                controls 
                src={MarsSound}>
              </audio>
              <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p>
          </>
        :
        (activeObject === 'LEO') && (showAction === '') ? 
          <>
            <p>Let's listen to Chorus Radio Waves within Earth's Atmosphere</p>
            <audio 
                controls 
                src='https://www.nasa.gov/mp3/693857main_emfisis_chorus_1.mp3'>
              </audio>
              <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p>
          </>
        : 
        (activeObject === 'moon') && (showAction != '') ? 
                <>
                  <i className="fa-solid fa-location-dot" style={{"color":"white", "fontSize":"250%"}}></i>
                  <p>Click and rotate the Moon to find the exact location 
                    {showAction==='artemis' ? <strong> &#128994;</strong> : <strong> &#128308;</strong>} for  
                    {showAction==='apollo11' ? <em> Apollo 11 mission</em>:
                    showAction==='apollo12' ? <em> Apollo 12 mission</em>:
                    showAction==='apollo14' ? <em> Apollo 14 mission</em>:
                    showAction==='apollo15' ? <em> Apollo 15 mission</em>:
                    showAction==='apollo16' ? <em> Apollo 16 mission</em>:
                    showAction==='apollo17' ? <em> Apollo 17 mission</em>:
                    showAction==='artemis' ? <em> Artemis 3 mission</em>       
                       
                  : ''}.
                  </p>
                  {showAction==='artemis' ? 
                  <p style={{"fontSize":'70%'}}>The exact coordinates for Artemis 3 mission are not announced yet but it's somewhere around the south polar region. <a target="_blank" style={{"color":"goldenrod"}}href="https://www.nasa.gov/specials/artemis/">More...</a></p> : ''}
                </>
                :
                <>
                  <i className="fa-solid fa-computer-mouse" style={{"color":"white", "fontSize":"250%"}}></i>
                  <p>You can either double-click the cellestial body or press one of the below buttons to discover your next destination</p>
                  <div style={{"display":"flex"}}>
                  <a className='home-btn earthBtn' onClick={()=>setObject('earth')} title="Earth">
                  <i className="fa-solid fa-earth-americas"></i></a>
                  <a className='home-btn moonBtn' onClick={()=>setObject('moon')} title="Moon">
                  <i className="fa-solid fa-moon"></i></a>
                  <a className='home-btn marsBtn' onClick={()=>setObject('mars')} title="Mars">
                  <i className="fa-solid fa-bowling-ball"></i>
                  </a>
                  </div>
                </>
          }
        </div>
      </Html>
    )}