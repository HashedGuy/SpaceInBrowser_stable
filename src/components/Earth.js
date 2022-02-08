import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import EarthDayMap from "https://ik.imagekit.io/74qyv5bswgr/8k_earth_daymap_z76y-E3-X.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1644334771711";
import EarthNormalMap from "https://ik.imagekit.io/74qyv5bswgr/8k_earth_normal_map_vgmsdjjwp.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1644335476798";
import EarthSpecularMap from "https://ik.imagekit.io/74qyv5bswgr/8k_earth_specular_map_WqVu-J5bw.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1644335602507";
import EarthCloudsMap from "https://ik.imagekit.io/74qyv5bswgr/8k_earth_clouds_K2i5yarwN.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1644335157938";
import { PointLight } from 'three';

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 120;
    cloudsRef.current.rotation.y = elapsedTime / 120;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
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
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}
export default Earth;
