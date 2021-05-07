let sounds  = {
    green : new Audio('./audio/sound1.mp3'),
    red : new Audio('./audio/sound2.mp3'),
    yellow : new Audio('./audio/sound3.mp3'),
    blue : new Audio('./audio/sound4.mp3'),
}

let soundsArr  = ['green', 'red', 'yellow', 'blue'];
let intervalTime = [1000,800,600]
let level=1,score=0,sequence=[];
let signalInterval = null;
const MAX_LEVEL = 4;

let handleStart = () => {
    for(let i=0;i<MAX_LEVEL+1;i++){
        let index = Math.floor(Math.random()*4);
        sequence.push(soundsArr[index]);
    }
    console.log(sequence);
    // level +=1;
    console.log(level,intervalTime[Math.floor((level-1)/4)]);
    signalInterval = setInterval(play,intervalTime[Math.floor((level-1)/4)]);
}

let signalNumber = 0;

let play = () => {
    let sound = sounds[sequence[signalNumber]];
    console.log(sequence[signalNumber]);
    sound.play();
    signalNumber++;
    if(signalNumber>=level+1){
        clearInterval(signalInterval);
        signalNumber = 0;

        // if(level<=MAX_LEVEL){
        //     signalInterval = setInterval(play,800);
        // }  
    }
    
}


let buttonHandle = (e) => {
    console.log(e.target.id);
    if(sequence[signalNumber]===e.target.id){
        console.log('correct');
    }
    else{
        console.log('incorrect');
    }
    let curr = sounds[sequence[signalNumber]]
    curr.play()
    signalNumber+=1
    if(signalNumber>=level+1){
        level += 1;
        clearInterval(signalInterval);
        if(level<=MAX_LEVEL){
            signalNumber=0;
            console.log(intervalTime[Math.floor((level-1)/4)])
            signalInterval = setInterval(play,intervalTime[Math.floor((level-1)/4)]);
        }
    }
}
// setTimeout(()=>sounds.green.play(),0);
// setTimeout(()=>{
//     sounds.green.pause();
//     sounds.red.play();
//     console.log('a')
//     },600);
// setTimeout(()=>{
//     sounds.red.pause();
//     sounds.yellow.play();
//     },00);
// setTimeout(()=>{
//     sounds.yellow.pause();
//     sounds.blue.play();
//     },1800);

let startButton = document.getElementById('start');
startButton.addEventListener('click',handleStart);

let greenButton = document.getElementById('green');
let redButton = document.getElementById('red');
let yellowButton= document.getElementById('yellow');
let blueButton = document.getElementById('blue');
greenButton.addEventListener('click',buttonHandle);
redButton.addEventListener('click',buttonHandle);
yellowButton.addEventListener('click',buttonHandle);
blueButton.addEventListener('click',buttonHandle);
