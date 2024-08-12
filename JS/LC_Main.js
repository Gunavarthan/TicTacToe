let board=["","","","","","","","",""];
document.addEventListener("DOMContentLoaded",()=>{
    player = 'X';
    document.getElementById('Session').innerText="Current Player: "+player;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click',() => {                //onclick
            if (cell.textContent === '') {
                board[cell.id]=player;
                cell.textContent=player;
                disableCells(cells);
                validate(board);
                enableCells(cells);
                player = player=='X' ? 'O' : 'X';
                document.getElementById('Session').innerText="Current Player: "+player;
            }
        });
    });
});

function disableCells(cells) {
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    });
}

function enableCells(cells) {
    cells.forEach(cell => {
        cell.style.pointerEvents = 'auto';
    });
}

function validate(board)
{
    const winningCombinations = [           //provided all wining combinations
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Main diagonal
        [2, 4, 6]  // Anti diagonal
    ];
    let winner = null;
    count=9;
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            break;
        }
    }

    if (winner) {
        announceWinner(winner, "Winner !!")
        winner = null;
        
    } else if (count == 0) {
        announceWinner("Draw", "The game Ended in a...");
    }
}

async function announceWinner(winner, message) {
    console.log("CALLED THIS " + " " + message + winner);               //Announcing the winner or Draw state to both players
    const winnerAnnouncement = document.getElementById('winnerAnnouncement');
    document.getElementById("disp-message").innerHTML = message;
    document.getElementById("disp-data").innerHTML = winner;

    winnerAnnouncement.style.display = 'block';
    winnerAnnouncement.style.opacity = '1';

    setTimeout(() => {
        winnerAnnouncement.style.opacity = '0';
    }, 3000);
    setTimeout(() => {
        winnerAnnouncement.style.display = 'none';
    }, 3500);
    await delay(2000);
    clearBoard();
}

function clearBoard()
{
    board=["","","","","","","","",""];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent="";
    });
}

function delay(ms)                                                  // delay function
{
    return new Promise(resolve => setTimeout(resolve,ms));
}