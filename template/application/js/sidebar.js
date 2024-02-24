
loadUserMenus();


setTimeout(function() {

    document.querySelectorAll(".nav-item").forEach( function(item){
        item.addEventListener("click", function() {
                item.classList.toggle("pcoded-trigger");
                item.querySelector(".pcoded-submenu").classList.toggle("show-menu-now");
        })
    })

},2000);



function loadUserMenus(){

    

    let sendingData = {
        "action" : "getUserMenus"
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
            let menuEelement = '';
            let category = '';

            if(status){

                response.forEach( menu => {

                    if(menu['category_name'] !== category){

                        if(category !== ''){
                            menuEelement += '</ul></li>';
                        }

                        menuEelement += ` 

                        <li data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds" class="nav-item pcoded-hasmenu">
                        <a href="javascript:" class="nav-link "><span class="pcoded-micon"><i class="feather icon-box"></i></span><span class="pcoded-mtext">${menu['category_name']}</span></a>
                        <ul class="pcoded-submenu" category="${menu['category_name']}">
                           
                        `;

                        category = menu['category_name'];
                    }

                    menuEelement += `
                    
                    <li class="" current_link="${menu['link']}"><a href="${menu['link']}"  class="">${menu['link_name']}</a></li>
                    `;

                    
                    


                })
            
                $("#user_menu").append(menuEelement);

                let href = window.location.href.split("/");
                let url = href[href.length-1];

                let currentPage = document.querySelector(`[current_link="${url}"]`);
            
                currentPage.classList = 'active';

                currentPage.parentElement.classList.toggle("show-menu-now");

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}
