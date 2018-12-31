//################
//UPDATE EDUCATION
//################

$(function(){
    var dialog,form,record,
    editid = $("#editid"),
    editname = $( "#editname" ),
    editfaculty = $( "#editfaculty" ),
    editprogram = $( "#editprogram" ),
    edityop = $( "#edityop" ),
    allFields = $( [] ).add( editid ).add( editname ).add( editfaculty ).add( editprogram ).add( edityop ),
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

    function editEdu() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );

      valid = valid && checkLength( editname, "Institute Name", 3, 50 );
      valid = valid && checkLength( editfaculty, "Faculty Name", 3, 16 );
      valid = valid && checkLength( editprogram, "Program Name", 3, 16 );
      
      valid = valid && checkRegexp( editname, /^[a-z]([0-9a-z_\s])+$/i, "Institute Name may consist of a-z spaces and must begin with a letter." );
      valid = valid && checkRegexp( editfaculty, /^[a-z]([0-9a-z_\s])+$/i, "Faculty Name may consist of a-z spaces and must begin with a letter." );
      valid = valid && checkRegexp( editprogram, /^[a-z]([0-9a-z_\s])+$/i, "Program Name may consist of a-z spaces and must begin with a letter." );  


      if ( valid ) {
        $.post("editEduEngine.php",
          {editid:editid.val(),editname:editname.val(),editfaculty:editfaculty.val(),
            editprogram:editprogram.val(),edityop:edityop.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }

    dialog = $( "#editedu-dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editEdu,
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
      editEdu();
    });
    
    $( ".edit-edu" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('.record');
      $('#editid').val(record.find('.ins-id').html());
      $('#editname').val(record.find('.ins-name').html());
      $('#editfaculty').val(record.find('.fac-name').html());
      $('#editprogram').val(record.find('.prog-name').html());
      $('#edityop').val(record.find('.yearpass').html());
      dialog.dialog( "open" );
    }); 

});

//####################
//END UPDATE EDUCATION
//####################

//############################################################################//

//################
//UPDATE EXPERTISE
//################

$(function(){
    var dialog,form,record,
      
      editexpid = $('#editexpid'),
      editexpname = $( "#editexpname" ),
      editexpdes = $( "#editexpdes" ),
      allFields = $( [] ).add( expertisename ).add( expertisedes ).add( editexpid ),
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

    function editExp() {
          var valid = true;
          allFields.removeClass( "ui-state-error" );
     
          valid = valid && checkLength( editexpname, "Expertise Name", 3, 50 );
          valid = valid && checkLength( editexpdes, "Description", 3, 100 );
     
          valid = valid && checkRegexp( editexpname, /^[a-z]([0-9a-z_\s])+$/i, "Expertise Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );

          if ( valid ) {
            $.post("editexpEngine.php",
              {editexpid:editexpid.val(),editexpname:editexpname.val(),editexpdes:editexpdes.val()});
            dialog.dialog( "close" );
          }
          return valid;
    }

    dialog = $( "#editexp-dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 400,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editExp,
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
      editExp();
    });
    
    $( ".edit-exp" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('.records');
      $('#editexpid').val(record.find('.exp-id').html());
      $('#editexpname').val(record.find('.exp-name').html());
      $('#editexpdes').val(record.find('.exp-descript').html());
      dialog.dialog( "open" );
    }); 

});

//####################
//END UPDATE EXPERTISE
//####################

//##################################################################

//###############
//UPDATE WORK
//###############

$(function() {
    var dialog, form,record,

      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      editworkname = $( "#editworkname" ),
      editworkdesign = $( "#editworkdesign" ),
      editworkstart = $( "#editworkstart" ),
      editworkend = $( "#editworkend" ),
      editworkemail = $( "#editworkemail" ),
      editworkcontact = $( "#editworkcontact" ),
      editworkid = $( "#editworkid" ),
      allFields = $( [] ).add( editworkid ).add( editworkname )
      .add( editworkdesign ).add( editworkstart ).add( editworkend )
      .add( editworkemail ).add( editworkcontact ),
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
 
    function editWork() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
 
      valid = valid && checkLength( editworkname, "Company Name", 3, 50 );
      valid = valid && checkLength( editworkdesign, "Designation", 3, 30 );
      valid = valid && checkLength( editworkemail, "Email", 3, 20 );
      valid = valid && checkLength( editworkcontact, "Contact No", 3, 15 );
 
      valid = valid && checkRegexp( editworkname, /^[a-z]([0-9a-z_\s])+$/i, "Company Name may consist of a-z, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editworkdesign, /^[a-z]([0-9a-z_\s])+$/i, "Designation may consist of a-z, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editworkemail, emailRegex, "eg. mey@gmail.com" );
      valid = valid && checkRegexp( editworkcontact, /^([0-9])+$/, "Contact No. may consist only 0-9" );

      if ( valid ) {
        $.post("editworkEngine.php",
          {editworkid:editworkid.val(),editworkname:editworkname.val(),
            editworkdesign:editworkdesign.val(),
            editworkstart:editworkstart.val(),editworkend:editworkend.val(),
           editworkemail:editworkemail.val(),editworkcontact:editworkcontact.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#editwork-dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 500,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editWork,
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
      editWork();
    });
 
    $( ".edit-work" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('.record-work');
      $('#editworkid').val(record.find('.work-id').html());
      $('#editworkname').val(record.find('.work-name').html());
      $('#editworkdesign').val(record.find('.work-design').html());
      $('#editworkstart').val(record.find('.work-start').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#editworkend").datepicker("option","minDate",selectedDate);
        }
      });
      $('#editworkend').val(record.find('.work-end').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#editworkstart').datepicker("option","maxDate",selectedDate);
        }
      });
      $('#editworkemail').val(record.find('.work-email').html());
      $('#editworkcontact').val(record.find('.work-contact').html());
      dialog.dialog( "open" );
    }); 
});

//###############
//END UPDATE WORK
//###############

//#######################################################

