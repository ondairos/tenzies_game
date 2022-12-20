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
  // roll counter
  const [counter, setCounter] = useState(0);
  // elapsed time states
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

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
    const rerolledDice = dice.map((element) => {
      if (element.isHeld === true) {
        return element;
      }
      // reroll dice
      return { ...element, value: Math.ceil(Math.random() * 6) };
    });
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setCounter(0);
    } else {
      // roll counter
      setCounter(counter + 1);
      setDice(rerolledDice);
    }
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

  // handleTime function
  function handleTime() {
    if (!startTime) {
      setStartTime(Date.now());
    } else {
      setElapsedTime(Date.now() - startTime);
      setStartTime(null);
    }
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
    <>
      <main>
        {/* if the game is over throw confetti */}
        {tenzies && <Confetti />}
        <h1>Tenzies Game</h1>
        <p>
          Roll the dice until all are the same!
          <br />
          Click each die to freeze it's value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        {tenzies && <p>It took you: {counter} rolls to win!</p>}
        {tenzies && <p>Time elapsed: {elapsedTime}ms</p>}
        <button className="roll-dice" onClick={()=>{ rollTheDice(); handleTime() }}>
          {/* if the game is over display New Game else Roll */}
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
      <footer className="main_footer">
        <p>
          <a
            href="https://www.linkedin.com/in/ioannis-kantiloros-2438b6153/"
            className="anchor"
          >
            Ioannis Kantiloros.
          </a>
          <span>&nbsp;&nbsp;&nbsp;Made with ReactJS</span>
        </p>
      </footer>
    </>
  );
}

export default App;
