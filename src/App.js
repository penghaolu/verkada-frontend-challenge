import React, { useState } from "react";
import "./App.css";
import sampleData from "./sampleData.js";
import Tile from "./components/Tile/tile.js";

function App() {
  // const floorplans = sampleData.floorplans;
  const planNum = "floorplan-1";
  const currPlan = sampleData.floorplans[planNum];
  // const [cameras, setCameras] = useState(sampleData.cameras);
  return (
    <div className="App">
      <header className="App-header">
        <div>Verkada Camera Setup</div>
        <div>{planNum}</div>
        {/* Generate floor plan */}
        <div className="map-wrapper">
          {/* Map rows */}
          {currPlan.floorplan.map((row, y) => {
            return (
              // Map cells in row
              <div className="row-wrapper">
                {row.map((cell, x) => {
                  return (
                    <Tile x={x} y={y} type={cell === 1 ? "wall" : "floor"} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
