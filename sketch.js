var dog,sadDog,happyDog, database;
var foodS=22,
foodStock=22;
var addFood;
var foodObj;
var feedTest

//create feed and lastFed variable here
var feed, lastFed;
var feedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed= createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(feedTime)

  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  lastFed=database.ref('FeedTime')
  lastFed.on('value', hour);
 
  //write code to display text lastFed time here
console.log(feedTime)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foodS-=1);
  lastFed=database.ref('FeedTime')
  lastFed.on('value', hour);
  console.log(feedTime)
  //console.log(lastFed);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function hour(data){
  feedTime = data.val();
 
  foodobject.updateFoodStock(feedTime)

}

//in the database it says "8"