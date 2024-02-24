loadData();

btnAction = "Insert";

$("#addNew").on("click",function(){
    $("#categoryModal").modal("show");
});

$("#categoryForm").on("submit",function(event) {

    event.preventDefault();

    let name = $("#name").val();
    let role = $("#role").val();
    let icon = $("#icon").val();
    let id = $("#update_id").val();

    let sendingData = {}

    if(btnAction == "Insert"){
        sendingData = {
            "name" : name,
            "role" : role,
            "icon" : icon,
            "action" : "register_category"
            
        }
    
    }else{
          sendingData = {
            "id" : id,
            "name" : name,
            "role" : role,
            "icon" : icon,
            "action" : "update_category"
            
        }
    
    }

    
  
    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/category.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;

            if(status){

                displayMessage("success",response);
                btnAction = "Insert";
                loadData();
            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){
            displayMessage("error",data.responseText);
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
            $("#categoryModal").modal('hide');
            success.classList = "alert alert-success d-none";
            $("#categoryForm")[0].reset();
        },3000);


    }else{
        error.classList = "alert alert-danger";
        error.innerHTML = message;
    }

}

function loadData(){

    $("#categoryTable tbody").html('');

    let sendingData = {
        "action" : "read_all_category"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/category.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                response.forEach( res => {

                    tr += "<tr>";
                    for(let r in res){

                      
                            tr += `<td>${res[r]}</td>`;
                        }

                    

                    tr += `<td> <a class="btn btn-info update_info" update_id=${res['id']}><i class="fas fa-edit" style="color:#fff;"></i></a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash" style="color:#fff;"></i></a> </td>`;
                    tr += "</tr>";

                })

                $("#categoryTable tbody").append(tr);

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}

function fetchCategoryInfo(id){

    let sendingData = {
        "action" : "get_category_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/category.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                    btnAction = "Update";
                   $("#update_id").val(response['id']);
                   $("#name").val(response['name']);
                   $("#role").val(response['role']);
                   $("#icon").val(response['icon']);

                   $("#categoryModal").modal('show');

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })



}


function DeleteCategoryInfo(id){

    let sendingData = {
        "action" : "delete_category_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/category.php",
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



$("#categoryTable").on("click", "a.update_info" ,function(){
    let id = $(this).attr("update_id");

    fetchCategoryInfo(id)
})
$("#categoryTable").on("click", "a.delete_info" ,function(){
    let id = $(this).attr("delete_id");

    if(confirm("Are you sure To delete ")){

        DeleteCategoryInfo(id)
    }
})
