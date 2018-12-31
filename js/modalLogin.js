//###############
//UPDATE PASSWORD
//###############

$(function() {
    var dialog, form,

      currpwd = $( "#curr-pwd" ),
      newpwd = $( "#new-pwd" ),
      retypepwd = $( "#retype-pwd" ),
      holdpwd = $( "#holdpwd" ),
      allFields = $( [] ).add( currpwd ).add( newpwd ).add( retypepwd ).add( holdpwd ),
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

    function checkCurrPwd(c,h,n){
      if(c.val()!=h.val()){
        c.addClass("ui-state-error");
        updateTips(n);
        return false;
      }else{
        return true;
      }
    }
    
    function checkComparePwd(c,r,n){
      if(c.val()!=r.val()){
         r.addClass("ui-state-error");
         updateTips(n);
         return false;
       }else{
         return true;
       }
    }

    function changePwd() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( currpwd, "Current Password", 5, 16 );
      valid = valid && checkLength( newpwd, "New Password", 5, 16 );
      valid = valid && checkLength( retypepwd, "Retype Password", 5, 16 );
 
      valid = valid && checkRegexp( currpwd, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
      valid = valid && checkRegexp( newpwd, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
      valid = valid && checkRegexp( retypepwd, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
        
      valid = valid && checkCurrPwd(currpwd,holdpwd,"Password field is not same with current Password");
      valid = valid && checkComparePwd(newpwd,retypepwd,"Password field is not same with new Password");

      if ( valid ) {
        $.post("pwdEngine.php",{newpwd:newpwd.val()});
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#updatepwd-dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      hide: "fade",
      modal: true,
      buttons: {
        "Update Password": changePwd,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
        location.reload();
      }
    });
 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      changePwd();
    });
 
    $( "#update-pwd" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      dialog.dialog( "open" );
    });
  });

//###################
//END UPDATE PASSWORD
//###################

//####################
//UPDATE ALUMNI DETAIL
//####################

$(function() {
    var dialog, form,record,
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      editid = $( "#editid" ),
      editfname = $( "#editfname" ),
      editlname = $( "#editlname" ),
      editgender = $( "#editgender" ),
      editic = $( "#editic" ),
      editmarital = $( "#editmarital" ),
      editphn = $( "#editphn" ),
      editemail = $( "#editemail" ),
      allFields = $( [] ).add( editid ).add( editfname ).add( editlname )
      .add( editgender ).add( editic ).add( editmarital ).add( editphn )
      .add( editemail ),
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
 
    function editDetail() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( editfname, "First Name", 3, 50 );
      valid = valid && checkLength( editlname, "Last Name", 3, 50 );
      valid = valid && checkLength( editic, "IC", 3, 12 );
      valid = valid && checkLength( editphn, "Phone No", 3, 12 );
      valid = valid && checkLength( editemail, "Email", 3, 30 );
 
      valid = valid && checkRegexp( editfname, /^[a-z]([0-9a-z_\s])+$/i, "First Name may consist of a-z, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editlname, /^[a-z]([0-9a-z_\s])+$/i, "Last Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editic, /^([0-9])+$/, "Eg. 111111111111" );
      valid = valid && checkRegexp( editphn, /^([0-9])+$/, "Phone No Name may consist of 0-9" );
      valid = valid && checkRegexp( editemail, emailRegex, "eg. mey@gmail.com" );

      if ( valid ) {
        $.post("editdetailEngine.php",
          {editid:editid.val(),editfname:editfname.val(),editlname:editlname.val(),
            editic:editic.val(),editphn:editphn.val(),editemail:editemail.val(),
            editgender:editgender.val(),editmarital:editmarital.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#edituser-dialog-form" ).dialog({
      autoOpen: false,
      height: 600,
      width: 600,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editDetail,
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
      editDetail();
    });
    
    $( "#edit-detail" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('#record-detail');
      $('#editmarital').val(record.find('#user-marital').html()).selectmenu();
      $('#editfname').val(record.find('#user-fname').html());
      $('#editlname').val(record.find('#user-lname').html());
      $('#editgender').val(record.find('#user-gender').html()).selectmenu();
      $('#editic').val(record.find('#user-ic').html());
      $('#editid').val(record.find('#user-id').html());
      $('#editphn').val(record.find('#user-phn').html());
      $('#editemail').val(record.find('#user-email').html());
      dialog.dialog( "open" );
    }); 

});

//########################
//END UPDATE ALUMNI DETAIL
//########################

//#########################################################################

//##############
//UPDATE ADDRESS
//##############


$(function() {
    var dialog, form,record,
      editaddressid = $( "#editaddressid" ),
      editline1 = $( "#editline1" ),
      editline2 = $( "#editline2" ),
      editposcode = $( "#editposcode" ),
      editcity = $( "#editcity" ),
      editdistrict = $( "#editdistrict" ),
      editstate = $( "#editstate" ),
      editcountry = $( "#editcountry" ),
      allFields = $( [] ).add( editaddressid ).add( editline1 )
      .add( editline2 ).add( editposcode ).add( editcity ).add( editdistrict )
      .add( editstate ).add( editcountry ),
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
 
    function editAddress() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( editline1, "Address", 3, 50 );
      valid = valid && checkLength( editposcode, "Poscode", 3, 12 );
      valid = valid && checkLength( editcity, "City", 3, 30 );
      valid = valid && checkLength( editcountry, "Country", 3, 30 );
 
      valid = valid && checkRegexp( editline1, /([A-Z0-9a-z_.,\s])/ig, "Address may consist of a-z, spaces, full stop, coma, A-Z, 0-9" );
      valid = valid && checkRegexp( editposcode, /([0-9\s])/, "Eg. 42500" );
      valid = valid && checkRegexp( editcity, /([A-Z0-9a-z\s])/ig, "Eg. Batu Caves" );
      valid = valid && checkRegexp( editcountry, /([A-Z0-9a-z\s])/ig, "Eg. Malaysia" );

      if ( valid ) {
        $.post("editaddressEngine.php",
          {editaddressid:editaddressid.val(),editline1:editline1.val(),editline2:editline2.val(),
            editposcode:editposcode.val(),editcity:editcity.val(),editdistrict:editdistrict.val(),
            editstate:editstate.val(),editcountry:editcountry.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#editaddress-dialog-form" ).dialog({
      autoOpen: false,
      height: 600,
      width: 600,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editAddress,
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
      editAddress();
    });
    
    $( "#edit1-address" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('#record-address');
      $('#editaddressid').val(record.find('#address-id').html());
      $('#editline1').val(record.find('#address-line1').html());
      $('#editline2').val(record.find('#address-line2').html());
      $('#editposcode').val(record.find('#address-poscode').html());
      $('#editcity').val(record.find('#address-city').html());
      $('#editstate').val(record.find('#address-state').html())
      .selectmenu().selectmenu("menuWidget").addClass("overflow");
      $('#editdistrict').val(record.find('#address-district').html());
      $('#editcountry').val(record.find('#address-country').html());
      dialog.dialog( "open" );
    }); 

});

//##################
//END UPDATE ADDRESS
//##################


