import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import EarthDayMap from "../assets/compressed/8k_earth_daymap(1).jpg"
import EarthNormalMap from "../assets/compressed/8k_earth_normal_map(1).jpg"
import EarthSpecularMap from "../assets/compressed/8k_earth_specular_map(1).jpg"
import EarthCloudsMap from "../assets/2k_earth_clouds.jpg"
import MoonMap from "../assets/compressed/2k_moon(1).jpg"
import MarsMap from "../assets/compressed/2k_mars(1).jpg"
// import { PointLight } from 'three';

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap, moonMap, marsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, MoonMap, MarsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 150;
    cloudsRef.current.rotation.y = elapsedTime / 150;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[2, 2, 5]} intensity={1.1} />
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereBufferGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1, 1, 1]}>
        <sphereBufferGeometry args={[0.25, 14, 14]} />
        <meshPhongMaterial
          map={moonMap}
          opacity={1}
          depthWrite={true}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereBufferGeometry args={[1, 36, 36]} />
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
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={.9}
        />
      </mesh>
      <mesh position={[-12, 6, -2]}>
        <sphereBufferGeometry args={[0.50, 16, 16]} />
        <meshStandardMaterial
          map={marsMap}
          metalness={0.4}
          roughness={0.7}
        />
        
      </mesh>
      <OrbitControls
          enableZoom
          enablePan
          enableRotate
          autoRotate
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.1}
        />
    </>
  );
}
export default Earth;
