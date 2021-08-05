import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import constants from 'data/constants';
import { getSelected, DLC_OBJS } from 'data/dlc';

const Header = ({ selected, setSelected }) => (
  <Wrapper>
    <Main>
      <Title />
      <DLCChoose selected={selected} setSelected={setSelected} />
    </Main>
  </Wrapper>
)

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
`

// much semantic very wow
const Main = styled.header` 
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  position: relative;
  z-index: 1;
  max-width: ${constants.MAX_WIDTH};
`

const Title = () => (
  <TitleContainer>
    <span>Smash</span>
    <span>Character Challenge</span>
  </TitleContainer>
)

const TitleContainer = styled.h1`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
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
`

const CheckAll = styled.button`
  border-radius: 10px;
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
`

export default Header;