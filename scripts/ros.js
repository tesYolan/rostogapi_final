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
			console.log("API Ready");	
			gapi.hangout.onParticipantsChanged.add(
				this.onParticipantsChanged.bind(this)); 
				//removed the text id. 
				document.getElementById('input').onkeypress= this.pressedEnter.bind(this); 
		//document.getElementById("sendMessage").onclick = 	// callback for button-click
          //this.buttonClick.bind(this);
        		this.displayParticipants(); 	
		}	
		};  
	HangoutDemo.prototype.pressedEnter= function (e) {
				var keycode = e.keyCode; 
					if(keycode==13) {
						var tag= document.createElement('div'); 
						tag.className="numberCircle"; 
						
						var newDiv= document.createElement('div'); 
						newDiv.className="chatparticipant"; 
						var div2= document.getElementById("chat"); 
						var participant= gapi.hangout.getLocalParticipant().person.displayName;
						var space=participant.trim().indexOf(" "); 
						if(space==-1)
						{
							tag.innerHTML=participant.charAt(0); 
						}
						else 
						{
							//Currently Represents Names as a form of Two latters only
							tag.innerHTML= participant.charAt(0) + participant.charAt(space+1); 
							
						}
						div2.appendChild(tag); 
						div2.appendChild(newDiv); 
						//Now this is where the condition
						newDiv.innerHTML= document.getElementById("input").innerHTML;
						message.utterance = document.getElementById("input"). 
						chatTopic.pulish(message); 
						
						
						document.getElementById("input").innerHTML=""; 
						
						//Also this is where the message would necessaryly be sent. 
						//Asso where the processing of the partificipants name be filtered. 
					}
	}
	//HangoutDemo.prototype.buttonClick = function () {
	
		
     //var newDiv= document.createElement('div'); 
     //newDiv.className="chatparticipant"; 
     //var div2= document.getElementById("chat"); 
     //div2.appendChild(newDiv); 
     
     //newDiv.innerHTML= document.getElementById("input").innerHTML;
     //document.getElementById("input").innerHTML="Enter the next Question for Eva"; 
      
      ////var value = gapi.hangout.data.getValue("count") || "0";	// read current count from state
      ////value = (parseInt(value, 10) + 1).toString();	// increment count by one
     //// gapi.hangout.data.setValue("count", value);	// write new count into state

    //};
  HangoutDemo.prototype.onParticipantsChanged = function (event) {	

      var div = document.getElementById("container");	

      div.innerHTML = "";	// make sure our container is empty before displaying the list

      this.displayParticipants();	

    };
  
  HangoutDemo.prototype.displayParticipants = function () {	
      var div, participants, ul, li, i, l;	
      div = document.getElementById("available");	
      participants = gapi.hangout.getParticipants();	// Get array of participants from API
      ul = document.createElement("ul");	
      l = participants.length;
	console.log("The length is : "); 
	console.log(l);	
	participants_list=[]; 
	
	if(rosok)
	{
	console.log("ROS Conneciton is verified. "); 
	li = document.createElement("li"); 
	li.innerHTML= "Sophia";
	ul.appendChild(li); 
    div.appendChild(ul);	
	participants_list.push("Sophia");  
	}
      for (i = 0; i < l; i++) {	
        li = document.createElement("li");	
        if (participants[i].person) {	
          li.innerHTML = participants[i].person.displayName;	// Add name to list if available
        } else {	
          li.innerHTML = "unknown";	
        }	
        ul.appendChild(li);	
        participants_list.push(li.innerHTML); 
      }	
      
      div.appendChild(ul);	
    };      
        var hangoutDemo= new HangoutDemo(); 
        var rosok=false;  
		var participants_list;    
//===========================================================================
	var chatTopic = new ROSLIB.Topic({
		ros : ros, 
		name : '/eva/chatbot_speech'
		messageType : 'chatbot/ChatMessage'
	}); 
	var message = new ROSLIB.Message({
		utterance : '', 
		confidence : 1
		}); 
//===========================================================================		
	var chatResponse = new ROSLIB.Topic({
		ros : ros, 
		name : '/eva/chatbot_responses'
		messageType : 'std_msgs/String'
	}); 
	
	var listenMessage = new ROSLIB.Message({
		response : ''
	}); 
	//Call back fucntion for the audio tracker. 
	chatResponse.subscribe(function(message) {
		listenMessage.response = message.data; 
		//Here Pulish the topic to a new div in topic. 
		console.log(listenMessage.response()); 
	}); 
	
	
}(window)); 
