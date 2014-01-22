$(document).keypress(function(e) {
    console.log('keypress=' + e.which);
    if(e.which == 13) 
    { 
        $('#aPager .ui-btn-text').text(0); 
        SearchUser(0);
    } 
});

window.SearchUser=function(offset){
    try{
        domain = sessionStorage.getItem("domain");
        var searchname= $("#txtsearch").val();
        var list="";
        var ItemsCount=0;
        console.log('starting search function');
        
        if(searchname==''){
            msgAlert('Search keyword required.','Warning','Ok')
             $('[data-role="listview"]').html( '' ); 
                $('#dvPager').hide();
                return;  
            return ;
        } 
        console.log('getting domain');
        var request_url= domain  + 'users?username=' +  $.trim(searchname) + "*&order_by=username&offset=" + offset + "&count=10";
        
        console.log('request_url=' + request_url);
        $.ajax({
            type: "Get",
            url: request_url,
            dataType: "json", 
            xhrFields: { withCredentials: true },
            success:function(data){ 
                console.log( "success=" + JSON.stringify(data)); //this line of code should work after login successfull
                
            },
            error:function(xhr,status,error){
                
                
                alert("error=" + JSON.stringify(xhr));
                
            }
        })
        .done(function(data) { 
            console.log('main: data=',JSON.stringify(data));
            ItemsCount=data.items.length;
            console.log('ItemsCount=' + ItemsCount);
            if (ItemsCount <= 0 || ItemsCount == '' || ItemsCount == 'undefined' || ItemsCount == 'null' || ItemsCount == null){ 
                $('#mtMessage').html('NO RESULTS FOUND');
                $('[data-role="listview"]').html( '' ); 
                $('#dvPager').hide();
                return;                    
            } 
            else{  
                $('#dvPager').show(); 
                $('#mtMessage').html('');
            }
            $('#dvCount').html(data.total_items_count)
            console.log('starting loop');
            $.each( data.items, function( index, item ) {  
                list += "<li id='li" + index + "' ><a  onclick='ViewProfile(&#34;" + item.user_link + "&#34;)'  href='javascript:void(0);' ><h4>" + item.description +"</h4>";
                list += '</a></li>'; 
            }); 
            console.log('list=' + list);
            $('[data-role="listview"]').html( list );
            $('[data-role="listview"]').listview('refresh');  
        })
        .fail(function (jqxhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n jqxhr:" + jqxhr );
        })
        .always(function() {
            console.log( "first always: finished");
            $.mobile.hidePageLoadingMsg();
        }); 
        
        //        var jqxhr = $.get( request_url,  function(data) { 
        //            console.log('main: data=',JSON.stringify(data));
        //            ItemsCount=data.items.length;
        //            console.log('ItemsCount=' + ItemsCount);
        //            if (ItemsCount <= 0 || ItemsCount == '' || ItemsCount == 'undefined' || ItemsCount == 'null' || ItemsCount == null){ 
        //                $('#mtMessage').html('NO RESULTS FOUND');
        //                $('[data-role="listview"]').html( '' ); 
        //                $('#dvPager').hide();
        //                return;                    
        //            } 
        //            else{  
        //                $('#dvPager').show(); 
        //                $('#mtMessage').html('');
        //            }
        //            $('#dvCount').html(data.total_items_count)
        //            console.log('starting loop');
        //            $.each( data.items, function( index, item ) {  
        //                list += "<li id='li" + index + "' ><a  onclick='ViewProfile(&#34;" + item.user_link + "&#34;)'  href='javascript:void(0);' ><h4>" + item.description +"</h4>";
        //                list += '</a></li>'; 
        //            }); 
        //            console.log('list=' + list);
        //            $('[data-role="listview"]').html( list );
        //            $('[data-role="listview"]').listview('refresh');  
        //        }) 
        //        .done(function(data,status) { 
        //            if (status === 'success') {
        //                console.log('request was successfull'); 
        //            } 
        //            else {
        //                msgAlert("Our server returned an error\n" + data.error +
        //                         "\n" + data.status + "\n" +
        //                         "Please try again later."); 
        //            } 
        //        })
        //        .fail(function (jqxhr, textStatus, err) {
        //            console.log("Fail: Our server returned an error\n" + err +
        //                        "\n" + textStatus + "\n" +
        //                        "Please try again later." + "\n jqxhr:" + jqxhr );
        //        })
        //        .always(function() {
        //            console.log( "first always: finished");
        //            $.mobile.hidePageLoadingMsg();
        //        }); 
        
    }
    catch(e){msgError(e);}
}
//************************************* view profile function  ************************************
window.ViewProfile =function(userLink){
    try
    {
        console.log('User Profile function');
        console.log('userLink=' + userLink);
        $.mobile.changePage("profile.html",{transition:"slide"});
        
        var request_url=userLink;
        var list="";
        
        $.ajax({
            type: "Get",
            url: request_url,
            dataType: "json", 
            xhrFields: { withCredentials: true },
            success:function(data){ 
                console.log( "success=" + JSON.stringify(data)); //this line of code should work after login successfull
                
            },
            error:function(xhr,status,error){
                
                
                        alert("error=" + JSON.stringify(xhr));
                    
            }
        })
        
        
        //        var jqxhr = $.get( request_url, function(data) { 
        //            console.log('main: data=',JSON.stringify(data));
        //            
        //            list += '<li><h1>' + data.name + '</h1></li>';
        //            //            list += '<li><a href="javascript:void(0);" Mobile device  : ' + data.user_mobile_device_link + '</li>'; 
        //            if(data.sexual_orientation=='' || data.sexual_orientation=='null' || data.sexual_orientation==null || data.sexual_orientation=='undefined')
        //            {
        //                list += '<li>Orientation :  N/A</li>';
        //            }
        //            else
        //            { 
        //                list += '<li>Orientation : ' + data.sexual_orientation + '</li>';  
        //            }
        //            if(data.location.country=='' || data.location.country=='null' || data.location.country==null || data.location.country=='undefined')
        //            {
        //                list += '<li>Country : N/A</li>'; 
        //            }
        //            else
        //            {
        //                list += '<li>Country : ' + data.location.country + '</li>'; 
        //            }
        //            if(data.location.state=='' || data.location.state=='null' || data.location.state==null || data.location.state=='undefined')
        //            {
        //                list += '<li>Province : N/A</li>'; 
        //            }
        //            else
        //            {
        //                list += '<li>Province : ' + data.location.state + '</li>'; 
        //            }
        //            if(data.location.Region=='' || data.location.Region=='null' || data.location.Region==null || data.location.Region=='undefined')
        //            {
        //                list += '<li>Region : N/A</li>'; 
        //            }
        //            else
        //            {
        //                list += '<li>Region : ' + data.location.Region + '</li>'; 
        //            }
        //            if(data.age=='' || data.age=='null' || data.age==null || data.age=='undefined')
        //            {
        //                list += '<li>Age : N/A</li>'; 
        //            }
        //            else
        //            {
        //                list += '<li>Age : ' + data.age + '</li>'; 
        //            }
        //            
        //            //            list += '<li>MaritalStatus : ' + data.MaritalStatus + '</li>'; 
        //            //            list += '<li>Height : ' + data.Height + '</li>'; 
        //            //            list += '<li>Weight : ' + data.Weight + '</li>';   
        //            //            list += '<li>Appear : ' + data.Appear + '</li>'; 
        //            //            list += '<li>Available : ' + data.Available + '</li>';  
        //            //            list += '<li>Sex : ' + data.Sex + '</li>'; 
        //            //            list += '<li><a href="javascript:void(0);" onclick="viewMyEmails(&#39;' + data.user_mail_link + '&#39;);"> View my emails</a></li>';
        //            //            list += '<li><a href="javascript:void(0);" onclick="viewMyPhotos(&#39;' + data.user_photos_albums_link + '&#39;);"> View my photos</a></li>';  
        //            
        //            console.log('list=' + list);
        //            $('#ulProfile').html( list );
        //            $('#ulProfile').listview('refresh');  
        //        }) 
        .done(function(data,status) { 
            
            console.log('main: data=',JSON.stringify(data));
            
            list += '<li><h1>' + data.name + '</h1></li>';
            //            list += '<li><a href="javascript:void(0);" Mobile device  : ' + data.user_mobile_device_link + '</li>'; 
            if(data.sexual_orientation=='' || data.sexual_orientation=='null' || data.sexual_orientation==null || data.sexual_orientation=='undefined')
            {
                list += '<li>Orientation :  N/A</li>';
            }
            else
            { 
                list += '<li>Orientation : ' + data.sexual_orientation + '</li>';  
            }
            if(data.location.country=='' || data.location.country=='null' || data.location.country==null || data.location.country=='undefined')
            {
                list += '<li>Country : N/A</li>'; 
            }
            else
            {
                list += '<li>Country : ' + data.location.country + '</li>'; 
            }
            if(data.location.state=='' || data.location.state=='null' || data.location.state==null || data.location.state=='undefined')
            {
                list += '<li>Province : N/A</li>'; 
            }
            else
            {
                list += '<li>Province : ' + data.location.state + '</li>'; 
            }
            if(data.location.Region=='' || data.location.Region=='null' || data.location.Region==null || data.location.Region=='undefined')
            {
                list += '<li>Region : N/A</li>'; 
            }
            else
            {
                list += '<li>Region : ' + data.location.Region + '</li>'; 
            }
            if(data.age=='' || data.age=='null' || data.age==null || data.age=='undefined')
            {
                list += '<li>Age : N/A</li>'; 
            }
            else
            {
                list += '<li>Age : ' + data.age + '</li>'; 
            }
            
            //            list += '<li>MaritalStatus : ' + data.MaritalStatus + '</li>'; 
            //            list += '<li>Height : ' + data.Height + '</li>'; 
            //            list += '<li>Weight : ' + data.Weight + '</li>';   
            //            list += '<li>Appear : ' + data.Appear + '</li>'; 
            //            list += '<li>Available : ' + data.Available + '</li>';  
            //            list += '<li>Sex : ' + data.Sex + '</li>'; 
            //            list += '<li><a href="javascript:void(0);" onclick="viewMyEmails(&#39;' + data.user_mail_link + '&#39;);"> View my emails</a></li>';
            //            list += '<li><a href="javascript:void(0);" onclick="viewMyPhotos(&#39;' + data.user_photos_albums_link + '&#39;);"> View my photos</a></li>';  
            
            console.log('list=' + list);
            $('#ulProfile').html( list );
            $('#ulProfile').listview('refresh');  
            
        })
        .fail(function (jqxhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n jqxhr:" + jqxhr );
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
}

window.viewMyEmails =function(mailLink){
    try
    {
        console.log('mailLink=' + mailLink);
        window.sessionStorage.setItem('searched_mail_link',mailLink) ;
        indexEmail=0;
        $.mobile.changePage("mailboxList.html",{transition:"slide",showLoadMsg: true}); 
        //         loadMailbox('0','date','0','asc');
    }
    catch(e)
    {
        msgError(e);
    }
}
window.viewMyPhotos =function(photoLink)
{
    try
    {
        console.log('photoLink=' + photoLink);
        msgAlert('View my photos under construction');
    }
    catch(e)
    {
        msgError(e);
    }  
}
///////////**************************************************///////////////////
function PreviousPage()
{ 
    try{
        $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
        var pager=$('#aPager .ui-btn-text');
        var   pNo=   parseInt(pager.text() )- 1; 
        if(parseInt(pNo*10) < 0 ){
            pager.text(0);
            pNo=0;
            console.log('pNo=' + pNo);
        }
        else{ 
            pager.text(parseInt(pNo));
            
            SearchUser(parseInt(pager.text())*10); 
        } 
        
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
    try{ 
        var pager=$('#aPager .ui-btn-text');
        var   pNo=   parseInt(pager.text() ) + 1; 
        // if(parseInt(pNo*10) > parseInt(totalRows)){  
        if( parseInt($("#ulSearch li").size()) < 10 )
        {
            pNo=parseInt(pager.text());
            console.log('pNo=' + pNo);
        }
        else{
            if(parseInt(pNo*10) == parseInt(totalRows)){ 
                pNo=parseInt(pager.text());
                console.log('pNo=' + pNo);   
            }
            else{
                pager.text(parseInt(pNo));
                SearchUser(parseInt(pager.text())*10); 
            }
        } 
        $.mobile.loading('hide');
    }
    catch(e)
    {
        alert(e);
    } 
} 
//////**************************************************///////////////////
$(document).on('pageinit',function(e){
    $('#ulSearch').html( '' );
    $('#ulSearch').listview('refresh'); 
    $('#txtsearch').val('');
} );
//******************************************end profile function  ************************************
$(document).ready(function(){
    
    ////////////////////////////////////////////    Search function start             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    $("#btnsearch").click(function(){ 
        $('#aPager .ui-btn-text').text(0); 
        SearchUser(0); 
    });  
    ////////////////////////////////////////////    search       end             \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
});

