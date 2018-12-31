//###################
//REJECT REGISTRATION
//###################

$(function() {
  	var dialog,
  	rejectid = new Array(),
  	sendid = new Array();

  	dialog = $( "#rejectal-dialog-confirm" ).dialog({
  	  autoOpen: false,
  	  height:200,
	  width:400,
  	  hide: {
  	    effect: "fade",
  	  },
  	  buttons: {
	    "Save": function() {
	    	$("input[class=check-al]:checked").each(function() {
	    	  	rejectid.push($(this).val());
	    	});
	    	sendid = JSON.stringify(rejectid);
	    	$.post("rejectEngine.php",{sendid:sendid},
	    		function(data,status){
	    			alert("Data: " + data + "\nStatus: " + status);
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
  	
  	$( "#reject-al" )
  	.button()
  	.click(function() {
  	  dialog.dialog( "open" );
  	});

  });


//#######################
//END REJECT REGISTRATION
//#######################
