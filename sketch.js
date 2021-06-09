

var pigeon,pigeonImg;
var sky,skyImg;
var fire,fireImg,fireGroup;
var feather,featherImg,featherGroup;
var restart,restartImg;
var gameOver,gameOverImg;

var gameState = "play"
var score = 0;
var feathersCollected = 0;


function preload(){
pigeonImg = loadImage("pictures/pigeon.jpg")
skyImg = loadImage("pictures/sky.jpg")
fireImg = loadImage("pictures/fire.png")
featherImg = loadImage("pictures/feather.jpg")
gameOverImg = loadImage("pictures/gameOver.jpg")
restartImg = loadImage("pictures/restart.jpg")

}

function setup() {
createCanvas(windowWidth,windowHeight)

sky = createSprite(700,200,width,height)
sky.addImage(skyImg)
sky.scale = 1
 
 pigeon = createSprite(width/2,height-120,50,50)
 pigeon.addImage(pigeonImg)
 pigeon.scale = 0.2

 restart = createSprite(width/2-50,height/2+150,50,50)
 gameOver = createSprite(width/2-50,height/2-80,50,50)
 
 
 fireGroup = new Group()
 featherGroup = new Group()
 
}

function draw() {
 background("blue")
 textSize(20)
 fill("black")
 
 
 
 if(gameState == "play"){
  sky.velocityY = 4
  if (sky.y > height){
    sky.y = sky.height/5;
   }
   if(keyDown(UP_ARROW)){
    pigeon.y = pigeon.y-5
    }
    if(keyDown(DOWN_ARROW)){
      pigeon.y = pigeon.y+5
    }
    if(keyDown(LEFT_ARROW)){
      pigeon.x = pigeon.x-5
    }
    if(keyDown(RIGHT_ARROW)){
      pigeon.x = pigeon.x+5
    }
    if(pigeon.isTouching(featherGroup)){
      feathersCollected = feathersCollected+1
      feather.destroy()

    }
    if(pigeon.isTouching(fireGroup)){
       gameState = "end"
    }
    gameOver.visible = false
    restart.visible = false
    

    
    spawnFeathers()
    spawnFire()
 }
 
 if(gameState == "end"){
      featherGroup.setVelocityYEach(0)
      fireGroup.setVelocityYEach(0)
      featherGroup.destroyEach()
      fireGroup.destroyEach()
      sky.velocityY = 0
      pigeon.visible = false
      sky.visible = false
  
  gameOver.visible = true
  restart.visible = true
  
  gameOver.addImage(gameOverImg)
  restart.addImage(restartImg)
  restart.scale = 0.6

  if(mousePressedOver(restart)){
     reset()
  }
 }
 
 drawSprites()
 text("Feathers Collected: "+feathersCollected,1160,40)
}

   
function spawnFire(){
  if(frameCount % 50  == 0){
    fire = createSprite(random(50,width-50),0,50,50)
    fire.addImage(fireImg)
    fire.scale = 0.2
    fire.velocityY = 10
    fire.lifetime = 60
    fireGroup.add(fire)
    featherGroup.depth = 1
    fireGroup.depth = 2
    pigeon.depth = 3
    
  }
}
function spawnFeathers(){
  if(frameCount % 80 == 0){
    feather = createSprite(random(50,width-50),0,50,50)
    feather.addImage(featherImg)
    feather.scale = 1
    feather.velocityY = 10
    feather.lifetime = 70
    featherGroup.add(feather)
    
  }
    
}

function reset(){
  gameState = "play"
  pigeon.visible = true
      sky.visible = true
      feathersCollected = 0
}