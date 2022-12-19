import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  // state init
  const [dice, setDice] = useState(allNewDice());

  // create new dice function
  function allNewDice() {
    const diceData = [];
    for (let i = 0; i <= 9; i++) {
      // 6 possible outcomes
      diceData.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        // added nanoid for key warning
        id: nanoid(),
      });
    }
    return diceData;
  }

  // get random number
  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
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

  // roll the dice function
  function rollTheDice() {
    let newDiceArray = allNewDice();
    setDice(newDiceArray);
  }

  // holdDice in place function
  function holdDice(id) {
    console.log(id);
  }

  // render die elements !must be at the BOTTOM!  use element.value because element is object.
  const diceElements = dice.map((element) => (
    <Die
      key={element.id}
      // Using an arrow function in this way is a common pattern in React when you want to pass a method as a prop to a child component and you want to preserve the value of this from the parent component.
      holdDice={() => holdDice(element.id)}
      value={element.value}
      isHeld={element.isHeld}
    />
  ));

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
