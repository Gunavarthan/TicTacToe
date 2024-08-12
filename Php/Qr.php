<?php

include 'phpqrcode/qrlib.php';


if (isset($_GET['sessionID'])) {
    $SessionID = $_GET['sessionID'];
    $url = "https://116b-49-47-216-142.ngrok-free.app/TicTacToe.v1/HTML/game.html?currentPlayer=X&SessionID=" . $SessionID;    
    
    header('Content-Type: image/png');
    QRcode::png($url);
} else {
    echo "Session ID not provided.";
}


?>
