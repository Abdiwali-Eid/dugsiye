

$("#loginForm").on("submit",function(e){

    e.preventDefault();
    
    let username = $("#username").val();
    let password = $("#password").val();


    let sendingData = {
        "action" : "login",
        "username": username,
        "password" : password
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/login.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                 window.location.href = "../views/dashboard.php";

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })


})






function displayMessage(type,message){

    let success = document.querySelector(".alert-success");
    let error = document.querySelector(".alert-danger");

    if(type == "success"){
        error.classList = "alert alert-danger d-none";
        success.classList = "alert alert-success";
        success.innerHTML = message;

        // setTimeout(function(){
            // $("#actionModal").modal('hide');
            success.classList = "alert alert-success d-none";
            // $("#actionForm")[0].reset();
        // },3000);
       


    }else{
        error.classList = "alert alert-danger";
        error.innerHTML = message;
        $("#password").val("");
    }

}
