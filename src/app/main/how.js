import React from 'react';
import styled from 'styled-components';
import constants from 'data/constants';

const How = () => (
  <Wrapper>
    <HowContainer>
      <h1>How to Play</h1>
      <hr />
      <MainDoodleyDoo>
        <h2>Smash Character Challenges</h2>
        <p>
          Pick a leader to keep track of score and read each person's challenges out loud. Points can be awarded in a few different ways:
        </p>
        <h3>Method 1:</h3>
        <p>
          Assign each player a difficulty according to their skill level. Accord the winning player 1 point for winning, and add an extra point to whowever completes the character challenge for their given level.
        </p>
        <h3>Method 2:</h3>
        <p>
          After assigning characters, read the easy, medium, and hard challenge aloud. Each character chooses which challenge they would like to undertake for that match. Assign 1 point for the winner, and award 1, 2, or 3 points for whoever completes their easy, medium, or hard challenge respective.
        </p>
        <h3>or...make your own ruleset!</h3>
      </MainDoodleyDoo>
    </HowContainer>
  </Wrapper>
)

const MainDoodleyDoo = styled.div`
  background-color: #AAAAAA50;
  padding: 20px;
`

const HowContainer = styled.main`
  max-width: ${constants.MAX_WIDTH};
  box-sizing: border-box;
  padding: 10px;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default How;