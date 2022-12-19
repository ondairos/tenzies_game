import React from "react";

export const Die = (props) => {
  const styles = {
    backgroundColor: props.held ? "#59E391" : "white",
  };

  return (
    <div className="die-face" onClick={props.hold} style={styles}>
      <h2 className="die-num"></h2>
    </div>
  );
};

export default Die;
