 (function (window) {
        "use strict"; 
        function HangoutDemo() {
        console.log("starting ..."); 

        gapi.hangout.onApiReady.add(this.onApiReady.bind(this)); 
        startROS(); 
        }
        
        
function startROS() {
	var ros = new ROSLIB.Ros ({ 
	  url : 'wss://localhost:9094'
	  }); 
	  
	  ros.on('connection', function() {
	  console.log('Connected to ROS'); 
	  }); 
	  
		ros.on('error', function(error) {
		console.log('Error connecting to websocket server: ', error);
		});

		ros.on('close', function() {
		console.log('Connection to websocket server closed.');
		});
	}
		
	HangoutDemo.prototype.onApiReady = function (event) {	
		if (event.isApiReady === true) {	
			console.log("API Ready");	
			gapi.hangout.onParticipantsChanged.add(
				this.onParticipantsChanged.bind(this)); 
		document.getElementById("sendMessage").onclick = 	// callback for button-click
          this.buttonClick.bind(this);
        		this.displayParticipants(); 	
		}	
		};  
		
HangoutDemo.prototype.buttonClick = function () {
	
		
     var newDiv= document.createElement('div'); 
     newDiv.className="chatparticipant"; 
     var div2= document.getElementById("chat"); 
     div2.appendChild(newDiv); 
     
     newDiv.innerHTML= document.getElementById("input").innerHTML;
     document.getElementById("input").innerHTML="Enter the next Question for Eva"; 
      
      //var value = gapi.hangout.data.getValue("count") || "0";	// read current count from state
      //value = (parseInt(value, 10) + 1).toString();	// increment count by one
     // gapi.hangout.data.setValue("count", value);	// write new count into state

    };
  HangoutDemo.prototype.onParticipantsChanged = function (event) {	

      var div = document.getElementById("container");	

      div.innerHTML = "";	// make sure our container is empty before displaying the list

      this.displayParticipants();	

    };
  HangoutDemo.prototype.displayParticipants = function () {	
      var div, participants, ul, li, i, l;	
      participants = gapi.hangout.getParticipants();	// Get array of participants from API
      ul = document.createElement("ul");	
      l = participants.length;
	console.log("The length is : "); 
	console.log(l);	
      for (i = 0; i < l; i++) {	
        li = document.createElement("li");	
        li.innerHTML= "List of Available People on Call. Technically There Must Be a Place to Add Eva Hack if The ROS Spawns Correctly. "
        if (participants[i].person) {	
          li.innerHTML = participants[i].person.displayName;	// Add name to list if available
        } else {	
          li.innerHTML = "unknown";	
        }	
        ul.appendChild(li);	
      }	
      div = document.getElementById("container");	
      div.appendChild(ul);	
    };      
        var hangoutDemo= new HangoutDemo(); 
}(window)); 
