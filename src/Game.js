import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'; 
import { green, purple, orange, cyan } from '@material-ui/core/colors';


  
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

  const ColorButton2 = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  
  const ColorButton3 = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
  }))(Button);

  const ColorButton4 = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: cyan[500],
      '&:hover': {
        backgroundColor: cyan[700],
      },
    },
  }))(Button);
 

const Main = styled.div`
  background-color: black;
  border-radius: 5px;
`;

const Buttons = styled.div`
  border; 2px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
  padding-bottom: 0;
  margin-top 20px;
`;


const Gens = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: white;
`;



//cartesian coordinates equivalent for the for loop to iterate over for each cell
const neighborGrids = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function Game() {
  //setting variables and state.
  const [running, setrunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
  const [generation, setGeneration] = useState(0);
  const timeRef = useRef(300);
  const [sum, setSum] = useState(0);
  
  
  
  const numRows = 35;
  const numCols = 80;
  

  //creating grid and setting to all zeros
  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    console.log(rows);
    return rows;
  }

  const [grid, setGrid] = useState(initialState);

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((grid) => {
      let validGrid = false;
      validGrid = false;
      // creat copy of grid
      return produce(grid, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            neighborGrids.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //checking to see if out of bounds.
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += grid[newI][newK];
              }
            });
            //counting number of neighbors
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
              validGrid = true;
              gridCopy[i][k] = 1;
            }
          }
        }
        // counting generation
        if (validGrid) {
          setGeneration((num) => num + 1);
        }
        
        setSum(
            gridCopy.flat().reduce((add, cell)=>{
                return add + cell;
            })
        )
        
      });
    });
    setTimeout(runSim, timeRef.current);
  }, []);
  console.log(timeRef.current);
  return (
    <Main>
      <Buttons>
        <Button className='buttons' size="large" variant='contained' color='primary'
          onClick={() => {
            setrunning(!running);
            if (!running) {
              runningRef.current = true;
              runSim();
            }
          }}
        >
          {!runningRef.current ? "Start" : "Stop"}
          
        </Button>
        <Button size='large' variant='contained' color='secondary'
             onClick={() => {
                
                const rows=[];
                for (let i = 0; i < numRows; i++) {
                    rows.push(Array.from(Array(numCols), () => Math.random() > .7 ? 1:0));
                  }
                  console.log(rows);
                  setGrid(rows);
                  setSum(sum);
             }}
        
        >
            Random
        </Button>

        {/* //, color='primary' : color='secondary' */}

        

        {/* reset all values to initial state to clear */}
        <ColorButton4 className='buttons' size="large" variant='contained' color='primary'
          onClick={() => {
            setGrid(initialState);
            setGeneration(0);
            setSum(0)
            
            
          }}
        >
          Clear
        </ColorButton4>
        
        <ColorButton2 size="large" variant='contained' color='primary' 
           onClick={()=> {
             timeRef.current=600;

           }}
               
        >
            Slow

        </ColorButton2>
        
        <ColorButton3 size="large" variant='contained' color='primary'
           onClick={()=> {
            timeRef.current=300;

          }}
        >
            Normal

        </ColorButton3>
        <ColorButton size="large" variant='contained' color='primary' 
           onClick={()=> {
            timeRef.current=50;

          }}
        >
            Fast

        </ColorButton>

        
      </Buttons>
      <Gens>
        <h2> Generation: {generation}</h2>
        <h2> Cells: {sum} </h2>
      </Gens>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},18px)`,
        }}
      >
        {/* drawing grid */}
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                //using immer to make a copy and utilize double buffer
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 15,
                height: 15,
                
                backgroundColor:
                    grid[i][k] && sum < 100
                    ? "yellow"
                    : grid[i][k] && sum > 100
                    ? "red"
                    : undefined,
                border: "1px solid white",
              }}
            />
          ))
        )}
      </div>
    </Main>
  );
}

export default Game;