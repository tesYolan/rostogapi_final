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
        		this.displayParticipants(); 	
		}	
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
