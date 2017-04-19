<?php
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $name = $request->name;
    $width = $request->width;
    $height = $request->height;
    
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

    $sql = "INSERT INTO furniture VALUES (DEFAULT, '" . $name . "', '" . $_SESSION["username"] . "', '" . $width . "', '" . $height . "');";
    $result = $conn->query($sql);

    $conn->close();
?>