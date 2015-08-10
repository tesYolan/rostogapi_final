        
        
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
  
  
 
	function HangoutDemo() {
        console.log("starting ..."); 		
        gapi.hangout.onApiReady.add(this.onApiReady.bind(this)); 
        }  

	function NgChatCtrl($scope) {
            // Our server to connect to
			
            //var listenMessage = new ROSLIB.Message({
            //response : ''
            //}); 

			//chatResponse.subscribe(function(message) {
			//listenMessage.response = message.data; 

			//console.log(message.data); 
			//}); 
			
			
			var side = 'left';

            // Messages, client info & sending
            $scope.messages = [];
            $scope.sendMessage = function () {
				console.log("Does get here at least?"); 
                //server.sendNgChatMessage($scope.messageText);
                message.utterance  = $scope.messageText; 
                chatTopic.publish(message); 
                console.log(message.utterance); 
                chatPublish(message.utterance); 
                
                $scope.messageText = "";
            };
            // Occurs when we receive chat messages
            //server.on('ngChatMessagesInform', function (p) {
			chatResponse.subscribe(function(p) {
				console.log(p.data); 
				chatPublish(p.data); 
              
            });
            function chatPublish(p) {
				
			$scope.messages.push({
                    //avatar: "data:image/png;base64," + p.avatar.toBase64(),
                    text: p,
                    side: side
				}); 
            		

                // Animate
                $("#viewport-content").animate({
                    bottom: $("#viewport-content").height() - $("#viewport").height()
                }, 250);

                // flip the side
                side = side == 'left' ? 'right' : 'left';
			}
			
			//Now here we take out pulisher to handle when the user passes data to ROS and when the User pulishes the message. 
            // Once connected, we need to join the chat

    
	}
	function startROS() {
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

	

