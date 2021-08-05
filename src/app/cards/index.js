import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRedoAlt } from 'react-icons/fa';
import { getRandomFighter } from 'data/testingFunctions';
import constants from 'data/constants';

function Cards({ chars, setChars, diffArr, changeCharDiff, selected }) {
  return (
    <CardsDiv>
      {chars.map((char, index) => {
        return <Card index={index} setChars={setChars} chars={chars} char={char} selected={selected} difficulty={diffArr[index]} changeCharDiff={changeCharDiff}/>
      })}
    </CardsDiv>
  )
}

const CardsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`

const COLORS = ["maroon", "dodgerblue", "gold", "forestgreen", "darkorange", "darkturquoise", "fuchsia", "blueviolet"]

function Card({ index, char, chars, setChars, difficulty, changeCharDiff, selected }) {
  // const [difficulty, setDifficulty] = useState("easy")
  const { name, image } = char;

  function onDifficultyClick() {
    if (difficulty == "easy") {
      changeCharDiff(index, "medium");
    } else if (difficulty == "medium") {
      changeCharDiff(index, "hard");
    } else {
      changeCharDiff(index, "easy");
    }
  }

  function onResetClick() {
    const newChars = chars.slice();
    newChars[index] = getRandomFighter(selected)
    setChars(newChars)
  }
  const isLight = COLORS[index] == "gold";

  return (
    <CardDiv style={{
      backgroundColor: COLORS[index]
    }}>
      <TopRow>
        <LeftTop>
          <Player isLight={isLight}>{index + 1}</Player>
          <DiffButton 
            diff={difficulty} 
            onClick={onDifficultyClick}
          >
              {difficulty == "easy" ? "E" : difficulty == "medium" ? "M" : "H"}
            </DiffButton>
        </LeftTop>
        <ResetButton isLight={isLight} onClick={onResetClick}> <FaRedoAlt /></ResetButton>
      </TopRow>
      <Content>
        <Name>{name}</Name>
        <Challenge>
          <ChallengeTitle>Challenge:</ChallengeTitle>
          <ChallengeContent>
            Kill someone with a footstool.
          </ChallengeContent>
        </Challenge>
      </Content>
      <CharImage src={image} />
    </CardDiv>
  )
}

const ResetButton = styled.button`
  color: ${props => props.isLight ? "gray" : "white"};
  background-color: #FFFFFF30;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
`

const DiffButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  margin-top: 5px;
  margin-left: 4px;
  &:hover {
    opacity: 1.0;
  }
  background-color: ${props => props.diff == "easy" ? constants.EASY_COLOR : props.diff == "medium" ? constants.MEDIUM_COLOR : constants.HARD_COLOR};
`

const CharImage = styled.img`
  width: 100%;
  position: absolute;
  z-index: 0;
  transform: scale(1.05);
`

const TopRow = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-between;
`

const LeftTop = styled.div`
  display: flex;
  flex-direction: column;
`

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  height: 500px;
  justify-content: space-between;
  position: relative;
`

const Content = styled.div`
  padding: 14px;
  margin-bottom: 10px;
  z-index: 1;
`

const Player = styled.div`
  color: #CCCCCC;
  font-weight: 500;
  font-size: 25px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF50;
  ${props => props.isLight && `
    color: gray;
    background-color: #FFFFFF80;
  `}
`

const Name = styled.div`
  font-weight: 900;
  color: white;
  font-size: 50px;
  margin-bottom: 4px;
  text-shadow: 0px 2px 2px rgba(0,0,0,0.61);
  line-height: 90%;
`

const Challenge = styled.div`
  background-color: #FFFFFF85;
  padding: 5px;
  min-height: 100px;
`

const ChallengeTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
`

const ChallengeContent = styled.div`

`

const ChallengeButton = styled.button`

`

export default Cards;