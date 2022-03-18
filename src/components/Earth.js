import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedCBState, showActions } from './globalState';
import { InfoBox } from './InfoBox/Landing';

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/2k_earth_clouds.jpg"

function Ecliptic({ xRadius = 1, zRadius = 1, yRadius = 0 }) {
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
      <lineBasicMaterial attach="material" color="yellow" linewidth={.1} />
    </line>
  );
}

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)
  const showAction = useRecoilValue(showActions)

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

  let pointKSS = {
    lat:28.573469,
    lng:	-80.651070 
  }

  let pointStarbase = {
    lat: 25.997053 ,
    lng:	-97.155281 
  }
  
  let pointCCSC= {
    lat: 28.410351,
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
  

    // activeObject === '' ? (earthRef.current.rotation.y += .01) :
    // activeObject === 'LEO' ?  (earthRef.current.rotation.y += 0)
    //   : (earthRef.current.rotation.y += .005) 

    // activeObject === '' ? (cloudsRef.current.rotation.y += .01) :
    // activeObject === 'LEO' ?  (cloudsRef.current.rotation.y += .001)
    //   : (cloudsRef.current.rotation.y += .005)
    
    // activeObject === 'LEO' ? (pinRef.current.position.x = 3) : (pinRef.current.position.x = 0)
  });

  return (
    <>
      <InfoBox />
      <pointLight 
        color="#f6f3ea" 
        position={
          activeObject === '' ? [0, 0, 0] : activeObject === 'moon' ? [39, 0, 9]
          : [2, 0, 6]} 
        intensity={1.1} 
      />
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
          activeObject === 'LEO' ? 3.5
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
          activeObject === 'LEO' ? 3.5
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
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posStarbase.x,posStarbase.y,posStarbase.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posCCSC.x,posCCSC.y,posCCSC.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posGSS.x,posGSS.y,posGSS.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posBSS.x,posBSS.y,posBSS.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posVSFB.x,posVSFB.y,posVSFB.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posWSLC.x,posWSLC.y,posWSLC.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posSDSC.x,posSDSC.y,posSDSC.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posUSC.x,posUSC.y,posUSC.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>

      <mesh
       ref={pinRef}
        position={[posTSC.x,posTSC.y,posTSC.z]}
      >
        <sphereBufferGeometry args={showAction==='launchpad'? [0.02, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>
     

      {activeObject === '' ? <Ecliptic xRadius={xRadius} zRadius={zRadius}/> : ''}
      {activeObject === 'earth' ? 
      
      <Ecliptic xRadius={1.05} zRadius={1.05} yRadius={0}/> :

      activeObject === 'LEO' ? 
      <Ecliptic xRadius={3.8} zRadius={3.8} yRadius={0}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
       {activeObject === 'earth' ? 
      
      <Ecliptic xRadius={1.05} zRadius={1.05} yRadius={.4}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
     
    </>
  );
}
export default Earth;
