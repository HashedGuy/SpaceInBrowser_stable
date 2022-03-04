import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/2k_earth_clouds.jpg"
import MoonMap from "../assets/compressed/2k_moon(1).jpg"
import MarsMap from "../assets/compressed/2k_mars(1).jpg"

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
      <lineBasicMaterial attach="material" color="yellow" linewidth={.1} />
    </line>
  );
}

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap, moonMap, marsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, MoonMap, MarsMap]
  );

  const [activeObject, setObject] = useState('')

  const earthRef = useRef();
  const cloudsRef = useRef();
  // const marsRef = useRef()
  let xRadius=6
  let zRadius=3.5

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .006;
    
    const x = xRadius * Math.sin(elapsedTime)
    const z = zRadius * Math.cos(elapsedTime)
    earthRef.current.position.x = x;
    cloudsRef.current.position.x = x;
    earthRef.current.position.z = z;
    cloudsRef.current.position.z = z;

    earthRef.current.rotation.y += .01;
    cloudsRef.current.rotation.y += .01;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={1.1} />
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
        position={
          activeObject === 'moon' ? [-1, 1, 1]
          :
          activeObject === 'mars' ? [-6, 3, -3]
          :
          [0, 0, 2]
        }
        scale={
          activeObject === 'earth' ? 2 
          :
          activeObject === 'mars' ? .1
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
        position={
          activeObject === 'moon' ? [-1, 1, 1]
          :
          activeObject === 'mars' ? [-6, 3, -3]
          :
          [0, 0, 2]
        }
        onDoubleClick={()=>setObject('earth')}
        scale={
          activeObject === 'earth' ? 2 
          :
          activeObject === 'mars' ? .1
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
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          // zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={.9}
          // minZoom={1}
          // maxZoom={1.2}
          // maxPolarAngle={Math.PI / 3}
          // minPolarAngle={Math.PI / 2}
        />
      </mesh>
      {/* <mesh 
        position={
          activeObject === 'earth' ? [2, 2, 1]
          : 
          activeObject === 'moon' ? [0, 0, 0]

          :
          activeObject === 'mars' ? [-6.1, 3, -3]

          : [1, 1, 1]}
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
      </mesh> */}
      {/* <CurveModifier ref={curveRef} curve={curve}> */}
      {/* <mesh 
        // ref={marsRef} 
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
        
      </mesh> */}
      <Ecliptic xRadius={xRadius} zRadius={zRadius}/>
      {/* <Ecliptic xRadius={8} zRadius={2}/> */}
      {/* </CurveModifier> */}
      {/* <OrbitControls
          enableZoom={false}
          enablePan
          enableRotate
          // autoRotate
          // zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.1}
         
        /> */}
    </>
  );
}
export default Earth;
