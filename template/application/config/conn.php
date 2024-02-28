<?php

$conn = new mysqli("localhost","root","","expense", 4306);


if($conn->connect_error){
    echo $conn->error;
}