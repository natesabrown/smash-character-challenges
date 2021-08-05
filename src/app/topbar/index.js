import React from 'react';
import styled from 'styled-components';
import { VscDebugRestart } from 'react-icons/vsc';
import constants from 'data/constants';
import { BsPlusCircleFill } from 'react-icons/bs';
import { AiFillMinusCircle } from 'react-icons/ai';

const TopBar = ({ onResetPress, onAddPress, onSubtractPress, setDiffArrTo }) => (
  <Main>
    <LeftContent>
      <ResetButton onClick={onResetPress}> <VscDebugRestart /> Reset All</ResetButton>
      <AddButton onClick={onAddPress}><BsPlusCircleFill /></AddButton>
      <AddButton onClick={onSubtractPress} minus><AiFillMinusCircle/></AddButton>
    </LeftContent>
    <SetEveryone setDiffArrTo={setDiffArrTo}/>
  </Main>
)

const Main = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const ResetButton = styled.button`
  font-size: 24px;
  background-color: green;
  display: flex;
  align-items: center;
  color: white;
  padding: 10px 15px;
  border-radius: 25px;

  svg {
    font-size: 130%;
    margin-right: 5px;
  }
`

const LeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AddButton = styled.button`
  font-size: 45px;
  color: red;
  padding: 0;
  height: 45px;
  width: 45px;
  border-radius: 45px;
  display: flex; align-items: center;
  justify-content: center;
  ${props => props.minus && `color: blue`};
  margin-left: 10px;
`

const SetEveryone = ({ setDiffArrTo }) => (
  <SetEveryoneContainer>
    <span>Set Everyone to...</span>
    <Buttons>
      <ChoiceButton easy onClick={() => setDiffArrTo("easy")}>E</ChoiceButton>
      <ChoiceButton medium onClick={() => setDiffArrTo("medium")}>M</ChoiceButton>
      <ChoiceButton hard onClick={() => setDiffArrTo("hard")}>H</ChoiceButton>
    </Buttons>
  </SetEveryoneContainer>
)

const SetEveryoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-weight: bold;
    margin-bottom: 5px;
  }
`

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;

`

const ChoiceButton = styled.button`
  /* yuh */
  background-color: ${props => props.easy ?
    constants.EASY_COLOR : props.medium ?
      constants.MEDIUM_COLOR : props.hard ?
        constants.HARD_COLOR : ""};

  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 45px;
  height: 45px;
  border-radius: 45px;

`

export default TopBar;