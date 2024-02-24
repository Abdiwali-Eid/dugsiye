loadData();

btnAction = "Insert";

let fileImage = document.querySelector("#image");
let showInput = document.querySelector("#show");

const reader = new FileReader();

fileImage.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    reader.readAsDataURL(selectedFile); 
})

reader.onload = e => {
    showInput.src = e.target.result;
}


$("#addNew").on("click",function(){
    $("#userModal").modal("show");
});

$("#userForm").on("submit",function(event) {

    event.preventDefault();

    // let amount = $("#amount").val();
    // let type = $("#type").val();
    // let description = $("#description").val();
    // let id = $("#update_id").val();

    let form_data  = new FormData($("#userForm")[0]);
    form_data.append("image",$("input[type=file]")[0].files[0]);


    if(btnAction == "Insert"){
        form_data.append("action","register_user");
    }else{
         
        form_data.append("action","update_user");
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/users.php",
        data : form_data,
        processData : false,
        contentType :false, 
        success: function(data){

            let status = data.status;
            let response = data.data;

            if(status){

                displayMessage("success",response);
                btnAction = "Insert";
                $("#userForm")[0].reset();
                loadData();
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

        setTimeout(function(){
            $("#expenseModal").modal('hide');
            success.classList = "alert alert-success d-none";
            $("#expenseForm")[0].reset();
        },3000);


    }else{
        error.classList = "alert alert-danger";
        error.innerHTML = message;
    }

}

function loadData(){

    $("#userTable tr").html('');

    let sendingData = {
        "action" : "get_users_list"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/users.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';
            let th = '';
            if(status){

                response.forEach( res => {

                    th = "<tr>";
                    for(let i in res){
                        th += `<th>${i}</th>`;
                    }
                    th+="<th>Action</th></tr>";

                    tr += "<tr>";
                    for(let r in res){

                        if(r == "image"){
                           
                                tr += `<td><img style="width:100px;height:100px;border:1px solid #e3ebe7;border-radius:50%;object-fit:cover;" src="../uploads/${res[r]}"></td>`;
                            
                        }else{
                            tr += `<td>${res[r]}</td>`;
                        }

                    }

                    tr += `<td> <a class="btn btn-info update_info" update_id=${res['id']}><i class="fas fa-edit" style="color:#fff;"></i></a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash" style="color:#fff;"></i></a> </td>`;
                    tr += "</tr>";

                })

                $("#userTable thead").append(th);
                $("#userTable tbody").append(tr);

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}

function fethUserInfo(id){

    let sendingData = {
        "action" : "get_user_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/users.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                    btnAction = "Update";
                  $("#update_id").val(response['id']);
                  $("#username").val(response['username']);
                  $("#show").attr('src',`../uploads/${response['image']}`);
                  $("#userModal").modal('show');

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })



}


function DeleteExpenseInfo(id){

    let sendingData = {
        "action" : "delete_user_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/users.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                swal("Good job!", response, "success");
                loadData();

            }else{
                swal(response);
            }
           

        },
        error: function(data){

        }
    })



}



$("#userTable").on("click", "a.update_info" ,function(){
    let id = $(this).attr("update_id");

    fethUserInfo(id)
})
$("#userTable").on("click", "a.delete_info" ,function(){
    let id = $(this).attr("delete_id");

    if(confirm("Are you sure To delete ")){

        DeleteExpenseInfo(id)
    }
})
