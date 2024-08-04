<?php
// get the headers
require_once __DIR__ . '/headers.php';
// get the .env file
require_once __DIR__ . '/env.php';

// set result object
$result = [
    'success' => false,
    'error' => null,
    'message' => null
];

try {
  // set the database connection
  $conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASS'], $_ENV['DB_NAME']);
  if ($conn->connect_error) {
    throw new Exception($conn->connect_error);
  }

  // get input data
  $input = json_decode(file_get_contents('php://input'), true);

  // validate name
  if (!isset($input['name']) || empty($input['name'])) {
    throw new Exception('Name is required.');
  }

  // validate email
  if (!isset($input['email']) || empty($input['email'])) {
    throw new Exception('Email is required.');
  }

  // validate email regex
  if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    throw new Exception('Email is invalid.');
  }

  // validate agrees
  if (!isset($input['agrees']) || empty($input['agrees'])) {
    throw new Exception('Agree to Terms and Conditions is required.');
  }

  // insert the data
  $name = trim( $conn->real_escape_string($input['name']) );
  $email = $conn->real_escape_string($input['email']);
  $ip = $_SERVER['REMOTE_ADDR'];
  $table = $_ENV['DB_TABLE'];
  $sql = "INSERT INTO ".$table." (name, email, ip) VALUES ('$name', '$email', '$ip')";
  $conn->query($sql);
  
  $result['success'] = true;
  $result['message'] = 'Datos recibidos.';

} catch (Exception $e) {

    switch ($conn->errno) {
      case 1062:
        $result['message'] = 'El correo ya está registrado.';
        break;
      default:
        $result['message'] = 'Ocurrió un error.';
        break;
    }
    $result['error'] = $e->getMessage();
}
echo json_encode($result);
http_response_code(200);
exit();