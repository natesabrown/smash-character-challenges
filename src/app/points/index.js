import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';
import constants from 'data/constants';

function Points({ chars }) {
  const [pointsArr, setPointsArr] = useState([0, 0]);

  useEffect(() => {
    if (chars.length > pointsArr.length) {
      let newPoints = pointsArr.slice()
      newPoints.push(0)
      setPointsArr(newPoints)
    } else if (chars.length < pointsArr.length) {
      let newPoints = pointsArr.slice()
      newPoints.pop()
      setPointsArr(newPoints)
    }
  }, [chars]);

  function addPoint(index) {
    let newArr = pointsArr.slice()
    newArr[index] += 1
    setPointsArr(newArr);
  }
  function subtractPoint(index) {
    if (pointsArr[index] == 0) {
      return;
    }
    let newArr = pointsArr.slice()
    newArr[index] -= 1
    setPointsArr(newArr);
  }
  function onReset() {
    let newArr = pointsArr.map(_ => 0);
    setPointsArr(newArr);
  }

  return (
    <Container>
      <TitleDiv>
        <SectionTitle>Points</SectionTitle>
        <ResetButton onClick={onReset}><VscDebugRestart /></ResetButton>
      </TitleDiv>
      <Chars>
        {chars.map((char, index) => {
          return <CharPoint 
            char={char} 
            points={pointsArr[index]} 
            onAddClick={() => addPoint(index)}
            onSubtractClick={() => subtractPoint(index)}
          />
        })}
      </Chars>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
`

const SectionTitle = styled.h2`

`

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  padding: 0;
  font-size: 30px;
  background-color: blue;
  color: white;
`

const Chars = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  ${constants.TABLET_BREAKPOINT} {
    grid-template-columns: repeat(6, 1fr);
  }
  ${constants.MOBILE_BREAKPOINT} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const CharPoint = ({ char, points, onAddClick, onSubtractClick }) => (
  <CharDiv>
    <Button up onClick={onAddClick}><FaArrowUp /></Button>
    <BaseDisplay>
      <img src={char.head_icon} />
      <PointView>{points}</PointView>
    </BaseDisplay>
    <Button onClick={onSubtractClick}><FaArrowDown /></Button>
  </CharDiv>
)

const CharDiv = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
`

const PointView = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
`

const Button = styled.button`
  padding: 0px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0px;
  ${props => props.up ? `
    color: blue;
  ` : `
    color: gray;
    &:hover {
      color: red;
    }
  `}
  opacity: 0.7;
  &:hover {
    opacity: 1.0;
    cursor: pointer;
  }
`

const BaseDisplay = styled.div`
  display: flex;
  align-items: center;
`

export default Points;