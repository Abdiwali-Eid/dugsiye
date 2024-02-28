<?php

header("Content-type: application/json");

include '../config/conn.php';

// $action = $_POST['action'];

function register_user($conn){

    extract($_POST);

    $data = array();
    $error_arrray = array();

    $new_id = generate($conn);

    $file_name = $_FILES['image']['name'];
    $file_type = $_FILES['image']['type'];
    $file_size = $_FILES['image']['size']; 

    $save_name = $new_id . ".png"; 

    // allowed images

    $allowedImages = ["image/jpg","image/jpeg","image/png"];
    $max_size = 5 * 1024 * 1024;

   if(in_array($file_type,$allowedImages)){

        if($file_size > $max_size){
            
            $error_arrray[] = $file_size/1024/1024 . " MB Files Size must be Less Then " . $max_size/1024/1024 . " MB";
        }
   }else{
        $error_arrray[] = "This file is not Allowed " .$file_type ;
   }


    // buliding the query and cAll the stored procedures
    if(count($error_arrray) <= 0){

        $query = "INSERT INTO `users`(`id`, `username`, `password`, `image`) VALUES('$new_id','$username',MD5('$password'), '$save_name')";

        // Excecution
    
        $result = $conn->query($query);
    
        // chck if there is an error or not
        if($result){
    
            move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/".$save_name);
            $data = array("status" => true, "data" => "SucessFully Registred");
    
        }else{
            $data = array("status" => false, "data" => $conn->error);
        }

    }else{
        $data = array("status" => false, "data" => $error_arrray);
    }
   
    echo json_encode($data);

}


function update_user($conn){

    extract($_POST);

    $data = array();

    if(!empty($_FILES['image']['tmp_name'])){
        $error_arrray = array();

        // $new_id = generate($conn);
    
        $file_name = $_FILES['image']['name'];
        $file_type = $_FILES['image']['type'];
        $file_size = $_FILES['image']['size']; 
    
        $save_name = $update_id . ".png"; 
    
        // allowed images
    
        $allowedImages = ["image/jpg","image/jpeg","image/png"];
        $max_size = 15 * 1024 * 1024;
    
       if(in_array($file_type,$allowedImages)){
    
            if($file_size > $max_size){
                
                $error_arrray[] = $file_size/1024/1024 . " MB Files Size must be Less Then " . $max_size/1024/1024 . " MB";
            }
       }else{
            $error_arrray[] = "This file is not Allowed " .$file_type ;
       }
    
    
        // buliding the query and cAll the stored procedures
        if(count($error_arrray) <= 0){
    
            $query = "UPDATE users set users.username = '$username', password = MD5('$password') where users.id = '$update_id'";
    
            // Excecution
        
            $result = $conn->query($query);
        
            // chck if there is an error or not
            if($result){
        
                move_uploaded_file($_FILES['image']['tmp_name'], "../uploads/".$save_name);
                $data = array("status" => true, "data" => "SucessFully Registred");
        
            }else{
                $data = array("status" => false, "data" => $conn->error);
            }
    
        }else{
            $data = array("status" => false, "data" => $error_arrray);
        }
    }else{

        $query = "UPDATE users set users.username = '$username', password = MD5('$password') where users.id = '$update_id'";
    
        // Excecution
    
        $result = $conn->query($query);
    
        // chck if there is an error or not
        if($result){
    
          
            $data = array("status" => true, "data" => "SucessFully Updated");
    
        }else{
            $data = array("status" => false, "data" => $conn->error);
        }

    }
    
   
    echo json_encode($data);

}


function get_users_list($conn){

    $data = array();
    $array_data = array();
    $query = "SELECT * FROM `users`";
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

function get_user_info($conn){

    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM `users` where id = '$id'";
    $result = $conn->query($query);

    if($result){

       $row = $result->fetch_assoc();
       
        $data = array("status" => true, "data" =>$row);

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function delete_user_info($conn){

    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM `users` where id = '$id'";
    $result = $conn->query($query);

    if($result){
        unlink('../uploads/'.$id.".png");
        $data = array("status" => true, "data" =>"Deleted Successfully 😘");

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function generate($conn){

    $new_id = '';
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM `users` order by users.id DESC limit 1";
    $result = $conn->query($query);

    if($result){

        $num_rows = $result->num_rows;

        if($num_rows > 0){

            $row = $result->fetch_assoc();
            $new_id = ++$row['id'];

        }else{
           $new_id = "USR001"; 
        }

    }else{

        $data = array("status" => false, "data" => $conn->error);
    }

    return $new_id;
}

if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data" => "Action Required..."));
}