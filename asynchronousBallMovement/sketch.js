var ball;

var database, position; 

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ballPos = database.ref('ball/position');
    ballPos.on('value',readPos,dispError)
}

function draw(){
    background("white");
    if(position){
    if(keyDown(LEFT_ARROW)){
        writePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePos(0,+1);
    }

    drawSprites();
}
}

function readPos(data){
    position = data.val();
    
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
  }

function writePos(x,y){
    database.ref('ball/position').set({x:ball.x+x,y:ball.y+y})
}


  
  function dispError(){
    console.log("Error in writing to the database");
  }
