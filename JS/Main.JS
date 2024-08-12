function redirectTo(url) {
window.location.href = url;
}

// Change Player and click for cell
let currentPlayer, access,response,sessionID;
currentPlayer = getURLParameter('currentPlayer') || 'X';        //getting Current player 
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    sessionID = getURLParameter('SessionID');
    console.log(currentPlayer);access = 'X';
    flag=0;
    cells.forEach(cell => {
        cell.addEventListener('click', async () => {                //onclick
            if (cell.textContent === '') {
                //const response = await Request('get_val');          //get the current values in board
                if (currentPlayer === access) {
                    cell.textContent = currentPlayer;
                    await Request('change',sessionID,cell.id, currentPlayer, async () => {
                        response = await Request('get_val',sessionID);
                        update_board(response);                             //Updating the board
                        validate(response);                                 //validating the board
                        (response.EmptyCell % 2 == 0) ? (access = 'O') : (access = 'X');
                        console.log(response.EmptyCell);
                    });
                }
            }
        });
    });
    setInterval(async () => {
        console.log('access: ',access,'\n Current Player: ',currentPlayer);
        if(flag == 0)
        {
            console.log("first Role");
            response = await Request('get_val',sessionID);
            flag = 1;
        } 
        if(access != currentPlayer)
        {
            response = await Request('get_val',sessionID);                      //constant updating the board ever 2sec
            update_board(response);                                         // and Validating 
            await validate(response);
        }
        (response.EmptyCell % 2 == 0) ? (access = 'O') : (access = 'X');     // providing current user the access
    }, 1000);
});

async function validate(response) {
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
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (response.data[a].value && response.data[a].value === response.data[b].value && response.data[a].value === response.data[c].value) {
            winner = response.data[a].value;
            break;
        }
    }

    if (winner) {
        winner == currentPlayer ? await announceWinner(winner, "Winner !!"): await announceWinner("LOSE", "You")
        winner = null;
        
    } else if (response.EmptyCell === 0) {
        announceWinner("Draw", "The game Ended in a...");
    }
}

async function announceWinner(winner, message) {
    console.log("CALLED THIS " + " " + message + winner
    );
                    //Announcing the winner or Draw state to both players
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
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    console.log("djhgdfghdjfghfjdghfjdgdfg" + currentPlayer);
    access = 'X';
    await delay(2000);
    clearBoard();
}

function getURLParameter(name) {                            //getting parameter from URL
    const UrlParam = new URLSearchParams(window.location.search);
    return UrlParam.get(name);
}

function delay(ms)                                                  // delay function
{
    return new Promise(resolve => setTimeout(resolve,ms));
} 

function clearBoard() {                                             // reset all date to NULL
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    Request('clear_board',sessionID);
    flag = 0;
}

function update_board(response) {                                   // changing the cell values to table value
    const cells = document.querySelectorAll('.cell');
    response.data.forEach(cellData => {
        const cell = document.getElementById(cellData.index);
        cell.textContent = cellData.value;
    });
}

function Request(action, sessionID,index, value, callback) {              //AJAX request function 
    return new Promise((resolve, reject) => {
        console.log("Request");
        $.ajax({
            url: "../Php/main.php",
            method: 'POST',
            data: { action: action, index: index, value: value, sessionID: sessionID },
            dataType: 'json',
            success: function (response) {
                resolve(response);
                if (callback) { callback(response); }
                console.log(response.message);
            },
            error: function (xhr, status, error) {
                console.error("AJAX Request Failed: ", status, error);
                console.error(xhr.responseText);
                reject(error);
            }
        });
    });
}
