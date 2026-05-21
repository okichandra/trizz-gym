<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

$nama = $data->nama;
$email = $data->email;

$query = "INSERT INTO mahasiswa (nama, email) VALUES ('$nama', '$email')";

if(mysqli_query($conn, $query)) {
    echo json_encode([
        "status" => "success",
        "message" => "Data berhasil ditambahkan"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Data gagal ditambahkan: " . mysqli_error($conn)
    ]);
}