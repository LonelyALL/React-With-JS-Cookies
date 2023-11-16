<?php 
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $conn = mysqli_connect('localhost', 'root', 'root', 'login');

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $user = json_decode(file_get_contents('php://input'));

        $sql = "SELECT * FROM users WHERE user = ?;";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 's', $user->user);
        mysqli_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if(mysqli_num_rows($result) > 0){
            $row = mysqli_fetch_assoc($result);
            $hashedPassword = $row['password'];
            if(password_verify($user->pass, $hashedPassword)){
                $message = "Logged Successfully";
                $userToken = $row['user'];
                print_r(json_encode(['message' => $message, 'userToken' => $userToken]));
            }
            else{
                $message = "User or Password invalid";
                print_r(json_encode(['message' => $message]));
            }

        }
        else{
            $message = "User or Password invalid";
            print_r(json_encode(['message' => $message]));
        }
    }

?>