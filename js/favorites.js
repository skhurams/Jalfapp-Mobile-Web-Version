$(document).ready(function(){
    
    
    ////////////////////////////////////////////////////////////////FAVORITES METHODS START /////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
    window.loadFavorites= function (){
        
        msgAlert('Favorites under construction');
        return;
        
        
        
        window.fav_arr=[];
        var list="",username="",userage="",userornt="",userregn="";
        var request_url=domain  + 'ws/favorites';
        console.log("loadFavorites functions");
        $.ajax({
            type:'get', 
            url: request_url,
            dataType:"json",
            contentType:"application/json",
            charset:"utf-8",
            async:true,
            headers:{Cookie:cookie_saved},
            beforeSend:function (){
                $.mobile.showPageLoadingMsg("a", "Loading..");
            },
            success:function(data){
                fav_arr =data.userlist;
                console.log(JSON.stringify(data));
                
                $.each(fav_arr, function(i, fav_arr){
                    username=fav_arr.UserName;
                    userage=fav_arr.UserAge;
                    userornt=fav_arr.UserOrnt;
                    userregn=fav_arr.UserRegn;
                    
                    list += '<li><a   href="javascript:void(0);" ><h4>' +username+'</h4>';
                    list += '<p>'+userage+','+userornt+','+userregn+'</p>';
                    list += '</a></li>';
                });
                console.log('var list =' + list);
                 $('[data-role="listview"]').html( list ).trigger('create');
                
                $('[data-role="listview"]').listview('refresh');
            },
            error:function(request,error){
                $.mobile.hidePageLoadingMsg();
                alert("error loading favourites");
                
            }
        }).complete(function(){
            
            $.mobile.hidePageLoadingMsg();
        });
    }
    
    
    $('#fav_list').on('click', 'li', function() { 
        
        var usernumber="",list="";
        var indexval= $(this).index();        
        usernumber= fav_arr[indexval].UserNumber;
        var request_url= domain + "ws/profile/" + usernumber
        
        $.mobile.changePage("profile.html",{transition:"slide"});
        
        $.ajax({
            type:'get',
            url: request_url,
            dataType:"json",
            headers:{Cookie:cookie_saved},
            contentType:"application/json",
            charset:"utf-8",
            async:true,
            crossDomain:false,
            async:true,
            
            beforeSend:function(){
               // tabBar.show();              
                
            },
            success:function(data){
                console.log('data==' + JSON.stringify(data));
                
                //                list += '<li><h1>' + data.UserName + '</h1></li>';
                //                list += '<li>' + data.Orientation+'</li>';
                //                list += '<li>' + data.UserAge + ',' + data.UserAge + '</li>';
                //                list += '<li>' + data.Height + ',' + data.Weight + '</li>';
                //                list += '<li>' + data.Appear + '</li>';
                //                list += '<li>' + data.Available + '</li>';
                //                list += '<li>' + data.Country + ','+data.Region + '</li>';
                //                list += '<li>' + data.UserSexe + ',' + data.UserSexe + '</li>';
                
                list += '<li><h1>' + data.UserName + '</h1></li>';
                
                list += '<li>Orientation : ' + data.Orientation + '</li>';  
                
                list += '<li>Age : ' + data.Age + '</li>';
                
                list += '<li>MaritalStatus : ' + data.MaritalStatus + '</li>';
                
                list += '<li>Height : ' + data.Height + '</li>';
                
                list += '<li>Weight : ' + data.Weight + '</li>';                
                
                list += '<li>Appear : ' + data.Appear + '</li>';
                
                list += '<li>Available : ' + data.Available + '</li>';
                
                list += '<li>Country : ' + data.Country + '</li>';
                
                list += '<li>Province : ' + data.Province + '</li>'; 
                
                list += '<li>Region : ' + data.Region + '</li>'; 
                
                list += '<li>Sex : ' + data.Sex + '</li>';
                
                $("ul:jqmData(role='listview')").html( list );
                
                $('[data-role="listview"]').listview('refresh');
                
            },
            error:function(request,error){
                alert("error in searching..");
            }
            
        }).complete(function() {
            
        });
    }); 
    
    ////////////////////////////////////////////     favorites     end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 
    
    
    
    
    
    ////////////////////////////////////////////     favorites     end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
});


