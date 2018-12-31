
//############
//CREATE EVENT
//############

$(function() {
    var dialog, form,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      eventname = $( "#eventname" ),
      eventdate = $( "#eventdate" ),
      eventtime = $( "#eventtime" ),
      venue = $( "#venue" ),
      eventdes = $( "#eventdes" ),
      eventover = $( "#eventover" ),
      allFields = $( [] ).add( eventname ).add( eventdate ).add( eventtime ).add( venue ).add( eventdes ).add( eventover ),
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
 
    function createEvent() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      valid = valid && checkLength( eventname, "Event Name", 3, 50 );
      valid = valid && checkLength( venue, "Job Description", 3, 100 );
      valid = valid && checkLength( eventdes, "Event Description", 3, 100 );
 
      valid = valid && checkRegexp( eventname, /^[a-z]([0-9a-z_\s])+$/i, "event name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( venue, /^[a-z]([0-9a-z_\s])+$/i, "Venue may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( eventdes, /^[a-z]([0-9a-z_\s])+$/i, "Event Description may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      if ( valid ) {
        $.post("eventEngine.php",
          {eventname:eventname.val(),eventdate:eventdate.val(),eventtime:eventtime.val(),
            venue:venue.val(),eventdes:eventdes.val(),eventover:eventover.val()
          },
          function(data, status){
                  alert("Data: " + data + "\nStatus: " + status);
              }
          );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#createevent-dialog-form" ).dialog({
      autoOpen: false,
      height: 650,
      width: 800,
      hide: "fade",
      modal: true,
      buttons: {
        "Create": createEvent,
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
      createEvent();
    });
 
    $( "#create-event" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {


      $('#eventtime').timepicker({
          'scrollDefault': 'now'
      });


      $('#eventdate')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#eventover").datepicker("option","minDate",selectedDate);
        }
      });
      $('#eventover')
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#eventdate').datepicker("option","maxDate",selectedDate);
        }
      });
      

      dialog.dialog( "open" );
    }); 

});


//################
//END CREATE EVENT
//################

//##########
//EDIT EVENT
//##########

$(function() {
    var dialog, form,record,
      emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      editeventid = $( "#editeventid" ),
      editeventname = $( "#editeventname" ),
      editeventdate = $( "#editeventdate" ),
      editeventtime = $( "#editeventtime" ),
      editvenue = $( "#editvenue" ),
      editeventdes = $( "#editeventdes" ),
      editeventover = $( "#editeventover" ),
      allFields = $( [] ).add( editeventname ).add( editeventdate ).add( editeventtime ).add( editvenue )
      .add( editeventdes ).add( editeventover ),
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
 
    function editEvent() {
      var valid = true;
      allFields.removeClass( "ui-state-error" );
      valid = valid && checkLength( editeventname, "Event Name", 3, 50 );
      valid = valid && checkLength( editvenue, "Job Description", 3, 100 );
      valid = valid && checkLength( editeventdes, "Event Description", 3, 100 );
 
      valid = valid && checkRegexp( editeventname, /^[a-z]([0-9a-z_\s])+$/i, "event name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editvenue, /^[a-z]([0-9a-z_\s])+$/i, "Venue may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      valid = valid && checkRegexp( editeventdes, /^[a-z]([0-9a-z_\s])+$/i, "Event Description may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
      if ( valid ) {
        $.post("editeventEngine.php",
          {editeventname:editeventname.val(),editeventdate:editeventdate.val(),editeventtime:editeventtime.val(),
            editvenue:editvenue.val(),editeventdes:editeventdes.val(),editeventover:editeventover.val(),
            editeventid:editeventid.val()
          },
          function(data, status){
                  alert("Data: " + data + "\nStatus: " + status);
              }
          );
        dialog.dialog( "close" );
      }
      return valid;
    }
 
    dialog = $( "#editevent-dialog-form" ).dialog({
      autoOpen: false,
      height: 650,
      width: 800,
      hide: "fade",
      modal: true,
      buttons: {
        "Save": editEvent,
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
      editEvent();
    });
  
    $( ".edit-event" )
    .button({ icons: { primary: "ui-icon-document" }})
    .on( "click", function() {
      
      record = $(this).parents('.record-event');
      $( "#editeventid" ).val(record.find('.event-id').html());
      $( "#editeventname" ).val(record.find('.event-name').html());
      $( "#editeventname" ).val(record.find('.event-name').html());
      $( "#editeventdes" ).val(record.find('.event-desc').html());
      $( "#editvenue" ).val(record.find('.event-venue').html());
      $('#editeventtime').val(record.find('.event-time').html())
      .timepicker({
          'scrollDefault': 'now'
      });

      $('#editeventdate').val(record.find('.event-date').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $("#editeventover").datepicker("option","minDate",selectedDate);
        }
      });
      $('#editeventover').val(record.find('.event-over').html())
      .datepicker({
        defaultDate:"+1w",
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        onClose: function( selectedDate ){
          $('#editeventdate').datepicker("option","maxDate",selectedDate);
        }
      });
      

      dialog.dialog( "open" );
    }); 

});

//##############
//END EDIT EVENT
//##############

//############
//DELETE EVENT
//############

$(function(){
  var dialog,record,
  deleteeventid = $( "#deleteeventid" );  

  dialog = $( "#deleteevent-dialog-confirm" ).dialog({
    resizable: false,
    autoOpen: false,
    height:200,
    width:400,
    hide: 'fade',
    modal: true,
    buttons: {
      "Delete items": function() {
        $.post("deleteeventEngine.php",
          {deleteeventid:deleteeventid.val()
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

  $( ".delete-event" )
  .button({ icons: { primary: "ui-icon-trash" }})
  .on( "click", function() {
    record = $(this).parents('.record-event');
    $('#deleteeventid').val(record.find('.event-id').html());
    dialog.dialog( "open" );
  }); 

});

//################
//END DELETE EVENT
//################