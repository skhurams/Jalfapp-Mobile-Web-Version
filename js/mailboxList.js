//window.strDate;
//window.strFrom;
//window.strBody;
//window.strSubject;

function Reply(){
    try
    {  
        console.log('reply');
        $.mobile.changePage("ComposeMessage.html?reply=true",{transition:"slide", showLoadMsg: true}); 
    }
    catch(e){
        msgError(e);
    }
}

function viewMessage(msgUrl,messageType){
    try{ 
        
        var list="";
        console.log('viewmessage function=' + msgUrl);
        $.mobile.changePage("messagebox.html", { transition: "slide"});  
        var request_url=msgUrl;  
        
        $.ajax({
            type: "GET",
            url: request_url,
            dataType: "json", 
            xhrFields: { withCredentials: true }, 
            beforeSend:function(){ 
                $.mobile.showPageLoadingMsg("a", "Loading.."); 
            },
            complete:function(){
                
                
            },
            success:function(result){ 
                console.log( "success=" + JSON.stringify(result));  
                try{  
                    console.log('function success');                
                    console.log('page redirect');
                    if(messageType=='inbox')
                    {
                        $('#btnReply').show();
                    }
                    else if(messageType=='sent')
                    {
                        $('#btnReply').hide();
                    }
                        else
                        {
                            $('#btnReply').show();
                        }
                }
                catch(e)
                {
                    msgError(e);
                }   
                
            },
            error:function(xhr,status,error){
                
                
                alert("error=" + JSON.stringify(xhr));
                
            }
        })
        .done(function(data,status) { 
            try{
                
                if (status === 'success') 
                {
                    console.log('request was ' + status);
                    console.log('done function data===' + JSON.stringify(data));  
                    sessionStorage.setItem('msgUrl',msgUrl );
                    sessionStorage.setItem('from_username',data.from_username );
                    
                    list = '<li>From:  ' + data.from_username + '</li>';
                    list += '<li>' + data.datetime_sent + '</li>';
                    list += '<li>Subject:  ' + data.subject + '</li>';
                    list += '<li>' + data.body + '</li>';                    
                    
                        console.log('Message list=' + list); 
                        $('#ulMessage').html( list );                    
                        $('#ulMessage').listview('refresh');
                    
                    //                    $('[data-role="listview"]').html( list );
                    //                    $('[data-role="listview"]').listview('refresh');
                    // console.log('ulMessage listview==' + $('#ulMessage').html());
                } 
                else {
                    msgAlert("Our server returned an error\n" + data.error +
                             "\n" + data.status + "\n" +
                             "Please try again later."); 
                }
            }
            catch(e)
            {
                console.log('try catch error=' + e);
            }
        })
        .fail(function (xhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n xhr:" + xhr );
        })
        .always(function() {
            console.log( "first always: finished");
            $('#inbox_list').listview('refresh');
            
            $.mobile.hidePageLoadingMsg();
        });  
    }
    catch(e){
        msgError(e);
    }
}  

function showConfirmDelete(msgUrl,indx) {
    
    try
    {
        console.log('msgUrl=' + msgUrl);
        console.log('indx=' + indx);
        
        var buttonIndex=confirm("Are you sure you want to delete message?");
        if (buttonIndex==true)
        {
            deleteMessage(msgUrl,indx);   
        } 
    }
    catch(e)
    {
        alert(e);
    }
    
}

////////////////////////////////////////////      email message delete      start             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

window.deleteMessage =function(msgUrl,indx){
    try{ 
        
        console.log('delete message function=li' + indx);
        var  request_url=msgUrl;
        var message_key="";
        var list; 
        var X_CSRFToken=sessionStorage.getItem("X_CSRFToken");
        alert('request_url###' + request_url);
        
        $.ajax({
            type: 'Delete',
            url: request_url,            
            dataType: "json",
            contentType: "application/vnd.jalf.mail.message+json",            
            headers: {  'X-CSRFToken':  X_CSRFToken } ,
            xhrFields: { withCredentials: true }, 
            success:function(data){
                console.log('function delete success');   
            },
            error:function(request,error){
                console.log("error in viewing message..");
                alert('request##' + JSON.stringify(request));
            },
            
        })
        .done(function(data){
            try{ 
                
                $("#li" + indx).hide();
            }
            catch(e)
            {
                msgAlert(e);
            }
        })
        .fail(function (xhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n xhr:" + xhr );
        })
        .always(function() {
            console.log( "first always: finished");
            $.mobile.hidePageLoadingMsg();
        });  
        
    }
    catch(e){
        msgError(e);
    }
} 
function ShowConfirmArchive(msgUrl,indx) { 
    try
    {  
        var buttonIndex=confirm("Are you sure you want to archive message?");
        if (buttonIndex==true)
        {
            ArchiveMessage(msgUrl,indx);  
        } 
    }
    catch(e)
    {
        alert(e);
    }
    
}
window.ArchiveMessage=function(msgUrl,indx)
{
    try
    { 
        //msgAlert('message archive function msgUrl=' + msgUrl + "Id=" + indx);
        console.log('Archive message function=li' + indx); 
        var archive_link= window.sessionStorage.getItem('mail_link') + '/archive';
        var request_url= msgUrl;
        var message_key= "";
        var ajax_data={};
        var strdata;
        var list; 
        var X_CSRFToken=sessionStorage.getItem("X_CSRFToken");
        
        
        console.log('request_ur****' + request_url);
        console.log('archive_link****' + archive_link); 
        ajax_data["mail_folder_link"] = archive_link;
        strdata=JSON.stringify(ajax_data);
        strdata=strdata.replace(':',': ');
        strdata=strdata.replace('{"','{ "');
        strdata=strdata.replace('"}','" }');
        alert('strdata=' + strdata);
        //        console.log(JSON.parse(strdata));
        //console.log('ajax_data=' + JSON.stringify(ajax_data.replace('":"','":  "')));
        $.ajax({
            type: 'Patch',
            url: request_url,            
            dataType: "json",
            contentType: "application/vnd.jalf.mail.message+json",            
            headers: {  'X-CSRFToken':  X_CSRFToken } ,
            xhrFields: { withCredentials: true }, 
            data:  strdata,
            success: function(data,status){ 
                console.log('function archive success');  
            },
            error:function(request,error){ 
                msgAlert('error in archiving message##' + JSON.stringify(request)); 
            } 
        })
        .done(function(data,status){
            try{ 
                console.log('function archive success'); 
                console.log('status=' + status);
                console.log('data=' + JSON.stringify(data));
                $("#li" + indx).hide();
            }
            catch(e)
            {
                msgAlert(e);
            }
        })
        .fail(function (xhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n xhr:" + xhr );
        })
        .always(function() {
            console.log( "first always: finished");
            $.mobile.hidePageLoadingMsg();
        });  
    }
    catch(e){
        msgError(e);
    }   
    
}
////////////////////////////////////////////      email message delete      end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


function PreviousPage()
{ 
    
    try{
        $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
        var pager=$('#aPager .ui-btn-text');
        pNo=   parseInt(pager.text() )- 1; 
        if(parseInt(pNo*10) < 0 ){
            pager.text(0);
            pNo=0;
            console.log('pNo=' + pNo);
        }
        else{ 
            pager.text(pNo); 
            loadMailbox(indexEmail, FilterEmail,parseInt(pNo)*10,'asc');
        }  
        $("#filterdate").data('icon', 'arrow-d'); 
        $("#filterdate .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u"); 
        $("#filtermember").data('icon', 'arrow-d'); 
        $("#filtermember .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u"); 
        $("#filtersubject").data('icon', 'arrow-d'); 
        $("#filtersubject .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u"); 
        $.mobile.loading('hide');
    }
    catch(e)
    {
        alert(e);
    }  
}
function NextPage()
{ 
    $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
    var totalRows=parseInt($('#dvCount').html());
    console.log('totalRows=' + totalRows);
    console.log('ul li size=' + parseInt($("#inbox_list li").size()-1));
    try{ 
        var pager=$('#aPager .ui-btn-text');
        pNo=   parseInt(pager.text() ) + 1; 
        // if(parseInt(pNo*10) > parseInt(totalRows)){  
        if( parseInt($("#inbox_list li").size()-1) < 10 )
        {
            pNo=pager.text();
            console.log('li size pNo=' + parseInt(pNo));
        }
        else{
            if(parseInt(pNo*10) == parseInt(totalRows)){ 
                pNo=pager.text();
                console.log('totalrows=pNo=' + parseInt(pNo));
            }
            else{
                pager.text(pNo); 
                console.log('else pNo=' + parseInt(pNo));
                loadMailbox(indexEmail, FilterEmail,(parseInt(pNo)*10),'asc');
            }
        } 
        $("#filterdate").data('icon', 'arrow-d'); 
        $("#filterdate .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u"); 
        $("#filtermember").data('icon', 'arrow-d'); 
        $("#filtermember .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u"); 
        $("#filtersubject").data('icon', 'arrow-d'); 
        $("#filtersubject .ui-icon").addClass("ui-icon-arrow-d").removeClass("ui-icon-arrow-u");
        $.mobile.loading('hide');
    }
    catch(e)
    {
        alert(e);
    }  
}