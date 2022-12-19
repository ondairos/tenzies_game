import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  // initliaze state for dice and tenzies endgame
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);


  // react effect if we have tenzies or not
  useEffect(() => {
    const firstValue = dice[0].value
    //check if all dice are held
    const allHeld = dice.every(die => die.held)
    // check if all dice have the same number
    const allSameNumber = dice.every(die => die.value === firstValue)
    if (allHeld && allSameNumber) {
      setTenzies(true)
    }
  }, [dice])

  // get random dice value
  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  // all new dice array
  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        held: false,
        id: i + 1,
      };
      newDiceArray.push(newDie);
    }
    return newDiceArray;
  }

  // display dice elements
  const diceElements = dice.map((die) => {
    return <Die key={die.id} {...die} hold={() => holdDice(die.id)} />;
  });

  // roll and hold dice functions
  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, i) =>
          die.held ? die : { value: randomDieValue(), held: false, id: i + 1 }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies Game</h1>
      <p>
        Roll the dice until all are the same! Click each die to freeze it's
        value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="roll-dice">{tenzies ? "Reset Game" : "Roll"}</button>
    </main>
  );
}

export default App;
