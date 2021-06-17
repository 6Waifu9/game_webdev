/*----------- Game State Data ----------*/
// 0 = none
// 1 = start : blauw
// 2 = entry : groen
// 3 = no_entry : rood
// 4 = bonus : paars
// 5 = einde : zwart

const board1 = [
    3,3,3,3,1,3,3,3,
    3,2,2,2,2,3,3,3,
    3,2,3,3,3,3,3,3,
    2,2,2,2,2,2,3,3,
    2,3,2,4,3,2,2,5,
    2,2,3,2,3,3,3,3,
    3,2,2,2,3,3,3,3,
    3,3,3,3,3,3,3,3   
]

const board2 = [
    3,3,3,3,3,3,3,3,
    3,3,3,3,4,2,2,3,
    1,2,2,3,2,3,2,3,
    3,3,2,3,2,3,2,3,
    3,3,2,3,2,3,2,5,
    3,3,2,3,2,3,3,3,
    3,3,2,3,2,3,3,3,
    3,3,2,2,2,3,3,3   
]

const board3 = [
    1,2,3,3,3,3,3,3,
    3,2,3,3,4,2,3,3,
    2,2,3,2,2,2,3,3,
    2,3,3,2,3,2,3,3,
    2,2,2,2,3,2,3,3,
    3,3,3,3,3,2,3,3,
    3,3,3,3,3,2,3,3,
    3,3,3,3,3,2,2,5   
]

const board4 = [
    3,3,2,2,2,2,2,5,
    3,3,2,3,3,3,3,3,
    2,2,2,2,2,2,3,3,
    4,3,2,2,3,2,3,3,
    2,2,2,3,3,2,3,3,
    3,3,3,2,2,2,3,3,
    3,3,3,2,3,3,3,3,
    3,3,3,1,3,3,3,3   
]

const boards = [board1,board2,board3,board4];
let playboard = null;
let GameIsRunning = false;
var audioApplause;
var audioPain;
var audioStopwatch;
var audioBonus;

const cells = document.querySelectorAll("td");

let findBoardItemState = function (cellId) {

    // 1 = start : blauw
    // 2 = entry : groen
    // 3 = no_entry : rood
    // 4 = bonus : paars
    // 5 = einde : zwart

    let pointer = parseInt(cellId);

    switch(playboard[pointer]) {
        case 1:
          return "start";
        case 2:
            return "entry";
        case 3:
            return "no_entry";
        case 4:
            return "bonus";
        case 5:
            return "end";      
          default:
            return "";
    }

};

let GetCellState = function (className) {

    switch(className) {
        case "start":
            return 1;
        case "entry":
            return 2;
        case "no_entry":
            return 3;
        case "bonus":
            return 4;
        case "end":
            return 5;      
          default:
            return -1;
    }
};

function StartGame(){

    var number = Math.floor(Math.random() * 4);
    playboard = boards[number];
    
    cells.forEach(element => {
        element.className = findBoardItemState(element.id);
    });

    GameIsRunning = true;
}

function ResetGame(){

    GameIsRunning = false;
    cells.forEach(element => {
        element.className = "";
    });
}

function ProcessElementEnter(event)
{
    if (!GameIsRunning) return;

    var state = GetCellState(event.target.className);

    if (state == 1)
    {
        GameIsRunning = true;
        audioStopwatch.play();        
    } 

    if (state == 3)
    {
        GameIsRunning = false;
        audioPain.play();        
        alert('Game over !!');
    } 

    if(state == 4)
    {
        audioBonus.play();
    }

    if(state == 5)
    {
        GameIsRunning = false;
        audioApplause.play();
    }

}

function ProcessElementLeave(event)
{
    if (!GameIsRunning) return;
    var state = GetCellState(event.target.className);
    if (state == 2 || state == 4)
    {
        event.target.className = "no_entry";    
    }
}

function Initialize()
{
    GameIsRunning = false;

    audioApplause = new Audio('sound/Applause.wav');
    audioPain = new Audio('sound/Pain.wav');
    audioStopwatch = new Audio('sound/stopwatch.wav');
    audioBonus = new Audio('sound/Bonus.wav');

    document.querySelector("#GameBoardTable tbody").addEventListener("mouseover", ProcessElementEnter);
    document.querySelector("#GameBoardTable tbody").addEventListener("mouseout", ProcessElementLeave);
}
}
Initialize();