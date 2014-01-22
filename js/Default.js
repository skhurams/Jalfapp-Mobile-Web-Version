$(document).ready(function(){
    
    
    console.log('default ready');
    //    msgAlert('default ready');
    
});

function GotoLink(link){
    try{
        
        $.mobile.changePage(link,{transition:"slide", showLoadMsg: true});  
        
    }
    catch(e)
    {
        alert(e);
    }
    
    
}
$(".btnlogout").click(function (){
    showConfirm(); 
    
    
});
 
function showConfirm() {
    
    var buttonIndex=confirm("Do you want to disconnect?");
    if (buttonIndex==true)
    {
        $.mobile.changePage("index.html",{transition:"slide"});
    }
} 
