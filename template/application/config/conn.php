<?php

$conn = new mysqli("localhost","root","","expenses", 4306);


if($conn->connect_error){
    echo $conn->error;
}