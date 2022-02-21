import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import Earth from './components/Earth'
import Starship from './components/models/Starship'
import ISS from './components/models/ISS'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default function App() {
        return (
              <CanvasContainer>
                <Canvas frameloop="demand">
                  <Suspense fallback={null}>
                    <Earth />
                    <Starship />
                    <ISS />
                    {/* <Images /> */}
                  </Suspense>
                </Canvas>
              </CanvasContainer>
        )
}