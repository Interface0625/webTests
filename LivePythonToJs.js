// Live Connection to browser through JavaScript and python

// JavaScript:




function main(){
	console.log("main");
	setInterval(pollForInstructions,5000);
}	
var bpollForInstructions = true;
function pollForInstructions(){
	console.log("pollForInstructions");
	xhreq("cmd", _poll_for_eval);
}
function _poll_for_eval(){
	console.log("_poll_for_eval");
	if (this.responseText != ""){ // CEARFUL HERE! SHOULD VALIDIATE HERE!
			 		 //eval(resp); // This func will execute a string on live 
				    // script. BEWARE OF DIRTY MEMORY!!!
			document.write(this.responseText);
			eval(this.responseText);		
	}
}

function xhreq(cmd, callback){
	
	var oReq = new XMLHttpRequest();
	oReq.onload = _poll_for_eval;
	
	oReq.open("GET", "http://192.168.1.68:8080/"+cmd, true);
	
	oReq.send();
	console.log("xhreq");
}



