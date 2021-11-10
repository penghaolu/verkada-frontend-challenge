import React, { useEffect } from "react";
import "./App.css";
import sampleData from "./sampleData.js";
import Tile from "./components/Tile/tile.js";
import Camera from "./components/Camera/camera.js";

const cams = ["cam1", "cam2", "cam3", "cam4", "cam5"];
const planNum = "floorplan-0";
const currPlan = sampleData.floorplans[planNum];

function App() {
  useEffect(() => {
    const config = window.localStorage.getItem("config");
    if (!config) {
      return;
    }
    const parsedConfig = JSON.parse(config);
    for (const key of Object.keys(parsedConfig)) {
      document
        .getElementById(parsedConfig[key])
        .appendChild(document.getElementById(`cam${key}`));
    }
  });

  function allowDrop(e) {
    e.preventDefault();
  }

  function drag(e) {
    e.dataTransfer.setData("dnd_id", e.target.id);
  }

  function onDragEnter(e) {
    if (e.target.childNodes.length === parseInt(e.target.getAttribute("max"))) {
      e.target.classList.add("maxed");
    } else {
      e.target.classList.add("over");
    }
  }

  function onDragLeave(e) {
    e.target.classList.remove("over");
    e.target.classList.remove("maxed");
  }

  function drop(e) {
    e.preventDefault();
    if (e.target.childNodes.length === parseInt(e.target.getAttribute("max"))) {
      e.target.classList.remove("maxed");
      return false;
    }
    let cam_id = e.dataTransfer.getData("dnd_id");
    e.target.appendChild(document.getElementById(cam_id));
    e.target.classList.remove("over");
  }

  function onClick() {
    const dict = {};
    for (let i = 1; i < 6; i++) {
      let parent = document.getElementById(`cam${i}`).parentNode;
      dict[`cam${i}`] = parent.id;
    }
    window.localStorage.setItem("config", JSON.stringify(dict));
    console.log("Saved configuration: ", dict);
  }

  return (
    <div className="app-wrapper">
      <div className="title">Verkada Camera Setup</div>
      <div className="subtitle">{planNum}</div>
      {/* Generate floor plan */}
      <div className="map-wrapper">
        {/* Map rows */}
        {currPlan.floorplan.map((row, y) => {
          return (
            // Map cells in row
            <div key={y} className="row-wrapper">
              {row.map((cell, x) => {
                return (
                  <Tile
                    key={`${x},${y}`}
                    x={x}
                    y={y}
                    type={cell === 1 ? "wall" : "floor"}
                    onDrop={(e) => drop(e)}
                    onDragOver={(e) => allowDrop(e)}
                    onDragEnter={(e) => onDragEnter(e)}
                    onDragLeave={(e) => onDragLeave(e)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        id="camera-wrapper"
        className="camera-wrapper"
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
        max={5}
      >
        {cams.map((cam) => (
          <Camera id={cam} key={cam} onDragStart={(e) => drag(e)} />
        ))}
      </div>
      <button className="save-button" onClick={() => onClick()}>
        Save configuration
      </button>
    </div>
  );
}

export default App;
