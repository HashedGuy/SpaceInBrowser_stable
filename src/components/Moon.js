import { useFrame, useLoader, lineBasicMaterial } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import React, {useRef, useState} from 'react';
import * as THREE from 'three'

import { TextureLoader } from 'three';
import MoonMap from "../assets/8k_moon.jpeg"
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedCBState, showActions } from './globalState';

function Ecliptic({ xRadius = 1, zRadius = 1, yRadius = 1 }) {
  const [activeObject, setObject] = useRecoilState(clickedCBState)
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
      <lineBasicMaterial attach="material" color={activeObject===''?"black":"gray"} linewidth={.1} />
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
  activeObject === '' ? (xRadius=5.5) 
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

    // activeObject === 'moon' ? moonRef.current.rotation.y += .001 : moonRef.current.rotation.y += .0001;

  });

  const showAction = useRecoilValue(showActions)

  function calcPosFromLatLngRad(lat, lng) {
    var phi = (90 - lat)*(Math.PI/180)
    var theta = (lng+180)*(Math.PI/180)
    let x = -(Math.sin(phi)*Math.cos(theta))*2.5
    let z = (Math.sin(phi)*Math.sin(theta)) *2.5
    let y = (Math.cos(phi))*2.5
    return {x, y, z}
  }

  let pointApollo11 = {
    lat:0.67345,
    lng:	23.47307
  }

  let pointApollo12 = {
    lat:-3.0098,
    lng:	-23.4249
  }

  let pointApollo14 = {
    lat:-3.64417,
    lng:	-17.47865
  }

  let pointApollo15 = {
    lat:26.13341,
    lng:	3.62850
  }

  let pointApollo16 = {
    lat:-8.9759,
    lng:	15.4986
  }

  let pointApollo17 = {
    lat:20.1923,
    lng:	30.7655
  }

  let pointArtemis3 = {
    lat:-65.1923,
    lng:	15.7655
  }

  let posApollo11 = calcPosFromLatLngRad(pointApollo11.lat, pointApollo11.lng)
  let posApollo12 = calcPosFromLatLngRad(pointApollo12.lat, pointApollo12.lng)
  let posApollo14 = calcPosFromLatLngRad(pointApollo14.lat, pointApollo14.lng)
  let posApollo15 = calcPosFromLatLngRad(pointApollo15.lat, pointApollo15.lng)
  let posApollo16 = calcPosFromLatLngRad(pointApollo16.lat, pointApollo16.lng)
  let posApollo17 = calcPosFromLatLngRad(pointApollo17.lat, pointApollo17.lng)
  let posArtemis3 = calcPosFromLatLngRad(pointArtemis3.lat, pointArtemis3.lng)

  return (
    <>
      <mesh 
        ref={moonRef}
        scale={
          activeObject === '' ? 1 
          :
          activeObject === 'earth' ? 1.3 
          :
          activeObject === 'mars' ? .1
          : 10
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

      <mesh
        position={[posApollo11.x,posApollo11.y,posApollo11.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo11'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo12.x,posApollo12.y,posApollo12.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo12'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo14.x,posApollo14.y,posApollo14.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo14'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo15.x,posApollo15.y,posApollo15.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo15'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo16.x,posApollo16.y,posApollo16.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo16'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posApollo17.x,posApollo17.y,posApollo17.z]}
      >
        <sphereBufferGeometry args={showAction==='apollo17'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>

      <mesh
        position={[posArtemis3.x,posArtemis3.y,posArtemis3.z]}
      >
        <sphereBufferGeometry args={showAction==='artemis'? [0.03, 30, 30] : [0, 30,30]}/>
        <meshBasicMaterial color={0x00ff00}/>
      </mesh>
      {activeObject === 'mars' ? '' : <Ecliptic xRadius={xRadius} zRadius={zRadius}/>}
    </>
  );
}
export default Moon;
