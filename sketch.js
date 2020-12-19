var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

var monkey , monkey_running,monkey_dead;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.08;
  
  invisibleground = createSprite(200,190,1000,10);
  invisibleground.visible = true;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
  score = 0;
  
}

function draw() {
  createCanvas(500,200);
  
  background(180);
  //displaying score
  fill("black");
  text("Survival Time: "+ score, 380,20);
  
  
  if(gameState === PLAY){

    invisibleground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (invisibleground.x < 0){
      invisibleground.x = invisibleground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    spawnbanana();
  
    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     
     textSize(30);
     text("Game Over",170,100); 
     
      invisibleground.velocityX = 0;
      monkey.velocityY = 0
      

    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();    
     monkey.destroy();
   }
  
  monkey.collide(invisibleground);

  drawSprites();
}

function spawnObstacle(){
 if(frameCount%80===0){
    var obstacle = createSprite(500,160,20,30);
    obstacle.velocityX = -(5+score/100);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200);
 }
}

function spawnbanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,200,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("circle",0,0,40);
  }
}






