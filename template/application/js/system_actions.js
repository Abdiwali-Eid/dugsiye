loadData();

btnAction = "Insert";
fillLinks();

$("#addNew").on("click",function(){
    $("#actionModal").modal("show");
});

$("#actionForm").on("submit",function(event) {

    event.preventDefault();

    let name = $("#name").val();
    let link_id = $("#link_id").val();
    let system_action = $("#system_action").val();
    let id = $("#update_id").val();

    let sendingData = {}

    if(btnAction == "Insert"){
        sendingData = {
            "name" : name,
            "link_id" : link_id,
            "system_action" : system_action,
            "action" : "register_system_action"
            
        }
    
    }else{
          sendingData = {
            "id" : id,
            "name" : name,
            "link_id" : link_id,
            "system_action" : system_action,
            "action" : "update_system_action"
            
        }
    
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/system_actions.php",
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

        // setTimeout(function(){
            // $("#actionModal").modal('hide');
            success.classList = "alert alert-success d-none";
            $("#actionForm")[0].reset();
        // },3000);


    }else{
        error.classList = "alert alert-danger";
        error.innerHTML = message;
    }

}

function loadData(){

    $("#actionTable tr").html('');

    let sendingData = {
        "action" : "read_all_system_action"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/system_actions.php",
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

                    th +="<th>Action</th></tr>";

                    tr += "<tr>";
                    for(let r in res){

                      
                            tr += `<td>${res[r]}</td>`;
                        }

                    

                    tr += `<td> <a class="btn btn-info update_info" update_id=${res['id']}><i class="fas fa-edit" style="color:#fff;"></i></a>&nbsp;&nbsp;<a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash" style="color:#fff;"></i></a> </td>`;
                    tr += "</tr>";

                })

                $("#actionTable thead").append(th);
                $("#actionTable tbody").append(tr);

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}


function fillLinks(){

   

    let sendingData = {
        "action" : "read_all_db_links"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/system_links.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                
                response.forEach( res => {

                   html += `<option value="${res['id']}">${res['name']}</option>`;
                })

                $("#link_id").append(html);

              
            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}

function fetchlinkInfo(id){

    let sendingData = {
        "action" : "get_action_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/system_actions.php",
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
                   $("#link_id").val(response['link_id']);
                   $("#system_action").val(response['action']);

                   $("#actionModal").modal('show');

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })



}


function DeletelinkInfo(id){

    let sendingData = {
        "action" : "delete_action_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/system_actions.php",
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



$("#actionTable").on("click", "a.update_info" ,function(){
    let id = $(this).attr("update_id");

    fetchlinkInfo(id)
})
$("#actionTable").on("click", "a.delete_info" ,function(){
    let id = $(this).attr("delete_id");

    if(confirm("Are you sure To delete ")){

        DeletelinkInfo(id)
    }
})
