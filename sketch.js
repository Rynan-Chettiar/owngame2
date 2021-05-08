var PLAY= 1;
var END= 0;
var score= 0;
var coin, coinimg, coinGroup
var hunter, hunter_running
var runner, runner_running
var ground, invisibleGround, groundImage;
var bg;
var backgroundImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstaclesGroup;
var gameState= PLAY;
var runnerstopimg, hunterstopimg;
var restart, restartimg;
var gameover, gameoverimg;

function preload(){

  
  backgroundImg = loadImage("bg2.png")
  
  hunter_running = loadAnimation("H1.png", "H2.png", "H3.png", "H4.png", "H5.png", "H6.png", "H7.png", "H8.png");
  runner_running = loadAnimation("R1.png", "R2.png", "R3.png", "R4.png", "R5.png", "R6.png")

  obstacle1= loadImage("ob1.png")
  obstacle2= loadImage("ob2.png")
  obstacle3= loadImage("ob3.png")
  obstacle4= loadImage("ob4.png")

  runnerstopimg=loadAnimation("Rfall.png")
  hunterstopimg=loadAnimation("H3.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2, windowWidth*4, windowHeight)
  bg.addImage(backgroundImg)
  
  bg.velocityX=-3;
  bg.scale= 2;
  
  hunter = createSprite(50,height-70,20,50);
   hunter.addAnimation("running", hunter_running);

   hunter.addAnimation("stop", hunterstopimg)

   runner = createSprite(600,height-50,20,50);
   runner.debug=false;
   runner.setCollider("rectangle", -280,-130, 40, 60);
   runner.addAnimation("running", runner_running);

   runner.addAnimation("stop", runnerstopimg)
 
  invisibleGround = createSprite(width/2,height-10,width,25);  
  
  hunter.setCollider("circle", -10,0, 30);
  //invisibleGround.shapeColor = "#f4cbaa";
  
  invisibleGround.visible =true;
  
  obstaclesGroup=new Group();

  restart=createSprite(width/2, height/2)

  coinGroup=new Group();

  
}

function draw() {
  
  background(0);

 // console.log(bg.x);

 if(gameState===PLAY)
 {

  restart.visible=false;

  if(bg.x<30)
  {
    bg.x= width/2;
  }

 if((keyDown("SPACE") || touches.length>0) && runner.y>=height-120)
 {
  runner.velocityY=-12;
  touches=[];
 }

 runner.velocityY=runner.velocityY+1;
 runner.collide(invisibleGround);
 hunter.collide(invisibleGround);
 
  SpawnObstacles();
  SpawnCoin();

  if(coinGroup.isTouching(runner))
  {
    score=score+100;
  }

  if(obstaclesGroup.isTouching(runner))
  {
    gameState= END;
  }
 }
    
else if(gameState===END)
{

restart.visible= true;

  bg.velocityX=0;
  runner.changeAnimation("stop", runnerstopimg)
  hunter.changeAnimation("stop", hunterstopimg)

  runner.collide(invisibleGround)

  obstaclesGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)

  coinGroup.setVelocityXEach(0)
  coinGroup.setLifetimeEach(-1)

if(touches.length>0 || keyDown("SPACE"))
{
  reset();
  touches=[]
}

}
  drawSprites();

  textSize(30)
  fill("white")
  text("score: "+ score, width/2, 100)
}

function reset()
{
  score=0;
  bg.velocityX=-3;
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  runner.changeAnimation("running", runner_running )
  hunter.changeAnimation("running", hunter_running)
}


function SpawnObstacles(){
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(width,height-95,20,30);

    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale=0.7;
              obstacle.y=height-95;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale=0.8;
              obstacle.y=height-80;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale=0.9;
              obstacle.y=height-75;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale=0.9;
              obstacle.y=height-60;
              break;
      default: break;
    }        
   
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);

  }
};

function SpawnCoin(){
  if(frameCount % 250 === 0) {
    var coin = createSprite(width,height-95,20,30);

   coin.velocityX = -6;
   
    coin.lifetime = 300;
  
    coinGroup.add(coin);

  }
};