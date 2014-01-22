
//widow._data = [];

$(document).ready(function(){
    window.loginid = "";
    window.pword = ""; 
    window.SUID;
    window.cookies;
    window.CSRFToken;
    sessionStorage.setItem("domain","http://jdev104p.jalf.com/rest/"); 
    window.domain;
    
    
    $("#btnlogin").click(function ()
                         {
                             try{ 
                                 //                                 alert('login function'); 
                                 
                                 window.cookie_saved;
                                 domain = sessionStorage.getItem("domain");
                                 //                                 //temporary
                                 loginid = $("#txtid").val();
                                 pword = $("#txtpwd").val();
                                 window.sessionStorage.setItem('loginid' ,loginid);
                                 window.sessionStorage.setItem('password' ,pword);
                                 //                                 alert('loginid=' + loginid);
                                 //                                 alert('password=' + pword); 
                                 var request_url =  domain + "login";
                                 //                                 alert('request_url=' + request_url);
                                 if (!loginid || !pword)
                                 {
                                     alert("Please enter your login credentials");
                                     return;
                                 } 
                                 $.ajax({
                                     type: "POST",
                                     url: request_url,
                                     dataType: "json",
                                     data: { "user_name": loginid, "password": pword },
                                     xhrFields: { withCredentials: true },
                                     beforeSend: function(){
                                         $.mobile.showPageLoadingMsg("a", "Loading.."); 
                                     },
                                     success:function(jqXHR){ 
                                     console.log( "success=" + JSON.stringify(jqXHR)); //this line of code should work after login successfull
                                     
                                 },
                                        error:function(xhr,status,error){
                                     
                                     
                                 }
                             })
                             .done(function (response, textStatus, jqXHR) { 
                                 var header = jqXHR.getResponseHeader("X-CSRFToken");
                                 console.log('header=' + header);
                                 
                                 var token= header;
                                 if(jqXHR.status==200){
                                     alert("Cross domain not Allowed by server");  
                                 }
                                 else if(jqXHR.status==201){
                                     if(token){
                                         window.sessionStorage.setItem("X_CSRFToken", token);
                                         AuthenticateUser();  
                                     }
                                     else{
                                         alert('token=' + token);
                                     } 
                                 } 
                                     else{ 
                                         alert("error=" + JSON.stringify(jqXHR));
                                     }
                                 
                                 
                             })
                             .fail(function (jqXHR, textStatus, err) { 
                                 var header = jqXHR.getResponseHeader("X-CSRFToken");
                                 console.log('header=' + header);
                                 
                                 var token= header;
                                 if(jqXHR.status==200){
                                     alert("Cross domain not Allowed by server");  
                                 }
                                 else if(jqXHR.status==201){
                                     if(token){
                                         window.sessionStorage.setItem("X_CSRFToken", token);
                                         AuthenticateUser();  
                                     }
                                     else{
                                         alert('token=' + token);
                                     } 
                                 } 
                                     else{ 
                                         alert("error=" + JSON.stringify(jqXHR));
                                     } 
                                 
                             })
                             .always(function() { 
                                 console.log("complete");
                                 $.mobile.hidePageLoadingMsg();
                             }); 
                         }
                         catch(e)
    {
        alert(e);
    }    
}) ;
});



function GetAction(me){
    try{
        me.action= domain + "login";
        //alert('action=' + me.action);
    }
    catch(e){
        alert(e);
    }
}
window.AuthenticateUser=  function (){
    try{
        console.log('user authenticated function');
        var request_url=domain + "authenticated-user";
        $.ajax({
            type: "GET",
            url: request_url,
            dataType: "json", 
            xhrFields: { withCredentials: true },
            beforeSend: function(){
                                         $.mobile.showPageLoadingMsg("a", "Loading.."); 
                                     },
            success:function(data){ 
                console.log( "authenticate success=" + JSON.stringify(data));  
                //                alert('data.user_mobile_devices_link=' +  data.user_mobile_devices_link);
                //                alert('data.user_mail_link =' + data.user_mail_link );
                //                alert('data.user_photos_albums_link=' +  data.user_photos_albums_link);
                //                alert('data.id=' +  data.id);
                //                alert('data.name=' +  data.name);
                
                window.sessionStorage.setItem('mail_link',data.user_mail_link );
                window.sessionStorage.setItem('devices_link',data.user_mobile_devices_link); 
                window.sessionStorage.setItem('albums_link',data.user_photos_albums_link );
                window.sessionStorage.setItem('UserId',data.id );
                window.sessionStorage.setItem('UserName',data.name );
                
                //                alert('devices_link=' + window.sessionStorage.getItem('devices_link'));
                //                alert('mail_link=' + window.sessionStorage.getItem('mail_link'));
                //                alert('albums_link=' + window.sessionStorage.getItem('albums_link'));
                //                alert('UserId=' + window.sessionStorage.getItem('UserId'));
                //                alert('UserName=' + window.sessionStorage.getItem('UserName'));
                
            },
            error:function(xhr,status,error){
                
                
                alert("error=" + JSON.stringify(xhr));
                
            }
        })
        .done(function (data,status) { 
            if (status === 'success') {
                console.log('request was successfull'); 
                $('#txtid').val('');
                $('#txtpwd').val('');
                $.mobile.changePage("Default.html", {transition:"slide",showLoadMsg:true});
            } 
            else {
                alert("Our server returned an error\n" + data.error +
                      "\n" + data.status + "\n" +
                      "Please try again later."); 
            }
            
        })
        .fail(function (xhr, status, error) {
            alert("Fail: Our server returned an error\n" + err +
                  "\n" + textStatus + "\n" +
                  "Please try again later." + "\n jqxhr:" + JSON.stringify(jqxhr) );
            
            
        })
        .always(function (data) {  
            
            console.log( "first always: finished");
            $.mobile.hidePageLoadingMsg();
        });
        
    }
    catch(e)
    {
        alert(e);
    }
}
