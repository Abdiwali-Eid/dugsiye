
loadData();
fillUsers();

$("#user_id").on("change",function(){
    let value = $(this).val();
    loadUserPermission(value);
})


$("#all_authority").on("change", function(){

    if($(this).is(":checked")){
        $("input[type='checkbox']").prop('checked',true);
    }else{
        $("input[type='checkbox']").prop("checked",false);
    }

})

$("#authorityArea").on("change","input[name='role_authority[]']", function(){
    

    let value = $(this).val();

    if($(this).is(":checked")){
        $(`#authorityArea input[type='checkbox'][role='${value}']`).prop('checked',true);
    }else{
        $(`#authorityArea input[type='checkbox'][role='${value}']`).prop('checked',false);
    }


})


$("#authorityArea").on("change","input[name='system_link[]']",function(){

    console.log("yee");
    let value = $(this).val();

    if($(this).is(":checked")){
        $(`#authorityArea input[type='checkbox'][link_id=${value}]`).prop("checked",true);
    }else{
        $(`#authorityArea input[type='checkbox'][link_id=${value}]`).prop("checked",false);
    }

})


$("#userForm").on("submit",function(event) {

    event.preventDefault();

    let actions = [];
    let user_id = $("#user_id").val();

    if(user_id == 0){
        alert("Plsease Select User");
        return;
    }

    $("input[name='system_link[]']").each(function(){
        if($(this).is(":checked")){
            actions.push($(this).val());
        }
    })

    let sendingData = {}


        sendingData = {
            "user_id" : user_id,
            "action_id" : actions,
            "action" : "authorize_user"
            
        }
    
   
    
  
    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/user_authority.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;


            if(status){

                console.log(response);
                // displayMessage("success",response);
                
                // loadData();

                response.forEach(re => {
                     $(".alert-success").removeClass("d-none");
                     $(".alert-danger").addClass("d-none");
                     $(".alert-success").html(re['data']);
                
                })
            }else{
                // displayMessage("error",response);
                let errorr = '<ul>';
                $(".alert-danger").removeClass("d-none");
                $(".alert-success").addClass("d-none");
                response.forEach(re => {
                    
                     errorr += `<li>${re['data']}</li>`;
                
                })

                errorr += `</ul>`;

                $(".alert-danger").html(errorr);
                // console.log(response);
            }
           

        },
        error: function(data){
            displayMessage("error",data.responseText);
        }
    })

})

function loadUserPermission(id){

   

    let sendingData = {
        "action" : "getUserAuthorities",
        "user_id" : id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/user_authority.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                if(response.length >= 1) {

                    response.forEach( users => {
                        $(`input[type='checkbox'][name='role_authority[]'][value='${users['role']}']`).prop("checked",true);
     
                        $(`input[type='checkbox'][name='system_link[]'][value='${users['link_id']}']`).prop("checked",true);
         
                        $(`input[type='checkbox'][name='system_action[]'][value='${users['action_id']}']`).prop("checked",true); 
                    })


                }else{
                    $("input[type='checkbox']").prop("checked",false);
                }
              
            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}


function fillUsers(){

   

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

            if(status){

                html += `<option value="0">Select User</option>`;
                response.forEach( res => {

                   html += `<option value="${res['id']}">${res['username']}</option>`;
                })

                $("#user_id").append(html);

              
            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}

function loadData(){

    
    let sendingData = {
        "action" : "readSystemAuthorities"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/user_authority.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let role = '';
            let system_links= '';
            let system_actions = '';

            if(status){

                response.forEach( res => {

                  
                    for(let r in res){

                      if(res['role'] !== role){


                        html += `
                            </fieldset>
                            </div></div>

                            <div class="col-sm-4">
                                    <fieldset class="authority-border">
                                    
                                    <legend class="authority-border">
                                        
                                    <input type="checkbox" id="" name="role_authority[]" value="${res['role']}">
                                        
                                       ${res['role']}
                                    
                                    </legend>
                        
                        
                        `;

                        role = res['role'];


                      }


                      if(res['name'] !== system_links){

                            html += `

                                <div class="control-group>
                                <label class="control-label input-label">

                                <input type="checkbox" name="system_link[]" style="margin-left:25px !important;"  role="${res['role']}"  id="" value="${res['link_id']}" category_id="${res['category_id']}" link_id="${res['link_id']}">
                                    ${res['name']}
                                
                                </label>
                            
                            ` ;


                            system_links = res['name'];

                      }


                      if(res['action_name'] !== system_actions){

                        html += `

                            <div class="system_action">
                            
                            <label class="control-label input-label">

                            <input type="checkbox" name="system_action[]" style="margin-left:45px !important;"  role="${res['role']}"  id="" value="${res['action_id']}" category_id="${res['category_id']}" link_id="${res['link_id']}" action_id="${res['action_id']}">
                                ${res['action_name']}
                            
                            </label>
                            
                            </div>
                        
                        `;

                        system_actions = res['action_name'];

                      } 


                          
                    }

                    

                   

                })

                $("#authorityArea").append(html);

                

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}
