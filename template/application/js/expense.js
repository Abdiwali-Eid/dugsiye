loadData();

btnAction = "Insert";

$("#addNew").on("click",function(){
    $("#expenseModal").modal("show");
});

$("#expenseForm").on("submit",function(event) {

    event.preventDefault();

    let amount = $("#amount").val();
    let type = $("#type").val();
    let description = $("#description").val();
    let id = $("#update_id").val();

    let sendingData = {}

    if(btnAction == "Insert"){
        sendingData = {
            "amount" : amount,
            "type" : type,
            "description" : description,
            "action" : "register_expense"
            
        }
    
    }else{
          sendingData = {
            "id" : id,
            "amount" : amount,
            "type" : type,
            "description" : description,
            "action" : "update_expense"
            
        }
    
    }

    
  
    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/expense.php",
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

    $("#expenseTable tbody").html('');

    let sendingData = {
        "action" : "get_user_transaction"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/expense.php",
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

                        if(r == "type"){
                            if(res[r] == "Income"){
                                tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                            }else{
                                tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                            }
                        }else{
                            tr += `<td>${res[r]}</td>`;
                        }

                    }

                    tr += `<td> <a class="btn btn-info update_info" update_id=${res['id']}><i class="fas fa-edit" style="color:#fff;"></i></a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash" style="color:#fff;"></i></a> </td>`;
                    tr += "</tr>";

                })

                $("#expenseTable tbody").append(tr);

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
        "action" : "get_expense_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/expense.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                    btnAction = "Update";
                   $("#update_id").val(response['id']);
                   $("#amount").val(response['amount']);
                   $("#type").val(response['type']);
                   $("#description").val(response['description']);

                   $("#expenseModal").modal('show');

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
        "action" : "delete_expense_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/expense.php",
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



$("#expenseTable").on("click", "a.update_info" ,function(){
    let id = $(this).attr("update_id");

    fethUserInfo(id)
})
$("#expenseTable").on("click", "a.delete_info" ,function(){
    let id = $(this).attr("delete_id");

    if(confirm("Are you sure To delete ")){

        DeleteExpenseInfo(id)
    }
})
