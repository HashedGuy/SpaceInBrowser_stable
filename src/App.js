import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import { PerspectiveCamera } from '@react-three/drei'
import Earth from './components/Earth'
import Starship from './components/models/Starship'
import ISS from './components/models/ISS'
import { TopSection } from './components/Landing'
import Mars from './components/Mars'
import Moon from './components/Moon'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default function App() {
        return (
              <CanvasContainer>
                <TopSection/>               
                <Canvas frameloop="demand" >
                {/* <PerspectiveCamera near={1} far={1.1}/>  */}
                  <Suspense fallback={null}>
                
                    <Earth />
                    <Mars />
                    <Moon />
                    <Starship />
                    <ISS />
                  </Suspense>
                </Canvas>
              </CanvasContainer>
        )
}