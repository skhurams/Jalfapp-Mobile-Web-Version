$(document).ready(function(){
    
    ////////////////////////////////////////////     global variables start             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\               
    
    window.pNo=0;
    window.indexEmail;
    window.FilterEmail;
    window.networkState;
    
});  
////////////////////////////////////////////     Ger unread messages start             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
window.getunreadmessage= function(){
    console.log('get unread messages');
    $.mobile.showPageLoadingMsg("a", "Loading..");
    var message_count=0;
    var list="";
    var request_url=window.sessionStorage.getItem('mail_link')
    
    
    $.ajax({
        type: "GET",
        url: request_url, 
        xhrFields: { withCredentials: true },
        success:function(result){ 
            console.log( "success=" + JSON.stringify(result));  
            
            
        },
        error:function(xhr,status,error){
            
            
            alert("error=" + JSON.stringify(xhr));
            
        }
    })
    .done(
        function(data) { 
            
            try{
                console.log('unread message data=' + JSON.stringify(data));
                message_count=data.inbox.total_unread_messages_count;
                
                if(message_count=='undefined' || message_count=='' || message_count=='null'){
                    message_count=0;
                }
                
                console.log('unread count='  + message_count); 
                
                
                list +=  '<li data-role="list-divider" role="heading"> Mail Folders  </li>';
                list +=  '<li data-theme="a" > <a href="javascript:void(0);" id="liInbox" onclick="SetParamEmail(0)"> Inbox <span class="ui-li-count">' + message_count + '</span></a></li>';
                list +=  '<li data-theme="a" >  <a  href="javascript:void(0);"  id="liSent" onclick="SetParamEmail(1)"> Sent</a>  </li>';
                list +=  '<li data-theme="a" >  <a   href="javascript:void(0);"  id="liArchive" onclick="SetParamEmail(2)"> Archive   </a>  </li>';
                
                console.log("list mailbox=" + list);
                $('[data-role="listview"]').html( list );
                $('[data-role="listview"]').listview('refresh');
                
            }
            catch(e)
            {
                alert(e);
            }   
        }
    )
    .fail(function (xhr, status, error) {          
        console.log("sucess in error function=" + JSON.stringify(xhr));
        if(xhr.status==200){
            alert("Cross domain not Allowed by server");  
        }
        else if(xhr.status==201){
            AuthenticateUser();  
        } 
            else{ 
                alert("error=" + JSON.stringify(xhr));
            } 
        
    })
    .always(function() { 
        console.log("complete");
        $.mobile.hidePageLoadingMsg();
    });   
    
} 


////////////////////////////////////////////         Ger unread messages  end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////   email message list   start             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



window.loadMailbox=function (Type,filter,pageNo,orderby){
    try{
        
        console.log("loadmailbox function");
        FilterEmail=filter;
        //        pageNo=pNo;
        console.log('Type=' +  Type + '\n filter=' + FilterEmail + '\n pageNo' + pageNo  + '\n orderby' + orderby);
        var SearchUserLink="";
        SearchUserLink=window.sessionStorage.getItem('searched_mail_link');
        var message_key="";
        if(Type==0){message_key="inbox";}else if(Type==1){message_key="sent";}else{message_key="archive";}
        console.log('message_key=' + message_key);
        //var request_url="https://jalf.com/ws/messages/inbox?uname=123&pwd=123&orderby=date&order=desc&limit="1,10";
        //var request_url=   window.sessionStorage.getItem('mail_link') + "/" + message_key + "?orderby=" + filter + "&order=desc&limit=" + pageNo + ",10";
        var request_url;
        console.log('SearchUserLink=' + SearchUserLink);
        if(SearchUserLink =='' || SearchUserLink =='undefined' || SearchUserLink =='null' || SearchUserLink ==null)
        {
            request_url=   window.sessionStorage.getItem('mail_link') + "/" + message_key + "?order_by=" + filter + "&order=" + orderby + "&offset=" + pageNo + "&count=10";
            console.log('In my email link'); 
        }
        else
        {
            request_url=  SearchUserLink + "/" + message_key + "?order_by=" + filter + "&order=" + orderby + "&offset=" + pageNo + "&count=10";
            console.log('In search user email link');
        }
        console.log('request_url mailbox is=' + request_url);
        ///////////
        
        
        $.ajax({
            type: "GET",
            url: request_url,  
            xhrFields: { withCredentials: true },
            success:function(result){ 
                console.log( "success=" + JSON.stringify(result));  
                
                
            },
            error:function(xhr,status,error){
                
                
                alert("error=" + JSON.stringify(xhr));
                
            }
        })
        .done(function(data,status) { 
            if (status === 'success') {
                try{
                    var messages_arr=[];
                    var list = "";
                    console.log('mail data=' + JSON.stringify(data));
                    var itemsCount=0; 
                    
                    itemsCount=parseInt(data.total_items_count); 
                    $('#dvCount').html(itemsCount);
                    console.log('RowCount=' + itemsCount);
                    messages_arr=data.items;
                    if(parseInt(itemsCount) <= 0 || itemsCount=='null' || itemsCount=='' || itemsCount=='undefined' || itemsCount=='null' || itemsCount==null)
                    {
                        $('#mtMessage').html('NO RESULTS FOUND'); 
                        $('[data-role="listview"]').html( '' );
                        $('#dvPager').hide();
                        console.log('NO RESULTS FOUND');
                        console.log('mtMessage=' + $('#mtMessage').html());
                        return;
                    } 
                    else
                    {
                        if(parseInt(itemsCount) < 11)
                        {
                            $('#dvPager').hide();
                            //                       $('#dvPager').show();
                        }
                    }
                    list =' <li data-role="list-divider" role="heading"> ' + message_key + '  </li>'; 
                    $.each( messages_arr, function( i, messages_arr ) {
                        var link= "&#39;" + messages_arr.mail_message_link +  "&#39;";  
                        
                        if(message_key.toLowerCase()=="inbox"){ 
                            
                            list += ' <li   id="li' + i + '" data-icon="false"> '; 
                            list += ' <a href="#" id="li' + i + '"  > ';
                            list += '<div class="ui-grid-b"> ';  
                            list += ' <div class="ui-block-a" style="width:80%">  <a data-role="button" href="javascript:void(0);"  onclick="viewMessage('  +  link  +   ',&#39;' + message_key.toLowerCase() + '&#39; )" style="text-align:left;" > ' + messages_arr.description + '</a></div> '; 
                            list += ' <div class="ui-block-b" style="width:10%;padding-top:5px;" >  <a data-role="button" href="javascript:void(0);" id="' + i + '"  onclick="showConfirmDelete('  +  link + ',this.id)"  data-icon="delete" data-iconpos="notext"></a></div>  '; 
                            list += ' <div class="ui-block-c" style="width:10%;padding-top:5px;" >  <a data-role="button" href="javascript:void(0);" id="' + i + '"  onclick="ShowConfirmArchive('  +  link + ',this.id)"  data-icon="gear" data-iconpos="notext"></a></div>   ';   
                            list += ' </div> ';
                            list += '</a> '; 
                            list += '</li> '; 
                            
                        }
                        else if(message_key.toLowerCase()=="sent")
                        {
                            list += '<li id="li' + i + '" data-icon="delete"> '; 
                            list += '<a   href="javascript:void(0);"   onclick="viewMessage('  +  link +   ',&#39;' + message_key.toLowerCase() + '&#39; )" >';
                            list += messages_arr.description ;
                            list += '</a> ';
                            list += '<a   href="javascript:void(0);" id=' + i + '  onclick="showConfirmDelete('  +  link + ',' + i + ')" >';
                            list += '<input type="checkbox" name="checkbox_' + i +  '"  id="checkbox_' + i +  '" data-icon="delete" data-iconpos="notext" /> ';
                            list += '<label for="checkbox_' + i +  '" action="selectAttribute" data="test"></label> ';
                            list += '</a> ';   
                            list += '</li> '; 
                        } 
                            else if(message_key.toLowerCase()=="archive")
                            {
                                list += ' <li   id="li' + i + '" data-icon="false"> '; 
                                list += ' <a href="#" id="li' + i + '"  > ';
                                list += '<div class="ui-grid-a"> ';  
                                list += ' <div class="ui-block-a" style="width:80%">  <a data-role="button" href="javascript:void(0);"  onclick="viewMessage('  +  link  +   ',&#39;' + message_key.toLowerCase() + '&#39;)" style="text-align:left;" > ' + messages_arr.description + '</a></div> '; 
                                list += ' <div class="ui-block-b" style="width:10%;padding-top:5px;" >  <a data-role="button" href="javascript:void(0);" id="' + i + '"  onclick="showConfirmDelete('  +  link + ',this.id)"  data-icon="delete" data-iconpos="notext"></a></div>  ';  
                                list += ' </div> ';
                                list += '</a> '; 
                                list += '</li> '; 
                            }
                                else{  msgAlert('Not in the list','Warning');  } 
                    });  
                    console.log('var list=' + list);
                    $('#dvCount').html(itemsCount);                
                    $('#inbox_list').html( list ).trigger('create');
                    // $('input[type=checkbox]').checkboxradio().trigger('create');
                    $('#inbox_list').listview('refresh');                
                    //$.mobile.hidePageLoadingMsg();                
                    console.log('listview contents=' +  $('#inbox_list').html());
                }
                catch(e)
                {
                    msgError(e);
                }
            } 
            else {
                if(data.status=="403")
                {
                    msgAlert("Only VIP members are allowed to view " + message_key.toLowerCase());
                }
                else
                {
                    msgAlert("Our server returned an error\n" + data.error +
                             "\n" + data.status + "\n" +
                             "Please try again later.");
                    window.history.back;
                }
            } 
        })
        .fail(function (jqxhr, textStatus, err) {
            if(jqxhr.status=="403")
            {
                msgAlert("Only VIP members are allowed to view " + message_key.toLowerCase());
            }
            else
            {
                msgAlert("Fail: Our server returned an error\n" + err +
                         "\n" + textStatus + "\n" +
                         "Please try again later." + "\n jqxhr:" + JSON.stringify(jqxhr) ); 
            } 
            indexEmail=0;
            window.sessionStorage.setItem('searched_mail_link','') ;
            window.history.back();
        })
        .always(function() {
            console.log( "first always: finished");
            window.sessionStorage.setItem('searched_mail_link','') ;
            $.mobile.hidePageLoadingMsg();
        }); 
        
    }
    catch(e){
        alert(e);
    }
    
}




////////////////////////////////////////////      email message list      end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///////////////////////////////////

function msgError(msg,title)
{
    try{
        alert(msg);
        //        navigator.notification.alert(
        //            msg,  // message
        //            null,         // callback
        //            title,            // title
        //            'Okay'                  // buttonName
        //        );
    }
    catch(e){alert(e);}
}
function msgError(msg)
{
    try{
        alert(msg);
        //        navigator.notification.alert(
        //            msg,  // message
        //            null,         // callback
        //            'Warning',            // title
        //            'Okay'                  // buttonName
        //        );
    }
    catch(e){alert(e);}
}
function msgAlert(msg){
    try{
        alert(msg);
        //        navigator.notification.alert(
        //            msg,  // message
        //            null,         // callback
        //            'Infromation',            // title
        //            'Continue'                  // buttonName
        //        );
    }
    catch(e){alert(e);}
}
function msgAlert(msg,title){
    try{
        alert(msg);
        //        navigator.notification.alert(
        //            msg,  // message
        //            null,         // callback
        //            title,            // title
        //            'Continue'                  // buttonName
        //        ); 
    }
    catch(e){alert(e);} 
}
function msgAlert(msg,title,buttonText){
    try{
        alert(msg);
        //        navigator.notification.alert(
        //            msg,  // message
        //            null,         // callback
        //            title,            // title
        //            buttonText                  // buttonName
        //        ); 
    }
    catch(e){alert(e);} 
}
function checkConnection() {
    try{
        networkState = navigator.network.connection.type
        if (networkState == Connection.NONE){
            alert(networkState,'networkState');
        }
        else{
            alert(navigator.network.connection.type,'networkState');            
        }
    }
    catch(e){alert(e);}
}
window.ShowLoader = function (){
    //$.mobile.showPageLoadingMsg( "a", "Loading...", true );
    //    $.mobile.loader.prototype.options.text = "loading";
    //    $.mobile.loader.prototype.options.textVisible = true;
    //    $.mobile.loader.prototype.options.theme = "a";
    //    $.mobile.loader.prototype.options.html = "";
    //    
    //    $.mobile.ajaxEnabled = false;
    //    $.mobile.allowCrossDomainPages = true;
    //    $.support.cors = true;
    
    $.mobile.loader.prototype.options.text = "loading...";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";
}

window.ShowLoader = function (_visisble){
    if(_visisble)
    {
        //        $.mobile.showPageLoadingMsg( "a", "Loading...", true );
        $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
    }
    else
    {
        //        $.mobile.hidePageLoadingMsg(); 
        $.mobile.loading('hide');
    }
}
window.ShowLoader = function (msg){  
    //    $.mobile.showPageLoadingMsg( "a", msg, true );
    $.mobile.loading('show', {theme:"a", text:msg, textonly:true, textVisible: true});
}

window.ShowLoader=function (theme,msg){  
    //$.mobile.showPageLoadingMsg( theme, msg, hideloader );
    $.mobile.loading('show', {theme:theme, text:msg, textonly:false, textVisible: true});
}
window.HideLoader = function(){
    //    $.mobile.hidePageLoadingMsg();  
    $.mobile.loading('hide');
    
}

window.getUtcLocalDateString= function(utc){
    var milli = new Date(utc * 1000);    
    return milli.toLocaleDateString();
}
