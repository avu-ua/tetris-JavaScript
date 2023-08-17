let rrow = 25;
let ccol = 1;
let cellID = rrow + "-" + ccol;

function test() {
    var targetCell = document.getElementById(cellID);
    targetCell.style.backgroundColor = "green";
    console.log("'Test' button was clicked. Click number ", ccol);
    ccol = ccol + 1;
    cellID = rrow + "-" + ccol;
}

/*
function Block() {
    this.l1c1 = "c1-4"
    this.l1c2 = "c1-5"
    this.l1c3 = "c1-6"
    this.l2c1 = "c2-4"
    this.l2c2 = "c2-5"
    this.l2c3 = "c2-6"
    this.l3c1 = "c3-4"
    this.l3c2 = "c3-5"
    this.l3c3 = "c3-6"

    this.l1c1_color = "blue"
    this.l1c2_color = "c1-5"
    this.l1c3_color = "c1-6"
    this.l2c1_color = "c2-4"
    this.l2c2_color = "c2-5"
    this.l2c3_color = "c2-6"
    this.l3c1_color = "c3-4"
    this.l3c2_color = "c3-5"
    this.l3c3_color = "c3-6"

    // this.l2c2.backgroundColor = "green"
    // this.l3c1.backgroundColor = "green"
    // this.l3c2.backgroundColor = "green"
    // this.l3c3.backgroundColor = "green"
}

var t_block = new Block()
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"

var line_three = new Block()
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"
t_block.backgroundColor = "green"


function rotateright() {
    for (let r = 1; r < 4; r++) {
        for (let c = 1; c < 4; c++) {
            var target = document.getElementById(t_block)
        }
    }
} */

// get 'stanbdard' color of gamefield frm CSS variable
const standardColor = getComputedStyle(document.body).getPropertyValue('--cell-color');

// det color of blocks from CSS variable
const blockColor = getComputedStyle(document.body).getPropertyValue('--block-color');

// define blocks (tBlock, lineThree, lineTwo, singleCell, smallCorner, largeCorner,
// square2x2, dollarRight, dollarLeft)
const tBlock = [1, 1, 1, 0, 1, 0, 0, 0, 0];
const lineThree = [0, 0, 0, 1, 1, 1, 0, 0, 0];
const lineTwo = [1, 1, 0, 0];
const singleCell = [1];
const smallCorner = [1, 1, 0, 1];
const largeCorner = [1, 1, 1, 1, 0, 0, 1, 0, 0];
const square2x2 = [1, 1, 1, 1];
const dollarRight = [0, 0, 0, 0, 1, 1, 1, 1, 0];
const dollarLeft = [0, 0, 0, 1, 1, 0, 0, 1, 1];

// temporary. newElem selection should be randomised
let newElem = singleCell;

class Block {
    constructor(elem) {
        if (elem.length === 9) {
            this.idArray = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"];
        } else if (elem.length === 4) {
            this.idArray = ["1-5", "1-6", "2-5", "2-6"];
        } else {
            this.idArray = ["1-5"];
        }
        this.colors = elem;
    }
}

// initial place of block on gamefield
let currentBlock = new Block(newElem);
render(currentBlock);

// function to render (re-render) block on gamefield
function render(block) {
    for (let i = 0; i < block.idArray.length; i++) {
        let cell = document.getElementById(block.idArray[i]);
        if (block.colors[i] === 1) {
            cell.style.backgroundColor = blockColor;
        } else {
            cell.style.backgroundColor = standardColor;
        }
    }
}

// rotate block counter-clockwise
function rotateleft() {
    let copy = currentBlock.colors;
    if (currentBlock.idArray.length === 9) {
        currentBlock.colors = [copy[2], copy[5], copy[8], copy[1], copy[4], copy[7], copy[0], copy[3], copy[6]];
    } else if (currentBlock.idArray.length === 4) {
        currentBlock.colors = [copy[1], copy[3], copy[0], copy[2]];
    }
    render(currentBlock);
}

// rotate block clockwise
function rotateright() {
    let copy = currentBlock.colors;
    if (currentBlock.idArray.length === 9) {
        currentBlock.colors = [copy[6], copy[3], copy[0], copy[7], copy[4], copy[1], copy[8], copy[5], copy[2]];
    } else if (currentBlock.idArray.length === 4) {
        currentBlock.colors = [copy[2], copy[0], copy[3], copy[1]];
    }
    render(currentBlock);
}

// moving block left
function moveleft() {
    shiftLeftOrRight(-1);
    // if (currentBlock.idArray[0][2] > 1) {
    //     for (let i = 0; i < currentBlock.idArray.length; i++) {
    //         let newStartColumn = currentBlock.idArray[i][2] - 1;
    //         currentBlock.idArray[i] = currentBlock.idArray[0];
    //         currentBlock.idArray[i][2] -= 1;
    //         console.log(currentBlock.idArray[i]);
    //         console.log(currentBlock.idArray[i][2] - 1);
    //     }
    // }
    // render(currentBlock);
}

function shiftLeftOrRight(direction) {
    for (let i = 0; i < currentBlock.idArray.length; i++) {
        let idString = currentBlock.idArray[i];
        let currentColumn;
        if (idString[idString.length - 2] === "-") {
            currentColumn = Number(idString[idString.length - 1]);
            let newColumn = (currentColumn + direction).toString();
            console.log("newColumn", newColumn);
            let newID = idString.replace(idString[-1], newColumn);
            console.log("newID]", newID);
            currentBlock.idArray[i] = newID;
            console.log("currentBlock.idArray[i]", currentBlock.idArray[i]);
        } else {
            currentColumn = Number(idString.substr(-2, 2));
            let newColumn = currentColumn + direction;
            let newID = idString.replace(idString[-2, 2], newColumn);
            currentBlock.idArray[i] = newID;
            console.log(currentBlock.idArray[i]);
        }
    }
}