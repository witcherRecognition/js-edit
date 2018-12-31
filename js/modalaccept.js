//##########################
//ACCEPT REGISTRATION ALUMNI
//##########################

  $(function() {
  	var dialog,
  	acceptid = new Array(),
  	sendid = new Array();

  	dialog = $( "#acceptal-dialog-confirm" ).dialog({
  	  autoOpen: false,
  	  height:200,
	  width:400,
  	  hide: {
  	    effect: "fade",
  	  },
  	  buttons: {
	    "Save": function() {
	    	$("input[class=check-al]:checked").each(function() {
	    	  	acceptid.push($(this).val());
	    	});
	    	sendid = JSON.stringify(acceptid);
	    	$.post("acceptEngine.php",{sendid:sendid},
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
  	
  	$( "#accept-al" )
  	.button()
  	.click(function() {
  	  dialog.dialog( "open" );
  	});

  });

//#######################
//END ACCEPT REGISTRATION
//#######################

