import React from 'react';
// import { AgGridReact } from 'ag-grid-react';

import './App.css';

function App() {

  const CELL_SIZE = 20; 
  const WIDTH = 800;
  const HEIGHT = 600;
  
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="Board"          style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>        
      </div>
      
     
      
      
    </div>
  );
}

export default App;
