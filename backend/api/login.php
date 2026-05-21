<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include __DIR__ . "/../config/database.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$query = mysqli_query(
    $conn,
    "select * from users where email = '$email'"
);

if (mysqli_num_rows($query) == 0) {
    echo json_encode([
        "status" => false,
        "message" => "User tidak ditemukan"
    ]);
    exit;
}

$user = mysqli_fetch_assoc($query);

if (password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => true,
        "message" => "Login berhasil",
        "user" => [
            "id" => $user['id'],
            "full_name" => $user['full_name'],
            "username" => $user['username'],
            "email" => $user['email']
        ]
    ]);
} else {
    echo json_encode([
        "status" => false,
        "message" => "Password salah"
    ]);
}