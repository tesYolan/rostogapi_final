	var app= angular.module('ngAppStrictDemo', [])
	app.controller('NgChatCtrl', function($scope) {
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

