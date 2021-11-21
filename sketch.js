var ground
var ckeckpointsound
var diesound
var jumpsound
var score
var clouds
var gamestate="Alive"
var cloudimage
var cloudgroup
var cactusgroup
var cactus, o1, o2, o3, o4, o5, o6
var fakeground
var groundimage
var gameover,gameoverimage,restart,restartimage
var trexdead
var trex ,trex_running;
function preload(){
  trex_running=loadAnimation("trex3.png","trex4.png")
groundimage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
o1=loadImage("obstacle1.png")
o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
o6=loadImage("obstacle6.png")
trexdead=loadAnimation("trex_collided.png")
gameoverimage=loadImage("gameOver.png")
restartimage=loadImage("restart.png")
checkpointsound=loadSound("checkpoint.mp3")
diesound=loadSound("die.mp3")
jumpsound=loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(50,180,20,50)
 trex.addAnimation("run",trex_running)
 trex.addAnimation("dead",trexdead)
 trex.scale=0.5
//making the collision radios visible
 //trex.debug=true
 //changing the shape and size of the collision radios of the trex
 trex.setCollider("circle",0,0,50)
score=0

 //creating the ground
ground=createSprite(200,180,400,5)
ground.addImage(groundimage)
//creating the restart and gameover icons
gameover=createSprite(300,100)
gameover.addImage(gameoverimage)
restart=createSprite(300,140)
restart.addImage(restartimage)
gameover.scale=0.7
restart.scale=0.5
//making the fake ground
fakeground=createSprite(200,187,400,5)
fakeground.visible=false
//Testing the random function
var r32=Math.round(random(3,8))
//creating the cloud and cacrus groups
cloudgroup=createGroup()
cactusgroup=new Group()
}

function draw(){
  background("steelblue")
  //displaying the score
  fill ("black")
  text("Score "+score,400,50)
  if(gamestate=="Alive"){
//making the gameover and restart icons invisible
gameover.visible=false
restart.visible=false
//moving the ground
ground.velocityX=-2
//increasing the score
score=score+Math.round(getFrameRate()/60)
//making trex jump only if his legs are touching the ground and the space bar is pressed
if(keyDown("space") && trex.collide(ground) ){
  trex.velocityY=-25
  jumpsound.play()
}
//playing the checkpoint sound at the interval of 200 points
if(score>0 && score%200==0){
  checkpointsound.play()
}
//making the ground infinite by scrolling it
if(ground.x<0){
  ground.x=200
}
//Adding gravity to trex
trex.velocityY=trex.velocityY+2
//spawning the clouds
clouds()
cacti()
//checking whether trex is colliding with any of the cactus or not and then making it die
if (trex.isTouching(cactusgroup)){
  gamestate="dead"
  diesound.play()
}

  }
  else if (gamestate=="dead"){
    //making the restart and gameover icons visible
    gameover.visible=true
    restart.visible=true
    //fixing the flying bug for the trex
    trex.velocityY=0
  
//stopping the ground
ground.velocityX=0-score*5/100
//frezzing all the clouds and cactuses as soon as trex dies
cloudgroup.setVelocityXEach(0)
cactusgroup.setVelocityXEach(0)
//stopping the clouds and cactus's from disappering
cloudgroup.setLifetimeEach(-1)
cactusgroup.setLifetimeEach(-1)
//changing the animation of trex to dead
trex.changeAnimation("dead")
//activating the restart icon
if (mousePressedOver(restart)){
  reset()
}
  }

//Making a function for reseting the game.
function reset(){
gamestate="Alive"
// destroying the frozen cactus' and clouds from the screen
cloudgroup.destroyEach()
cactusgroup.destroyEach()
//reseting the animation of the trex back to normal
trex.changeAnimation("run")
//reseting the score back to 0
score=0
}

  

  //making trex stand on the ground
  trex.collide(fakeground)
drawSprites()
}
function clouds(){
  if (frameCount%50==0){
    cloud=createSprite(600,100,40,10)
    cloud.scale=0.7
    cloud.addImage(cloudimage)
    cloud.lifetime=130
  cloud.velocityX=-5-score*5/100
  //randomizing the y position of the cloud
  cloud.y=Math.round(random(10,100))
  //fixing the overshadowing problem between the trex and the clouds
  trex.depth=cloud.depth+1
  //adding each cloud to its group
  cloudgroup.add(cloud)
  }
}
function cacti(){
  if( frameCount%50==0){
    cactus=createSprite(600,158,10,40)
    cactus.scale=0.5
    cactus.lifetime=80
  cactus.velocityX=-8-score*5/100
  //adding each cactus to its group
  cactusgroup.add(cactus)
  var g35=Math.round(random(1,6))
  switch(g35){
    case 1:cactus.addImage(o1)
    break;
    case 2:cactus.addImage(o2)
    break;
    case 3:cactus.addImage(o3)
    break;
    case 4:cactus.addImage(o4)
    break;
    case 5:cactus.addImage(o5)
    break;
    case 6:cactus.addImage(o6)
    break;
    default:break
  }
  }
}