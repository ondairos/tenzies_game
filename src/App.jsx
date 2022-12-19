import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti"
import Die from "./components/Die"

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Tenzies Game</h1>
      <p>
        Roll the dice until all are the same! Click each die to freeze it's
        value between rolls.
      </p>
      <div className="die-container">
        {/* <Die></Die> */}
      </div>
      <button className="roll-dice"></button>
    </main>
  );
}

export default App;
