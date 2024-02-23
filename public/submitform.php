<?php

$host = "127.0.0.1";
$username = "root";
$password = "";
$database = "mechapp";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("connection failed: " . $conn->connect_error);
}


$make = $_POST['make'];
$model = $_POST['model'];

$sql = "INSERT INTO your_table_name (id, make, model) VALUES (NULL, '$make', '$model')";

if($conn->query($sql) === TRUE) {
    echo "Data inserted successfully";
} else {
    echo "Error: " .$sql . "<br>" . $conn->error;
}

$conn->close();
?>