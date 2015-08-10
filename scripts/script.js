	var app= angular.module('ngAppStrictDemo', [])
	app.controller('NgChatCtrl', function($scope) {
		   var ros; 
	var rosok=false;  
	var participants_list;    
//===========================================================================


//===========================================================================		

	
	var listenMessage = new ROSLIB.Message({
		response : ''
	});    
            var side = 'left';
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

            // Messages, client info & sending
            $scope.messages = [];
            $scope.sendMessage = function () {
			var message = new ROSLIB.Message({
			utterance : '', 
			confidence : 99
			}); 
			var chatTopic = new ROSLIB.Topic({
			ros : ros, 
			name : '/eva/chatbot_speech',
			messageType : 'chatbot/ChatMessage'
			}); 
                //server.sendNgChatMessage($scope.messageText);
            message.utterance  = $scope.messageText; 
            chatTopic.publish(message); 
            console.log(message.utterance); 
            chatPublish(message.utterance); 
			$scope.messageText = "";
            };
            // Occurs when we receive chat messages
            //server.on('ngChatMessagesInform', function (p) {
        var chatResponse = new ROSLIB.Topic({
		ros : ros, 
		name : '/eva/chatbot_responses',
		messageType : 'std_msgs/String'
	}); 
			chatResponse.subscribe(function(p) {
			console.log(p.data); 
			chatPublish(p.data); 
			$scope.messageText="";          
            });
            function chatPublish(p) {
				
			$scope.messages.push({
                    //avatar: "data:image/png;base64," + p.avatar.toBase64(),
                    text: p,
                    side: side
				}); 
            	$scope.$apply();	

                // Animate
                $("#viewport-content").animate({
                    bottom: $("#viewport-content").height() - $("#viewport").height()
                }, 250);

                // flip the side
                side = side == 'left' ? 'right' : 'left';
			}
			
			//Now here we take out pulisher to handle when the user passes data to ROS and when the User pulishes the message. 
            // Once connected, we need to join the chat

    
	});

