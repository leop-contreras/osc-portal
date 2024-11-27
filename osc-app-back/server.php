<?php

//CORS
//Allow CORS for all domain
header("Access-Control-Allow-Origin: *");
//Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
//Allow specific headers
header("Access-Control-Allow-Headers: Content-Type,Authorization");

//Handle preflight requests //PRE-HANDSHAKE
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    http_response_code(200);
    exit;
}
//


$servername = "localhost";
$username = "civil";
$password = "cisco123";
$dbname = "sociedad_civil";
$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("500 - Connection failed".$conn -> connect_error);
}

include 'operations/'.$_POST['operation'].'.php';

//echo "200 - Connected succesfully";

?>