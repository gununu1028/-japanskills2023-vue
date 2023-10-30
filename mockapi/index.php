<?php

error_reporting(0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/auth/login') {
    try {
        $data = json_decode(file_get_contents('php://input'));
        if (in_array($data->username, ['gorin', 'gorin2', 'gorin3']) && $data->password === '2023') {
            echo json_encode([
                'token' => 'thisistoken',
                'username' => 'gorin'
            ]);
        } else {
            echo_401();
        }
    } catch (\Exception $e) {
        echo_401();
    }
}

function echo_401()
{
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode([
        "success" => false,
        "message" => "認証失敗"
    ]);
}

// php -S localhost:8085