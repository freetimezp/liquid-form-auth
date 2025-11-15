<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$users = [
    "1234567890" => [
        "name" => "Олена Петренко",
        "password" => "111111",
        "magazines" => ["shop1", "shop2"],
        "cashRegisters" => ["SR1", "DJ7", "BL4"],
        "workdays" => [1, 2, 3, 4, 6],
    ],
    "9876543210" => [
        "name" => "Іван Коваль",
        "password" => "qwerty",
        "magazines" => ["shop3"],
        "cashRegisters" => ["SR1"],
        "workdays" => [2, 4, 6],
    ]
];

$data = json_decode(file_get_contents("php://input"), true);
$inn = $data["inn"] ?? "";

// Validation
if (!$inn || !preg_match("/^\d{10}$/", $inn)) {
    echo json_encode(["status" => "error", "message" => "Невірний формат ІНН!"]);
    exit;
}

// Check if user exists
if (isset($users[$inn])) {
    echo json_encode([
        "status" => "success",
        "user" => $users[$inn]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Користувача не знайдено!"]);
}


