const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let running = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",cellClicked);
});

restartBtn.addEventListener("click",restartGame);

function cellClicked(){

    const index=this.dataset.index;

    if(board[index]!=="" || !running)
        return;

    board[index]=currentPlayer;
    this.textContent=currentPlayer;

    checkWinner();
}

function checkWinner(){

    let won=false;

    for(let pattern of winPatterns){

        const[a,b,c]=pattern;

        if(board[a]==="")
            continue;

        if(board[a]===board[b] && board[a]===board[c]){
            won=true;
            break;
        }
    }

    if(won){
        statusText.textContent=`Player ${currentPlayer} Wins!`;
        running=false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent="It's a Draw!";
        running=false;
        return;
    }

    currentPlayer=currentPlayer==="X"?"O":"X";
    statusText.textContent=`Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    board=["","","","","","","","",""];
    currentPlayer="X";
    running=true;

    statusText.textContent="Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });
}
