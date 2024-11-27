<?php

$result = $conn->query($_POST['query']);

$data = [];
if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($data,$row);
    }
}

echo json_encode($data);

?>