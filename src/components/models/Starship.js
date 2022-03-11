import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useRecoilState } from 'recoil'
import { clickedCBState } from '../globalState'
import { useFrame } from '@react-three/fiber';


export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/starship/scene.gltf')

  const [activeObject, setObject] = useRecoilState(clickedCBState)

  const starshipRef = useRef()
  let zRadius
  let xRadius
  let yRadius
  activeObject === '' ? (xRadius=0) : (xRadius=2.3)
  activeObject === '' ? (zRadius=0) : (zRadius=2.2)
  activeObject === '' ? (yRadius=0) : (yRadius=.4)

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * .01;
    
    const x = xRadius* Math.sin(elapsedTime)
    const z = zRadius* Math.cos(elapsedTime)
    const y = yRadius* Math.sin(elapsedTime)
    starshipRef.current.position.x = x;
    starshipRef.current.position.z = z;
    starshipRef.current.position.y = y;

  });

  return (
    <mesh 
      position={[.7, .7, .7]}  
      scale={(activeObject==='mars') || (activeObject==='moon') || (activeObject==='')?0 : .000025} 
      ref={starshipRef}>
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI/6 , 1, 0]}>
        <group position={[0, 42.38, -5293.18]} rotation={[-Math.PI, 0, 0]}>
          <group rotation={[-Math.PI, 0, 0]}>
            <group rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Bow_Window001_Starship_0.geometry}
                material={nodes.Bow_Window001_Starship_0.material}
              />
            </group>
            <group rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Primary_Hull001_Starship_0.geometry}
                material={nodes.Primary_Hull001_Starship_0.material}
              />
            </group>
            <group rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Cargo_Doors001_Starship_0.geometry}
                material={nodes.Cargo_Doors001_Starship_0.material}
              />
            </group>
            <group position={[0, 0, 123.11]} rotation={[0, 0, Math.PI / 2]} scale={[65.53, 65.53, 81.73]}>
              <mesh
                geometry={nodes.SeaLev_Raptors_LP001_Starship_0.geometry}
                material={nodes.SeaLev_Raptors_LP001_Starship_0.material}
              />
            </group>
            <group rotation={[0, 0, -Math.PI / 2]} scale={[65.53, 65.53, 81.73]}>
              <mesh
                geometry={nodes.Vacuum_Raptors_LP001_Starship_0.geometry}
                material={nodes.Vacuum_Raptors_LP001_Starship_0.material}
              />
            </group>
            <group position={[-1.13, -0.26, 0]} rotation={[0, 0, -Math.PI / 6]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Cargo_DropBoxes001_Starship_0.geometry}
                material={nodes.Cargo_DropBoxes001_Starship_0.material}
              />
            </group>
            <group rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Cabin_WindowInset001_Starship_0.geometry}
                material={nodes.Cabin_WindowInset001_Starship_0.material}
              />
            </group>
            <group rotation={[0, 0, Math.PI / 2]} scale={[100, 100, 100]}>
              <mesh
                geometry={nodes.Cabin_Windows001_Starship_0.geometry}
                material={nodes.Cabin_Windows001_Starship_0.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
    </mesh>
  )
}

useGLTF.preload('/scene.gltf')
