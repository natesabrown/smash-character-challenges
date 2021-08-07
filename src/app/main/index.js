import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './app';
import How from './how';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    overflow-x: hidden;
  }
  body {
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

function AppSwitcher() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/how-to-play">
            <How />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default AppSwitcher;