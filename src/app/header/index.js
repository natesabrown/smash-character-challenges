import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from 'data/constants';
import { getSelected, DLC_OBJS } from 'data/dlc';
import challenge_text from './challenge-text.svg';

const Header = ({ selected, setSelected }) => (
  <Wrapper>
    <TopBar>
      <Link to="/how-to-play">How to Play</Link>
    </TopBar>
    <Main>
      <Title />
      <DLCChoose selected={selected} setSelected={setSelected} />
    </Main>
  </Wrapper>
)

const TopBar = styled.div`
  width: 100%;
  max-width: ${constants.MAX_WIDTH};
  position: relative;
  z-index: 0;
  padding: 10px;
  box-sizing: border-box;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    right: 0;
    bottom: 0;
    width: 100vw;
    transform: translateX(-50%);
    background-color: #444444;
    z-index: -1;
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: white;
  }
  display: flex;
  justify-content: flex-end;
`

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`

// much semantic very wow
const Main = styled.header` 
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: relative;
  z-index: 1;
  max-width: ${constants.MAX_WIDTH};
  ${constants.MOBILE_BREAKPOINT} {
    flex-direction: column;
  }
`

const Title = () => (
  <TitleContainer>
    <img src={challenge_text} />
  </TitleContainer>
)

const TitleContainer = styled.h1`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 300px;
  }
`

function DLCChoose({ selected, setSelected}) {
  
  function checkAll() {
    if (selected.length == 0) {
      setSelected(getSelected());
    } else {
      setSelected([])
    }
  }

  return <DLCContainer>
    <DLCGrid>
      {DLC_OBJS.map(choice => (
        <DLCChoice
          choice={choice}
          selected={selected.includes(choice[0])}
          onClick={() => {
            if (!selected.includes(choice[0])) {
              setSelected([...selected, choice[0]])
            } else {
              setSelected(selected.filter(addedChoice => addedChoice != choice[0]))
            }
          }}
        />
      ))}
    </DLCGrid>
    <ButtonsDiv>
      <h2>DLC</h2>
      <CheckAll onClick={checkAll}>Check All</CheckAll>
    </ButtonsDiv>
  </DLCContainer>
}

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  ${constants.MOBILE_BREAKPOINT} {
    padding: 10px 20px;
  }
`

const CheckAll = styled.button`
  border-radius: 10px;
  background-color: #DDDDDD;
`

const DLCContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  h2 {
    font-weight: 900;
    margin: 0;
  }
`

const DLCGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  position: relative;
  padding: 15px;
  margin-bottom: 15px;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    
    background: rgb(119,0,0);
    background: linear-gradient(90deg, rgba(119,0,0,1) 61%, rgba(0,0,0,0) 100%);

    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-right: none;
    border-image-source: linear-gradient(to right, rgba(217,0,0,1) 61%, rgba(0,0,0,0) 100%);
  }


`

function DLCChoice({ choice, selected, onClick }) {
  const character_id = choice[0]
  const image_link = choice[1]

  return <DLCChoiceContainer selected={selected} onClick={onClick}>
    <img src={image_link} />
  </DLCChoiceContainer>
}

const DLCChoiceContainer = styled.button`
  ${props => !props.selected && `
    opacity: 0.3;
  `}
  img {
    height: 35px;
  }
  height: 50px;
  width: 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #DDDDDD;
`

export default Header;