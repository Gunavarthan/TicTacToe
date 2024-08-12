let board=["","","","","","","","",""];
document.addEventListener("DOMContentLoaded",()=>{
    player = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click',async() => {                //onclick
            if (cell.textContent === '') {
                disableCells(cells);
                board[cell.id]=player;
                cell.textContent=player;
                
                await validate(board)

                await delay(Math.floor(Math.random() * (1200 - 600 + 1)) + 600);
                comp_choice=Index_choice(board)
                board[comp_choice]='O';
                document.getElementById(comp_choice).textContent='O';
                
                await validate(board)

                enableCells(cells);
                console.log(board);
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

function Index_choice(board)
{
    while(true)
    {
        const index = Math.floor(Math.random() * 9);
        if(board[index]==="")
        {
            return index;
        }
    }
}
async function validate(board)
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
        await announceWinner(winner, "Winner !!")
        winner = null;
        
    } else if (!board.includes("")) {
        await announceWinner("Draw", "The game Ended in a...");
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