<?php

$host = "127.0.0.1";
$username = "root";
$password = "";
$database = "mechapp";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle registration
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $registrationType = $POST["registrationType"];

    // Perform input validation and other necessary checks

    // Hash the password (consider using password_hash() function)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the database
    if($registrationType === "user") {
        $sql = "INSERT INTO userregister (username, email, password) VALUES ('$username', '$email', '$hashedPassword')";
    } elseif ($registrationType === "mechanic") {
    $make = $_POST["make"]
    $model = $_POST["model"]

        $sql = "INSERT INTO users (username, email, password, make, model) VALUES ('$username', 'c, '$hashedPassword', '$make', '$model')";
    } else{
        echo json_encode(["success" => false, "message" => "Invalid registration type"]);
        exit;
    }
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
}

$conn->close();
?>
