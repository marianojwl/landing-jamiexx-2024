<?php
// get the headers
require_once __DIR__ . '/headers.php';
// get the .env file
require_once __DIR__ . '/env.php';

// set result object
$result = [
    'success' => false,
    'error' => null,
    'message' => null,
    'data' => []
];

try {
  $result['data']['form_open'] = $_ENV['FORM_OPEN']==1?true:false;
  $result['success'] = true;
} catch (Exception $e) {
    $result['message'] = 'Algo salió mal.';
    $result['error'] = $e->getMessage();
    echo json_encode($result);
    http_response_code(200);
    exit();
}

echo json_encode($result);
http_response_code(200);
exit();