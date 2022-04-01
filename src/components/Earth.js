import { useFrame, useLoader, lineBasicMaterial, extend } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedCBState, launchpads, lights, showActions, stations } from './globalState';
import { InfoBox } from './InfoBox/Landing';

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/2k_earth_clouds.jpg"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Font from "../assets/fontLight.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

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
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const [activeLaunchPad, setLaunchPad] = useRecoilState(launchpads)
  const showAction = useRecoilValue(showActions)
  const light = useRecoilValue(lights)
  const station = useRecoilValue(stations)

  const earthRef = useRef();
  const cloudsRef = useRef();
  const pinRef = useRef()

  let xRadius=5
  let zRadius=3.5
  let yRadius=0

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

  let pointKSS = {
    lat:28.973469,
    lng:	-80.651070 
  }
  let pointStarbase = {
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
  let pointBSS= {
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
  let pointPalmachim= {
    lat: 31.897778,
    lng: 34.690556
  }
  let pointPSC= {
    lat: 57.435833,
    lng: -152.337778
  }
  let pointYasny= {
    lat: 51.093889,
    lng: 59.842222
  }
  let pointMARS= {
    lat: 37.843333,
    lng: -75.478056
  }
  let pointSemnan= {
    lat: 35.2346,
    lng: 53.9221
  }
  let pointSohae= {
    lat: 39.66,
    lng: 124.705
  }
  let pointNaro= {
    lat: 34.431944,
    lng: 127.535
  }
  let pointVostochny= {
    lat: 51.884395,
    lng: 128.333932
  }
  let pointRocketLab= {
    lat: -39.2615,
    lng: 177.864876
  }

  let posKSS = calcPosFromLatLngRad(pointKSS.lat, pointKSS.lng)
  let posStarbase = calcPosFromLatLngRad(pointStarbase.lat, pointStarbase.lng)
  let posCCSC = calcPosFromLatLngRad(pointCCSC.lat, pointCCSC.lng)
  let posGSS = calcPosFromLatLngRad(pointGSS.lat, pointGSS.lng)
  let posBSS = calcPosFromLatLngRad(pointBSS.lat, pointBSS.lng)
  let posVSFB = calcPosFromLatLngRad(pointVSFB.lat, pointVSFB.lng)
  let posWSLC = calcPosFromLatLngRad(pointWSLC.lat, pointWSLC.lng)
  let posSDSC = calcPosFromLatLngRad(pointSDSC.lat, pointSDSC.lng)
  let posUSC = calcPosFromLatLngRad(pointUSC.lat, pointUSC.lng)
  let posTSC = calcPosFromLatLngRad(pointTSC.lat, pointTSC.lng)
  let posJSLC = calcPosFromLatLngRad(pointJSLC.lat, pointJSLC.lng)
  let posXSLC = calcPosFromLatLngRad(pointXSLC.lat, pointXSLC.lng)
  let posTSLC = calcPosFromLatLngRad(pointTSLC.lat, pointTSLC.lng)
  let posPalmachim = calcPosFromLatLngRad(pointPalmachim.lat, pointPalmachim.lng)
  let posPSC = calcPosFromLatLngRad(pointPSC.lat, pointPSC.lng)
  let posYasny = calcPosFromLatLngRad(pointYasny.lat, pointYasny.lng)
  let posMARS = calcPosFromLatLngRad(pointMARS.lat, pointMARS.lng)
  let posSemnan = calcPosFromLatLngRad(pointSemnan.lat, pointSemnan.lng)
  let posSohae = calcPosFromLatLngRad(pointSohae.lat, pointSohae.lng)
  let posNaro = calcPosFromLatLngRad(pointNaro.lat, pointNaro.lng)
  let posVostochny = calcPosFromLatLngRad(pointVostochny.lat, pointVostochny.lng)
  let posRocketLab = calcPosFromLatLngRad(pointRocketLab.lat, pointRocketLab.lng)

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

  return (
    <>
      <InfoBox />
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
        scale={
          activeObject === 'earth' ? 1 
          :
          activeObject === 'moon' ? 2 
          :
          activeObject === 'mars' ? .1
          :
          (activeObject === 'LEO') && (station === '') ? 3.5
          :
          (activeObject === 'LEO') && (station != '') ? 4
          : .6
        }
      >
        
        <sphereBufferGeometry args={[1.005, 32, 32]} />
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
          (activeObject === 'LEO') && (station != '') ? 4
          : .6
        }

      >
        <sphereBufferGeometry 
          args={[1, 36, 36]}          
          
        />
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
       ref={pinRef}
        position={[posKSS.x,posKSS.y,posKSS.z]}
        onClick={()=>setLaunchPad('KSS')}
      >
        <sphereBufferGeometry args={showAction==='crewPad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posKSS.x,posKSS.y,posKSS.z]}
        onClick={()=>setLaunchPad('KSS')}
      >
        
        <textGeometry attach='geometry' args={['   LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
       ref={pinRef}
        position={[posStarbase.x,posStarbase.y,posStarbase.z]}
        onClick={()=>setLaunchPad('Starbase')}
      >
        <sphereBufferGeometry args={showAction==='crewPad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posStarbase.x,posStarbase.y,posStarbase.z]}
        onClick={()=>setLaunchPad('Starbase')}
      >
        <textGeometry attach='geometry' args={['   LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
       ref={pinRef}
        position={[posCCSC.x,posCCSC.y,posCCSC.z]}
        onClick={()=>setLaunchPad('CCSFS')}
      >
        <sphereBufferGeometry args={showAction==='crewPad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posCCSC.x,posCCSC.y,posCCSC.z]}
        onClick={()=>setLaunchPad('CCSFS')}
      >
         <textGeometry attach='geometry' args={['    LIVE', textOptions]} />
        <meshStandardMaterial attach='material' color={'red'} />
      </mesh>

      <mesh
       ref={pinRef}
        position={[posGSS.x,posGSS.y,posGSS.z]}
        onClick={()=>setLaunchPad('GSS')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posBSS.x,posBSS.y,posBSS.z]}
        onClick={()=>setLaunchPad('BSS')}
      >
        <sphereBufferGeometry args={showAction==='crewPad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posVSFB.x,posVSFB.y,posVSFB.z]}
        onClick={()=>setLaunchPad('SLC-4/VSFB')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posWSLC.x,posWSLC.y,posWSLC.z]}
        onClick={()=>setLaunchPad('WSLC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posSDSC.x,posSDSC.y,posSDSC.z]}
        onClick={()=>setLaunchPad('SDSC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posUSC.x,posUSC.y,posUSC.z]}
        onClick={()=>setLaunchPad('USC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posTSC.x,posTSC.y,posTSC.z]}
        onClick={()=>setLaunchPad('TSC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posJSLC.x,posJSLC.y,posJSLC.z]}
        onClick={()=>setLaunchPad('JSLC')}
      >
        <sphereBufferGeometry args={showAction==='crewPad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posXSLC.x,posXSLC.y,posXSLC.z]}
        onClick={()=>setLaunchPad('XSLC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posTSLC.x,posTSLC.y,posTSLC.z]}
        onClick={()=>setLaunchPad('TSLC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posPalmachim.x,posPalmachim.y,posPalmachim.z]}
        onClick={()=>setLaunchPad('Palmachim')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad' ? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posPSC.x,posPSC.y,posPSC.z]}
        onClick={()=>setLaunchPad('PSC')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posYasny.x,posYasny.y,posYasny.z]}
        onClick={()=>setLaunchPad('Yasny')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posMARS.x,posMARS.y,posMARS.z]}
        onClick={()=>setLaunchPad('MARS')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posSemnan.x,posSemnan.y,posSemnan.z]}
        onClick={()=>setLaunchPad('Semnan')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posSohae.x,posSohae.y,posSohae.z]}
        onClick={()=>setLaunchPad('Sohae')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posNaro.x,posNaro.y,posNaro.z]}
        onClick={()=>setLaunchPad('Naro')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posVostochny.x,posVostochny.y,posVostochny.z]}
        onClick={()=>setLaunchPad('Vostochny')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posRocketLab.x,posRocketLab.y,posRocketLab.z]}
        onClick={()=>setLaunchPad('RocketLab')}
      >
        <sphereBufferGeometry args={showAction==='satellitePad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>
     

      {activeObject === '' ? 
      <Ecliptic color={'transparent'} xRadius={5} zRadius={3.5} yRadius={0}/> : ''}
      {activeObject === 'earth' ? 
      
      <Ecliptic color={'orange'} xRadius={1.05} zRadius={1.05} yRadius={.3}/> :

      // activeObject === 'LEO' ? 
      // <Ecliptic color={'orange'} xRadius={3.8} zRadius={3.8} yRadius={.2}/>
      (activeObject === 'LEO') && (station === '') ? <Ecliptic color={'orange'} xRadius={3.8} zRadius={3.8} yRadius={.2}/>
      :
      (activeObject === 'LEO') && (station !='') ? <Ecliptic color={'orange'} xRadius={4.2} zRadius={4.2} yRadius={.2}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
      
      {activeObject === 'earth' ? 
        <Ecliptic color={'red'} xRadius={1.052} zRadius={1.052} yRadius={-.4}/>
        :
        // activeObject === 'LEO' ? 
        // <Ecliptic color={'red'} xRadius={3.85} zRadius={3.85} yRadius={-1.5}/>
        (activeObject === 'LEO') && (station === '') ? <Ecliptic color={'red'} xRadius={3.85} zRadius={3.85} yRadius={-1.5}/>
        :
        (activeObject === 'LEO') && (station !='') ? <Ecliptic color={'red'} xRadius={4.2} zRadius={4.2} yRadius={-1.5}/>
        : <Ecliptic xRadius={0} zRadius={0}/>  }
     
    </>
  );
}
export default Earth;
