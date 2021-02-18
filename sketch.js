//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogImg1, dogImg2; 

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png"); 
  dogImg2 = loadImage("images/dogImg1.png"); 

}

function setup() {


  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
 
  
}


function draw() { 
  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  drawSprites();

  //add styles here
  textSize(30);
  fill(255);
  stroke(0);
  strokeWeight(2);
  text("food Remaining: "+ foodS, 140, 150);
  textSize(20);
  text("note: press up arrow to feed dog", 130, 10, 300, 20);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}