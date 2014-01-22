$(document).ready(function(){ 
    fillReply();
    console.log('compose message document ready');
    domain = sessionStorage.getItem("domain");
    
    $('#chkCopytoSent').slider();
    $('#chkCanReply').slider(); 
    
    $('#btnSend').click(function(){
        try{  
            
            console.log('btnsend click');  
            
            var reply_link=  sessionStorage.getItem('msgUrl');
            var txtTo=$('#txtTo');
            var txtsubject=$('#txtsubject');
            var txtBody=$('#txtBody'); 
            var X_CSRFToken=sessionStorage.getItem("X_CSRFToken");
            var IsSaveCopy= 1;
            var canReply=1 ;
            var request_url= domain  + "mail"; 
            
            if( txtTo.val()=='')
            {
                msgAlert('Please fill TO: field');
                return;
            }
            if( txtsubject.val()=='')
            {
                msgAlert('Please fill Subject: field');
                return;
            }
            if( txtBody.val()=='')
            {
                msgAlert('Please fill Body: field');
                return;
            }
            
            //            IsSaveCopy=parseInt($('#chkCopytoSent').val());
            //            canReply=parseInt($('#chkCanReply').val()) ; 
            console.log('request_url=' + request_url);
            
            console.log("to=" + txtTo.val());
            console.log("subject=" + txtsubject.val());
            console.log("body=" + txtBody.val()); 
            console.log("keep_copy_sent=" + IsSaveCopy);
            console.log("can_reply=" +  canReply );  
            var jsonObj = new Object();
            jsonObj.to =  txtTo.val();
            jsonObj.subject  = txtsubject.val();
            jsonObj.body =  txtBody.val();
            jsonObj.keep_copy_sent  =  IsSaveCopy;
            if(reply_link){
                jsonObj.reply_message_link = reply_link;
            }
            jsonObj.can_reply = canReply;
            
            console.log('jsonObj==' + JSON.stringify(jsonObj).replace(':',': ')); 
            
            $.ajax({ 
                beforeSend: function(   ) {
                    $.mobile.showPageLoadingMsg("a", "Loading..");
                },
                type: 'POST',
                url: request_url,
                dataType: "json",
                contentType: "application/vnd.jalf.mail.newmessage+json", 
                headers: {  'X-CSRFToken':  X_CSRFToken } ,
                xhrFields: { withCredentials: true }, 
                data: JSON.stringify(jsonObj).replace(':',': '),
                success: function(response,status){ 
                    
                    alert("Message has been sent successfully");
                    console.log( "Success in sending message ");
                    
                    
                },
                error: function(request,error,status){
                    
                    if(request.status =="201")
                    {
                        console.log("error request=" + JSON.stringify(request));
                        alert("Message has been sent successfully");
                        $.mobile.changePage("messagebox.html",{transition:"slide",reverse:true,showLoadMsg: true}); 
                    }
                    
                },
                complete: function(){
                    txtTo.val('');
                    txtsubject.val('');
                    txtBody.val(''); 
                    $('#chkCopytoSent').val('0') ;
                    $('#chkCanReply').val('0')  ;
                    $.mobile.hidePageLoadingMsg();                     
                    sessionStorage.removeItem('from_username'); 
                    sessionStorage.removeItem('msgUrl');
                } 
            })
            .done(function(data,status){
                try{ 
                    console.log('function archive success'); 
                    console.log('status=' + status); 
                    console.log('data=' + JSON.stringify(data)); 
                    
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
        catch(e)
        { 
            msgError(e);
        }
    });
    
});
function fillReply(){
    try
    {  
        console.log('fill reply function'); 
        var strQuery = $.mobile.activePage[0].baseURI; 
        console.log('strQuery=' + strQuery);
        var strReply=strQuery.lastIndexOf('?reply=true');
        console.log('strReply=' + strReply); 
        var to_Field= sessionStorage.getItem('from_username');
        
        if(strReply> -1)
        {
            if(to_Field)
            { 
                $('#txtTo').val(to_Field);
            }
            else
            {
                $('#txtTo').val(''); 
            }
        }
        else
        {
            $('#txtTo').val(''); 
        }
    }
    catch(e)
    {
        msgError(e);
    }
    
}


