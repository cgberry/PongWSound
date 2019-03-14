let circleX =200, circleY = 200, circleW = 10, circleH = 10;
let moveCircleX = 2, moveCircleY = 3;
let circle;

let p1X = 10, p1Y = 100, p1W = 10, p1H= 50;
let moveP1Y = 0;
let p1;
let p1Score = 0;
let p1ScoreText;

let p2X = 380, p2Y = 100, p2W = 10, p2H= 50;
let moveP2Y = 0;
let p2;
let p2Score = 0;
let p2ScoreText;

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001;
var decayTime = 0.02;
var susPercent = 0.2;
var releaseTime = 0.2;

var majorScale = [0, 2, 4, 5, 7, 9, 11, 12]; // major scale in half steps
var fundamental = 110; //A2 in Hz

let env, sqOsc;





function setup() {
  createCanvas(400, 400);
  
  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  sqOsc = new p5.Oscillator('square');
  sqOsc.amp(env);
  sqOsc.start();
  sqOsc.freq(220);
 
}

function draw() {
  background(220);
  circle = ellipse(circleX, circleY, circleW, circleH); 
  p1 = rect(p1X, p1Y, p1W, p1H);
  p2 = rect(p2X, p2Y, p2W, p2H);
  p1ScoreText = text('p1 Score = ' + p1Score, 10, 10);
  p2ScoreText = text('p2 Score = ' + p2Score, 320, 10);
  
  circleX += moveCircleX;
  circleY -= moveCircleY;
  
  p1Y += moveP1Y;
  p2Y += moveP2Y;
  
  scoreUp();
  bounce();
  
  p1Move();
  p2Move();
}

//Gives random major scale frequency within the span of 4 octaves
function getRandomFreq(){
  return fundamental * Math.pow(Math.pow(2, 0.083333), 
        majorScale[Math.floor(Math.random() * majorScale.length)] + (Math.floor(Math.random()*4) * 12)) 
}

//bounce functionality of ball
function bounce(){
  if (circleX>400 || circleX<0){
  	circleX = 200
  	circleY = 200
    env.play();
    sqOsc.freq(400);
  }
 
  if (circleY>400 || circleY<0){
  	moveCircleY *= -1
    env.play();
    sqOsc.freq(440);
  }
 
  if (circleY>p1Y && circleY<(p1Y+p1H) && circleX<(p1X+p1W)){
    moveCircleX *= -1
    env.play();
    sqOsc.freq(getRandomFreq());
  }
  
   if (circleY>p2Y && circleY<(p2Y+p2H) && circleX>(p2X)){
    moveCircleX *= -1
    env.play();
    sqOsc.freq(getRandomFreq());
  }
  
}


//Key controls in words and ASCII
function p1Move(){
  if(keyIsDown(87)){
    moveP1Y = -10;
  }else if (keyIsDown(83)){
    moveP1Y = 10;
  }else{
   moveP1Y = 0; 
  }
}

function p2Move(){
  if(keyIsDown(UP_ARROW)){
    moveP2Y = -10;
  }else if (keyIsDown(DOWN_ARROW)){
    moveP2Y = 10;
  }else{
   moveP2Y = 0; 
  }
}


//Score function
function scoreUp(){
   if (circleX>400){
		p1Score +=1
  }
  if(circleX<0){
    p2Score +=1
  }
}
