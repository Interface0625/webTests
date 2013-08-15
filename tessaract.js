/*
A front end for tesseract. 


*/
function SanityCheck(){
	console.log("log works!");
	var head = document.getElementsByTagName("head")[0];
	console.log("Script '"+head.getElementsByTagName("script")[0].getAttribute("src") +"' is loaded!");
	//window.alert("Done Checking!");
}
var ctx = null;
var img = null;
function main(){
 	SanityCheck();
	tests();
	setup();
	setInterval(update,1000/30);
	setInterval(draw,1000/30);
	
	//ctx.drawImage(img, 0,0);
	
}
function tests(){
	
	var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.id = 'gameContent';
    var canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
	canvas.width = 1200;// YOUR CODE HERE
	canvas.height = 720;// YOUR CODE HERE
    div.appendChild(canvas);
    body.appendChild(div);
	ctx=canvas.getContext('2d');
	ctx.fillStyle='#551815';
	
	
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillRect(0,0,80,100);

	img = new Image();
	img.onload = function(){
		console.log("Image is loaded");
		ctx.drawImage(img, 80,100);
		console.log("Image is displayed at (80,100).");
	}
	img.src = "http://localhost:8080/1376296748.08";
}

function setup(){
	canvas =  document.getElementById("gameCanvas");
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('keydown', onKeyDown);
	canvas.addEventListener('mousedown', onMouseClick);
}
var selectorList = [];
function onMouseClick(event){
	console.log(event.button);
	if (event.button == 1){slecector.selecting = false; return;}
	if (slecector.selecting){
		selectorList.push({x:slecector.startPos.x,
						   y:slecector.startPos.y,
						   h:slecector.size.h, 
						   w:slecector.size.w});
		console.log(selectorList);
	}
	slecector.selecting = !slecector.selecting;
}

currentMousePos = { x : 0, y : 0 };
function onMouseMove(event){
	currentMousePos.x = event.clientX;
	currentMousePos.y = event.clientY;
	//console.log(currentMousePos);
}
function onKeyDown(event){

}

function update(){
	slecector.update(currentMousePos);
}

selectStartPoint = {x:30,y:30}

var slecector = {
	selecting : false,
	startPos : {x:0, y:0},
	size : {w:3, h:3},
	update : function(currentPos){
		if(!this.selecting) {
			this.size = { w:3, h:3}; 
			this.startPos = {x:currentPos.x-11, y:currentPos.y-11};
		}else{
			this.size = { w:currentPos.x-this.startPos.x-9, h:currentPos.y - this.startPos.y-9};
			//console.log(this.size);
		}

	},
	draw : function(ctx, fill){
		// FIX OFFSET CODER BUG!!!
		if(fill === undefined) fill = false;
		if (!fill){
			drawRectOutline(ctx,
					this.startPos.x, 
				     this.startPos.y,
					 this.size.w,
					 this.size.h);
		}else{
			ctx.fillRect(this.startPos.x, 
				     this.startPos.y,
					 this.size.w,
					 this.size.h);
		}
		
	}
}


function drawRectOutline(ctx, x, y, w, h){
	
	// Stroked triangle
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+h);
    ctx.lineTo(x+w,y+h);
    ctx.lineTo(x+w,y);
    //ctx.lineTo(x,y);
    ctx.closePath();
    ctx.stroke();
}

function draw(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	imgScale = 0.33
	ctx.drawImage(img, 0,0,img.width,img.height,0,0,img.width*imgScale,img.height*imgScale);

	slecector.draw(ctx);
	
	for (var i = 0; i < selectorList.length; i++){
		//console.log( selectorList[i] );
		drawRectOutline(ctx,selectorList[i].x, selectorList[i].y, selectorList[i].w, selectorList[i].h);
	}
}
// 1. Create Canvas
// 2. Get Image and draw it
// 3. Get read rect (whole or user defined by a rect by mouse input or by predefined rects)
// 4. submit tess command with rect. (recieved by pyTessServer)
// 5. show output.


