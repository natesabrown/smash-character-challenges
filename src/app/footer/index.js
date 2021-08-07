import React from 'react';
import styled from 'styled-components';
import { FaGithubSquare } from 'react-icons/fa';
import constants from 'data/constants';
import websitefavi from './websitefavi.svg';

const Footer = () => (
  <MainFooter>
    <MainContent>
      <WebsiteCredit href={"https://www.natesabrown.com"}>natesabrown.com</WebsiteCredit>
      <Buttons>
        <WebsiteFavi href={"https://www.natesabrown.com"}><img src={websitefavi} /></WebsiteFavi>
        <GitHubButton href={"https://github.com/natesabrown/smash-character-challenges"}>
          <FaGithubSquare />
        </GitHubButton>
      </Buttons>
    </MainContent>
  </MainFooter>
)

const MainFooter = styled.footer`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`

const MainContent = styled.div`
  width: 100%;
  max-width: ${constants.MAX_WIDTH};
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GitHubButton = styled.a`
  color: white;
  svg {
    height: 40px;
    width: 40px;
  }
`

const WebsiteCredit = styled.a`
  text-decoration: none;
  color: white;
`

const WebsiteFavi = styled.a`
  img {
    height: 35px;
  }
  margin-right: 10px;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
`

export default Footer;