let sounds  = {
    green : new Audio('./audio/music1.wav'),
    red : new Audio('./audio/music2.wav'),
    yellow : new Audio('./audio/music3.wav'),
    blue : new Audio('./audio/music4.wav'),
}

let endSound = new Audio('./audio/end.wav');

let soundsArr  = ['green', 'red', 'yellow', 'blue'];
let keyBinding = {
    'a' : 'green',
    's' : 'red',
    'k' : 'yellow',
    'l' : 'blue',
}
let intervalTime = [1000,800,600]
let scoreInterval = [10,15,20]
let level=1,score=0,sequence=[];
let signalInterval = null;
const MAX_LEVEL = 12;

let scoreElement = document.getElementById('score');
let levelElement = document.getElementById('level');

let timeout = null;

const root = document.querySelector(':root');
console.log(root);

//handling onClick
let handleStart = () => {
    score = 0;
    root.style.setProperty('--simon-content',`"SIMON"`);
    root.style.setProperty('--simon-color',`black`);
    scoreElement.innerHTML = score;
    startButton.classList.add('disNone');
    stopButton.classList.remove('disNone');
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
let myTurn = false;

removeCursor = () => {
    greenButton.classList.remove("cursor");
    redButton.classList.remove("cursor");
    yellowButton.classList.remove("cursor");
    blueButton.classList.remove("cursor");
}

addCursor = () => {
    greenButton.classList.add("cursor");
    redButton.classList.add("cursor");
    yellowButton.classList.add("cursor");
    blueButton.classList.add("cursor");
}


let play = () => {
    removeCursor();
    let sound = sounds[sequence[signalNumber]];
    let button = document.getElementById(sequence[signalNumber]);
    console.log(sequence[signalNumber]);
    sound.pause();
    button.classList.add('glow');
    sound.play();
    setTimeout(() =>button.classList.remove('glow'),300);
    signalNumber++;
    if(signalNumber>=level+1){
        clearInterval(signalInterval);
        signalNumber = 0;
        myTurn=true;
        addCursor();
        timeout = setTimeout(fail,5000);
        // if(level<=MAX_LEVEL){
        //     signalInterval = setInterval(play,800);
        // }  
    }
    
}




let buttonHandle = (e) => {
    let color = e.key ? keyBinding[e.key] : e.target.id;
    console.log(color)
    clearTimeout(timeout);
    if(myTurn === false || color === undefined){
        return;
    }
    let button = document.getElementById(color);
    console.log(button);
    button.classList.add('glow');
    setTimeout(() =>button.classList.remove('glow'),300);
    if(sequence[signalNumber]===color){
        console.log('correct');
    }
    else{
        fail();
        console.log('incorrect');
        return;
    }
    let curr = sounds[sequence[signalNumber]]
    curr.pause();
    button.classList.add('glow');
    setTimeout(() =>button.classList.remove('glow'),300);
    curr.play()
    timeout = setTimeout(fail,5000);
    signalNumber+=1
    if(signalNumber>=level+1){
        removeCursor();
        clearTimeout(timeout);
        levelElement.innerHTML = level;
        score += scoreInterval[Math.floor((level-1)/4)];
        scoreElement.innerHTML = score;
        level += 1;
        clearInterval(signalInterval);
        if(level<=MAX_LEVEL){
            signalNumber=0;
            levelElement.innerHTML = level;
            console.log(intervalTime[Math.floor((level-1)/4)])
            signalInterval = setInterval(play,intervalTime[Math.floor((level-1)/4)]);
        }
        else{
            handleStop();
            root.style.setProperty('--simon-content',`"WON"`);
            root.style.setProperty('--simon-color',`green`);
        }
    }
}

let fail = () => {
    endSound.play();
    root.style.setProperty('--simon-color',`red`);
    greenButton.classList.add('glow');
    redButton.classList.add('glow');
    yellowButton.classList.add('glow');
    blueButton.classList.add('glow');
    setTimeout(() =>{
        greenButton.classList.remove('glow');
        redButton.classList.remove('glow');
        yellowButton.classList.remove('glow');
        blueButton.classList.remove('glow');
    },200)
    handleStop();
    clearInterval(signalInterval);
    clearTimeout(timeout);
    level=1;
    signalNumber=0;
    score = 0;
    levelElement.innerHTML = level;
}

let handleStop = () => {
    root.style.setProperty('--simon-content',`"LOSE"`);
    root.style.setProperty('--simon-color',`red`);
    startButton.classList.remove('disNone');
    stopButton.classList.add('disNone');
    signalNumber=0;
    sequence=[];
    level=1;
    score = 0;
    levelElement.innerHTML = level;
    clearInterval(signalInterval);
}


handleRules = () => {
    let main = document.getElementById('main-body');
    let rules = document.getElementById('rules-body');
    console.log(rules.classList)
    if(main.classList.contains('toggle') && rules.classList.contains('toggle')){
        main.classList.remove('toggle');
        rules.classList.remove('toggle');
    }
    else{
        main.classList.add('toggle');
        setTimeout(()=>rules.classList.add('toggle'),200)
        
    }

}

//Start Button
let startButton = document.getElementById('start');
startButton.addEventListener('click',handleStart);

//Stop Button
let stopButton = document.getElementById('stop')
stopButton.addEventListener('click',handleStop);

// Buttons Element
let greenButton = document.getElementById('green');
let redButton = document.getElementById('red');
let yellowButton= document.getElementById('yellow');
let blueButton = document.getElementById('blue');

//Adding onClick Listener
greenButton.addEventListener('click',buttonHandle);
redButton.addEventListener('click',buttonHandle);
yellowButton.addEventListener('click',buttonHandle);
blueButton.addEventListener('click',buttonHandle);

// Key Binding
let greenKey = document.getElementById('A');
let redKey = document.getElementById('S');
let yellowKey= document.getElementById('K');
let blueKey = document.getElementById('L');

//Adding onClick Listener
document.addEventListener('keyup',buttonHandle);

//Rule button 
let ruleButton = document.getElementById('rules');
ruleButton.addEventListener('click',handleRules);