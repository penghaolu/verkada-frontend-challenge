import "./tile.css";

function Tile(props) {
  if (props.type === "floor") {
    return (
      <div
        className={props.type}
        id={"tile(" + props.x + "," + props.y + ")"}
        onDrop={props.onDrop}
        onDragOver={props.onDragOver}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
        max={1}
      />
    );
  } else {
    return (
      <div
        className={props.type}
        id={"tile(" + props.x + "," + props.y + ")"}
      />
    );
  }
}

export default Tile;
