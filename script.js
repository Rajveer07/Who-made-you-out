let inputDir = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let score=0;
let lastPaintTime =0;
let snakeArr=[
    {x:13,y:15}
];
food = {x:6,y:7};

let ballName = document.getElementById("ballName");
let students = ["Adarsh Mishra","Alok Dubey","Aryan","Abu tailib","Aditya","Anurag Shukla","Abhay shant","Ayush Yadab","Ayush Badal","dipanshi Maurya","deepanshi Agrawal",

"Sumit sahai","Govind","Saniya Raj","Rajveer","Rakhi Khesari","Preeti singh","Om rani","Jyoti Yadav","Aniket Kotarya","sagar manna","Nikhil singh","Arvind","Ayushi Shukla","Rishab Chaubey","Ashmita","Yuvraj Maurya"];


//game functions
let left = document.getElementById("left");
let right = document.getElementById("right");
let up = document.getElementById("up");
let down = document.getElementById("down");

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){return;}
    lastPaintTime=ctime;
    gameEngine();
}



up.addEventListener("click", () => {
  if (inputDir.y !== 1) {
    inputDir = { x: 0, y: -1 };
    moveSound.play();
  }
});

down.addEventListener("click", () => {
  if (inputDir.y !== -1) {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
  }
});

left.addEventListener("click", () => {
  if (inputDir.x !== 1) {
    inputDir = { x: -1, y: 0 };
    moveSound.play();
  }
});

right.addEventListener("click", () => {
  if (inputDir.x !== -1) {
    inputDir = { x: 1, y: 0 };
    moveSound.play();
  }
});
function isCollide(snake) {
      //if you bump in yourself
      for (let i = 1; i < snake.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;

        }
        
      }
      //if you bump in wall
      if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18 || snake[0].y <=0){
        return true;
      }
      return false;
    
}
function gameEngine(){
    // part 1 updating the snake array and food
        if(isCollide(snakeArr)){
            //gameOverSound.play();
            musicSound.pause();
            inputDir = {x:0,y:0};
            alert("Game Over");
            snakeArr = [{x:13,y:15}];
            //musicSound.play();
            score =0;

        }
        //food increment regeneration
        if(snakeArr[0].y===food.y && snakeArr[0].x === food.x){
            foodSound.play();
            ballName.innerText = students[Math.floor(Math.random()*students.length)];
            score += 1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: "+ score;

            snakeArr.unshift({x: snakeArr[0].x +inputDir.x , y: snakeArr[0].y +inputDir.y});
            let a=2;
            let b=16;
            food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        }
        //moving snake
        for (let i = snakeArr.length-2; i >=0; i--) {
           
            snakeArr[i+1] = {...snakeArr[i]};

            
        }
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;


    // part 2 display the snake and food
    //snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
         snakeElememt = document.createElement('div');
         snakeElememt.style.gridRowStart = e.y;
         snakeElememt.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElememt.classList.add('head');
        }else{
        snakeElememt.classList.add('snake');
    }

        board.appendChild(snakeElememt);  

    })
   //food
    foodElememt = document.createElement('div');
    foodElememt.style.gridRowStart = food.y;
    foodElememt.style.gridColumnStart = food.x;
   foodElememt.classList.add('food');
   board.appendChild(foodElememt);  

}











//main logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;

        break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
        break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
        break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
        break;

        default:break;
    }

});
