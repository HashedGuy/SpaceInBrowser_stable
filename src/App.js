
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import styled from 'styled-components'
import { RecoilRoot, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'

import Earth from './components/Earth'
import Starship from './components/models/Starship'
import ISS from './components/models/ISS'
import TSS from './components/models/TSS'
import Mars from './components/Mars'
import Moon from './components/Moon'
import { clickedCBState } from './components/globalState'
import {GiMoonOrbit} from 'react-icons/gi'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className='loadingContainer'>
        <GiMoonOrbit style={{"fontSize":"250%"}}/>
        <h1>The universe is loading...</h1>
        <p>{progress} % loaded</p>
      </div>
    </Html>)
}

export default function App() {
  const activeObject = useRecoilValue(clickedCBState)
        return (
              <CanvasContainer>
                
                <Canvas >
                  <RecoilRoot>
                {/* <PerspectiveCamera near={1} far={1.1}/>  */}
                  <Suspense fallback={<Loader/>}>
                    <Earth />
                    <Mars />
                    <Moon />
                    <Starship />
                    <ISS />
                    <TSS />
                  </Suspense>
                  </RecoilRoot>
                </Canvas>
              </CanvasContainer>
        )
}