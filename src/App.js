import React from "react";
import Game from "./Game";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  rgb(9, 211, 201);
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.h1`
  font-size: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  margin-left: 30px;
`;

function App() {
  return (
    <Main>
      <Header>Conway's Game of Life</Header>
      <Container>
        <Main>
        <Info>
          <h2>Rules</h2>
          <p>In the game of life, these rules examine each  cell of the grid. For each cell, it counts that cell's eight neighbors (up, down, left, right), and then acts on that result. The rules are as follows:</p>
          <ul>
            <li>
              {" "}
              If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
            </li>
            <li>
              If the cell is dead and has exactly 3 neighbors, then it comes to life. Else it remains dead.{" "}
            </li>
            
          </ul>
          <Game></Game>
          
        </Info>
        </Main>
      </Container>
    </Main>
  );
}

export default App;