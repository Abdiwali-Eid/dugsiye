
$("#from").attr("disabled",true);
$("#to").attr("disabled",true);


$("#type").on("change",function(){
    
    if($("#type").val() == 0){
        $("#from").attr("disabled",true);
        $("#to").attr("disabled",true);
    }else{
        $("#from").attr("disabled",false);
        $("#to").attr("disabled",false);
    }


});


$("#print_statement").on("click",function(){
    printStatement();
});


function printStatement(){

    let printArea =document.querySelector("#print_area");

    let newWindow = window.open("");
    newWindow.document.write(`<html><head><title></title>`);

    newWindow.document.write(`<style media="print">
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    
    body {
        font-family: 'Poppins', sans-serif;
    }

    table {
        width:100%;
    }
    
    th {
        background-color : #04AA6D !important;
        color: white !important;
       
    }

    th , td {
        padding:15px !important;
        text-align:left !important;

    }

    th , td {
        border-bottom : 1px solid #ddd !important;

    }

    </style>`)

    newWindow.document.write(`</head><body>`);
    // newWindow.document.write(``)



    newWindow.document.write(printArea.innerHTML);

    newWindow.document.write(`</body></html>`);


    newWindow.print();
    newWindow.close();

}


$('#export_statement').on('click', function() {
    let file = new Blob([$('#print_area').html()], {type:"application/vnd.ms-excel"});
    let url = URL.createObjectURL(file);
    let a = $("<a />", {
      href: url,
      download: "print_statement.xls"}).appendTo("body").get(0).click();
      e.preventDefault();
});




$("#userForm").on("submit",function(event) {

    event.preventDefault();


    $("#userTable tr").html("");

   let from = $("#from").val();
   let to = $("#to").val();

    let sendingData = {
        "from" : from,
        "to" : to,
        "action" : "get_user_statement"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "../api/expense.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;

            let tr = '';
            let th = '';

            if(status){

                response.forEach( res => {

                    th = "<tr>";
                    for(let r in res){
                            th += `<th>${r}</th>`;
                        }

                        th += "</tr>";


                    tr += "<tr>";
                    for(let r in res){
                            tr += `<td>${res[r]}</td>`;
                        }

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



