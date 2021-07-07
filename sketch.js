var tower, towerImg;
var door, doorImg, doorsG;
var climber, climberImg, climberG, invisBlock, invisBlockG;
var ghost, ghostImg;

var spookySound;

var gameState = "play";

function setup(){
  createCanvas(600,600);

  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 4;

  ghost = createSprite(200, 200);
  ghost.addImage("standing", ghostImg)
  ghost.scale = 0.4;

}

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");

  doorsG = new Group();
  climberG = new Group();
  invisBlockG = new Group();
}

function draw(){
  background(0);
  
if(gameState == "play"){

  if(tower.y > 400){
    tower.y = 300;
  }

  if(keyDown("right")){
    ghost.x = ghost.x +3;
  }

  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }

  ghost.velocityY = ghost.velocityY +0.7;
  
  if(ghost.isTouching(climberG)){
    ghost.velocityY = 0;
  }

  if(ghost.isTouching(invisBlockG) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }

  spawnDoors();
  drawSprites();
}
 
if(gameState == "end"){
  textSize(30);
  fill("red");
  text("Game Over!", 230, 250);
}





}

function spawnDoors(){
  if(frameCount % 120 == 0){
    door = createSprite(Math.round(random(120, 400)),50);
    door.addImage("door", doorImg);
    door.velocityY = 4;
    door.lifetime = 800;

    doorsG.add(door);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;

    climber = createSprite(200, 110);
    climber.addImage("climber", climberImg);
    climber.velocityY = 4;
    climberG.add(climber);
    climber.lifetime = 800;
    climber.x = door.x;

    invisBlock = createSprite(200,120);
    invisBlock.velocityY = 4;
    invisBlock.x = climber.x;
    invisBlock.width = climber.width;
    invisBlock.height = 2;
    invisBlock.visible = false;
    invisBlock.lifetime = 800;
    invisBlockG.add(invisBlock);
  }

}

