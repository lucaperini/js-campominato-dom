const playButton = document.querySelector('#play-btn');
    
playButton.addEventListener('click', function(){
        startNewGame();
})

function startNewGame(){
        
        document.querySelector('#grid').innerHTML = "";
        document.getElementById('game-status').innerHTML = "In bocca al lupo!";
        
        let userSelection = document.getElementById('game-level').value;
        let boxPerRow;
        let boxNumber;
        let points = 0;
        let stopGame = false;
        
        switch (userSelection) {
            
            case "easy": 
            default:       
                boxPerRow = 10;
                boxNumber = 100;
                break;
        
            case "medium":
                boxPerRow = 9;
                boxNumber = 81;
                break;

            case "high":
                boxPerRow = 7;
                boxNumber = 49;
                break;
        }
        
        for (let i = 1 ; i <= boxNumber ; i++){
            let theGrid = document.querySelector('#grid');
            currentBox = createSingleBox(boxPerRow);
            const bombs = generateBombList(16, boxNumber);
            currentBox.addEventListener('click', function() {
            if(!stopGame){
                if (!bombs.includes(i)){
                this.classList.add('clicked');
                points++;
                }else {
                this.classList.add('clicked-bomb');
                document.getElementById('game-status').innerHTML = "Hai perso. Hai totalizzato " + `${points}`+ " " + "punti";
                checkAndAddClass('grid',bombs,'clicked-bomb');
                stopGame = true;
                }
                
            }

        });
            currentBox.innerHTML = i;
            theGrid.appendChild(currentBox);
        }
    }


function createSingleBox(boxPerRow){
    const currentElement = document.createElement('div');
    currentElement.classList.add('single-box');
    currentElement.style.width = `calc(100% / ${boxPerRow})`
    currentElement.style.height = currentElement.style.width;
    return currentElement;
}


function generateBombList(bombs, numberOfCells){
    const bombList = [];
    for (let i = 0; i < bombs; i++){
        bombList.push(generateUniqueRandomNumber(bombList, 1, numberOfCells));
    }
    return bombList;
}

function generateUniqueRandomNumber(numsBlacklist, min, max){
    let check = false;
    let randomInt;
    while (!check){
    randomInt=Math.floor(Math.random()*((max + 1) - min) + min);
    if (!numsBlacklist.includes(randomInt)){
    check = true;
    return randomInt;
    }
}
}

function checkAndAddClass (parentElementId, bomb, classToAdd){
    const boxes = document.getElementById(parentElementId).children;
        for (let i = 0; i < boxes.length; i ++){
            if (bomb.includes(parseInt(boxes[i].innerHTML))){
            boxes[i].classList.add(classToAdd);
            }
        }
}


function writeInElementById(elementId, stringToWrite){
    document.getElementById(elementId).innerHTML = stringToWrite;
}