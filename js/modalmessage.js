
//############
//MESSAGE SEND
//############

$(function(){
  var dialog,record,
  deleteid = $( "#deletemailid" );  

  dialog = $( "#deletemail-dialog-confirm" ).dialog({
    resizable: false,
    autoOpen: false,
    height:200,
    width:400,
    hide: 'fade',
    modal: true,
    buttons: {
      "Delete items": function() {
        $.post("deletemailEngine.php",
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

  $( ".delete-mail" )
  .button({ icons: { primary: "ui-icon-trash" }})
  .on( "click", function() {
    record = $(this).parents('.record-mail');
    $('#deletemailid').val(record.find('.mail-id').html());
    dialog.dialog( "open" );
  }); 

});

//################
//END MESSAGE SEND
//################

//############
//READ MESSAGE
//############

$(function(){
  var dialog,record,
  readmailid = $( "#readmailid" );  

  dialog = $( "#readmail-dialog-confirm" ).dialog({
    resizable: false,
    autoOpen: false,
    height:200,
    width:400,
    hide: 'fade',
    modal: true,
    buttons: {
      "Save": function() {
        $.post("readmailEngine.php",
          {readmailid:readmailid.val()
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

  $( ".read-mail" )
  .button({ icons: { primary: "ui-icon-pencil" }})
  .on( "click", function() {
    record = $(this).parents('.record-mail');
    $('#readmailid').val(record.find('.mail-id').html());
    dialog.dialog( "open" );
  }); 

});

//################
//END READ MESSAGE
//################

