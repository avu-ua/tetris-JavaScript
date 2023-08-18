/* THIS IS FOR TEST BUTTON. REMOVE LATER
let rrow = 24
let ccol = 0
let cellID = rrow + '-' + ccol

function test() {
  var targetCell = document.getElementById(cellID)
  targetCell.style.backgroundColor = 'green'
  console.log("'Test' button was clicked. Click number ", ccol)
  ccol = ccol + 1
  cellID = rrow + '-' + ccol
} */

// get 'stanbdard' color of gamefield frm CSS variable
const STANDARD_COLOR = getComputedStyle(document.body).getPropertyValue(
  '--cell-color'
)

// det color of blocks from CSS variable
const BLOCK_COLOR = getComputedStyle(document.body).getPropertyValue(
  '--block-color'
)

// will be switched on at start of game and switched off when game is over
let gameOver = true

// create object Block
class Block {
  constructor(elem) {
    if (elem.length === 9) {
      // this.idArray = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"];
      this.idArray = [
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 4],
        [1, 5],
        [1, 6],
        [2, 4],
        [2, 5],
        [2, 6],
      ]
    } else if (elem.length === 4) {
      // this.idArray = ["1-5", "1-6", "2-5", "2-6"];
      this.idArray = [
        [0, 5],
        [0, 6],
        [1, 5],
        [1, 6],
      ]
    } else {
      // this.idArray = ["1-5"];
      this.idArray = [[0, 5]]
    }
    this.colors = elem
    this.newborn = true
  }
}

// define blocks (T_SHAPE, LINE_THREE, LINE_TWO, SINGLE_CELL, SMALL_CORNER, LARGE_CORNER,
// SQUARE2x2, DOLLAR_RIGHT, DOLLAR_LEFT).
const T_SHAPE = [0, 0, 0, 1, 1, 1, 0, 1, 0]
const LINE_THREE = [0, 0, 0, 1, 1, 1, 0, 0, 0]
const LINE_TWO = [1, 1, 0, 0]
const SINGLE_CELL = [1]
const SMALL_CORNER = [1, 1, 0, 1]
const LARGE_CORNER = [1, 1, 1, 1, 0, 0, 1, 0, 0]
const SQUARE2x2 = [1, 1, 1, 1]
const DOLLAR_RIGHT = [0, 0, 0, 0, 1, 1, 1, 1, 0]
const DOLLAR_LEFT = [0, 0, 0, 1, 1, 0, 0, 1, 1]

// create Array that indicates if a cell is already occupied.
// Value 0 will mean 'free', 1 - 'occupied by moving block', 2 - 'occupied by previous block(s)'.
let occupiedArray = []
for (let i = 0; i < 25; i++) {
  let clipboard = []
  for (let j = 0; j < 10; j++) {
    clipboard.push(0)
    // this section is temporary for development purposes. Delete later
    let tempCell = document.getElementById(getID(i, j))
    tempCell.innerHTML = '0'
    tempCell.style.display = 'flex'
    tempCell.style.alignItems = 'center'
    tempCell.style.justifyContent = 'center'
    tempCell.style.color = 'red'
    tempCell.style.fontWeight = '700'
    tempCell.style.fontSize = '12px'
    tempCell.style.width = '40px'
    tempCell.style.height = '40px'
    // end of temporary section
  }
  occupiedArray.push(clipboard)
}

// function to get an ID of a cell
function getID(r, c) {
  return r.toString() + '-' + c.toString()
}

// this section is temporary for development purposes. Delete later
function temporaryShowInner() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 10; j++) {
      tempCell = document.getElementById(getID(i, j))
      tempCell.innerHTML = occupiedArray[i][j]
    }
  }
}
// end of temporary section

// temporary. newElem selection should be randomised
let newElem = LINE_TWO

// initial place of block on gamefield
let currentBlock = new Block(newElem)
render(currentBlock)

// function to check if able to render.
function checkBeforeRendering(plannedBlock) {
  for (let i = 0; i < plannedBlock.idArray.length; i++) {
    if (
      occupiedArray[plannedBlock.idArray[i][0]][plannedBlock.idArray[i][1]] ===
      2
    ) {
      return false
    }
  }
  return true
}

// function to render (re-render) block on gamefield
function render(block) {
  let cell
  for (let i = 0; i < block.idArray.length; i++) {
    cell = document.getElementById(
      getID(block.idArray[i][0], block.idArray[i][1])
    )
    if (block.colors[i]) {
      cell.style.backgroundColor = BLOCK_COLOR
    } else if (occupiedArray[block.idArray[i][0]][block.idArray[i][1]] !== 2) {
      cell.style.backgroundColor = STANDARD_COLOR
    }
  }
  // this section is temporary for development purposes. Delete later
  temporaryShowInner()
  // end of temporary section
}

// function to mark cells on gamefield as 'feee', 'occupied' or 'occupied forever' on move of a Block
function markOccupiedOrFree(block) {
  for (let i = 0; i < block.idArray.length; i++) {
    if (occupiedArray[block.idArray[i][0]][block.idArray[i][1]] !== 2) {
      occupiedArray[block.idArray[i][0]][block.idArray[i][1]] = block.colors[i]
    }
  }
  // this section is temporary for development purposes. Delete later
  temporaryShowInner()
  // end of temporary section
}

// rotate block clockwise
function rotateright() {
  let copy = currentBlock.colors
  if (currentBlock.idArray.length === 9) {
    currentBlock.colors = [
      copy[6],
      copy[3],
      copy[0],
      copy[7],
      copy[4],
      copy[1],
      copy[8],
      copy[5],
      copy[2],
    ]
  } else if (currentBlock.idArray.length === 4) {
    currentBlock.colors = [copy[2], copy[0], copy[3], copy[1]]
  }
  if (!checkBeforeRendering(currentBlock)) {
    currentBlock.colors = copy
    return
  }
  render(currentBlock)
  markOccupiedOrFree(currentBlock)
  // console.log(occupiedArray);
}

// rotate block counter-clockwise
function rotateleft() {
  let copy = currentBlock.colors
  if (currentBlock.idArray.length === 9) {
    currentBlock.colors = [
      copy[2],
      copy[5],
      copy[8],
      copy[1],
      copy[4],
      copy[7],
      copy[0],
      copy[3],
      copy[6],
    ]
  } else if (currentBlock.idArray.length === 4) {
    currentBlock.colors = [copy[1], copy[3], copy[0], copy[2]]
  }
  if (!checkBeforeRendering(currentBlock)) {
    currentBlock.colors = copy
    return
  }
  render(currentBlock)
  markOccupiedOrFree(currentBlock)
  // console.log(occupiedArray);
}
/*
// moving block left
function moveleft() {
  prepareToShiftHorizontal(-1)
  render(currentBlock)
}

// moving block right
function moveleft() {
  prepareToShiftHorizontal(1)
  render(currentBlock)
}

function prepareToShiftHorizontal(direction) {
  let copyBlock = currentBlock
  currentBlock.colors = copyBlock.colors
  for (let i = 0; i < currentBlock.idArray.length; i++) {
    currentBlock.idArray[i][0] += direction
    if (
      occupiedArray[currentBlock.idArray[i][0] - 1 + direction][
        currentBlock.idArray[i][1] - 1
      ] === 2 ||
      currentBlock.idArray[i][0] < 1 ||
      currentBlock.idArray[i][0] > 10
    ) {
      currentBlock = copyBlock
      return
    }
  }
  // make good those cells from which the current block departs
  let beingLeftBehind = []
  if (direction < 0 && copyBlock.idArray[2][1] < 10) {
    beingLeftBehind = [
      copyBlock.idArray[2],
      copyBlock.idArray[5],
      copyBlock.idArray[8],
    ]
  } else if (direction > 0 && copyBlock.idArray[0][1] > 1) {
    beingLeftBehind = [
      copyBlock.idArray[0],
      copyBlock.idArray[3],
      copyBlock.idArray[6],
    ]
  }
  for (let j = 0; j < 3; j++) {
    if (occupiedArray[(beingLeftBehind[0] - 1, beingLeftBehind[1] - 1)] !== 2) {
      occupiedArray[(beingLeftBehind[0] - 1, beingLeftBehind[1] - 1)] = 0
      let id =
        beingLeftBehind[0].toString() + '-' + beingLeftBehind[1].toString()
      console.log(beingLeftBehind)
      document.getElementById(id).style.backgroundColor = STANDARD_COLOR
    }
  }
} */
