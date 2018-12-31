$(document).ready(function(){
    
    $(".button-1").button({
    	icons:{
    		primary: "ui-icon-folder-collapsed"
    	}
    }).hover(function () {
        // hover in            
        $(".ui-button-icon-primary",this).toggleClass("ui-icon-folder-collapsed ui-icon-folder-open");
    }, function () {
        // hover out
        $(".ui-button-icon-primary",this).toggleClass("ui-icon-folder-open ui-icon-folder-collapsed");
    });


    $(".button-home").button({
    	icons:{
    		primary: "ui-icon-home"
    	}
    });

    $(".button-logout").button({
        icons:{
            primary: "ui-icon-key"
        }
    });

    $('#button-mail')
    .hover(function () {
        // hover in            
        $(".ui-button-icon-primary",this).toggleClass("ui-icon-mail-closed ui-icon-mail-open");
    }, function () {
        // hover out
        $(".ui-button-icon-primary",this).toggleClass("ui-icon-mail-open ui-icon-mail-closed");
    });

   $( ".selector" ).button({
     icons: { primary: "ui-icon-gear", secondary: "ui-icon-triangle-1-s" }
   });

});
