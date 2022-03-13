import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'
import { useRecoilState } from 'recoil';
import { clickedCBState } from './globalState';
import { InfoBox } from './InfoBox/Landing';

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/2k_earth_clouds.jpg"
import MoonMap from "../assets/compressed/2k_moon(1).jpg"
import MarsMap from "../assets/compressed/2k_mars(1).jpg"

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
  const [colorMap, normalMap, specularMap, cloudsMap, moonMap, marsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, MoonMap, MarsMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)

  const earthRef = useRef();
  const cloudsRef = useRef();

  let xRadius=6
  let zRadius=3.5
  let yRadius=0

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .006;
    
    const x = xRadius * Math.sin(elapsedTime)
    const z = zRadius * Math.cos(elapsedTime)
    activeObject === '' ? (earthRef.current.position.x = x) 
      : activeObject === 'moon' ? (earthRef.current.position.x = 9) 
      : activeObject === 'mars' ? (earthRef.current.position.x = -9) 
      : (earthRef.current.position.x = 0)    
    activeObject === '' ? (cloudsRef.current.position.x = x) 
      : activeObject === 'moon' ? (cloudsRef.current.position.x = 9)
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
  

    activeObject === '' ? (earthRef.current.rotation.y += .01) 
      : (earthRef.current.rotation.y += .005) 
    activeObject === '' ? (cloudsRef.current.rotation.y += .01) 
      : (cloudsRef.current.rotation.y += .005)
  });

  return (
    <>
      <InfoBox />
      <pointLight 
        color="#f6f3ea" 
        position={
          activeObject === '' ? [0, 0, 0]
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
          activeObject === 'earth' ? 2 
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
          activeObject === 'earth' ? 2 
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
      {activeObject === '' ? <Ecliptic xRadius={xRadius} zRadius={zRadius}/> : ''}
      {activeObject === 'earth' ? 
      
      <Ecliptic xRadius={2.2} zRadius={2.2} yRadius={0}/> :

      activeObject === 'LEO' ? 
      <Ecliptic xRadius={3.8} zRadius={3.8} yRadius={0}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
       {activeObject === 'earth' ? 
      
      <Ecliptic xRadius={2.5} zRadius={2.2} yRadius={.4}/>
      
      : <Ecliptic xRadius={0} zRadius={0}/>  }
     
    </>
  );
}
export default Earth;
