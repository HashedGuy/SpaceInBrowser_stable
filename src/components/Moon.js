import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import MoonMap from "../assets/compressed/2k_moon(1).jpg"
import { useRecoilState } from 'recoil';
import { clickedCBState } from './globalState';

function Ecliptic({ xRadius = 1, zRadius = 1, yRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    // const y = yRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }points.push(points[0]);const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="gray" linewidth={.1} />
    </line>
  );
}

export function Moon(props) {
  const [moonMap] = useLoader(
    TextureLoader,
    [MoonMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)

  const moonRef = useRef()
  let zRadius
  let xRadius
  let yRadius
  activeObject === '' ? (xRadius=9.5) 
    : activeObject === 'earth' ? (xRadius=6)
    : activeObject === 'mars' ? (xRadius=-3)
    : (xRadius=0)
  activeObject === '' ? (zRadius=4.5) 
    : activeObject === 'earth' ? (zRadius=5.5)
    : activeObject === 'mars' ? (zRadius=0) 
    : (zRadius=0)
  activeObject === '' ? (yRadius=0) 
    : activeObject === 'earth' ? (yRadius=0) 
    : (yRadius=0)
  
  let lan = -69.6000 * Math.PI/180
  let lat = 18.4500 * Math.PI/180
 
  let xP = Math.cos(lan)*Math.sin(lat)
  let yP = Math.sin(lan)*Math.cos(lat)
  let zP = Math.cos(lat)

  useFrame(({ clock }) => {
    let elapsedTime
    activeObject === 'mars'?
    (elapsedTime = clock.getElapsedTime() * 0) 
    : (elapsedTime = clock.getElapsedTime() * 0.006)
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.cos(elapsedTime)
    moonRef.current.position.x = x;
    moonRef.current.position.z = z;
    moonRef.current.position.y = y;

    moonRef.current.rotation.y += .0001;

  });

  return (
    <>
      <mesh 
        ref={moonRef}
        scale={
          activeObject === '' ? 1 
          :
          activeObject === 'earth' ? 2 
          :
          activeObject === 'mars' ? .1
          : 6
        }
        onDoubleClick={()=>setObject('moon')}
        
      >
        <sphereBufferGeometry args={[0.25, 32, 32]} />
        <meshPhongMaterial
          map={moonMap}
          opacity={1}
          depthWrite={true}
          transparent={false}
          side={THREE.DoubleSide}
        />       
      </mesh>

      {/* Adding pins */}
      {/* <mesh
        position={[xP,yP,zP]}
      >
        <sphereBufferGeometry args={[0.1, 30, 30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh> */}
      {activeObject === 'mars' ? '' : <Ecliptic xRadius={xRadius} zRadius={zRadius}/>}
    </>
  );
}
export default Moon;
