<?php

header('Content-Type: application/json');

$con = mysqli_connect("localhost","root","guna","TicTacToe");

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    if(isset($_POST['action']))
    {
        $action = $_POST['action'];
        
        switch($action)
        {
            case 'clear_board':
                $session_id = $_POST['sessionID'];
                $query = "update board set `$session_id` = '';";
                mysqli_query($con,$query);
                $response = ['status' => 'success' ,'message' => 'Board Cleared'];
                echo json_encode($response);
                break;

            case 'change':
                $session_id = $_POST['sessionID'];
                $index = $_POST['index'];
                $value = $_POST['value'];
                $query = "update board set `$session_id` = '$value' where cell_index = $index;";
                mysqli_query($con,$query);
                $response = ['status' => 'success' ,'message' => 'Board Updated'];
                echo json_encode($response);
                break;

            case 'get_val':
                $session_id = $_POST['sessionID'];
                $query = "select * from board;";
                $result = mysqli_query($con,$query);
                $data = [];
                $emptyCell = 0;
                while($row = mysqli_fetch_assoc($result))
                {
                    $data[] = ['index' => $row["cell_index"] , 'value' => $row[$session_id]];
                    if(empty($row[$session_id])){$emptyCell++;}
                }
                $response = ['status' => 'success','message' => 'value passed', 'data' => $data,'EmptyCell' => $emptyCell];
                echo json_encode($response);
                break;
            
            case 'check_session':
                $session_id = $_POST['sessionID'];
                $query = "SELECT * FROM sessions WHERE session_id = '$session_id';";
                $result = mysqli_query($con,$query);
                if(mysqli_num_rows($result)==0)
                {
                    $response = ['status' => 'success', 'message' => 'NO Session', 'data' => 'no-session'];
                }
                else
                {
                    $response = ['status' => 'success', 'message' => 'NO Session', 'data' => 'session-found'];
                }
                echo json_encode($response);
                break;

            case 'start-Session':
                $session_id = $_POST['sessionID'];
                $start_time = date('Y-m-d H:i:s');
                $end_time = date('Y-m-d H:i:s', strtotime('+10 minutes'));
                $is_active = 1;
                
                
                $query = "SELECT session_id FROM sessions WHERE end_time < '$start_time';";
                $result = mysqli_query($con, $query);
                $expired_sessions = [];
                
                while ($row = mysqli_fetch_assoc($result)) {
                    $expired_sessions[] = $row['session_id'];
                }
                
                // Drop columns for expired sessions
                if (!empty($expired_sessions)) {
                    $columnsToDrop = array_map(function($sessionId) {
                        return "`$sessionId`";
                    }, $expired_sessions);
                    
                    $columnsToDropString = implode(', DROP COLUMN ', $columnsToDrop);
                    $dropQuery = "ALTER TABLE board DROP COLUMN " . $columnsToDropString . ";";
                    mysqli_query($con, $dropQuery);
                    
                    // Delete expired sessions
                    $sessionIdsString = implode(', ', array_map(function($id) {
                        return "'$id'";
                    }, $expired_sessions));
                    $deleteQuery = "DELETE FROM sessions WHERE session_id IN ($sessionIdsString);";
                    mysqli_query($con, $deleteQuery);
                }
                
                $query = "INSERT INTO sessions (session_id, start_time, end_time) VALUES ('$session_id', '$start_time', '$end_time')";
                mysqli_query($con, $query);
                
                $query = "ALTER TABLE board ADD COLUMN `$session_id` varchar(1) DEFAULT NULL";
                if (mysqli_query($con, $query)) {
                    $response = ['status' => 'success', 'message' => 'Column added successfully'];
                } else {
                    $response = ['status' => 'error', 'message' => 'Failed to add column'];
                }
                
                echo json_encode($response);
                break;
        }
    }
}

?>



