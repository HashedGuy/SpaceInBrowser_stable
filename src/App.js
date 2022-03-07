
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import { RecoilRoot } from 'recoil'

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
                  <RecoilRoot>
                {/* <PerspectiveCamera near={1} far={1.1}/>  */}
                  <Suspense fallback={null}>
                
                    <Earth />
                    <Mars />
                    <Moon />
                    <Starship />
                    <ISS />
                  </Suspense>
                  </RecoilRoot>
                </Canvas>
              </CanvasContainer>
        )
}