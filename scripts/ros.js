        

	function HangoutDemo() {
        console.log("starting ..."); 		
        gapi.hangout.onApiReady.add(this.onApiReady.bind(this)); 
        }  


	function startROS() {
		    var ros; 
	var rosok=false;  
	var participants_list;    
//===========================================================================
	var chatTopic = new ROSLIB.Topic({
		ros : ros, 
		name : '/eva/chatbot_speech',
		messageType : 'chatbot/ChatMessage'
	}); 
	var message = new ROSLIB.Message({
		utterance : '', 
		confidence : 90
		}); 
//===========================================================================		
	var chatResponse = new ROSLIB.Topic({
		ros : ros, 
		name : '/eva/chatbot_responses',
		messageType : 'std_msgs/String'
	}); 
	
	var listenMessage = new ROSLIB.Message({
		response : ''
	}); 
	ros = new ROSLIB.Ros ({ 
	  url : 'wss://localhost:9094'
	  }); 
	  
	  ros.on('connection', function() {
	  console.log('Connected to ROS'); 
	  rosok=true; 
	  }); 
	  
		ros.on('error', function(error) {
		console.log('Error connecting to websocket server: ', error);
		rosok=false; 
		});

		ros.on('close', function() {
		console.log('Connection to websocket server closed.');
		rosok=true; 
		});
			chatResponse.subscribe(function(p) {
	console.log(p.data); 
	chatPublish(p.data);          
            });
	}

		
	HangoutDemo.prototype.onApiReady = function (event) {	
		if (event.isApiReady === true) {
			console.log("Start the Projects"); 
			startROS(); 
			console.log("API Ready");	
			gapi.hangout.onParticipantsChanged.add(
				this.onParticipantsChanged.bind(this)); 

        		this.displayParticipants();
	
		}	
		};  


  HangoutDemo.prototype.onParticipantsChanged = function (event) {	


    };
  
  HangoutDemo.prototype.displayParticipants = function () {	

    };  
    
    


  var hangoutDemo= new HangoutDemo(); 

	//Call back fucntion for the audio tracker. 

	

