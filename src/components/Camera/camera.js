import "./camera.css";

function Camera(props) {
  return (
    <div
      id={props.id}
      className={props.direction ? props.direction : "default"}
      draggable={true}
      onDragStart={props.onDragStart}
      max={0}
    />
  );
}

export default Camera;
