import { useFrame, useLoader, extend } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef} from 'react';
import * as THREE from 'three'
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedCBState, closedAudioG, launchpads, lights, showActions, stations } from './globalState';
import {Landing} from './InfoBox/Landing';

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthCountryMap from "../assets/compressed/feltTexture.png"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/compressed/8k_earth_clouds-min.jpeg"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Font from "../assets/fontLight.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import Mapp from '../Mapp';

extend({ TextGeometry })

function Ecliptic({ xRadius, zRadius, yRadius, color }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    const y = yRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z));
  }points.push(points[0]);const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color={color} linewidth={.1} />
    </line>
  );
}

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap, countryMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, EarthCountryMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const [activeLaunchPad, setLaunchPad] = useRecoilState(launchpads)
  const [closedAudio, setCloseAudio] = useRecoilState(closedAudioG)
  const showAction = useRecoilValue(showActions)
  const light = useRecoilValue(lights)
  const station = useRecoilValue(stations)

  const earthRef = useRef();
  const cloudsRef = useRef();

  let xRadius=5
  let zRadius=3.5

  function calcPosFromLatLngRad(lat, lng) {
    var phi = (90 - lat)*(Math.PI/180)
    var theta = (lng+180)*(Math.PI/180)
    let x = -(Math.sin(phi)*Math.cos(theta))*3.5
    let z = (Math.sin(phi)*Math.sin(theta)) *3.5
    let y = (Math.cos(phi))*3.5
    return {x, y, z}
  }

  const font = new FontLoader().parse(Font);

  const textOptions = {
    font,
    size: showAction==='crewPad' ? .035: 0,
    height: .009
  };

  let pointKSC = {
    lat:28.973469,
    lng:	-80.651070 
  }
  let pointSB = {
    lat: 25.997053 ,
    lng:	-97.155281 
  }
  let pointCCSC= {
    lat: 28.210351,
    lng:	-80.618813
  }
  let pointGSS= {
    lat: 5.167713,
    lng:	-52.683994
  }
  let pointBC= {
    lat: 45.616669,
    lng: 63.316666
  }
  let pointVSFB= {
    lat: 34.77204,
    lng: -120.60124
  }
  let pointWSLC= {
    lat: 19.6291,
    lng: 110.955
  }
  let pointSDSC= {
    lat: 13.73740,
    lng: 80.23510
  }
  let pointUSC= {
    lat: 31.25186,
    lng: 131.07914
  }
  let pointTSC= {
    lat: 30.39096,
    lng: 130.96813
  }
  let pointJSLC= {
    lat: 40.958056,
    lng: 100.291111
  }
  let pointXSLC= {
    lat: 28.246017,
    lng: 102.026556
  }
  let pointTSLC= {
    lat: 38.849086,
    lng: 111.608497
  }
  let pointPA= {
    lat: 31.897778,
    lng: 34.690556
  }
  let pointPSC= {
    lat: 57.435833,
    lng: -152.337778
  }
  let pointDAB= {
    lat: 51.093889,
    lng: 59.842222
  }
  let pointMARS= {
    lat: 37.843333,
    lng: -75.478056
  }
  let pointSSC= {
    lat: 35.2346,
    lng: 53.9221
  }
  let pointSSLS= {
    lat: 39.66,
    lng: 124.705
  }
  let pointNSC= {
    lat: 34.431944,
    lng: 127.535
  }
  let pointVC= {
    lat: 51.884395,
    lng: 128.333932
  }
  let pointRL= {
    lat: -39.2615,
    lng: 177.864876
  }

  let posKSC = calcPosFromLatLngRad(pointKSC.lat, pointKSC.lng)
  let posSB = calcPosFromLatLngRad(pointSB.lat, pointSB.lng)
  let posCCSC = calcPosFromLatLngRad(pointCCSC.lat, pointCCSC.lng)
  let posGSS = calcPosFromLatLngRad(pointGSS.lat, pointGSS.lng)
  let posBC = calcPosFromLatLngRad(pointBC.lat, pointBC.lng)
  let posVSFB = calcPosFromLatLngRad(pointVSFB.lat, pointVSFB.lng)
  let posWSLC = calcPosFromLatLngRad(pointWSLC.lat, pointWSLC.lng)
  let posSDSC = calcPosFromLatLngRad(pointSDSC.lat, pointSDSC.lng)
  let posUSC = calcPosFromLatLngRad(pointUSC.lat, pointUSC.lng)
  let posTSC = calcPosFromLatLngRad(pointTSC.lat, pointTSC.lng)
  let posJSLC = calcPosFromLatLngRad(pointJSLC.lat, pointJSLC.lng)
  let posXSLC = calcPosFromLatLngRad(pointXSLC.lat, pointXSLC.lng)
  let posTSLC = calcPosFromLatLngRad(pointTSLC.lat, pointTSLC.lng)
  let posPA = calcPosFromLatLngRad(pointPA.lat, pointPA.lng)
  let posPSC = calcPosFromLatLngRad(pointPSC.lat, pointPSC.lng)
  let posDAB = calcPosFromLatLngRad(pointDAB.lat, pointDAB.lng)
  let posMARS = calcPosFromLatLngRad(pointMARS.lat, pointMARS.lng)
  let posSSC = calcPosFromLatLngRad(pointSSC.lat, pointSSC.lng)
  let posSSLS = calcPosFromLatLngRad(pointSSLS.lat, pointSSLS.lng)
  let posNSC = calcPosFromLatLngRad(pointNSC.lat, pointNSC.lng)
  let posVC = calcPosFromLatLngRad(pointVC.lat, pointVC.lng)
  let posRL = calcPosFromLatLngRad(pointRL.lat, pointRL.lng)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .006;
    
    const x = xRadius * Math.sin(elapsedTime)
    const z = zRadius * Math.cos(elapsedTime)
    activeObject === '' ? (earthRef.current.position.x = x) 
      : activeObject === 'moon' ? (earthRef.current.position.x = 15) 
      : activeObject === 'mars' ? (earthRef.current.position.x = -9) 
      : (earthRef.current.position.x = 0)    
    activeObject === '' ? (cloudsRef.current.position.x = x) 
      : activeObject === 'moon' ? (cloudsRef.current.position.x = 15)
      : activeObject === 'mars' ? (cloudsRef.current.position.x = -9) 
      : (cloudsRef.current.position.x = 0)
   
    activeObject === '' ? (earthRef.current.position.z = z) 
      : activeObject === 'moon' ? (earthRef.current.position.z = 2)
      : activeObject === 'mars' ? (earthRef.current.position.z = -2) 
      : (earthRef.current.position.z = 0)
    activeObject === '' ? (cloudsRef.current.position.z = z) 
      : activeObject === 'moon' ? (cloudsRef.current.position.z = 2)
      : activeObject === 'mars' ? (cloudsRef.current.position.z = -2) 
      : (cloudsRef.current.position.z = 0)
  });

  const sphere = (x) => new THREE.SphereGeometry(x, 36, 36)

  return (
    <>
      <Landing/>
      
      {light === 'ambient' ?
      <ambientLight intensity={1} color="#f6f3ea"/> : 
      <pointLight 
        color="#f6f3ea" 
        position={
          activeObject === '' ? [0, 0, 0] : activeObject === 'moon' ? [39, 0, 9]
          : [2, 0, 6]} 
        intensity={1.1} 
      />}
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh 
        ref={cloudsRef} 
        geometry={sphere(1.001)}
        scale={
          activeObject === 'earth' ? 1 
          :
          activeObject === 'moon' ? 2 
          :
          activeObject === 'mars' ? .1
          :
          (activeObject === 'LEO') && (station === '') ? 3.5
          :
          (activeObject === 'LEO') && (station !=='') ? 4
          : .6
        }
      >
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh 
        ref={earthRef} 
        geometry={sphere(1)}
        onDoubleClick={()=>setObject('earth')}
        scale={
          activeObject === 'earth' ? 1 
          :
          activeObject === 'moon' ? 2 
          :
          activeObject === 'mars' ? .1
          :
          (activeObject === 'LEO') && (station === '') ? 3.5
          :
          (activeObject === 'LEO') && (station !== '') ? 4
          : .6
        }

      >
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          panSpeed={0.5}
          rotateSpeed={.9}
        />
      </mesh>

      <mesh
        position={[posKSC.x,posKSC.y,posKSC.z]}
        onClick={()=>setLaunchPad('KSC')}
        geometry={showAction==='crewPad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posKSC.x,posKSC.y,posKSC.z]}
        onClick={()=>setLaunchPad('KSC')}
      >
        
        <textGeometry attach='geometry' args={['   LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
        position={[posSB.x,posSB.y,posSB.z]}
        
        onClick={()=>setLaunchPad('SB')}
        geometry={showAction==='crewPad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posSB.x,posSB.y,posSB.z]}
        onClick={()=>setLaunchPad('SB')}
      >
        <textGeometry attach='geometry' args={['   LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
        position={[posCCSC.x,posCCSC.y,posCCSC.z]}
        onClick={()=>setLaunchPad('CCSFS')}
        geometry={showAction==='crewPad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posCCSC.x,posCCSC.y,posCCSC.z]}
        onClick={()=>setLaunchPad('CCSFS')}
      >
         <textGeometry attach='geometry' args={['    LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
        position={[posGSS.x,posGSS.y,posGSS.z]}
        onClick={()=>setLaunchPad('GSS')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posBC.x,posBC.y,posBC.z]}
        onClick={()=>{
          setLaunchPad('BC')
          setCloseAudio(true)}}
        geometry={showAction==='crewPad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posVSFB.x,posVSFB.y,posVSFB.z]}
        onClick={()=>setLaunchPad('VSFB')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posWSLC.x,posWSLC.y,posWSLC.z]}
        onClick={()=>setLaunchPad('WSLC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posSDSC.x,posSDSC.y,posSDSC.z]}
        onClick={()=>setLaunchPad('SDSC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posUSC.x,posUSC.y,posUSC.z]}
        onClick={()=>setLaunchPad('USC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posTSC.x,posTSC.y,posTSC.z]}
        onClick={()=>setLaunchPad('TSC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posJSLC.x,posJSLC.y,posJSLC.z]}
        onClick={()=>{
          setLaunchPad('JSLC')
          setCloseAudio(true)}}
        geometry={showAction==='crewPad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
        position={[posXSLC.x,posXSLC.y,posXSLC.z]}
        onClick={()=>setLaunchPad('XSLC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posTSLC.x,posTSLC.y,posTSLC.z]}
        onClick={()=>setLaunchPad('TSLC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posPA.x,posPA.y,posPA.z]}
        onClick={()=>setLaunchPad('PA')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posPSC.x,posPSC.y,posPSC.z]}
        onClick={()=>setLaunchPad('PSC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posDAB.x,posDAB.y,posDAB.z]}
        onClick={()=>setLaunchPad('DAB')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posMARS.x,posMARS.y,posMARS.z]}
        onClick={()=>setLaunchPad('MARS')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posSSC.x,posSSC.y,posSSC.z]}
        onClick={()=>setLaunchPad('SSC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posSSLS.x,posSSLS.y,posSSLS.z]}
        onClick={()=>setLaunchPad('SSLS')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posNSC.x,posNSC.y,posNSC.z]}
        onClick={()=>setLaunchPad('NSC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posVC.x,posVC.y,posVC.z]}
        onClick={()=>setLaunchPad('VC')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posRL.x,posRL.y,posRL.z]}
        onClick={()=>setLaunchPad('RL')}
        geometry={showAction==='satellitePad'? sphere(0.02) : sphere(0)}
      >
        <meshBasicMaterial color={0xff0000}/>
      </mesh>
     

      {activeObject === '' ? 
      <Ecliptic color={'transparent'} xRadius={5} zRadius={3.5} yRadius={0}/> : ''}
      {activeObject === 'earth' ? 
      
      <Ecliptic color={'orange'} xRadius={1.05} zRadius={1.05} yRadius={.3}/> :

      (activeObject === 'LEO') && (station === '') ? <Ecliptic color={'orange'} xRadius={3.8} zRadius={3.8} yRadius={.2}/>
      :
      (activeObject === 'LEO') && (station !=='') ? <Ecliptic color={'orange'} xRadius={4.2} zRadius={4.2} yRadius={.2}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
      
      {activeObject === 'earth' ? 
        <Ecliptic color={'red'} xRadius={1.052} zRadius={1.052} yRadius={-.4}/>
        :
        (activeObject === 'LEO') && (station === '') ? <Ecliptic color={'red'} xRadius={3.85} zRadius={3.85} yRadius={-1.5}/>
        :
        (activeObject === 'LEO') && (station !=='') ? <Ecliptic color={'red'} xRadius={4.2} zRadius={4.2} yRadius={-1.5}/>
        : <Ecliptic xRadius={0} zRadius={0}/>  }
     
    </>
  );
}
export default Earth;
