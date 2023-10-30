<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/auth/login') {
    header('Content-Type: application/json');
    echo json_encode([
        'token' => 'thisistoken',
        'username' => 'gorin'
    ]);
}

// php -S localhost:8085