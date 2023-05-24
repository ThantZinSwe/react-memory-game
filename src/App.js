import { useState } from "react";
import "./App.css";
import Images from "./Images";
import { shuffle } from "lodash";
import { click } from "@testing-library/user-event/dist/click";

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [activeCards, setActiveCards] = useState([]);
  const [matchCards, setMatchCards] = useState([]);
  const [won, setWon] = useState(false);
  const [click, setClick] = useState(0);

  const showCard = (index) => {
    setClick((prev) => prev + 1);

    if (activeCards.length === 0 || activeCards.length === 2) {
      setActiveCards([index]);
    }

    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;

      if (
        cards[firstIndex] === cards[secondIndex] &&
        firstIndex !== secondIndex
      ) {
        setMatchCards([...matchCards, firstIndex, secondIndex]);

        if (matchCards.length + 2 === cards.length) {
          setWon(true);
        }
      }

      setActiveCards([...activeCards, index]);
    }
  };

  return (
    <div>
      {won && (
        <p className="game-won">
          Congratulations! You won the game. Click count is {click} clicks.
        </p>
      )}
      <div className="board">
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className={
                "parent-card " +
                (activeCards.indexOf(index) !== -1 ||
                matchCards.indexOf(index) !== -1
                  ? "show"
                  : "")
              }
              onClick={() => showCard(index)}
            >
              <div className="card">
                <div className="front-card">
                  <img src={card} alt="" />
                </div>
                <div className="back-card"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="game-info">
        Click : {click} &nbsp;&nbsp;&nbsp;&nbsp; Pairs : {matchCards.length / 2}
      </div>
    </div>
  );
}

export default App;
