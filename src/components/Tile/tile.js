import "./tile.css";

function Tile(props) {
  return (
    <div>
      <div className="tile" id={props.type} />
    </div>
  );
}

export default Tile;
