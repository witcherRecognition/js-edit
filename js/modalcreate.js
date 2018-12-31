//################
//CREATE EDUCATION
//################

$(function() {
    var dialog, form,

      name = $( "#name" ),
      faculty = $( "#faculty" ),
      program = $( "#program" ),
      yop = $( "#yop" ),
      allFields = $( [] ).add( name ).add( faculty ).add( program ).add( yop ),
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
 
    function addEdu() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( name, "Institute Name", 3, 50 );
      valid = valid && checkLength( faculty, "Faculty Name", 3, 50 );
      valid = valid && checkLength( program, "Program Name", 3, 30 );
 
      valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Institute Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( faculty, /^[a-z]([0-9a-z_\s])+$/i, "Faculty Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( program, /^[a-z]([0-9a-z_\s])+$/i, "Program Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );  

      if ( valid ) {
        $.post("eduEngine.php",
          {name:name.val(),faculty:faculty.val(),program:program.val(),yop:yop.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Create an Education": addEdu,
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
      addEdu();
    });
 
    $( "#create-edu" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      dialog.dialog( "open" );
    }); 

});

//####################
//END CREATE EDUCATION
//####################

//#####################################################################################

//################
//CREATE EXPERTISE
//################

$(function() {
    var dialog, form,

      expertisename = $( "#expertisename" ),
      expertisedes = $( "#expertisedes" ),
      allFields = $( [] ).add( expertisename ).add( expertisedes ),
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
 
    function addExp() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( expertisename, "Expertise Name", 3, 50 );
      valid = valid && checkLength( expertisedes, "Description", 3, 200 );
 
      valid = valid && checkRegexp( expertisename, /^[a-z]([0-9a-z_\s])+$/i, "Expertise Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );

      if ( valid ) {
        $.post("expEngine.php",
          {expertisename:expertisename.val(),expertisedes:expertisedes.val()});
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#exp-dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 400,
      hide: "fade",
      modal: true,
      buttons: {
        "Create an Expertise": addExp,
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
      addExp();
    });
 
    $( "#create-exp" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      dialog.dialog( "open" );
    }); 
});


//####################
//END CREATE EXPERTISE
//####################

//###############################################################################

//###########
//CREATE WORK
//###########

$(function() {
    var dialog, form,

      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      workname = $( "#workname" ),
      workdesign = $( "#workdesign" ),
      workstart = $( "#workstart" ),
      workend = $( "#workend" ),
      workemail = $( "#workemail" ),
      workcontact = $( "#workcontact" ),
      allFields = $( [] ).add( workname ).add( workdesign ).add( workstart ).add( workend ).add( workemail ).add( workcontact ),
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
 
    function addWork() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( workname, "Company Name", 3, 50 );
      valid = valid && checkLength( workdesign, "Designation", 3, 50 );
      valid = valid && checkLength( workemail, "Email", 3, 50 );
      valid = valid && checkLength( workcontact, "Contact No", 3, 20 );
 
      valid = valid && checkRegexp( workname, /^[a-z]([0-9a-z_\s])+$/i, "Company Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( workdesign, /^[a-z]([0-9a-z_\s])+$/i, "Designation may consist of a-z, spaces and must begin with a letter." );
      valid = valid && checkRegexp( workemail, emailRegex, "eg. mey@gmail.com" );
      valid = valid && checkRegexp( workcontact, /^([0-9])+$/, "Contact No. may consist only 0-9" );

      if ( valid ) {
        $.post("workEngine.php",
          {workname:workname.val(),workdesign:workdesign.val(),workstart:workstart.val(),workend:workend.val(),
            workdesign:workdesign.val(),workemail:workemail.val(),workcontact:workcontact.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#work-dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Create an Work": addWork,
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
      addWork();
    });
 
    $( "#create-work" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      $('#workstart')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#workend").datepicker("option","minDate",selectedDate);
        }
      });
      $('#workend')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#workstart').datepicker("option","maxDate",selectedDate);
        }
      });
      dialog.dialog( "open" );
    }); 
});

//###############
//END CREATE WORK
//###############


