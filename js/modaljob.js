//####################
//CREATE JOB VACANCIES
//####################

$(function() {
    var dialog, form,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      compname = $( "#compname" ),
      compprof = $( "#compprof" ),
      position = $( "#position" ),
      jobdes = $( "#jobdes" ),
      categ = $( "#categ" ),
      locat = $( "#locat" ),
      desprof = $( "#desprof" ),
      desexp = $( "#desexp" ),
      creatdate = $( "#creatdate" ),
      expdate = $( "#expdate" ),
      contper = $( "#contper" ),
      design = $( "#design" ),
      offno = $( "#offno" ),
      email = $( "#email" ),
      allFields = $( [] ).add( compname ).add( compprof ).add( position ).add( jobdes ).add( categ ).add( locat ).add( desprof )
      .add( desexp ).add( creatdate ).add( expdate ).add( contper ).add( design ).add( offno ).add( email ),
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
 
    function createJob() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      valid = valid && checkLength( compname, "Company Name", 3, 50 );
      valid = valid && checkLength( compprof, "Company Profile", 3, 500 );
      valid = valid && checkLength( position, "Position", 3, 100 );
      valid = valid && checkLength( jobdes, "Job Description", 3, 100 );
      valid = valid && checkLength( categ, "Category", 3, 100 );
      valid = valid && checkLength( locat, "Location", 3, 100 );
      valid = valid && checkLength( desprof, "Desired Profile", 3, 500 );
      valid = valid && checkLength( desexp, "Desired Expertise", 3, 500 );
      valid = valid && checkLength( contper, "Contact Person", 3, 20 );
      valid = valid && checkLength( design, "Designation", 3, 50 );
      valid = valid && checkLength( offno, "Office No", 3, 50 );
      valid = valid && checkLength( email, "Email", 3, 50 );
      valid = valid && checkRegexp( email, emailRegex, "eg. mey@gmail.com" );
 
      valid = valid && checkRegexp( compname, /^[a-z]([0-9a-z_\s])+$/i, "Company name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( position, /^[a-z]([0-9a-z_\s])+$/i, "Position may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( jobdes, /^[a-z]([0-9a-z_\s])+$/i, "Job Description Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( categ, /^[a-z]([0-9a-z_\s])+$/i, "Category may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( locat, /^[a-z]([0-9a-z_\s])+$/i, "Location may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( contper, /^([0-9])+$/, "Contact person may consist only 0-9" );
      valid = valid && checkRegexp( design, /^[a-z]([0-9a-z_\s])+$/i, "Designation may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( offno, /^([0-9])+$/, "Office no. may consist only 0-9" );

      if ( valid ) {
        $.post("jobEngine.php",
          {compname:compname.val(),compprof:compprof.val(),position:position.val(),jobdes:jobdes.val(),
            categ:categ.val(),locat:locat.val(),desprof:desprof.val(),desexp:desexp.val(),
            creatdate:creatdate.val(),expdate:expdate.val(),contper:contper.val(),
            design:design.val(),offno:offno.val(),email:email.val()
          }//,
          //function(data, status){
                  //alert("Data: " + data + "\nStatus: " + status);
              //}
          );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#createjob-dialog-form" ).dialog({
      autoOpen: false,
      height: 650,
      width: 800,
      hide: "fade",
      modal: true,
      buttons: {
        "Create": createJob,
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
      createJob();
    });
 
    $( "#create-job" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      $('#creatdate')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#expdate").datepicker("option","minDate",selectedDate);
        }
      });
      $('#expdate')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#creatdate').datepicker("option","maxDate",selectedDate);
        }
      });
      dialog.dialog( "open" );
    }); 

});

//########################
//END CREATE JOB VACANCIES
//########################

//##################
//EDIT JOB VACANCIES
//##################

$(function() {
    var dialog, form,record,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      compname = $( "#editcompname" ),
      compprof = $( "#editcompprof" ),
      position = $( "#editposition" ),
      jobdes = $( "#editjobdes" ),
      categ = $( "#editcateg" ),
      locat = $( "#editlocat" ),
      desprof = $( "#editdesprof" ),
      desexp = $( "#editdesexp" ),
      creatdate = $( "#editcreatdate" ),
      expdate = $( "#editexpdate" ),
      contper = $( "#editcontper" ),
      design = $( "#editdesign" ),
      offno = $( "#editoffno" ),
      email = $( "#editemail" ),
      id = $( "#editid" ),
      allFields = $( [] ).add( compname ).add( compprof ).add( position ).add( jobdes ).add( categ ).add( locat ).add( desprof )
      .add( desexp ).add( creatdate ).add( expdate ).add( contper ).add( design ).add( offno ).add( email ),
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
 
    function editJob() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      valid = valid && checkLength( compname, "Company Name", 3, 50 );
      valid = valid && checkLength( compprof, "Company Profile", 3, 500 );
      valid = valid && checkLength( position, "Position", 3, 100 );
      valid = valid && checkLength( jobdes, "Job Description", 3, 100 );
      valid = valid && checkLength( categ, "Category", 3, 100 );
      valid = valid && checkLength( locat, "Location", 3, 100 );
      valid = valid && checkLength( desprof, "Desired Profile", 3, 500 );
      valid = valid && checkLength( desexp, "Desired Expertise", 3, 500 );
      valid = valid && checkLength( contper, "Contact Person", 3, 20 );
      valid = valid && checkLength( design, "Designation", 3, 50 );
      valid = valid && checkLength( offno, "Office No", 3, 50 );
      valid = valid && checkLength( email, "Email", 3, 50 );
      valid = valid && checkRegexp( email, emailRegex, "eg. mey@gmail.com" );
 
      valid = valid && checkRegexp( compname, /^[a-z]([0-9a-z_\s])+$/i, "Company name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( position, /^[a-z]([0-9a-z_\s])+$/i, "Position may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( jobdes, /^[a-z]([0-9a-z_\s])+$/i, "Job Description Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( categ, /^[a-z]([0-9a-z_\s])+$/i, "Category may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( locat, /^[a-z]([0-9a-z_\s])+$/i, "Location may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( contper, /^([0-9])+$/, "Contact person may consist only 0-9" );
      valid = valid && checkRegexp( design, /^[a-z]([0-9a-z_\s])+$/i, "Designation may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( offno, /^([0-9])+$/, "Office no. may consist only 0-9" );

      if ( valid ) {
        $.post("editjobEngine.php",
          {compname:compname.val(),compprof:compprof.val(),position:position.val(),jobdes:jobdes.val(),
            categ:categ.val(),locat:locat.val(),desprof:desprof.val(),desexp:desexp.val(),
            creatdate:creatdate.val(),expdate:expdate.val(),contper:contper.val(),
            design:design.val(),offno:offno.val(),email:email.val(),id:id.val()
          });
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#editjob-dialog-form" ).dialog({
      autoOpen: false,
      height: 650,
      width: 800,
      hide: "fade",
      modal: true,
      buttons: {
        "Create": editJob,
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
      editJob();
    });
 
    $( ".edit-job" )
    .button({ icons: { primary: "ui-icon-pencil" }})
    .on( "click", function() {
      record = $(this).parents('.record-job');
      $( "#editcompname" ).val(record.find('.job-name').html());
      $( "#editcompprof" ).val(record.find('.job-profile').html());
      $( "#editposition" ).val(record.find('.job-position').html());
      $( "#editjobdes" ).val(record.find('.job-des').html());
      $( "#editcateg" ).val(record.find('.job-categ').html());
      $( "#editlocat" ).val(record.find('.job-locat').html());
      $( "#editdesprof" ).val(record.find('.job-desprof').html());
      $( "#editdesexp" ).val(record.find('.job-desexp').html());
      $('#editcreatdate').val(record.find('.job-create').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#editexpdate").datepicker("option","minDate",selectedDate);
        }
      });
      $('#editexpdate').val(record.find('.job-expire').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#editcreatdate').datepicker("option","maxDate",selectedDate);
        }
      });
      $( "#editcontper" ).val(record.find('.job-contact').html());
      $( "#editdesign" ).val(record.find('.job-design').html());
      $( "#editoffno" ).val(record.find('.job-office').html());
      $( "#editemail" ).val(record.find('.job-email').html());
      $( "#editid" ).val(record.find('.job-id').html());
      dialog.dialog( "open" );
    }); 

});


//######################
//END EDIT JOB VACANCIES
//######################

//####################
//DELETE JOB VACANCIES
//####################

$(function(){
  var dialog,record,
  deleteid = $( "#deleteid" );  

  dialog = $( "#deletejob-dialog-confirm" ).dialog({
    resizable: false,
    autoOpen: false,
    height:200,
    width:400,
    hide: 'fade',
    modal: true,
    buttons: {
      "Delete items": function() {
        $.post("deletejobEngine.php",
          {deleteid:deleteid.val()
          }); 
        dialog.dialog( "close" );
      },
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function(event,ui) {
      location.reload();
    }
  });

  $( ".delete-job" )
  .button({ icons: { primary: "ui-icon-trash" }})
  .on( "click", function() {
    record = $(this).parents('.record-job');
    $('#deleteid').val(record.find('.job-id').html());
    dialog.dialog( "open" );
  }); 

});

//########################
//END DELETE JOB VACANCIES
//########################