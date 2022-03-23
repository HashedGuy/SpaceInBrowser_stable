import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, launchpads, lights, showActions } from '../globalState'
import MarsSound from  "../../assets/mars-sound.wav"
import {Howl} from "howler"

export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    const [disabledSpan, setSpan] = useState(true)
    const [activeAudioPlayer, setAudioPlayer] = useState('')
    const [activeLight, setLight] = useRecoilState(lights)
    const [activeLaunchPad, setLaunchPad] = useRecoilState(launchpads)

    const MarsSound2 = "https://www.nasa.gov/mp3/640165main_Lookin%20At%20It.mp3"

    const soundPlay = (src) => {
      const sound = new Howl({
        src: 
        activeObject === '' ? "https://www.nasa.gov/mp3/640165main_Lookin%20At%20It.mp3" :
        activeObject === 'moon' ? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" :
        activeObject === 'mars' ? "https://www.nasa.gov/specials/sounds/SCAM_MIC_SOL004_RUN001.wav" :
        activeObject === 'LEO' ? "https://www.nasa.gov/mp3/693857main_emfisis_chorus_1.mp3"
        : "https://www.nasa.gov/mp3/574928main_houston_problem.mp3",
        autoplay:true,
        html5:true,
        onend:()=>setAudioPlayer('')
      })
      sound.play()
    }
    console.log(showAction, activeObject)
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
            {showAction==='launchpad' ? '' : 
            <>
            <a className='home-btn inActive'>ISS view to the Earth</a>
            <a className='home-btn inActive'>View from Dragon capsule</a>
            </>
            }
            <a className='home-btn' 
            onClick={()=>{
              setAction('launchpad') 
              setLight('ambient')}}>Rocket launch sites <i class="fa-solid fa-rocket"></i></a>
            {/* <a className='home-btn' onClick={()=>setAction('')}>Hide</a> */}
            {activeLaunchPad==='' ? '' : <a className='home-btn launchpad'>{activeLaunchPad}</a>}

            {activeLaunchPad==='KSS' ? 
            <>
            <p>Kennedy Space Center, one of 10 NASA field centers, is a premier multi-user spaceport with more than 90 private-sector partners and nearly 250 partnership agreements.</p>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/a/a0/VAB_and_SLS.jpg"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: NASA Image and Video</em></p>
            <p>Although Kennedy is the NASA's main launch site, the center also is home to facilities that research and develop innovative solutions that government and commercial space ventures need for working and living on the surfaces of the Moon and other bodies in our solar system.</p>
            </>
            :
            activeLaunchPad==='CCSFS' ? 
            <>
            <p>Cape Canaveral Space Force Station is an installation of the United States Space Force's Space Launch Delta 45, located on Cape Canaveral in Brevard County, Florida.</p>
            <img src={"https://media.defense.gov/2021/Dec/07/2002904591/-1/-1/0/211203-X-KD758-1071.JPG"} className='infoPic'/>
            <p style={{"fontSize":"50%"}}><em>Credit: Patrick Space Force Base</em></p>
            <p>A number of American space exploration pioneers were launched from CCSFS, including the first U.S. Earth satellite in 1958, first U.S. astronaut (1961), first U.S. astronaut in orbit (1962), first two-man U.S. spacecraft (1965), first U.S. unmanned lunar landing (1966), and first three-man U.S. spacecraft (1968).</p>
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
          </div> : ''}
          </div>
          <div className='addInfo'>
            {activeObject === 'earth' ? <a className='home-btn'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
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
                <p>It was the last of the "H missions", landings at specific sites of scientific interest on the Moon for two-day stays with two lunar extravehicular activities (EVAs or moonwalks).</p>
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

              <a target="_blank" className='youtubeBtn' title='coming soon...'>
                <i className="fab fa-youtube"></i> 
              </a>

              <a  className='twBtn' href="https://twitter.com/multiplanet_guy" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
             
              <p>Built by arbus</p>
            </div>
             :
              ''}
          </div>
        </div>
        
        <div className={
          (activeObject==='mars') || (activeObject==='earth') ? 'audioSection extraWeird' : 'audioSection'}>
        <i className="fa-solid fa-headphones" style={{"color":"white", "fontSize":"250%"}}></i>
       
       {activeObject === '' ? 
       <>
        <p>We're in outer space right now. There's no sound here:( <a onClick={()=>setSpan(!disabledSpan)}>You wanna know why?</a></p>
        <p className={disabledSpan ? 'disabledSpan': 'enabledSpan'}>Sound travels in waves like light or heat does, but unlike them, sound travels by making molecules vibrate. So, in order for sound to travel, there has to be something with molecules for it to travel through. On Earth, sound travels to your ears by vibrating air molecules. In deep space, the large empty areas between stars and planets, there are no molecules to vibrate.</p>
        </>
        :
        
        activeObject === 'moon' ? 
        <>
        <p>Let's listen to the famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
        </>
        :
        
        activeObject === 'mars' ? 
        <>
        <p>Let's to listen to Martian wind captured by <em>Perseverance Rover’s SuperCam</em></p>
        </>
        :
        
        activeObject === 'LEO' ? 
        <>
         <p>Let's listen to Chorus Radio Waves within Earth's Atmosphere</p>
        </>
       :''}
        
       {activeObject===''?'':
       <a className={activeAudioPlayer==='playing'? 'audioBtn inActive':'audioBtn'} 
       onClick={()=> {
         soundPlay()
         setAudioPlayer('playing')
         }}>{activeAudioPlayer==='' ? <i className="fa-solid fa-circle-play"></i> : <i className="fa-solid fa-circle-pause" style={{"color":"darkred"}}></i>}</a>}
        {(activeObject==='moon') || (activeObject==='mars') || (activeObject==='LEO')? 
        <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p> : ''}
        </div>
        
        <div className={(activeObject==='mars') || (activeObject==='earth')?'extraInfo extraWeird' : 'extraInfo'}>
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
            {activeLight==='ambient' ? 
              <p>Enough enlightenment. Click the yellow lightbulb to see the real Moon with its dark side.</p> :
              <p>Have you ever wondered how the Dark Side of the Moon look like? Click the lightbulb to see!</p>}
              {activeLight==='' ?
              <a className='lightBtn' onClick={()=>setLight('ambient')}>
                  <i className="fas fa-lightbulb" style={activeLight==='ambient' ? {"color":"yellow"}: {}}></i>
              </a> :
              <a className='lightBtn' onClick={()=>setLight('')}>
                  <i className="fas fa-lightbulb" style={activeLight==='ambient' ? {"color":"yellow"}: {}}></i>
              </a>
            } 
          </>
        :
          <>
            <i className="fa-solid fa-computer-mouse" style={{"color":"white", "fontSize":"250%"}}></i>
            {(activeObject==='LEO') && (showAction==='launchpad') ? 
            <>
              <p>Click and drag the Earth to see all available inter-planetary launchpads.</p>
              <p>Click the launchpad (green or red ball) to have more information about them.</p>
            </>
            : <p>You can either double-click the cellestial body or press one of the below buttons to discover your next destination</p>}
          </>
          }
           <div style={{"display":"flex"}}>
                    {activeObject==='earth' ? '' : 
                    <a className='home-btn earthBtn' onClick={()=>setObject('earth')} title="Earth">
                    <i className="fa-solid fa-earth-americas"></i></a>}
                    {activeObject==='moon' ? '' :
                    <a className='home-btn moonBtn' onClick={()=>setObject('moon')} title="Moon">
                    <i className="fa-solid fa-moon"></i></a>}
                    {activeObject==='mars' ? '' : 
                    <a className='home-btn marsBtn' onClick={()=>setObject('mars')} title="Mars">
                    <i className="fa-solid fa-bowling-ball"></i>
                    </a>}
                    {activeObject===''?'':
                    <a className='home-btn homeBtn' 
                      onClick={()=>{
                        setObject('')
                        setLight('')
                        setAction('')
                        setLaunchPad('')}} title="Home">
                    <i className="fas fa-home"></i>
                    </a>}
                  </div>
        </div>
      </Html>
    )}