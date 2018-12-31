//################
//DELETE EDUCATION
//################
$(function(){
 	var dialog,record,
 	deleteid = $( "#deleteid" );	

	dialog = $( "#deleteedu-dialog-confirm" ).dialog({
	  resizable: false,
	  autoOpen: false,
	  height:200,
	  width:400,
	  hide: 'fade',
	  modal: true,
	  buttons: {
	    "Delete items": function() {
	      $.post("deleteeduEngine.php",
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

	$( ".delete-edu" )
	.button({ icons: { primary: "ui-icon-trash" }})
	.on( "click", function() {
		record = $(this).parents('.record');
		$('#deleteid').val(record.find('.ins-id').html());
	  dialog.dialog( "open" );
	}); 

});

//################
//DELETE EXPERTISE
//################
$(function(){
 	var dialog,record,
 	deleteid = $( "#deleteexpid" );	

	dialog = $( "#deleteexp-dialog-confirm" ).dialog({
	  resizable: false,
	  autoOpen: false,
	  height:200,
	  width:400,
	  hide: 'fade',
	  modal: true,
	  buttons: {
	    "Delete items": function() {
	      $.post("deleteexpEngine.php",
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

	$( ".delete-exp" )
	.button({ icons: { primary: "ui-icon-trash" }})
	.on( "click", function() {
		record = $(this).parents('.records');
		$('#deleteexpid').val(record.find('.exp-id').html());
	  dialog.dialog( "open" );
	}); 

});

//###########
//DELETE WORK
//###########

$(function(){
 	var dialog,record,
 	deleteid = $( "#deleteworkid" );	

	dialog = $( "#deletework-dialog-confirm" ).dialog({
	  resizable: false,
	  autoOpen: false,
	  height:200,
	  width:400,
	  hide: 'fade',
	  modal: true,
	  buttons: {
	    "Delete items": function() {
	      $.post("deleteworkEngine.php",
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

	$( ".delete-work" )
	.button({ icons: { primary: "ui-icon-trash" }})
	.on( "click", function() {
		record = $(this).parents('.record-work');
		$('#deleteworkid').val(record.find('.work-id').html());
	  dialog.dialog( "open" );
	}); 
});