var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
    //to load images,animations and sounds
    pathImg = loadImage("images/Road.png");
    mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
    mainRacerImg2= loadAnimation("images/mainPlayer3.png");

    oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
    oppPink2Img = loadAnimation("images/opponent3.png");

    oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
    oppYellow2Img = loadAnimation("images/opponent6.png");

    oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
    oppRed2Img = loadAnimation("images/opponent9.png");

    cycleBell = loadSound("sound/bell.mp3");
    gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
    //to create canvas
    createCanvas(1200,300);
  
    // Moving background
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX = -5;

    //creating boy running
    mainCyclist  = createSprite(70,150);
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    mainCyclist.scale=0.07;
    
    //setting collider for the main Cyclist
    mainCyclist.setCollider("rectangle",0,0,1000,1000);  

    //creating game over sprite
    gameOver = createSprite(650,150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;  

    //creating other cyclers in groups
    pinkCG = new Group();
    yellowCG = new Group();
    redCG = new Group();
}

function draw() {
    //refreshes the screen
    background(0);

    //to display the sprites
    drawSprites();
  
    //to display distance
    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);

    //to create play state 
    if(gameState===PLAY){
       //to increment the distance
       distance = distance + Math.round(getFrameRate()/50);

       //to give game adaptivity by increasing path velocity
       path.velocityX = -(6 + 2*distance/150);

       //to move main cyclist with mouse vertically  
       mainCyclist.y = World.mouseY;

       //to create edge sprites and to make the main cyclist collide with it
       edges= createEdgeSprites();
       mainCyclist .collide(edges);

      //to reset the background
      if(path.x < 0 ){
          path.x = width/2;
      }

      //to play cycle bell sound
      if(keyDown("space")) {
          cycleBell.play();
      }

      //creating continous opponent players randomly
      var select_oppPlayer = Math.round(random(1,3));
      if (World.frameCount % 150 == 0) {
          if (select_oppPlayer == 1) {
              pinkCyclists();
          } else if (select_oppPlayer == 2) {
              yellowCyclists();
          } else {
              redCyclists();
          }
      }

       //to end game if any cyclers touch main cyclist
       if(pinkCG.isTouching(mainCyclist)){
            gameState = END;
            player1.velocityY = 0;
            player1.addAnimation("opponentPlayer1",oppPink2Img);
        }

        if(yellowCG.isTouching(mainCyclist)){
            gameState = END;
            player2.velocityY = 0;
            player2.addAnimation("opponentPlayer2",oppYellow2Img);
        }

        if(redCG.isTouching(mainCyclist)){
            gameState = END;
            player3.velocityY = 0;
            player3.addAnimation("opponentPlayer3",oppRed2Img);
        }

  //to create end state
  }else if (gameState === END) {
        //to display game over and text to restart
        gameOver.visible = true;
        text("Press UP Arrow to Restart the game",490,200);

        //to set path and maincyclist velocity and to change animation of main cyclist
        path.velocityX = 0;
        mainCyclist.velocityY = 0;
        mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
        
        //to set all the cycler groups velocity and lifetime
        pinkCG.setVelocityXEach(0);
        pinkCG.setLifetimeEach(-1);

        yellowCG.setVelocityXEach(0);
        yellowCG.setLifetimeEach(-1);

        redCG.setVelocityXEach(0);
        redCG.setLifetimeEach(-1);
        
        //to restart if up arrow is pressed
        if(keyDown(UP_ARROW)){
            gameState = PLAY;
            reset();
        }
    }
}

//to create pink cyclists
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

//to create yellow cyclists
function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

//to create red cyclists
function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//to create reset function
function reset(){
        //to reset to play state
        gameState = PLAY;
        gameOver.visible = false;
        mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
        distance = 0;

        //to destroy each cycler groups
        pinkCG.destroyEach();
        yellowCG.destroyEach();
        redCG.destroyEach();
}