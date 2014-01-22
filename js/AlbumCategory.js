
//*********************************************************************************************************************************************************************
//window.prepareUpload=   function (event)
//{
//    files = event.target.files;
//    console.log('files=' + files);
//}

window.loadAlbumsCategory = function ( ){
    try { 
        console.log('loading funcÏion loadAlbumsCategory');
        var list = "";
        var request_url= sessionStorage.getItem('albums_link'); 
        var ItemsCount=0;
        console.log('starting ajax'); 
        
        $.ajax({
            beforeSend: function() {
                $.mobile.showPageLoadingMsg("a", "Loading..");
            },
            type: 'Get',
            url: request_url,
            dataType: "json",
            contentType: "application/vnd.jalf.collection+json; charset=utf8",
            xhrFields: { withCredentials: true }, 
            success: function (data) {
                ItemsCount=data.items.length;
                console.log("stringify==" + JSON.stringify(data));
                
                console.log('data.items.user_photos_album_link=' + data.items[0].user_photos_album_link);
                
                console.log('ItemsCount=' + ItemsCount);
                
                list = ' <li data-role="list-divider" role="heading">Album Categories</li>'; 
                if (ItemsCount <= 0 || ItemsCount == '' || ItemsCount == 'undefined' || ItemsCount == 'null' || ItemsCount == null) 
                {
                    $('#mtMessage').html('NO RESULTS FOUND');                    
                }
                else{                    
                    $('#mtMessage').html('');
                }                
                for(var i=0;  i < ItemsCount;  i++)
                {
                    var link= "&#39;" +  data.items[i].user_photos_album_link + "&#39;";
                    list += "  <li data-theme='a' class='liList'>  <a href='javascript:void(0);' id='btnOpenAlbu' onclick='OpenAlbums("  + link + ")' data-transition='slide'  class='aList'>" + data.items[i].description + "</a> </li>";
                }                
                $('#ulCategory').html( list );
                $('#ulCategory').listview('refresh');                
                console.log('div Category=' +   $('#ulCategory').html());
            },
            error: function (jqxhr, textStatus, err)
            { 
                console.log("Error data=" + JSON.stringify(err));
                
            },
            complete: function(){
                
                $.mobile.hidePageLoadingMsg();
            }
        }) ;
    }
    catch(e){
        alert(e);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.OpenAlbums = function(lnk){
    try{   
        
        CategoryLink=lnk;        
        sessionStorage.setItem("CategoryLink",lnk);
        console.log('CategoryLink=' + CategoryLink );              
        $.mobile.changePage("photosView.html", {   transition: "slide"  }, false); 
    }
    catch(e){
        alert('openPhoto error=' + e);
    }
} 
///////////////


window.LoadphotosView = function(offset){ 
    try{ 
        
        //        var CSRFToken=sessionStorage.getItem("X_CSRFToken");
        var pageSize=10;
        
        console.log('LoadphotosView function'); 
        console.log('Collection Data new function');
        $.mobile.showPageLoadingMsg("a", "Loading..");
        var request_url = sessionStorage.getItem('CategoryLink') + '?offset=' + offset + '&count=' + pageSize;
        console.log('request_url=' + request_url);
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
        //        var jqxhr = $.getJSON( request_url,{ Cookie: cookies},  function(data) 
        //                              { 
        //                               
        //                              }) 
        .done(function(data,status) { 
            if (status === 'success') {
                console.log('request was successfull'); 
                console.log('main: data=',JSON.stringify(data));
                var ItemsCount =data.items.length;
                console.log('ItemsCount==' + ItemsCount);
                console.log('Total ItemsCount==' + data.total_items_count);
                
                $('#dvCount').html(data.total_items_count);
                $('#liCount').html(ItemsCount);
                if(parseInt(ItemsCount) <= 0 || ItemsCount== "0" || ItemsCount=='null' || ItemsCount=='' || ItemsCount=='undefined' )
                { 
                    //   $('#Gallery').html('NO RESULTS FOUND');
                    
                    $('.mtMessage').html('NO RESULTS FOUND');
                    console.log('itemcount when 0');
                    $('#dvPager').hide();
                    return;
                } 
                else{  
                    $('#dvPager').show(); 
                    $('.mtMessage').html(''); 
                }
                for(var i=0;  i < ItemsCount;  i++)
                {  
                    photoLink= data.items[i].photo_link ; 
                    console.log('photoLink loop=' +  photoLink);
                    LoadPhotoDetail(photoLink,data.items[i].rank);
                }  
            } 
            else {
                msgAlert("Our server returned an error\n" + data.error +
                         "\n" + data.status + "\n" +
                         "Please try again later."); 
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
        alert(e);
    }
} 
window.LoadPhotoDetail =function(lnk,rank){
    aGallery = "";
    bGallery = "";
    try{ 
        $.mobile.showPageLoadingMsg("a", "Loading..");
        
        var request_url=lnk;
        console.log('LoadPhotoDetail function');
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
        
        
        
        
        //        var jqxhr = $.getJSON( lnk,{ Cookie: cookies},  function(data) { 
        //            console.log('main: LoadPhotoDetail data=',JSON.stringify(data));
        //            var photo= data.image_link;
        //            var thumbphoto= data.thumbnail_link;   
        //            console.log('photo==' + photo);
        //            console.log('thumbphoto==' + thumbphoto); 
        //            
        //            aGallery += ' <a href="#popupPhoto' + rank + '" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="' + thumbphoto + '" alt="Thumb Photos" style="width:100px;height:100px;padding:5px;" /></a>';   
        //            bGallery += '<div data-role="popup" id="popupPhoto' + rank + '" data-overlay-theme="a" data-theme="a" data-position-to="window" data-corners="false"> <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img class="popphoto" src="' + photo + '" style="max-height:512px;" alt="Photos" /> </div>'; 
        //            
        //        }) 
        .done(function(data,status) { 
            if (status === 'success') {
                console.log('request was successfull');
                console.log('main: LoadPhotoDetail data=',JSON.stringify(data));
                var photo= data.image_link;
                var thumbphoto= data.thumbnail_link;   
                console.log('photo==' + photo);
                console.log('thumbphoto==' + thumbphoto); 
                
                aGallery += ' <a href="#popupPhoto' + rank + '" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="' + thumbphoto + '" alt="Thumb Photos" style="width:100px;height:100px;padding:5px;" /></a>';   
                bGallery += '<div data-role="popup" id="popupPhoto' + rank + '" data-overlay-theme="a" data-theme="a" data-position-to="window" data-corners="false"> <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img class="popphoto" src="' + photo + '" style="max-height:512px;" alt="Photos" /> </div>'; 
                $('#Gallery').html(aGallery + bGallery).trigger('create'); 
                $("#popupPhoto").popup();
                console.log('aGallery=' + aGallery + bGallery); 
                
            } 
            else {
                msgAlert("Our server returned an error\n" + data.error +
                         "\n" + data.status + "\n" +
                         "Please try again later."); 
            } 
        })
        .fail(function (jqxhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n jqxhr:" + JSON.stringify(jqxhr) );
        })
        .always(function() {
            console.log( "first always: finished");
            $.mobile.hidePageLoadingMsg();
        });
    }
    catch(e)
    {
        msgAlert(e); 
    }
    
}

////////////////////////////  photo save functionlity start \\\\\\\\\\\\\\\\\\\ 



window.SavePhoto= function() {  
    var txtComment = document.getElementById('txtComments');
    //var photo_file=$("#photo_file").val();
     var photo_file=$("#photo_file").get(0);
    var request_url = sessionStorage.getItem('CategoryLink'); 
    var IsPublic= $("#flip").val();
    var X_CSRFToken=sessionStorage.getItem("X_CSRFToken");
    try{ 
        $.mobile.showPageLoadingMsg("a", "Loading.."); 
        console.log('save photo request_url==' + request_url);  
        console.log('txtComment==' + txtComment.value);
        console.log('save photo IsPublic=' +  IsPublic);
        console.log('photo_file=' + photo_file.files[0]);
        
        
        //        var jsonObj = new Object();
        //        jsonObj.comment =  txtComment.value;
        //        jsonObj.show_public_album  = IsPublic;
        //        jsonObj.photo_file =  photo_file ; 
        var data = new FormData();
        data.append("photo_file", photo_file.files[0]);
        data.append("show_public_album", IsPublic);
        data.append("comment", txtComment.value);
       
        
        $.ajax({
            url: request_url,
            type: 'POST',
            data: data,
            contentType: 'multipart/form-data',
            cache: false,
            processData: false,
            headers: {  'X-CSRFToken':  X_CSRFToken } ,
            xhrFields: { withCredentials: true },  
            success: function(data, textStatus, jqXHR)
            {
                alert(photo_file.files[0] + ' file uploaded successfully.');
                console.log('success data=' + JSON.stringify(data));
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                if(jqXHR.statusText=="error"){
                    alert('error data=' + JSON.stringify(jqXHR)); 
                }
                
            }
        })
        .fail(function (jqxhr, textStatus, err) {
            console.log("Fail: Our server returned an error\n" + err +
                        "\n" + textStatus + "\n" +
                        "Please try again later." + "\n jqxhr:" + JSON.stringify(jqxhr) );
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





////////////////////////////  photo save functionlity  end\\\\\\\\\\\\\\\\\\\
function PreviousPage()
{
    
    try{
        $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
        var pager=$('#aPager .ui-btn-text');
        var  pNo=   parseInt(pager.text() )- 1; 
        if(parseInt(pNo*10) < 0 ){
            pager.text(0);
            pNo=0;
            console.log('pNo=' + pNo);
        }
        else{ 
            pager.text(parseInt(pNo));
            
            LoadphotosView(parseInt(pager.text())*10); 
        } 
        
        $.mobile.loading('hide');
    }
    catch(e)
    {
        alert(e);
    } 
    
    
    //    try{
    //        var pager=$('#aPager .ui-btn-text');
    //        pNo=   parseInt(pager.text() )- 10; 
    //        if(parseInt(pNo) < 0 ){
    //            pager.text(0);
    //            pNo=0; 
    //        }
    //        else{ 
    //            pager.text(pNo);
    //            LoadphotosView(pNo);
    //        }
    //        console.log('pNo=' + pNo); 
    //    }
    //    catch(e)
    //    {
    //        msgError(e);
    //    } 
}
function NextPage()
{
    
    $.mobile.loading('show', {theme:"a", text:"Loading...", textonly:true, textVisible: true});
    var totalRows=parseInt($('#dvCount').html());
    console.log('totalRows=' + totalRows);
    try{ 
        var pager=$('#aPager .ui-btn-text');
        var pNo=   parseInt(pager.text() ) + 1; 
        console.log('li count=' + parseInt($("#ulSearch li").size()) );
        // if(parseInt(pNo*10) > parseInt(totalRows)){  
        if( parseInt($('#liCount').html()) < 10 )
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
                console.log('pNo=' + pNo); 
                pager.text(parseInt(pNo));
                LoadphotosView(parseInt(pager.text())*10); 
            }
        } 
        $.mobile.loading('hide');
    }
    catch(e)
    {
        alert(e);
    } 
    
    //    try{ 
    //        var pager=$('#aPager .ui-btn-text');
    //        var totalRows=parseInt($('#dvCount').html());
    //        console.log('totalRows=' + totalRows); 
    //        pNo=   parseInt(pager.text() ) + 10;  
    //        if(parseInt(pNo) > parseInt(totalRows)){
    //            pNo= pager.text(); 
    //        }
    //        else{
    //            pager.text(pNo);
    //            
    //            LoadphotosView(pNo);
    //        }
    //        console.log('pNo=' + pNo);
    //        
    //    }
    //    catch(e)
    //    {
    //        msgError(e);
    //    } 
}




$(document).ready(function(){ 
    window.CategoryLink;
    window.photoLink;
    window.photolink_arr = [];
    window.aGallery; 
    window.bGallery; 
    window.files;
    
    
    // Grab the files and set them to our variable
    
    // Add events
    //    $('input[type=file]').on('change', prepareUpload);
    //    $('form').on('submit', SavePhoto);
    
}); 