import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaRedoAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getRandomFighter } from 'data/testingFunctions';
import constants from 'data/constants';
import { useMediaQuery } from 'react-responsive';
import fighters from 'data/fighters.json';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Cards({ chars, setChars, diffArr, changeCharDiff, selected }) {
  const isMobile = useMediaQuery({
    query: '(max-device-width: 767px)'
  });
  const [curInd, setCurInd] = useState(0);
  const previousChars = usePrevious(chars);
  let currentCharacter = chars[curInd]
  function nextCharacter() {
    if ((curInd + 1) != chars.length) {
      setCurInd(curInd + 1);
    } else {
      setCurInd(0);
    }
  }
  function previousCharacter() {
    if (curInd != 0) {
      setCurInd(curInd - 1);
    } else {
      setCurInd(chars.length - 1)
    }
  }
  useEffect(() => {
    if (curInd == chars.length) {
      setCurInd(curInd - 1);
    }
  }, [chars])
  useEffect(() => {
    if (previousChars &&  (chars.length > previousChars.length)) {
      setCurInd(chars.length - 1);
    }
  }, [chars, previousChars])

  return (
    <CardsDiv>
      {!isMobile ? chars.map((char, index) => {
        return <Card 
          index={index} 
          setChars={setChars} 
          chars={chars} 
          char={char} 
          selected={selected} 
          difficulty={diffArr[index]} 
          changeCharDiff={changeCharDiff}
        />
      }) : currentCharacter ? <Card 
          index={curInd}
          setChars={setChars} 
          chars={chars} 
          char={currentCharacter} 
          selected={selected} 
          difficulty={diffArr[curInd]} 
          changeCharDiff={changeCharDiff}
      /> : <CardDiv />}
      {isMobile && <Buttons>
        <Button onClick={previousCharacter}><FaChevronLeft /></Button>
        <Button onClick={nextCharacter}><FaChevronRight /></Button>
      </Buttons>}
    </CardsDiv>
  )
}

const Button = styled.button`
  height: 180px;
  width: 80px;
  background-color: #CCCCCC;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 50px;
    height: 50px;
  }
  border: none;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
`

const Buttons = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  top: 50%;
  transform: translateY(-70%);
`

const CardsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  position: relative;

  ${constants.TABLET_BREAKPOINT} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${constants.MOBILE_BREAKPOINT} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  ${constants.COMPUTER_SMALL_BREAKPOINT} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    justify-items: center;
  }
`

const COLORS = ["maroon", "dodgerblue", "gold", "forestgreen", "darkorange", "darkturquoise", "fuchsia", "blueviolet"]

function Card({ index, char, chars, setChars, difficulty, changeCharDiff, selected }) {
  // const [difficulty, setDifficulty] = useState("easy")
  const { name, image, c_e, c_m, c_h } = char;
  const isEasy = difficulty == "easy"
  const isMedium = difficulty == "medium"
  const isHard = difficulty == "hard"
  const [showCharChoose, setShowCharChoose] = useState(false);

  function onDifficultyClick() {
    if (isEasy) {
      changeCharDiff(index, "medium");
    } else if (isMedium) {
      changeCharDiff(index, "hard");
    } else {
      changeCharDiff(index, "easy");
    }
  }

  function getChallengeText() {
    if (isEasy) return c_e;
    if (isMedium) return c_m;
    if (isHard) return c_h;
  }

  function onResetClick() {
    const newChars = chars.slice();
    newChars[index] = getRandomFighter(selected)
    setChars(newChars)
  }
  const isLight = COLORS[index] == "gold";
  function changeCharacter(character) {
    let newArr = chars.slice();
    newArr[index] = character;
    setChars(newArr);
  }

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
        <RightTop>
          <ResetButton isLight={isLight} onClick={onResetClick}> <FaRedoAlt /></ResetButton>
          <CharButton onClick={() => setShowCharChoose(true)}><img src={char.head_icon}/></CharButton>
        </RightTop>
      </TopRow>
      <Content>
        <Name>{name}</Name>
        <Challenge>
          <ChallengeTitle>Challenge:</ChallengeTitle>
          <ChallengeContent>
            {getChallengeText()}
          </ChallengeContent>
        </Challenge>
      </Content>
      <CharImage src={image} />
      {showCharChoose && <CharChoose 
        onExitPress={() => setShowCharChoose(false)}
        onCharSelect={character => {
          changeCharacter(character);
          setShowCharChoose(false);
        }}
      />}
    </CardDiv>
  )
}

const CharButton = styled.button`
  padding: 0px;
  background-color: #FFFFFF30;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  img {
    width: 28px;
    height: 28px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  margin-top: 0px;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
`

const ResetButton = styled.button`
  color: ${props => props.isLight ? "gray" : "white"};
  background-color: #FFFFFF30;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
  padding: 5px;
  svg {
    width: 30px;
    height: 30px;
  }
  margin: 5px;

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
const RightTop = styled.div`
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
  ${constants.MOBILE_BREAKPOINT} {
    place-self: center;
    width: 100%;
  }
  ${constants.COMPUTER_SMALL_BREAKPOINT} {
    width: 320px;
  }
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

const CharChoose = ({ onCharSelect, onExitPress}) => (
  <ChooseDiv>
    <Exit onClick={onExitPress}><FaTimes/></Exit>
    <SubChooseDiv>
      <CharGrid>
        {Object.values(fighters).map((character, id) => {
          return <CharIconImage onClick={() => onCharSelect(character)} src={character.head_icon}/>
        })}
      </CharGrid>
    </SubChooseDiv>
  </ChooseDiv>
)

const ChooseDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const SubChooseDiv = styled.div`
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  background-color: white;
  border: 5px solid blue;
  border-radius: 20px;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CharGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 40px;
`

const CharIconImage = styled.img`
  width: 100%;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
`

const Exit = styled.button`
  position: absolute;
  top: 15px; 
  right: 15px;
  z-index: 2;
  color: red;
  background: none;
  outline: none; border: none;
  font-size: 40px;
  padding: 0px;
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
  }
`

export default Cards;