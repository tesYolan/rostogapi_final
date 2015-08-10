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
	var app= angular.module('ngAppStrictDemo', [])
	app.controller('NgChatCtrl', function($scope) {
            var side = 'left';

            // Messages, client info & sending
            $scope.messages = [];
            $scope.sendMessage = function () {
				
                //server.sendNgChatMessage($scope.messageText);
                message.utterance  = $scope.messageText; 
                //this.chatTopic.publish(message); 
                console.log(message.utterance); 
                chatPublish(message.utterance); 
                
                $scope.messageText = "";
            };
            // Occurs when we receive chat messages
            //server.on('ngChatMessagesInform', function (p) {
	//		chatResponse.subscribe(function(p) {
		//	console.log(p.data); 
			//chatPublish(p.data);          
            //});
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

    
	});

