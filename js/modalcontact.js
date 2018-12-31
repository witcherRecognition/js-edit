$(function() {
    var dialog, form,

      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      contactid = $( "#contactid" ),
      contactname = $( "#contactname" ),
      contactemail = $( "#contactemail" ),
      contactsubject = $( "#contactsubject" ),
      contactmsg = $( "#contactmsg" ),
      allFields = $( [] ).add( contactsubject ).add( contactemail ).add( contactmsg ),
      tips = $( ".validateTips" );
      
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
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
 
    function sendEmail() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( contactemail, "Email", 3, 40 );
      valid = valid && checkLength( contactsubject, "Subject", 3, 50 );
      valid = valid && checkLength( contactmsg, "Message", 3, 200 );

      valid = valid && checkRegexp( contactemail, emailRegex, "Email .Eg mam@gmail.com" );
      valid = valid && checkRegexp( contactsubject, /^[a-z]([0-9a-z_\s.$%^&@*!?])+$/i, "Subject may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );  
      valid = valid && checkRegexp( contactmsg, /^[a-z]([0-9a-z_\s.$%^&@*?!])+$/i, "Message may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );  

      if ( valid ) {
        $.post("ContactEngine.php",
          {contactid:contactid.val(),contactname:contactname.val(),
            contactemail:contactemail.val(),contactsubject:contactsubject.val(),
            contactmsg:contactmsg.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#contact-dialog-form" ).dialog({
      autoOpen: false,
      resizable: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Send": sendEmail,
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
      sendEmail();
    });
 
    $( "#button-mail" )
    .on( "click", function() {
      dialog.dialog( "open" );
    }); 

});