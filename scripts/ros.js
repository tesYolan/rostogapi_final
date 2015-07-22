 (function (window) {
        "use strict"; 
        function HangoutDemo() {
        console.log("starting ..."); 
        startROS(); 
        gapi.hangout.onApiReady.add(this.onApiReady.bind(this)); 
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
        // we can start doing stuff here	
		}	
		};        
        var hangoutDemo= new HangoutDemo(); 
}(window)); 
