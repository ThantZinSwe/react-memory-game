import { useState } from "react";
import "./App.css";
import Images from "./Images";
import { shuffle } from "lodash";

function App() {
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [activeCards, setActiveCards] = useState([]);

  const showCard = (index) => {
    setActiveCards([index]);
  };

  return (
    <div>
      <div className="board">
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className={
                "parent-card " +
                (activeCards.indexOf(index) !== -1 ? "show" : "")
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
    </div>
  );
}

export default App;
