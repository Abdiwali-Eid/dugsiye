<?php
session_start();
header("Content-type: application/json");

include '../config/conn.php';

// $action = $_POST['action'];

function register_expense($conn){

    extract($_POST);

    $data = array();
   
    // buliding the query and cAll the stored procedures
    $query = "CALL register_expense_sp('','$amount','$type','$description','USR001')";

    // Excecution

    $result = $conn->query($query);

    // chck if there is an error or not
    if($result){

        $row = $result->fetch_assoc();

        if($row['Message'] == 'Deny'){
            $data = array("status" => false, "data" => "Insuficient Balance 😊😊😎");
        }elseif($row['Message'] == 'Registered'){
            $data = array("status" => true, "data" => "Registered Successfully");
        }
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);

}

function update_expense($conn){

    extract($_POST);

    $data = array();
   
    // buliding the query and cAll the stored procedures
    $query = "CALL register_expense_sp('$id','$amount','$type','$description','USR001')";

    // Excecution

    $result = $conn->query($query);

    // chck if there is an error or not
    if($result){

        $row = $result->fetch_assoc();

        if($row['Message'] == 'Updated'){
            $data = array("status" => true, "data" => "Updated Successfully");
        }
    }else{
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);

}


function get_user_transaction($conn){

    $data = array();
    $array_data = array();
    $query = "SELECT `id`, `amount`, `type`, `description` FROM `expense` WHERE 1";
    $result = $conn->query($query);

    if($result){

        while($row = $result->fetch_assoc()){
            $array_data [] = $row;
        }

        $data = array("status" => true, "data" => $array_data);

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function get_user_statement($conn){

    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL get_user_statement_sp('USR001','$from','$to')";
    $result = $conn->query($query);

    if($result){

        while($row = $result->fetch_assoc()){
            $array_data [] = $row;
        }

        $data = array("status" => true, "data" => $array_data);

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function get_expense_info($conn){

    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM `expense` where id = '$id'";
    $result = $conn->query($query);

    if($result){

       $row = $result->fetch_assoc();
       
        $data = array("status" => true, "data" =>$row);

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function check_user_actions($user_id,$link,$system_action){

    extract($_POST);
   

    $conn = new mysqli("localhost","root","","expense");

    $query = "CALL check_user_action_sp('$user_id','$link','$system_action')";
    $result = $conn->query($query);

    if($result){

       $row = $result->fetch_assoc();

       if($row['Message'] == 'Allow'){
           return true;
       }else{
           return false;
       }
       
    }else{

      return false;
    }

    echo json_encode($data);
}


function delete_expense_info($conn){

    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM `expense` where id = '$id'";
    $result = $conn->query($query);

    if($result){

        $data = array("status" => true, "data" =>"Deleted Successfully 😘");

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


// if(!empty($_SESSION['id']) && isset($_POST['action'])){

//     $user_id = $_SESSION['id'];

//     $link = basename($_SERVER['HTTP_REFERER']);

//     $action = $_POST['action'];


//     if(check_user_actions($user_id,$link,$action)){
//         $action($conn);
//     }else{
//         echo json_encode(array("status" => false, "data" => "You dont Have Permission For This action"));  
//     }
    
// }else{
//     echo json_encode(array("status" => false, "data" => "Action and Sesssion Required..."));
// }

if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data" => "Action Required..."));
}