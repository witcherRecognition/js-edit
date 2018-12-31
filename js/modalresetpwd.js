$(function() {
    var dialog, form,record,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      forgotpwdemail = $( "#forgotpwdemail" ),
      forgotpwdans = $( '#forgotpwdans' ),
      allFields = $( [] ).add( forgotpwdemail ).add( forgotpwdans ),
      tips = $( ".validateTips" ),
      forgotcmpemail = new Array(),
      holdemail = $("#checkemail").text(),
      forgotcmpemail = JSON.parse(holdemail),
      forgotcmpans = new Array(),
      holdans = $( "#checkquestion" ).text(),
      forgotcmpans = JSON.parse(holdans);
      

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

    function cmpemailans(e,a,ce,ca){
      var counte = 0,counta = 0, indexe = 0, indexa = 0;
      for (var i = forgotcmpemail.email.length - 1; i >= 0; i--) {
        if(e.val()==forgotcmpemail.email[i]){
          counte++;
          indexe=i;
        }
      }
      for (var i = forgotcmpans.secret.length - 1; i >= 0; i--) {
        if(a.val()==forgotcmpans.secret[i]){
          counta++;
          indexa=i;
        }
      }
      if(counte==0){
        e.addClass( "ui-state-error" );
        updateTips( "Email is Invalid" );
        return false;
      }else if(counta==0){
          a.addClass( "ui-state-error" );
          updateTips( "Answer is invalid" );
          return false;
      }else if(forgotcmpemail.id[indexe]!=forgotcmpans.id[indexa]){
          a.addClass( "ui-state-error" );
          updateTips( "Email and Answer is not compatible" );
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
 
    function resetPwd() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      
      valid = valid && checkLength( forgotpwdemail, "Email", 3, 30 );
      valid = valid && checkLength( forgotpwdans, "Secret Answer", 3, 15 );

      valid = valid && checkRegexp( forgotpwdemail, emailRegex, "eg. mey@gmail.com" );
      valid = valid && checkRegexp( forgotpwdans, /^[a-z]([0-9a-z_\s])+$/i, "Secret Answer may consist of a-z, spaces and must begin with a letter." );   

      valid = valid && cmpemailans( forgotpwdemail, forgotpwdans,forgotcmpemail,forgotcmpans);

      if ( valid ) {
        $.post("forgotpwdEngine.php",
          {forgotpwdemail:forgotpwdemail.val(),forgotpwdans:forgotpwdans.val()});
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#forgotpwd-dialog-form" ).dialog({
      autoOpen: false,
      height: 450,
      width: 450,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": resetPwd,
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
      resetPwd();
    });
    
    $( "#forgot-pwd" )
    .on( "click", function() {
      dialog.dialog( "open" );
    });

});