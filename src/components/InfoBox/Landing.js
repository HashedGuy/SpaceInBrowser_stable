import { Html } from '@react-three/drei'
import React, { useEffect, useState, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, launchpads, lights, showActions, stations } from '../globalState'
import Whistler from '../../assets/sounds/Whistler.wav'
import MartianWind from '../../assets/sounds/martianWind.mp3'
import Kayla from '../../assets/kay.png'
import Matt from '../../assets/matt.png'
import Raja from '../../assets/raja.png'
import Tom from '../../assets/tom.png'
import Sergey from '../../assets/sergey.png'
import Oleg from '../../assets/oleg.png'
import Denis from '../../assets/denis.png'
import Wang from '../../assets/wang2.png'
import Ye from '../../assets/ye.png'
import Zhai from '../../assets/zhai.png'

import audiostyles from "../audiostyles.css";
import { FaPlay, FaPause } from "react-icons/fa"
import {GiMoonOrbit} from 'react-icons/gi'
import {BsLightbulb, BsLightbulbOff, BsFillMouse2Fill, BsHeadphones} from 'react-icons/bs'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import ReactPlayer from 'react-player'



export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    const [disabledSpan, setSpan] = useState(true)
    const [activeAudioPlayer, setAudioPlayer] = useState('')
    const [activeLight, setLight] = useRecoilState(lights)
    const [activeLaunchPad, setLaunchPad] = useRecoilState(launchpads)
    const [activeStation, setStation] = useRecoilState(stations)
    const [closed, setClose] = useState(false)
    const [closedAudio, setCloseAudio] = useState(false)
  
    const AudioPlayer = () => {

      // state
      const [isPlaying, setIsPlaying] = useState(false);
      const [duration, setDuration] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);
    
      // references
      const audioPlayer = useRef();   // reference our audio component
      const progressBar = useRef();   // reference our progress bar
      const animationRef = useRef();  // reference the animation
    
      useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
      }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    
      const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
      }
    
      const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
          audioPlayer.current.play();
          animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
          audioPlayer.current.pause();
          cancelAnimationFrame(animationRef.current);
        }
      }
    
      const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    
      const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
      }
    
      const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
      }
    
      const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
      };
      return (
        <div className="audioPlayer">
          <audio 
            onLoadedMetadata={onLoadedMetadata} 
            ref={audioPlayer} 
            src={
              (activeObject==='moon') && (showAction==='')? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" :
              (activeObject==='moon') && (showAction==='apollo11') ? "https://images-assets.nasa.gov/audio/Apollo11Highlights/Apollo11Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo12') ? "https://images-assets.nasa.gov/audio/Apollo12Highlights/Apollo12Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo14') ? "https://images-assets.nasa.gov/audio/Apollo14Highlights/Apollo14Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo15') ? "https://images-assets.nasa.gov/audio/Apollo15Highlights/Apollo15Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo16') ? "https://images-assets.nasa.gov/audio/Apollo16Highlights/Apollo16Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='apollo17') ? "https://images-assets.nasa.gov/audio/Apollo17Highlights/Apollo17Highlights~128k.mp3" :
              (activeObject==='moon') && (showAction==='artemis') ? "https://images-assets.nasa.gov/audio/Ep116_Apollo%20vs%20ARTEMIS/Ep116_Apollo%20vs%20ARTEMIS~128k.mp3" :
              (activeObject==='LEO') ? Whistler :
              (activeObject==='mars') ? MartianWind
              : "https://www.nasa.gov/mp3/577774main_STS-135Launchringtone-v2.mp3"} 
            preload="metadata">
            
        </audio>
          <button onClick={togglePlayPause} className="playPause">
            {isPlaying ? <FaPause style={{"fontSize":"50%"}}/> : <FaPlay className="play" />}
          </button>
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <div>
            <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
          </div>
          <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
      )
    }
    
    return(
        <Html wrapperClass="annotation" >
        <div className='infoBox'>
          <div className='infoBorders'>
          {activeObject==='' ? '' : 
          <>
            <p className="logoTitle" 
               onClick={()=>{
                setObject('')
                setLight('')
                setAction('')
                setLaunchPad('')}}>
            <GiMoonOrbit/>
            <span style={{"fontWeight":"500", "marginLeft":"2%"}}>Multiplanetary map</span>
            <span style={{"fontWeight":"200", "marginLeft":"2%"}}>Beta 1.0</span>
            </p>
          </>}
          <h1>{
          activeObject === 'earth' ? 'Earth' 
          : activeObject === 'moon' ? 'Moon'
          : activeObject === 'mars' ? 'Mars'
          : activeObject === 'LEO' ? 'Low Earth Orbit'
          : 
          <>
            <GiMoonOrbit /> 
            <span style={{"fontWeight":"500", "marginLeft":"2%"}}>Multiplanetary map</span>
            <p style={{"fontSize":"30%", "fontWeight":"300"}}> Beta Version 1.0</p>
          </>            }
          </h1>
          
          <h5>{
            activeObject === 'earth' ? 'Our current home. Yes pls add smth here very soon.' 
            : activeObject === 'moon' ? "Gateway to Mars! We've already been here but we're coming again soon."
            : activeObject === 'mars' ? "The planet we're colonizing next. Yes pls add smth here." 
            : activeObject === 'LEO' ? "This is where the most of the crew missions happening."
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
            {(activeLaunchPad!='') || (showAction==='spaceStation') ? '' : <a className={(showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') ? 'home-btn launchpad' : 'home-btn'} 
              onClick={()=>{
                setAction('launchpad') 
                setLight('ambient')}}>
              Rocket launch sites
            </a>}
            {(showAction==='') || (showAction==='spaceStation') && (activeStation==='') ? 
              <a className={showAction==='spaceStation'?'home-btn launchpad':'home-btn'} 
                 onClick={() => setAction('spaceStation')}>Space stations</a> : ''}
            {showAction==='spaceStation' ? 
              <>
              {activeStation==='' ? 
              <>
              <p>The space station is a spacecraft, which support a human crew to stay in space for a long time. It is also known as orbital stations as it circles the Earth.</p>
              <p>Currently, two active space stations serve as a base for people in space. You can see them travelling around the earth (in <span style={{"color":"yellow"}}>--</span> and <span style={{"color":"red"}}>--</span> orbits).</p>
              </> : ''}
              {activeStation==='TSS' ? '' : <a className={activeStation==='ISS' ? 'home-btn launchpad' : 'home-btn'} onClick={()=>setStation('ISS')}>International Space Station</a>}
              {activeStation==='ISS' ? 
              <>
                <p>The largest and most sophisticated of space station is the International Space Station (ISS).</p> 
                <img src={"https://upload.wikimedia.org/wikipedia/commons/e/e1/The_station_pictured_from_the_SpaceX_Crew_Dragon_5_%28cropped%29.jpg"} className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit: NASA Image and Video</em></p>
                <p>Since the first module was launched into low Earth orbit in 1998, the ISS has grown with modular additions from the principal space agencies involved in building and operating the space station: NASA, Roscosmos, ESA, JAXA and CSA. To date, 237 astronauts from 18 countries have visited the ISS.</p>
                <h5 style={{"color":"gray"}}>Who's On Station?</h5>
                <div style={{"display":"flex", "flexDirection":"column"}}>
                  <div>
                    <img src={Matt} className='bioPic' title='Matthias Maurer'/>
                    <img src={Raja} className='bioPic' title='Raja Chari'/>
                    <img src={Tom} className='bioPic' title='Tom Marshburn'/>
                    <img src={Kayla} className='bioPic' title='Kayla Barron'/>
                  </div>
                  <div>
                    <img src={Oleg} className='bioPicR' title='Oleg Artemyev'/>
                    <img src={Denis} className='bioPicR' title='Denis Matveev'/>
                    <img src={Sergey} className='bioPicR' title='Sergey Korsakov'/>
                  </div>
                  <p className='hoverName'>Hover to see their names</p>

                {/* <ReactPlayer width='240px' height='180px' url="https://www.ustream.tv/channel/17074538" /> */}
                </div>
              </>
              :''}
              {activeStation==='ISS' ? '' : <a className={activeStation==='TSS' ? 'home-btn launchpad' : 'home-btn'}  onClick={()=>setStation('TSS')}>Tiangong Space Station</a>}
              {activeStation==='TSS' ? 
              <>
                <p>Tiangong (Chinese: 天宫, 'Palace in the Sky') is a space station being constructed by China in low Earth orbit between 340 and 450 km (210 and 280 mi) above the surface.</p>
                <img src={"https://upload.wikimedia.org/wikipedia/commons/1/1a/Tiangong_Space_Station_Rendering_2021.10.png"} className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit: Shujianyang</em></p>
                <p>The first module, the Tianhe ("Harmony of the Heavens") core module, was launched on 29 April 2021, followed by multiple crewed and uncrewed missions and two more modules to be launched by 2022. The research conducted on the station will improve researchers' ability to conduct science experiments in space, beyond the duration and capacity offered by China's existing space laboratories.</p>
                <h5 style={{"color":"gray"}}>Who's On Station?</h5>
                <div style={{"display":"flex", "flexDirection":"column"}}>
                  <div>
                    <img src={Zhai} className='bioPicC' title='Zhai Zhigang'/>
                    <img src={Wang} className='bioPicC' title='Wang Yaping'/>
                    <img src={Ye} className='bioPicC' title='Ye Guangfu'/>
                  </div>
                  <p className='hoverName'>Hover to see their names</p>
                </div>
              </>
              :''}
            </> : ''}
           
            
            {(showAction==='launchpad') || ((showAction==='crewPad') && (activeLaunchPad==='')) || ((showAction==='satellitePad') && (activeLaunchPad==='')) ? 
            <>
            <p>To get to space, humankind relies on key launch sites scattered around the world.</p>
            <p>Dozens of sites around the world host spaceports, the specialized facilities built to send and receive rocket-powered vehicles on flights into the cosmos.</p>
            
            <a className='home-btn' onClick={()=>setAction('crewPad')}>Show sites with crew launch</a>
            {showAction==='crewPad' ? 
              <>
                <p>Green circles &#128994; on the surface of the Earth show the rocket launch sites with confirmed crew mission launches. Some of them provide <span style={{"color": "red"}}>LIVE</span> streams!</p>
              </>
            : ''}
            <a className='home-btn' onClick={()=>setAction('satellitePad')}>Show sites with satellite launch</a>
            {showAction==='satellitePad' ? 
              <>
                <p>Red circles 	&#128308; on the surface of the Earth show the rocket launch sites with confirmed satellite launches only (without crew mission launches).</p>
              </>
              : ''}
            </>

            :''}
            {(activeStation==='ISS') || (activeStation==='TSS') ? <a onClick={()=>setStation('')} className="home-btn">Close &#x2715;</a>:''}
            {(showAction==='') || (activeLaunchPad!='') || (activeStation!='') ? '' : 
              <a className='home-btn' 
                 onClick={()=>{
                   setAction('')
                   setLight('')
                  }}
              >&#x2190; Back</a>} 

            {activeLaunchPad==='' ? '' : <a className='home-btn launchpad'>{activeLaunchPad}</a>}

            {activeLaunchPad==='KSS' ? 
            <>
            <p>Kennedy Space Center, one of 10 NASA field centers, is a premier multi-user spaceport with more than 90 private-sector partners and nearly 250 partnership agreements.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/a0/VAB_and_SLS.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: NASA Image and Video</em></p>
            <p>Although Kennedy is the NASA's main launch site, the center also is home to facilities that research and develop innovative solutions that government and commercial space ventures need for working and living on the surfaces of the Moon and other bodies in our solar system.</p>
            <h5>Next mission:</h5> 
            <p className="nextMission">SpaceX Falcon 9 Axiom Mission 1 (Ax-1)</p>
            </>
            :
            activeLaunchPad==='CCSFS' ? 
            <>
            <p>Cape Canaveral Space Force Station is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.</p>
            <img src={"https://media.defense.gov/2021/Dec/07/2002904591/-1/-1/0/211203-X-KD758-1071.JPG"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Patrick Space Force Base</em></p>
            <p>A number of American space exploration pioneers were launched from CCSFS, including the first U.S. Earth satellite in 1958, first U.S. astronaut (1961), first U.S. astronaut in orbit (1962), first two-man U.S. spacecraft (1965), first U.S. unmanned lunar landing (1966), and first three-man U.S. spacecraft (1968).</p>
            <h5>Next mission:</h5> 
            <p className="nextMission">ULA Atlas V Boeing CST-100 Starliner Orbital Flight Test 2 (UNCREWED)</p>
            </>
            :
            activeLaunchPad==='Starbase' ? 
            <>
            <p>Starbase is a private rocket production facility, test site, and spaceport constructed by SpaceX, located at Boca Chica approximately 32 km (20 mi) east of Brownsville, Texas, on the US Gulf Coast.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/af/USA_-_Texas_-_Boca_Chica_-_Starbase_%2851287072615%29.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Alexander Hatley from Spring, Texas, USA</em></p>
            <p>The launch site was originally intended to support launches of the Falcon 9 and Falcon Heavy launch vehicles as well as "a variety of reusable suborbital launch vehicles", but in early 2018, SpaceX announced a change of plans, stating that the launch site would be used exclusively for SpaceX's next-generation launch vehicle, Starship.</p>
            </>
            :
            activeLaunchPad==='SLC-4/VSFB' ? 
            <>
            <p>Space Launch Complex 4 (SLC-4) is a launch and landing site at Vandenberg Space Force Base, California, U.S.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/d/d4/Iridium-1_Mission_%2831450835954%29.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: SpaceX</em></p>
            <p>It has two pads, both of which are used by SpaceX for Falcon 9, one for launch operations, and other as Landing Zone 4 (LZ-4) for SpaceX landings.</p>
            </>
            :
            activeLaunchPad==='GSS' ? 
            <>
             <p>The Guiana Space Centre (French: Centre spatial guyanais; CSG), also called Europe's Spaceport, is an European spaceport to the northwest of Kourou in French Guiana, a overseas territory of France in South America.</p>
             <img src={"https://upload.wikimedia.org/wikipedia/commons/5/54/Ensemble_de_lancement_Vega.jpg"} className='infoPic'/>
             <p style={{"fontSize":"50%"}}><em>Credit: Camille Gévaudan</em></p>
             <p>The European Space Agency (ESA), the European Union Agency for the Space Programme (EUSPA), the French space agency CNES (National Centre for Space Studies), and the commercial companies Arianespace and Azercosmos conduct launches from Kourou. It was used by the ESA to send supplies to the International Space Station using the Automated Transfer Vehicle.</p>
            </>
            :
            activeLaunchPad==='BSS' ? 
            <>
             <p>The Baikonur Cosmodrome (Kazakh: Байқоңыр ғарыш айлағы) is a spaceport in an area of southern Kazakhstan leased to Russia. </p>
             <img src={"https://upload.wikimedia.org/wikipedia/commons/5/59/Soyuz_expedition_19_launch_pad.jpg"} className='infoPic'/>
             <p style={{"fontSize":"50%"}}><em>Credit: NASA KSC Media Archive</em></p>
             <p>The Cosmodrome is the world's first spaceport for orbital and human launches and the largest (in area) operational space launch facility. All crewed Russian spaceflights are launched from Baikonur.</p>
             <h5>Next mission:</h5> 
             <p className="nextMission">Progress MS-20</p>
            </>
              :
            activeLaunchPad==='SDSC' ? 
            <>
            <p>Satish Dhawan Space Centre is a rocket launch centre (spaceport) operated by Indian Space Research Organisation (ISRO). It is located in Sriharikota in Andhra Pradesh.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2a/PSLV_C45_EMISAT_campaign_23.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Indian Space Research Organisation</em></p>
            <p>The  Centre has  the  facilities for  solid propellant  processing,  static  testing  of  solid  motors,  launch  vehicle  integration  and  launch operations, range operations comprising telemetry, tracking and command network and mission control centre.</p>
            </>
             :
            activeLaunchPad==='WSLC' ? 
            <>
             <p>The Wenchang Space Launch Site (Chinese: 文昌航天发射场[1][2]), located in Wenchang, Hainan, China, is a rocket launch site — one of the two spacecraft launch sites of Xichang Satellite Launch Center.</p>
             <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2e/Tianwen-1_launch_04_%28cropped%29.jpg"} className='infoPic'/>
             <p style={{"fontSize":"50%"}}><em>Credit: China News Service</em></p>
             <p>It has been specially selected for its low latitude, which is only 19° north of the equator, which will allow for an increase in payload necessary for launching China's future space station. It is capable of launching the Long March 5, currently the most powerful Chinese rocket.</p>
            </>
            :
            activeLaunchPad==='TSC' ? 
            <>
             <p>The Tanegashima Space Center (種子島宇宙センター, Tanegashima Uchū Sentā) is the largest rocket-launch complex in Japan. It is located on the southeast coast of Tanegashima island.</p>
             <img src={"https://upload.wikimedia.org/wikipedia/commons/c/c9/Osaki_Range.jpg"} className='infoPic'/>
             <p style={{"fontSize":"50%"}}><em>Credit: ウニウニ </em></p>
             <p>It was established in 1969 when the National Space Development Agency of Japan (NASDA) was formed, and is now run by JAXA. The activities that take place at TNSC include assembly, testing, launching, and tracking satellites, as well as rocket engine firing tests.</p>
            </>
            :
            activeLaunchPad==='USC' ? 
            <>
              <p>The Uchinoura Space Center (内之浦宇宙空間観測所, Uchinoura Uchū Kūkan Kansokusho) is a space launch facility in the Japanese town of Kimotsuki, Kagoshima Prefecture. </p>
              <img src={"https://upload.wikimedia.org/wikipedia/commons/a/ab/M-V_with_Astro-E_satellite.jpg"} className='infoPic'/>
              <p style={{"fontSize":"50%"}}><em>Credit: NASA Image and Video</em></p>
              <p>All of Japan's scientific satellites were launched from Uchinoura prior to the M-V launch vehicles being decommissioned in 2006. It continues to be used for suborbital launches, and has also been used for the Epsilon orbital launch vehicle. Additionally, the center has antennas for communication with interplanetary space probes.</p>
            </>
            :
            activeLaunchPad==='Semnan' ? 
            <>
               <p>Semnan Space Center (Persian:پایگاه فضایی سمنان) is the premier Iranian Space Center, located 50 km southeast of the city of Semnan in the north of the country.</p>
               <img src={"https://upload.wikimedia.org/wikipedia/commons/b/b6/%D8%B3%DB%8C%D9%85%D8%B1%D8%BA_-_%D8%A7%D9%81%D8%AA%D8%AA%D8%A7%D8%AD_%D9%BE%D8%A7%DB%8C%DA%AF%D8%A7%D9%87_%D9%85%D9%84%DB%8C_%D9%81%D8%B6%D8%A7%DB%8C%DB%8C_%D8%A7%D9%85%D8%A7%D9%85_%D8%AE%D9%85%DB%8C%D9%86%DB%8C%28%D8%B1%D9%87%29_%281%29.jpg"} className='infoPic'/>
               <p style={{"fontSize":"50%"}}><em>Credit: Tasnim News Agency</em></p>
               <p>The spaceport comprises two launch pads: an older, medium-sized launch pad with a collapsible umbilical tower, and a newer, larger launch pad with a mobile gantry tower.</p>
            </>
            :
            activeLaunchPad==='Palmachim' ? 
            <>
                <p>The Palmachim Airbase (Hebrew: בָּסִיס חֵיל-הַאֲוִויר פַּלְמַחִים) is an Israeli military facility and spaceport located near the cities of Rishon LeZion and Yavne on the Mediterranean coast. </p>
                <img src={"https://static.timesofisrael.com/www/uploads/2014/04/F070611TBA01.jpg"} className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit: Flash 90</em></p>
                <p>Palmachim is used to launch the Shavit space launch vehicle into retrograde orbit by launching over the Mediterranean, acting as Israel's primary spaceport. Palmachim is also used to test ballistic missiles, such as the Jericho.</p>
            </>
            :
            activeLaunchPad==='Yasny' ? 
            <>
            <p>Yasny cosmodrome is located in a military airbase, northwest of the village of Dombarovsky, near Yasny in Russia's Orenburg Oblast.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/0/02/General_View_snyi.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: ISC Kosmotras</em></p>
            <p>The civilian launches are operated by the Russian Air Force on behalf of the launcher's operator, Russian/Ukrainian consortium Kosmotras. Kosmotras has constructed additional facilities necessary for commercial satellite launch operations, including clean room integration facilities.</p>
            </>
            :
            activeLaunchPad==='JSLC' ? 
            <>
            <p>Jiuquan Satellite Launch Center (Chinese: 酒泉卫星发射中心) is a Chinese space vehicle launch facility (spaceport) located in the Gobi Desert, Inner Mongolia. </p>
            <img src={"https://news.satnews.com/wp-content/uploads/2021/05/China-Yaogan-34-launch.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Xinhuanet</em></p>
            <p>The center covers 2800 km² and may have housing for as many as 20,000 people. The facilities and launch support equipment were likely modelled on Soviet counterparts and the Soviet Union likely provided technical support to Jiuquan.</p>
            </>
            :
            activeLaunchPad==='Vostochny' ? 
            <>
            <p>The Vostochny Cosmodrome (Russian: Космодром Восточный) is a Russian spaceport (still partly under construction) above the 51st parallel north in the Amur Oblast, in the Russian Far East.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/%D0%A1%D1%82%D0%B0%D1%80%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81_%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%B4%D1%80%D0%BE%D0%BC%D0%B0_%D0%92%D0%BE%D1%81%D1%82%D0%BE%D1%87%D0%BD%D1%8B%D0%B9_%D0%BF%D0%B5%D1%80%D0%B5%D0%B4_%D0%BF%D0%B5%D1%80%D0%B2%D1%8B%D0%BC_%D0%BF%D1%83%D1%81%D0%BA%D0%BE%D0%BC.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Владислав Ларкин</em></p>
            <p>It is intended to reduce Russia's dependency on the Baikonur Cosmodrome in Kazakhstan. The first launch took place on 28 April 2016 at 02:01 UTC. As of 1 July 2021, eight launch attempts have been made with seven successes.</p>
            </>
            :
            activeLaunchPad==='TSLC' ? 
            <>
            <p>The Taiyuan Satellite Launch Center also known as Base 25 (Chinese: 二十五基地), is a space and defense launch facility (spaceport) located in Kelan County, Xinzhou, Shanxi Province.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/en/2/2b/Taiyuan_1601_Satellite_Launch_Site.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: 燕雁 </em></p>
            <p>The site is primarily used to launch meteorological satellites, Earth resource satellites and scientific satellites on Long March launch vehicles into Sun-synchronous orbits.</p> 
            </>
             :
             activeLaunchPad==='Sohae' ? 
             <>
             <p>Sohae Satellite Launching Station (Korean: 서해위성발사장; Hanja: 西海衛星發射場) is a rocket launching site in Tongch'ang-ri, Cholsan County, North Pyongan Province, North Korea.</p>
             <img src={"https://cdni.rt.com/files/2018.07/article/5b56792ddda4c88a668b4634.jpg"} className='infoPic'/>
             <p style={{"fontSize":"50%"}}><em>Credit: KCNA </em></p>
             <p>It was the site for the 13 April 2012 launch of the North Korean satellite Kwangmyŏngsŏng-3, which was launched to celebrate the 100th anniversary of the birth of Kim Il-Sung. The rocket launch failed, but on 12 December of the same year Kwangmyŏngsŏng-3 Unit 2 was successfully launched and brought into Earth orbit.</p> 
             </>
              :
              activeLaunchPad==='Naro' ? 
              <>
              <p>The Naro Space Center is a South Korean spaceport in South Jeolla's Goheung County, operated by the state-run Korea Aerospace Research Institute.</p>
              <img src={"https://rocketrundown.com/wp-content/uploads/2018/11/KSLV-II-suborbital-test-vehicle.jpg"} className='infoPic'/>
              <p style={{"fontSize":"50%"}}><em>Credit: Korea Aerospace Research Institute </em></p>
              <p>It includes two launch pads, a control tower, rocket assembly and test facilities, facilities for satellite control testing and assembly, a media center, an electric power station, a space experience hall and a landing field. It has supported 5 launches including the KSLV-II launch in 2021, and will support SSLV launches in 2025.</p> 
              </>
               :
               activeLaunchPad==='XSLC' ? 
               <>
               <p>The Xichang Satellite Launch Center (XSLC), also known as the Xichang Space Center, is a spaceport of China. It is located in Zeyuan Town (泽远镇) in Sichuan.</p>
               <img src={"https://upload.wikimedia.org/wikipedia/commons/3/3d/Xichang_launch_center_4.jpg"} className='infoPic'/>
               <p style={{"fontSize":"50%"}}><em>Credit: CGWIC </em></p>
               <p>The facility became operational in 1984 and is used to launch numerous civil, scientific, and military payloads annually. It is notable as the site of Sino-European space cooperation, with the launch of the first of two Double Star scientific satellites in December 2003.</p> 
               </>
               :
               activeLaunchPad==='RocketLab' ? 
               <>
               <p>Rocket Lab Launch Complex 1 (also known as Mahia Launch Complex or Spaceport) is a commercial spaceport located close to Ahuriri Point at the southern tip of Māhia Peninsula, on the east coast of New Zealand's North Island.</p>
               <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Rocket_Lab_Launch_Complex_1_%28Sept_2016%29.jpg"} className='infoPic'/>
               <p style={{"fontSize":"50%"}}><em>Credit: Rodney Allen  </em></p>
               <p>It is owned and operated by private spaceflight company Rocket Lab and supports launches of the company's Electron rocket for CubeSat nanosatellites. </p> 
               </>
               :
               activeLaunchPad==='PSC' ? 
               <>
               <p>The Pacific Spaceport Complex – Alaska, formerly known as the Kodiak Launch Complex (KLC), is a dual-use commercial and military spaceport for sub-orbital and orbital launch vehicles.</p>
               <img src={"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/474963main-tower-picture-3008x2000-1521646940.jpg?resize=980:*"} className='infoPic'/>
               <p style={{"fontSize":"50%"}}><em>Credit: ALASKA AEROSPACE CORPORATION </em></p>
               <p>The spaceport has two launch pads with a mission control center that includes 64 workstations with high-speed communications and data links. There is a clean room for preparing satellites for launch, a fully enclosed 17-story-tall rocket assembly building and two independent range and telemetry systems.</p> 
               </>
               :
               activeLaunchPad==='MARS' ? 
               <>
               <p>The Mid-Atlantic Regional Spaceport is a commercial space launch facility located at the southern tip of NASA's Wallops Flight Facility on Wallops Island in Virginia, United States.</p>
               <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2d/Mid-Atlantic_Regional_Spaceport_-_aerial_photo.jpg"} className='infoPic'/>
               <p style={{"fontSize":"50%"}}><em>Credit: NASA Wallops Flight Facility  </em></p>
               <p>The Mid-Atlantic Regional Spaceport has three active launch pads. In October 2018, Rocket Lab announced that it had selected MARS as its second launch site, called Rocket Lab Launch Complex-2. The company began construction in February 2019, together with the Virginia Commercial Space Flight Authority (Virginia Space).</p> 
               </>

            :''}

            {activeLaunchPad != '' ? <a onClick={()=>setLaunchPad('')} className="home-btn">Close &#x2715;</a> : ''}
          </div> : ''}
          </div>
          <div className='addInfo'>
            {(activeObject === 'earth') || (activeObject === 'LEO')? <a className='home-btn inActive'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? 
              <a className={showAction===''?"home-btn inActive" : "hidden-btn"} onClick={()=> setButton(!activeButton)}>
                  Population: 0 (12)
                  <br/>
                  <em className='credits'>Credit: NASA</em>
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
                <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                <p>Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC, and Armstrong became the first person to step onto the Moon's surface six hours and 39 minutes later, on July 21 at 02:56 UTC. Aldrin joined him 19 minutes later, and they spent about two and a quarter hours together exploring the site they had named Tranquility Base upon landing.</p>
                
                </>
              : showAction === 'apollo12' ? 
                <>
                  <p>Apollo 12 (November 14 – 24, 1969) was the sixth crewed flight in the United States Apollo program and the second to land on the Moon.</p>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Surveyor_3-Apollo_12.jpg/1920px-Surveyor_3-Apollo_12.jpg" className='infoPic'/>
                  <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                  <p>It was launched on November 14, 1969, from the Kennedy Space Center, Florida. Commander Charles "Pete" Conrad and Lunar Module Pilot Alan L. Bean performed just over one day and seven hours of lunar surface activity while Command Module Pilot Richard F. Gordon remained in lunar orbit.</p>
                </>
              : showAction === 'apollo14' ? 
              <>
                <p>Apollo 14 (January 31, 1971 – February 9, 1971) was the eighth crewed mission in the United States Apollo program, the third to land on the Moon, and the first to land in the lunar highlands. </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Apollo_14_Shepard.jpg/1920px-Apollo_14_Shepard.jpg" className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                <p>It was the last of the "H missions", landings at specific sites of scientific interest on the Moon for two-day stays with two lunar givehicular activities (EVAs or moonwalks).</p>
              </>
              : showAction === 'apollo15' ? 
              <>
                <p>Apollo 15 (July 26 – August 7, 1971) was the ninth crewed mission in the United States' Apollo program and the fourth to land on the Moon. </p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/AS15-88-11866_-_Apollo_15_flag%2C_rover%2C_LM%2C_Irwin_-_restoration1.jpg" className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                <p> It was the first J mission, with a longer stay on the Moon and a greater focus on science than earlier landings. Apollo 15 saw the first use of the Lunar Roving Vehicle.</p>
                
              </>
              : showAction === 'apollo16' ? 
              <>
                <p>Apollo 16 (April 16 – 27, 1972) was the tenth crewed mission in the United States Apollo space program, administered by NASA, and the fifth and next-to-last to land on the Moon.</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/John_W._Young_on_the_Moon.jpg/1920px-John_W._Young_on_the_Moon.jpg" className="infoPic"/>  
                <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                <p>It was the second of Apollo's "J missions", with an extended stay on the lunar surface, a focus on science, and the use of the Lunar Roving Vehicle (LRV). The landing and exploration were in the Descartes Highlands, a site chosen because some scientists expected it to be an area formed by volcanic action, though this proved to not be the case.</p>
              </>
              : showAction === 'apollo17' ? 
              <>
                <p>Apollo 17 (December 7 – 19, 1972) was the final mission of NASA's Apollo program, the most recent time humans have set foot on the Moon or traveled beyond low Earth orbit.</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg/1920px-Eugene_Cernan_at_the_LM%2C_Apollo_17.jpg" className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit:NASA Image and Video</em></p>
                <p>Commander Eugene Cernan and Lunar Module Pilot Harrison Schmitt walked on the Moon, while Command Module Pilot Ronald Evans orbited above. The mission's heavy emphasis on science meant the inclusion of a number of new experiments, including a biological experiment containing five mice carried in the command module.</p>
              </>
              : showAction === 'artemis' ? 
              <>
                <p>Artemis 3 (officially Artemis III) is the first crewed Moon landing mission of the Artemis program and the third planned flight of NASA's Orion spacecraft on the Space Launch System (SLS).</p>
                <img src="https://spacenews.com/wp-content/uploads/2021/04/starship-lander-879x485.jpg" className='infoPic'/>
                <p style={{"fontSize":"50%"}}><em>Credit:SpaceX</em></p>
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
            
          
            {activeObject==='moon' ? 
              <a className={showAction==='' ? "hidden-btn":'home-btn'} onClick={()=>setAction('')}>All lunar crew missions</a>
              :''}
            {activeObject === '' ? 
          
            <div className='iconSection'>
             
              <a href='https://www.patreon.com/multiplanetary' target="_blank" className='patreonBtn'>
                <i className="fab fa-patreon"></i>
              </a>

              {/* <a target="_blank" className='youtubeBtn' title='coming soon...'>
                <i className="fab fa-youtube"></i> 
              </a> */}

              <a  className='twBtn' href="https://twitter.com/multiplanet_guy" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
             
              <p style={{'marginRight':'8%'}}>Built by arbus</p>
            </div>
             :
              ''}
          </div>
        </div>
        
        {closedAudio ? 
          <>
          <div 
            className={
              
              ((activeObject==='LEO') && (showAction==='')) || (activeObject==='moon') || (activeObject==='mars') ? "headphoneBtn alertAudio" :
              (activeLaunchPad==='Starbase') || (activeLaunchPad==='KSS') || (activeLaunchPad==='CCSFS') ? "headphoneBtn alertLive" 
              : "headphoneBtn"}
            onClick={()=>setCloseAudio(false)}
          >
          <BsHeadphones style={{"fontSize":"150%"}}/>
          {(activeLaunchPad==='Starbase') || (activeLaunchPad==='KSS') || (activeLaunchPad==='CCSFS') ? <p className="headphoneInfo">LIVE</p> :
           ((activeObject==='LEO') && (showAction==='')) || (activeObject==='moon') || (activeObject==='mars') ? <p className="headphoneInfoAudio ">AUDIO</p>         
          : ''}
          </div>
          </>
          :
        <div className={'audioSection'}>
            <AiOutlineCloseCircle className='closeBtn' onClick={()=>setCloseAudio(true)}/>
        <i className="fa-solid fa-headphones" style={{"color":"white", "fontSize":"250%"}}></i>
       
       {activeObject === '' ? 
       <>
        <p>We're in outer space right now. There's no sound here:( <a onClick={()=>setSpan(!disabledSpan)}>You wanna know why?</a></p>
        <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>Sound travels in waves like light or heat does, but unlike them, sound travels by making molecules vibrate. So, in order for sound to travel, there has to be something with molecules for it to travel through. On Earth, sound travels to your ears by vibrating air molecules. In deep space, the large empty areas between stars and planets, there are no molecules to vibrate.</p>
        </>
        :
        (activeObject === 'moon') && (showAction==='') ? 
        <>
        <p>We Choose to Go to the Moon</p>
        <p>Let's listen to the famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo11') ? 
        <>
        <p>Apollo 11 Mission Audio</p>
        <p style={{"fontSize":"70%"}}> <em>All Highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo12') ? 
        <>
        <p>Apollo 12 Mission Audio</p>
        <p style={{"fontSize":"70%"}}><em>All Highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo14') ? 
        <>
        <p>Apollo 14 Mission Audio</p>
        <p style={{"fontSize":"70%"}}><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo15') ? 
        <>
        <p>Apollo 15 Mission Audio</p>
        <p style={{"fontSize":"70%"}}><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo16') ? 
        <>
        <p>Apollo 16 Mission Audio</p>
        <p style={{"fontSize":"70%"}}><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='apollo17') ? 
        <>
        <p>Apollo 17 Mission Audio</p>
        <p style={{"fontSize":"70%"}}><em>All highlights</em></p>
        </>
        :
        (activeObject === 'moon') && (showAction==='artemis') ? 
        <>
        <p>Houston We Have a Podcast by NASA</p>
        <p style={{"fontSize":"70%"}}><em>Apollo vs Artemis</em></p>
        </>
        :
        activeObject === 'mars' ? 
        <>
        <p>Martian wind</p>
        <p style={{"fontSize":"70%"}}>This recording was made on Feb. 22, 2021, on the fourth sol (Martian day) by the SuperCam instrument on NASA's Perseverance rover after deployment of the rover's mast.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='') && (activeLaunchPad==='') ? 
        <>
         <p>Atmospheric squeaking</p>
         <p style={{"fontSize":"70%"}}>A 'whistler' is audibly emitted in the atmosphere.<a onClick={()=>setSpan(!disabledSpan)}>But what are 'whistlers' exactly?</a></p>
         <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>They are electromagnetic emissions produced in the atmosphere, but their cause is still partly unclear. They originate from thunderstorms or meteorites, or even after earthquakes. Once produced, the sounds travel along closed magnetic field lines from one hemisphere to the other.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='ISS') ?
        <> 
          <p>NASA Live</p>
          <p style={{"fontSize":"70%"}}>NASA TV airs a variety of regularly scheduled, pre-recorded educational and public relations programming 24 hours a day on its various channels.</p>
        </>
        :
        (activeObject === 'LEO') && (activeStation==='TSS') ?
        <> 
          <p>Tiangong Live</p>
          <p style={{"fontSize":"70%"}}>Unfortunately, there's no live stream from Tiangong as NASA Live. Below is the latest live stream made by Shenzhou-13 crew.</p>
        </>
        :
        (activeObject === 'LEO') && (activeLaunchPad==='Starbase') ?
        <> 
          <p>Starbase Live</p>
          <p style={{"fontSize":"70%"}}>Starbase LIVE provides 24/7 coverage of the exciting developments and testing progress.</p>
        </>
        :
        (activeObject === 'LEO') && (activeLaunchPad==='CCSFS') ?
        <> 
          <p>LIVE SpaceX Fleet Operations at Port Canaveral</p>
          <p style={{"fontSize":"70%"}}>Booster returns aboard ASDS, rocket processing operations, fairing returns, launches and many more.</p>
        </>
         :
         (activeObject === 'LEO') && (activeLaunchPad==='KSS') ?
         <> 
           <p>Live: Artemis 1 SLS at the KSS</p>
           <p style={{"fontSize":"70%"}}>The SLS rocket will launch NASA's Orion capsule on a loop around the Moon later this year.</p>
         </>
       :''}
        
       {activeObject===''?'':
       (activeStation==='ISS') ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=nA9UZF-SZoQ" className="stream"/> :
       (activeStation==='TSS') ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=TlRPB_FNSF8" className="stream"/> :
        activeLaunchPad==='Starbase' ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=mhJRzQsLZGg" className="stream"/> :
        activeLaunchPad==='CCSFS' ? <ReactPlayer width='240px' height='130px' url="https://www.youtube.com/watch?v=gnt2wZBg89g" className="stream"/> :
        activeLaunchPad==='KSS' ? <ReactPlayer width='220px' controls height='130px' url="https://www.youtube.com/watch?v=VdWyaxlUJr8" className="stream"/>
       : <AudioPlayer/>
       }
        {(activeObject==='moon') || (activeObject==='mars') ? 
          <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p> :
        (activeObject==='LEO') && (activeStation==='') && (activeLaunchPad==='') ? 
          <p className='credits'><em>Credit: Cluster (University of Iowa)</em></p> :
        (activeObject==='LEO') && (activeStation==='TSS') ?
          <p className='credits'><em>Credit: CNSpace</em></p> :
        (activeObject==='LEO') && (activeLaunchPad==='Starbase') || (activeLaunchPad==='CCSFS') ? 
          <p className='credits'><em>Credit: NASASpaceflight</em></p> :
          (activeObject==='LEO') && (activeLaunchPad==='KSS') ? 
            <p className='credits'><em>Credit: Spaceflight Now</em></p> 
        : ''}
        </div>}

        {closed ? 
          <BsFillMouse2Fill 
            className={(showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') && (activeLaunchPad==='') ? "mouseBtn usefulX" : "mouseBtn"} 
            onClick={()=>setClose(false)}
          /> :
        <div className={
          (showAction==='launchpad') || (showAction==='crewPad') || (showAction==='satellitePad') && (activeLaunchPad==='') ? 'extraInfo usefulInfo'
          
          : 'extraInfo'}>
        <AiOutlineCloseCircle className='closeBtn' onClick={()=>setClose(true)}/>
        {(activeObject === 'mars') ? 
          <>
          </>
        :
        (activeObject === 'LEO') && (showAction === '') ? 
          <>
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
        (activeObject === 'moon') && (showAction === '') ?
          <>
            {activeLight==='' ?
              <a className='lightBtn' onClick={()=>setLight('ambient')}>
                  <BsLightbulb style={{"color":"yellow", "cursor":"pointer"}} title="Lighten the dark side"/>
              </a> :
              <a className='lightBtn' onClick={()=>setLight('')}>
                  <BsLightbulbOff style={{"color":"yellow", "cursor":"pointer"}} title="Back to the dark side"/>
              </a>
            }
            {activeLight==='ambient' ? 
              
              <p>Enough enlightenment. Click the yellow lightbulb to see the real Moon with its dark side.</p> :
              <p>Have you ever wondered how the Dark Side of the Moon look like? Click the lightbulb and rotate to see!</p>}
               
          </>
        :
          <>
            <i className="fa-solid fa-computer-mouse" style={{"color":"white", "fontSize":"250%"}}></i>
            {(showAction==='crewPad') || (showAction==='satellitePad') ? 
            <>
              <p>Click and drag the Earth to see all available inter-planetary launchpads.</p>
              <p>Click the launchpads (green or red ball) to have more information about them.</p>
            </>
            : <p>You can either double-click the cellestial body or press one of the below buttons to discover your next destination</p>}
          </>
          }
           <div style={{"display":"flex"}}>
                    {activeObject==='LEO' ? '' : 
                    <>
                    <a className='home-btn earthBtn' 
                       onClick={()=>{
                         setObject('LEO')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                        }} 
                       title="Low Earth Orbit">
                      <i className="fa-solid fa-earth-americas"></i>
                    </a>
                    </>}
                    {activeObject==='moon' ? '' :
                    <>
                    <a className='home-btn moonBtn' 
                       onClick={()=>{
                         setObject('moon')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                        }} 
                       title="Moon">
                      <i className="fa-solid fa-moon"></i>
                    </a>
                    </>}
                    {activeObject==='mars' ? '' : 
                    <>
                    <a className='home-btn marsBtn' 
                       onClick={()=>{
                         setObject('mars')
                         setLight('')
                         setAction('')
                         setLaunchPad('')
                        }} 
                       title="Mars">
                    <i className="fa-solid fa-bowling-ball"></i>
                    </a>   
                    </>}
                    {activeObject==='earth' ? '' : 
                    <>
                      <a className='home-btn earthMoonBtn' 
                        onClick={()=>{
                          setObject('earth')
                          setLight('')
                          setAction('')
                          setLaunchPad('')
                        }} 
                      title="Moon orbiting Earth">
                      <GiMoonOrbit/>
                      </a>
                    </>}
                    {activeObject===''?'':
                    <>
                    <a className='home-btn homeBtn' 
                      onClick={()=>{
                        setObject('')
                        setLight('')
                        setAction('')
                        setLaunchPad('')}} 
                      title="Home">
                    <i className="fas fa-home"></i>
                    </a>
                    </>}
                  </div>
        </div>}
      </Html>
    )}