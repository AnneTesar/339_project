<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;
    
    session_start();


    $dbservername = "mysql.cs.iastate.edu";
    $dbusername = "dbu309sr2";
    $dbpassword = "YWFkZGQ3OTcw";
    $dbname = "db309sr2";


    $conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        echo "connection failed\n";
    }

    $data = new StdClass();

    $sql = "SELECT * FROM users WHERE username='". $username . "';";
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        $sql = "INSERT INTO users VALUES ('" . $username . "', '" . $password . "');";
        $result = $conn->query($sql);
        $_SESSION["username"] = $username;
        echo "Success";
    }
    else {
        echo "Failed";
    }

    $conn->close();
?>