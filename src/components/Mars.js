import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import MarsMap from "../assets/compressed/2k_mars(1).jpg"
import { useRecoilState } from 'recoil';
import { clickedCBState } from './globalState';

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }points.push(points[0]);const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="red" linewidth={.1} />
    </line>
  );
}

export function Mars(props) {
  const [marsMap] = useLoader(
    TextureLoader,
    [MarsMap]
  );

  const [activeObject, setObject] = useRecoilState(clickedCBState)

 
  const marsRef = useRef()
  let xRadius
  let zRadius

  activeObject === 'earth' ? xRadius=18 : xRadius=12
  activeObject === 'earth' ? zRadius= 14 : zRadius=7

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .004;
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    marsRef.current.position.x = x;
    marsRef.current.position.z = z;
    marsRef.current.rotation.y += .01;

  });

  return (
    <>
      <mesh 
        ref={marsRef} 
        position={
          activeObject === 'mars' ? [0, 0, 0]
          :[-12, 0, 0]
        }
        scale={
          (activeObject === 'earth') || (activeObject === 'moon') ? .3 
          :
          activeObject === 'mars' ? 3
          : 1}
          onDoubleClick={()=>setObject('mars')}
      >
        <sphereBufferGeometry args={[0.50, 32, 32]} />
        <meshStandardMaterial
          map={marsMap}
          metalness={0.4}
          roughness={0.7}
        />
        
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius}/>
    
    </>
  );
}
export default Mars;
