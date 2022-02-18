import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import Earth from './components/Earth'
import Starship from './components/starship/Starship'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

export default function App() {
        return (
              <CanvasContainer>
                <Canvas>
                  <Suspense fallback={null}>
                    <Earth />
                    <Starship />
                    {/* <Images /> */}
                  </Suspense>
                </Canvas>
              </CanvasContainer>
        )
}