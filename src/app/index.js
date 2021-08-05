import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './header';
import TopBar from './topbar';
import Cards from './cards';
import constants from 'data/constants';
import { getRandomFighters, getRandomFighter } from 'data/testingFunctions';
import { getSelected } from 'data/dlc';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
`

function App() {
  const [chars, setChars] = useState([]);
  const [selected, setSelected] = useState(getSelected());
  const [diffArr, setDiffArr] = useState(["easy", "easy"]);

  // set initial characters
  useEffect(() => {
    setChars(getRandomFighters(2, selected))
  }, [])

  function onResetPress() {
    const numChars = chars.length;
    let newArr = []
    for (let i = 0; i < numChars; ++i) {
      newArr.push(getRandomFighter(selected))
    }
    setChars(newArr)
  }
  function onAddPress() {
    if (chars.length == 8) {
      return;
    }
    let newArr = chars.slice()
    newArr.push(getRandomFighter(selected))
    setChars(newArr)
    let newDiff = diffArr.slice()
    let newValue = diffArr.every(thing => thing == "easy") ? "easy" : diffArr.every(thing => thing == "medium") ? "medium" : diffArr.every(thing => thing == "hard") ? "hard" : "easy";
    newDiff.push(newValue)
    setDiffArr(newDiff)
  }
  function onSubtractPress() {
    if (chars.length == 1) {
      return;
    }
    let newArr = chars.slice();
    newArr.pop();
    setChars(newArr);
    let newDiff = diffArr.slice()
    newDiff.pop()
    setDiffArr(newDiff)
  }
  function setDiffArrTo(level) {
    let newArr = [];
    for (let i = 0; i < diffArr.length; ++i) {
      newArr.push(level);
    }
    setDiffArr(newArr);
  }
  function changeCharDiff(index, newDiff) {
    let newArr = diffArr.slice();
    newArr[index] = newDiff;
    setDiffArr(newArr);
  }

  // useEffect(() => {
  //   getRandomFighter(selected)
  // }, [selected])

  return (
    <>
    <GlobalStyle />
    <Header selected={selected} setSelected={setSelected} />
    <Wrapper>
      <Container>
        <TopBar 
          onResetPress={onResetPress} 
          onAddPress={onAddPress} 
          onSubtractPress={onSubtractPress}
          setDiffArrTo={setDiffArrTo}
        />
        <Cards chars={chars} setChars={setChars} diffArr={diffArr} changeCharDiff={changeCharDiff} selected={selected}/>
      </Container>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  max-width: ${constants.MAX_WIDTH};
`

export default App;