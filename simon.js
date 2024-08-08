let gameseq=[];
let userseq=[];
let btns = ["yellow","cimon","skyblue","purple"];

let h3 = document.querySelector("h3");
let started =false;
let level = 0;
let maxscore =0;

let sound = new Audio("click.mp3");
let win = new Audio("wingame.wav");

document.addEventListener("keypress",function(){
   if(started == false){
    console.log("Game start");
    started = true;
   }
   levelUp();

});
function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}
function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let ranidx = Math.floor(Math.random() * 4);
    let rancolor = btns[ranidx];
    let ranbtn = document.querySelector(`.${rancolor}`);
    gameseq.push(rancolor);
    btnFlash(ranbtn);

}
function checkans(idx)
{
    
    if(userseq[idx] === gameseq[idx])
    {
        if(userseq.length == gameseq.length)
        {
                setTimeout(levelUp,1000);
        }
    }
    else{
        if(maxscore < level)
        {
                maxscore = level
        }
        win.play();
        h3.innerHTML =`<b stule="color:red;">Game over!<b>,your score was <b>${level}</b><br> Press any key to start<br> your highest score is ${maxscore}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
    
}
function btnPress()
{
    sound.play();
    let btn = this;
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    userFlash(btn);
    checkans(userseq.length-1);
}
let btnAll = document.querySelectorAll(".btn");
for(btn of btnAll)
{
        btn.addEventListener("click",btnPress);
}
function reset()
{
    userseq=[];
    started = false;
    gameseq=[];
    level = 0;
}