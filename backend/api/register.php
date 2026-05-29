<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

include __DIR__ . "/../config/database.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    echo json_encode([
        "status" => false,
        "message" => "Method not allowed"
    ]);

    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!$data) {

    echo json_encode([
        "status" => false,
        "message" => "No data received"
    ]);

    exit;
}

$full_name = $data->fullName;
$username  = $data->username;
$email     = $data->email;
$password  = password_hash($data->password, PASSWORD_DEFAULT);

$check = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE email='$email' OR username='$username'"
);

if (mysqli_num_rows($check) > 0) {

    echo json_encode([
        "status" => false,
        "message" => "Email atau username sudah digunakan"
    ]);

    exit;
}

$query = "
INSERT INTO users(full_name, username, email, password)
VALUES('$full_name', '$username', '$email', '$password')
";

$result = mysqli_query($conn, $query);

if ($result) {

    echo json_encode([
        "status" => true,
        "message" => "Register berhasil"
    ]);

} else {

    echo json_encode([
        "status" => false,
        "message" => "Register gagal"
    ]);
}