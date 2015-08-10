	(function(angular) {
		angular.module('ngAppStrictDemo', [])
	.controller('NgChatCtrl', function($scope) {
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

    
	})
})(window.angular); 
