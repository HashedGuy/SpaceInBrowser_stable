import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import MoonMap from "../assets/compressed/2k_moon(1).jpg"

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
      <lineBasicMaterial attach="material" color="gray" linewidth={1} />
    </line>
  );
}

export function Moon(props) {
  const [moonMap] = useLoader(
    TextureLoader,
    [MoonMap]
  );

  const [activeObject, setObject] = useState('')

 
//   const marsRef = useRef()

//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();

//     earthRef.current.rotation.y = elapsedTime / 150;
//     cloudsRef.current.rotation.y = elapsedTime / 150;
//   });

  return (
    <>
      <mesh 
        position={
          activeObject === 'earth' ? [2, 2, 1]
          : 
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
      <Ecliptic xRadius={9} zRadius={3.5}/>
    </>
  );
}
export default Moon;
