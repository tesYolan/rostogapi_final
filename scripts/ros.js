 

	function HangoutDemo() {
        console.log("starting ..."); 		
        gapi.hangout.onApiReady.add(this.onApiReady.bind(this)); 
        }  




		
	HangoutDemo.prototype.onApiReady = function (event) {	
		if (event.isApiReady === true) {
			console.log("Start the Projects"); 
			//startROS(); 
			console.log("API Ready");	
			gapi.hangout.onParticipantsChanged.add(
				this.onParticipantsChanged.bind(this)); 

        		this.displayParticipants();
				this.updateUI(); 
		}	
		};  
		
	HangoutDemo.prototype.updateUI = function (event) {	
	gapi.hangout.data.onStateChanged(function (event) {
				updateUI(); 
			})
	};
  HangoutDemo.prototype.onParticipantsChanged = function (event) {	


    };
  
  HangoutDemo.prototype.displayParticipants = function () {	

    };  
    
    


  var hangoutDemo= new HangoutDemo(); 

	//Call back fucntion for the audio tracker. 

	

