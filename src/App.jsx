import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  // state init
  const [dice, setDice] = useState(allNewDice());

  // create new dice function
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i <= 9; i++) {
      // 6 sides to dice
      diceArray.push(Math.ceil(Math.random() * 6));
    }
    return diceArray;
  }

  /*  for loop render
  // function renderDieElements() {
  //   let diceDisplayArray = [];
  //   for (let i = 0; i < dice.length; i++) {
  //     diceDisplayArray.push(<Die value={dice[i]} />);
  //   }
  //   return diceDisplayArray;
  // }
  */

  // roll the dice

  function rollTheDice() {
    setDice(allNewDice());
  }


  // render die elements !must be at the BOTTOM!
  const diceElements = dice.map((element) => <Die value={element} />);



  return (
    <main>
      <h1>Tenzies Game</h1>
      <p>
        Roll the dice until all are the same! Click each die to freeze it's
        value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollTheDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
