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
    const y = yRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z));
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
  activeObject === '' ? (xRadius=9.5) : (xRadius=6)
  activeObject === '' ? (zRadius=4.5) : (zRadius=3.5)
  activeObject === '' ? (yRadius=0) : (yRadius=0)

 

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .006;
    
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
        position={
          // activeObject === 'earth' ? [2, 2, 1]
          // : 
          activeObject === 'moon' ? [0, 0, 0]

          :
          activeObject === 'mars' ? [-6.1, 3, -3]

          : [0, 0, 3.5]}
        scale={
          activeObject === 'earth' ? 2 
          :
          activeObject === 'mars' ? .1
          : 1
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
      <Ecliptic xRadius={xRadius} zRadius={zRadius} yRadius={yRadius}/>
    </>
  );
}
export default Moon;
