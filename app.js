let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false;

const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "lightgreen"
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const resetGame = () => {
  turnO = false;
  enable();
  msgContainer.classList.add("hide");
};

const disablebtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enable = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disablebtn();
};

const draw = () => {
  msg.innerText = "Game Draw";
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  let winnerFound = false;

  for (let position of winningPattern) {
    let pos1 = boxes[position[0]].innerText;
    let pos2 = boxes[position[1]].innerText;
    let pos3 = boxes[position[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerFound = true;
        showWinner(pos1);
        return;
      }
    }
  }

  let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (!winnerFound && allFilled) {
    draw();
  }
};

newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
