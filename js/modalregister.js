//#############
//CREATE ALUMNI
//#############

$(function() {
    var dialog, form,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      createname = $( "#createname" ),
      createemail = $( "#createemail" ),
      createques = $( '#createques' ),
      createans = $( '#createans' ),
      allFields = $( [] ).add( createname ).add( createemail ).add( createques )
      .add( createans ),
      tips = $( ".validateTips" ),
      createcmpemail = new Array(),
      hold = $("#checkcreateemail").text(),
      checkcreateemail = JSON.parse(hold);

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
    
    function checkEmail(o){
      var count = 0;
      for (var i = checkcreateemail.length - 1; i >= 0; i--) {
        if(o.val()==checkcreateemail[i]){
          count++;
        }
      }
      if(count>=1){
        o.addClass( "ui-state-error" );
        updateTips( "Email is Already in Used" );
        return false;
      }else{
        return true;
      }
      
    }

    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    function createAlumni() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
       
      valid = valid && checkLength( createname, "First Name", 3, 50 );
      valid = valid && checkRegexp( createname, /^[a-z]([0-9a-z_\s])+$/i, "First Name may consist of a-z, spaces and must begin with a letter." );
      valid = valid && checkLength( createemail, "Email", 3, 30 );
      valid = valid && checkRegexp( createemail, emailRegex, "eg. mey@gmail.com" );
      valid = valid && checkEmail( createemail ); 
      valid = valid && checkLength( createans, "Secret Answer", 3, 15 );  
      valid = valid && checkRegexp( createans, /^[a-z]([0-9a-z_\s])+$/i, "Secret Answer may consist of a-z, spaces and must begin with a letter." );

      if ( valid ) {
        $.post("RegisterEngine.php",
          {createname:createname.val(),createemail:createemail.val(),
            createques:createques.val(),createans:createans.val()
          });
        dialog.dialog( "close" );
        alert("We will check whether your register is satisfy our need or not.. please check your email for further info..");
      }
      return valid;
    }
 
    dialog = $( "#createuser-dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": createAlumni,
        Cancel: function(event,ui) {
          dialog.dialog( "close" );
        }
      },
      close: function(event,ui) {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
        location.reload();
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      createAlumni();
    });
    
    $( "#create-user" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      $("#createques").selectmenu();
      dialog.dialog( "open" );
    }); 

});

//#################
//END CREATE ALUMNI
//#################