import React from 'react';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import Main from './components/Main';
import { GlobalStyle } from './global';

import Background from './img/Background.png';


function App() {

  const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${Background});
    display: flex;
  `

  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Main/>

    </Container>
  );
}

export default App;
