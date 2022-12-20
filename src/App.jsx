import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  // state init
  const [dice, setDice] = useState(allNewDice());
  // state for endgame
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    // checks if every element has isHeld === true
    let checkedHeld = dice.every((element) => {
      return element.isHeld;
    });
    // create a reference value for checking
    let previousDiceValue = dice[0].value;
    // checks if the elements in dice are all equal to dice[0].value
    let checkedValue = dice.every((element) => {
      return previousDiceValue === element.value;
    });

    if (checkedHeld === true && checkedValue === true) {
      setTenzies(true);
      console.log("You won.");
    }
  }, [dice]);

  /**
   * Challenge: Check the dice array for these winning conditions:
   * 1. All dice are held, and
   * 2. all dice have the same value
   *
   * If both conditions are true, set `tenzies` to true and log
   * "You won!" to the console
   */

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

  // roll the dice function
  function rollTheDice() {
    //  if to dice.id exei dice.isHeld === true tote metra to length ths neas unHeld array kai rollare nea zaria
    const rerolledDice = dice.map((element) => {
      if (element.isHeld === true) {
        return element;
      }
      // reroll dice
      return { ...element, value: Math.ceil(Math.random() * 6) };
    });
    setDice(rerolledDice);
  }

  // holdDice in place function
  function holdDice(id) {
    const frozenDice = dice.map((element) => {
      if (element.id === id) {
        return { ...element, isHeld: !element.isHeld };
      }
      return element;
    });
    setDice(frozenDice);
  }

  /*
  // holdDice with for implementation

  // function holdDice(id) {
  //   const newDice = [];
  //   for (let i = 0; i < dice.length; i++) {
  //     const die = dice[i];
  //     if (die.id === id) {
  //       newDice.push({ ...die, isHeld: !die.isHeld });
  //     } else {
  //       newDice.push(die);
  //     }
  //   }
  //   setDice(newDice);
  // } */

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
      {tenzies && <Confetti />}
      <h1>Tenzies Game</h1>
      <p>
        Roll the dice until all are the same!
        <br />
        Click each die to freeze it's value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollTheDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
