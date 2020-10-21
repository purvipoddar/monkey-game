var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background1,backgroundImage;
var ground;
var survivalTime = 0;

// var for game states
var PLAY;
var END;
var gameState;

var audio,audio_play;

function preload(){
    
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
   backgroundImage = loadImage("background1.png");
   audio_play =loadSound("sos-morse-code_daniel-simion.mp3")
}


function setup(){
createCanvas(600,400);
//   creating background
   background1 = createSprite(400,60,5,5);
   background1.addImage("image",backgroundImage)
   background1.scale = 4;
   background1.velocityX = -4;
   background1.x = background1.width/2;
  
//   creating monkey
   monkey = createSprite(80,315,20,20);
   monkey.addAnimation("running",monkey_running);
   monkey.scale =0.1
  
//   creating ground
   ground = createSprite(600,350,2000,10);
   ground.velocityX = -4;
   ground.x = ground.width/2;

//   create Obstacle and Cloud Groups
   obstacleGroup = createGroup();
   FoodGroup = createGroup();
   score = 0;
}

function draw() {
background(220); 
if(gameState === PLAY){
if (ground.x < 0){
    ground.x = ground.width/2;
}
if (background1.x < 0){
    background1.x = background1.width/2;
}
  
if(keyDown("space") && monkey.y >= 100) {
   monkey.velocityY = -12;
}
//    add gravity
   monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
if(monkey.isTouching(obstacleGroup)){
    gameState = END;
    // audio_play.play();
}
  food();
  obstacles();
}
else if(gameState === END ){
   ground.velocityX = 0;
   monkey.velocityY = 0
//   setting lifetime
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
//   setting velocity to 0     
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);    
}
   drawSprites();
//    writing code for score  
   stroke("black");
   textSize(20);
   fill("black");
   text("Score:"+score,300,50)
//    writing code for survival time   
   stroke("black");
   textSize(20);
   fill("black");
   survivalTime = Math.ceil(frameCount/frameRate());
   text("survival Time:"+survivalTime,100,50);
}
function food(){
  if (frameCount % 100 === 0){
   var banana = createSprite(600,165,10,40);
   banana.y = Math.round(random(180,230));
   banana.addImage("image",bananaImage)
   banana.velocityX = -5
   banana.scale = 0.08 
   banana.lifeTime = 120
   
}
}
function obstacles(){
  if (frameCount % 80 === 0){
   var obstacle = createSprite(400,320,10,40);
   obstacle.addImage("Image",obstacleImage)
   obstacle.velocityX = -5;
   obstacle.scale = 0.2;
   obstacle.lifeTime = 120;
   obstacleGroup.add(obstacle);
  }
}