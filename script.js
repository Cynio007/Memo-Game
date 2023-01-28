const squareDivs = document.querySelectorAll('.item');
const playerName = document.querySelector('.name');
const clock = document.querySelector('.clock');
const record =  document.querySelectorAll('.record');
const btn = document.querySelector('button');

if(localStorage.getItem('score')=== null){
   
localStorage.setItem('score',JSON.stringify([{player:"CPU",score:"999"},{player:"CPU",score:"999"},{player:"CPU",score:"999"},{player:"CPU",score:"999"},{player:"CPU",score:"999"}]))
}

let winners= JSON.parse(localStorage.getItem('score'));

function sortScore(a, b) {
    return a.score - b.score;
  };
const bestPlayers = winners.sort(sortScore);
winners.splice(5)
record.forEach((el,i)=>{
    el.innerText= ( `${i+1}.  ${winners[i].player} ${winners[i].score} s.`)
});

let newPlayer = '';
let time = '';

squareDivs.forEach((a)=>{
    a.classList.add('change');
});

let counterSec = 0;
let counterMilisec = 0
let sumRed = 0;
let sumBlue = 0;
let sumPurple = 0;
let sumYellow = 0;
let sumGreen = 0;
let sumPink = 0;
let sumAllSquare = 0;
let clickSquareArr = [];

btn.addEventListener('click', ()=>{
    clearInterval(time);
    counterSec = 0;
    counterMilisec = 0
    time= '';
    sumRed = 0;
    sumBlue = 0;
    sumPurple = 0;
    sumYellow = 0;
    sumGreen = 0;
    sumPink = 0;
    sumAllSquare = 0;
    clickSquareArr = [];
    newPlayer = (prompt('Podaj nick (MAX 7 znaków)', 'Player')?? 'Player').substring(0,7) ;
    playerName.innerText = newPlayer;
    
    time = setInterval(counter, 10);
    stratGame();
});




const counter = ()=>{
    
    if (counterMilisec === 10){
        counterMilisec = 0;
        counterSec++
    }
    counterMilisec =counterMilisec +0.01
    clock.innerText = `${counterMilisec.toFixed(2)}`
};


function mixArray(arr) {
    for (let i=0; i<arr.length; i++) { 
        let j = Math.floor(Math.random() * arr.length); 
        let temp = arr[i]; 
        arr[i] = arr[j]; 
        arr[j] = temp; 
    }
    return arr;
};
const colorArray = ['red','red','blue','blue','purple','purple','yellow','yellow','green','green','pink','pink'];
let mixedColorArray = mixArray(colorArray);

const stratGame = ()=>{
    mixedColorArray = mixArray(colorArray);
squareDivs.forEach((a,b)=>{
    a.classList.remove('red','blue','purple','yellow','green','pink','active','change')
    a.classList.add(mixedColorArray[b],'cover');
    a.style.pointerEvents = ''
   
})};



squareDivs.forEach((el)=>{
el.addEventListener('click', (e)=>{

el.classList.remove('cover');

const containsColor = (color)=>{

        clickSquareArr.push(color)
        el.style.pointerEvents = 'none'
    
}


if(el.classList.contains('red')){ 
    containsColor('red')
    sumRed++;
} else if(el.classList.contains('blue')){
    containsColor('blue')
    sumBlue++;
} else if(el.classList.contains('purple')){
    containsColor('purple')
    sumPurple++;
} else if(el.classList.contains('yellow')){
    containsColor('yellow')
    sumYellow++;
} else if(el.classList.contains('green')){
    containsColor('green')
    sumGreen++;
} else if(el.classList.contains('pink')){
    containsColor('pink')
    sumPink++;
};


if(clickSquareArr.length === 3){
    clickSquareArr.length = 1;
    sumRed = 0;
    sumBlue = 0;
    sumPurple = 0;
    sumYellow = 0;
    sumGreen = 0;
    sumPink = 0;
    e.currentTarget.classList.add('active')
    squareDivs.forEach(el=>{
        if(el.classList.contains('change')){
           return

        }else if(el.classList.contains('active'))
        
            {
                if(el.classList.contains('red')){
                sumRed++;
                }else if(el.classList.contains('blue')){
                sumBlue++;
                }else if(el.classList.contains('purple')){
                sumPurple++;
                }else if(el.classList.contains('yellow')){
                sumYellow++;
                }else if(el.classList.contains('green')){
                sumGreen++;
                }else if(el.classList.contains('pink')){
                sumPink++;
                }
                el.classList.remove('active')
                return
            }
        else{
            el.classList.add('cover')
            el.style.pointerEvents = ''
        }
       
    });
    
}

function addChangeClass (sumColor,color){
    if(sumColor === 2){
        squareDivs.forEach((el) =>{
            if (el.classList.contains(color))
            {
             el.classList.add('change')
            }
           })
           sumAllSquare++;
    }
};

addChangeClass(sumRed,'red');
addChangeClass(sumBlue,'blue');
addChangeClass(sumPurple,'purple');
addChangeClass(sumYellow,'yellow');
addChangeClass(sumGreen,'green');
addChangeClass(sumPink,'pink');


if(sumAllSquare === 6){
    clearInterval(time);
    winners.push({player:newPlayer,score:clock.innerText})
    console.log(winners)
    winners.sort(sortScore);
    winners.splice(5)
    localStorage.setItem('score',JSON.stringify(winners));
    winners= JSON.parse(localStorage.getItem('score'));
    record.forEach((el,i)=>{
        el.innerText= ( `${i+1}.  ${winners[i].player} ${winners[i].score} s.`)
        console.log('wyświetlam index' + i)
    });
    
        alert(`Twój wynik ${newPlayer} to: ${clock.innerText} sekundy`);
   
}

})
});


