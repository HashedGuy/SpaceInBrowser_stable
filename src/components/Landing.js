import React from 'react'
import styled from 'styled-components'

const TopSectionContainer = styled.div`
    position: absolute;
    width: 20%;
    height: 30%;
    top: 0;
    top:7%;
    left:75%;
    padding:1em;
    border-radius: 5%;
    background-color: rgba(28, 28, 28, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index:10;

`

const Logo = styled.h1`
    margin: 0;
    color: #fff;
    font-weight: 500;
    font-size: 30px;
`

const Slogan = styled.h4`
    margin: 0;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    margin-top:10px;
    text-align: center;
`
const Audio = styled.audio`
    text-align: center;
    margin-top: 30px;
    color: yellow;
`

export function TopSection() {
    return(
    <TopSectionContainer>
        <Logo>Multiplanetary map</Logo>
        <Slogan>Double-click to discover your next destination</Slogan>
        <Audio controls>
            <source src="https://www.nasa.gov/mp3/574928main_houston_problem.mp3"/>
        </Audio>
    </TopSectionContainer>
    )
}