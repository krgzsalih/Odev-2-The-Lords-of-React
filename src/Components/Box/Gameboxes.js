import { useEffect, useState } from "react";
import "./style.scss";

const checkWinner = [
  //====> created an array to check the winner
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Gameboxes() {
  const [boxes, setBoxes] = useState(new Array(9).fill("")); //===> created an array of 9 elements to create the boxes
  const [end, setEnd] = useState(false); // ===> defined state to check if the game is over
  const [winner, setWinner] = useState([]); // ===> defined the state to determine the winner
  const [scoreX, setScoreX] = useState(0); // ===> if the winner is x, we add 1 to the scoreX
  const [scoreO, setScoreO] = useState(0); // ===> if the winner is o, we add 1 to the scoreO
  const [player, setplayer] = useState(1);
  const [draw, setdraw] = useState(0);

  // ====> update the boxes array when the boxes are checked

  const markingBox = (index) => {
    setdraw((draw) => draw + 1);
    if (!end) {
      setBoxes(
        boxes.map((item, idx) => {
          if (idx === index && item === "") {
            return player;
          }
          return item;
        })
      );
      if (player === 1) {
        setplayer(2);
      } else {
        setplayer(1);
      }
    } else {
      restheGame();
    }
  };

  const restheGame = () => {
    setBoxes(Array(9).fill(""));
    setEnd(false);
    setWinner([]);
    setdraw(0);
    setplayer(1);
  };
  // ====> As soon as there is a change in the boxes array, we update the score winner and end status.

  useEffect(() => {
    checkWinner.forEach((i) => {
      if (boxes[i[0]] === 1 && boxes[i[1]] === 1 && boxes[i[2]] === 1) {
        setEnd(true);
        setWinner([i[0], i[1], i[2]]);
        setScoreX((x) => x + 1);
      }
      if (boxes[i[0]] === 2 && boxes[i[1]] === 2 && boxes[i[2]] === 2) {
        setEnd(true);
        setWinner([i[0], i[1], i[2]]);
        setScoreO((o) => o + 1);
      }
    });
  }, [boxes]);

  //===> if the box index is 1, we assign text-x className
  //===> if the box index is 2, we assign text-o className
  //===> If the conditions in the checkWinner array are met,  check and add className: winner-box-blue or winner-box-red

  return (
    <div className="App">
      <header className="App-header">
        <div className="text">GAME TIME</div>
        <div className="group">
          {boxes.map((item, index) => {
            return (
              <div
                key={"box_" + index}
                className={
                  "rectangle " +
                  (item === 0
                    ? ""
                    : item === 1
                    ? "text-x "
                    : item === 2
                    ? "text-o "
                    : "") +
                  ((index === winner[0] ||
                    index === winner[1] ||
                    index === winner[2]) &&
                  item === 1
                    ? "winner-box-red"
                    : "") +
                  ((index === winner[0] ||
                    index === winner[1] ||
                    index === winner[2]) &&
                  item === 2
                    ? "winner-box-blue"
                    : "")
                }
                onClick={() => markingBox(index)}
              >
                {item === 1 ? "X" : item === 2 ? "o" : ""}
              </div>
            );
          })}
        </div>
        <div className="score">
          {end === true && (
            <h5
              className="restart"
              style={{ marginTop: "10px" }}
              onClick={restheGame}
            >
              Restart
            </h5>
          )}
          {draw === 9 && end === false ? (
            <div className="draw">
              <h5 className="noWin">No Winner Please Restart</h5>
              <h5 className="restart" onClick={restheGame}>
                Restart
              </h5>
            </div>
          ) : (
            ""
          )}
          <h3 style={{ color: "black" }}>Score</h3>
          <span className="x">X : </span>
          <span className="o" style={{ color: "black" }}>{scoreX}-</span>
          <span className="x" style={{ color: "black" }}>-{scoreO}</span>
          <span className="o"> : O</span>
        </div>
      </header>
    </div>
  );
}

export default Gameboxes;
