// get 'stanbdard' color of gamefield frm CSS variable
const STANDARD_COLOR = getComputedStyle(document.body).getPropertyValue(
  '--cell-color'
)

// det color of blocks from CSS variable
const BLOCK_COLOR = getComputedStyle(document.body).getPropertyValue(
  '--block-color'
)

// prepare array indicating occupied cells
// ('0' - free, '1' - occupied by current block, '2' occupied "permantly")
let occupiedArray = []
for (let i = 0; i < 25; i++) {
  let clipboard = []
  for (let j = 0; j < 10; j++) {
    clipboard.push(0)
  }
  occupiedArray.push(clipboard)
}

// this section is temporary for development purposes. Delete later
for (let i = 0; i < 25; i++) {
  for (let j = 0; j < 10; j++) {
    let cell = document.getElementById(getID(i, j))
    cell.innerHTML = occupiedArray[i][j]
    cell.style.display = 'flex'
    cell.style.alignItems = 'center'
    cell.style.justifyContent = 'center'
    cell.style.color = 'red'
    cell.style.fontWeight = '700'
    cell.style.fontSize = '12px'
    cell.style.width = '40px'
    cell.style.height = '40px'
  }
}

function temporaryShowInner() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 10; j++) {
      tempCell = document.getElementById(getID(i, j))
      tempCell.innerHTML = occupiedArray[i][j]
    }
  }
}
// end of temporary section

// function to get an ID of a cell
function getID(r, c) {
  return r.toString() + '-' + c.toString()
}

// function to get a key of a dict by the key's value
function getKey(dict, value) {
  return Object.keys(dict).find((key) => dict[key] === value)
}

// function to create deep copy of an object (dict, array)
function deepCopy(original) {
  return JSON.parse(JSON.stringify(original))
}

const T_SHAPE = {
  currentOrientation: 'normal',
  center: [1, 5],
  newborn: true,
  normal: {
    bricks: [
      [0, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ],
    ifRotateLeft: [
      [-1, -1],
      [1, -1],
      [-1, 1],
    ],
    ifRotateRight: [
      [-1, -1],
      [-1, 1],
      [1, 1],
    ],
  },
  turnedRight: {
    bricks: [
      [0, 0],
      [-1, 0],
      [0, 1],
      [1, 0],
    ],
    ifRotateLeft: [
      [-1, -1],
      [-1, 1],
      [1, 1],
    ],
    ifRotateRight: [
      [-1, 1],
      [1, 1],
      [1, -1],
    ],
  },
  upsideDown: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ],
    ifRotateLeft: [
      [-1, 1],
      [1, 1],
      [1, -1],
    ],
    ifRotateRight: [
      [-1, -1],
      [1, 1],
      [1, -1],
    ],
  },
  turnedLeft: {
    bricks: [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, -1],
    ],
    ifRotateLeft: [
      [-1, -1],
      [1, 1],
      [1, -1],
    ],
    ifRotateRight: [
      [-1, -1],
      [-1, 1],
      [1, -1],
    ],
  },
}

const DOT = {
  currentOrientation: 'normal',
  center: [1, 5],
  newborn: true,
  normal: {
    bricks: [[0, 0]],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedRight: {
    bricks: [[0, 0]],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  upsideDown: {
    bricks: [[0, 0]],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedLeft: {
    bricks: [[0, 0]],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
}

const SQUARE2x2 = {
  currentOrientation: 'normal',
  center: [0, 4],
  newborn: true,
  normal: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedRight: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  upsideDown: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedLeft: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
}

const SQUARE3x3 = {
  currentOrientation: 'normal',
  center: [1, 4],
  newborn: true,
  normal: {
    bricks: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedRight: {
    bricks: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  upsideDown: {
    bricks: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
  turnedLeft: {
    bricks: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [],
    ifRotateRight: [],
  },
}

const LINE2 = {
  currentOrientation: 'normal',
  center: [1, 4],
  newborn: true,
  normal: {
    bricks: [
      [0, 0],
      [0, 1],
    ],
    ifRotateLeft: [[-1, 1]],
    ifRotateRight: [[1, 1]],
  },
  turnedRight: {
    bricks: [
      [0, 0],
      [1, 0],
    ],
    ifRotateLeft: [[1, 1]],
    ifRotateRight: [],
  },
  upsideDown: {
    bricks: [
      [0, 0],
      [0, 1],
    ],
    ifRotateLeft: [[-1, 1]],
    ifRotateRight: [[1, 1]],
  },
  turnedLeft: {
    bricks: [
      [0, 0],
      [1, 0],
    ],
    ifRotateLeft: [[1, 1]],
    ifRotateRight: [],
  },
}

const LINE3 = {
  currentOrientation: 'normal',
  center: [0, 4],
  newborn: true,
  normal: {
    bricks: [
      [0, -1],
      [0, 0],
      [0, 1],
    ],
    ifRotateLeft: [
      [-1, 1],
      [1, -1],
    ],
    ifRotateRight: [
      [-1, -1],
      [1, 1],
    ],
  },
  turnedRight: {
    bricks: [
      [-1, 0],
      [0, 0],
      [1, 0],
    ],
    ifRotateLeft: [
      [-1, -1],
      [1, 1],
    ],
    ifRotateRight: [
      [-1, 1],
      [1, -1],
    ],
  },
  upsideDown: {
    bricks: [
      [0, -1],
      [0, 0],
      [0, 1],
    ],
    ifRotateLeft: [
      [-1, 1],
      [1, -1],
    ],
    ifRotateRight: [
      [-1, -1],
      [1, 1],
    ],
  },
  turnedLeft: {
    bricks: [
      [-1, 0],
      [0, 0],
      [1, 0],
    ],
    ifRotateLeft: [
      [-1, -1],
      [1, 1],
    ],
    ifRotateRight: [
      [-1, 1],
      [1, -1],
    ],
  },
}

const SMALL_G_RIGHT = {
  currentOrientation: 'normal',
  center: [0, 5],
  newborn: true,
  normal: {
    bricks: [
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [[0, 0]],
    ifRotateRight: [[0, 0]],
  },
  turnedRight: {
    bricks: [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
    ifRotateLeft: [[-1, 1]],
    ifRotateRight: [[-1, 1]],
  },
  upsideDown: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 0],
    ],
    ifRotateLeft: [[1, 1]],
    ifRotateRight: [[1, 1]],
  },
  turnedLeft: {
    bricks: [
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    ifRotateLeft: [[1, -1]],
    ifRotateRight: [[1, -1]],
  },
}

const ORIENTATION = ['normal', 'turnedRight', 'upsideDown', 'turnedLeft']
const SHAPES = [T_SHAPE, DOT, SQUARE2x2, SQUARE3x3, LINE2, LINE3, SMALL_G_RIGHT]
const UNROTATABLE = [DOT, SQUARE2x2, SQUARE3x3]

function generateBlock(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// As regards 'rotation: '0' - no rotation, '1' - right / clockwise, '-1' = left /counter-clockwise
function checkIfCanRender(plannedBlock, rotation) {
  let placementArea = plannedBlock[plannedBlock['currentOrientation']]['bricks']
  for (let i = 0; i < placementArea.length; i++) {
    let brickPlace = [
      plannedBlock['center'][0] + placementArea[i][0],
      plannedBlock['center'][1] + placementArea[i][1],
    ]
    if (
      brickPlace[0] < 0 ||
      brickPlace[0] > 24 ||
      brickPlace[1] < 0 ||
      brickPlace[1] > 9 ||
      occupiedArray[brickPlace[0]][brickPlace[1]] === 2
    )
      return false
  }
  if (rotation && !UNROTATABLE.includes(plannedBlock)) {
    let index = ORIENTATION.indexOf(plannedBlock['currentOrientation'])
    let previousOrientation
    let potentialObstales
    switch (rotation) {
      case 1:
        !index
          ? (previousOrientation = ORIENTATION[3])
          : (previousOrientation = ORIENTATION[index - 1])
        potentialObstales = plannedBlock[previousOrientation]['ifRotateRight']
        break
      case -1:
        index === 3
          ? (previousOrientation = ORIENTATION[0])
          : (previousOrientation = ORIENTATION[index + 1])
        potentialObstales = plannedBlock[previousOrientation]['ifRotateLeft']
        break
    }
    for (let j = 0; j < potentialObstales.length; j++) {
      let row = plannedBlock['center'][0] + potentialObstales[j][0]
      let col = plannedBlock['center'][1] + potentialObstales[j][1]
      console.log('row: ', row)
      console.log('col: ', col)
      console.log(occupiedArray)
      console.log(occupiedArray[row][col])
      if (occupiedArray[row][col] === 2) {
        return false
      }
    }
  }
  return true
}

function render(paintOrClear, block) {
  let paintColor
  if (paintOrClear === 'paint') {
    occupationIndex = 1
    paintColor = BLOCK_COLOR
  } else {
    paintColor = STANDARD_COLOR
    occupationIndex = 0
  }
  let blockOrientation = block['currentOrientation']
  let center = block['center']
  let bricks = block[blockOrientation]['bricks']
  for (let i = 0; i < bricks.length; i++) {
    let brickPosition = [center[0] + bricks[i][0], center[1] + bricks[i][1]]
    document.getElementById(
      getID(brickPosition[0], brickPosition[1])
    ).style.backgroundColor = paintColor
    occupiedArray[brickPosition[0]][brickPosition[1]] = occupationIndex
    document.getElementById(
      getID(brickPosition[0], brickPosition[1])
    ).innerHTML = occupiedArray[brickPosition[0]][brickPosition[1]]
  }
}

// change later - moving down by user to be diabled, insted dropping by user will work
function move(leftOrRight, down) {
  let newBlock = deepCopy(currentBlock)
  newBlock['center'] = [
    currentBlock['center'][0] + down,
    currentBlock['center'][1] + leftOrRight,
  ]
  let rotation = 0
  if (checkIfCanRender(newBlock, rotation)) {
    render('clear', currentBlock)
    render('paint', newBlock)
    currentBlock = deepCopy(newBlock)
  }
}

function rotate(rotation) {
  if (!UNROTATABLE.includes(currentBlock)) {
    let newBlock = deepCopy(currentBlock)
    if (
      rotation === -1 &&
      !ORIENTATION.indexOf(currentBlock['currentOrientation'])
    ) {
      newBlock['currentOrientation'] = ORIENTATION[3]
      console.log(newBlock['currentOrientation'])
    } else if (rotation === -1) {
      newBlock['currentOrientation'] =
        ORIENTATION[ORIENTATION.indexOf(currentBlock['currentOrientation']) - 1]
    } else if (
      rotation === 1 &&
      ORIENTATION.indexOf(currentBlock['currentOrientation']) === 3
    ) {
      newBlock['currentOrientation'] = ORIENTATION[0]
    } else {
      newBlock['currentOrientation'] =
        ORIENTATION[ORIENTATION.indexOf(currentBlock['currentOrientation']) + 1]
      console.log(newBlock['currentOrientation'])
    }
    if (checkIfCanRender(newBlock, rotation)) {
      render('clear', currentBlock)
      render('paint', newBlock)
      currentBlock = deepCopy(newBlock)
    }
  }
}

function moveDown(currentBlock) {
  let refreshIterationCount = 0
  const rotation = 0
  let futureBlock
  const intervalId = setInterval(() => {
    futureBlock = deepCopy(currentBlock)
    if (!currentBlock['newborn']) futureBlock['center'][0]++
    if (checkIfCanRender(futureBlock, rotation)) {
      currentBlock['newborn'] = false
      if (userInitiatedDrop || refreshIterationCount === 10) {
        render('clear', currentBlock)
        currentBlock = deepCopy(futureBlock)
        render('paint', currentBlock)
        console.log('refreshIterationCount = ', refreshIterationCount)
      }
      refreshIterationCount != 10 ? refreshIterationCount++ : refreshIterationCount = 0
    } else if (currentBlock['newborn']) {
      clearInterval(intervalId)
      gameEnd = true
      console.log('End of game, "gameEnd" value: ', gameEnd) // here the game ends
    } else {
      clearInterval(intervalId)
      userInitiatedDrop = false
      const bricksArray = deepCopy(currentBlock[currentBlock.currentOrientation].bricks)
      for (brick of bricksArray) {
        brick[0] += currentBlock.center[0]
        brick[1] += currentBlock.center[1]
        occupiedArray[brick[0]][brick[1]] = 2
      }
      console.log(currentBlock[currentBlock.currentOrientation].bricks)
      console.log(bricksArray)
      currentBlock = generateBlock(SHAPES)
      console.log("new one: ", currentBlock)
      moveDown(currentBlock)
    }
  }, 100)
}

// let speedDown
let userInitiatedDrop

function start() {
  temporaryShowInner()
  let gameEnd = false
  let intervalId

  // initiate currentBlock.
  // Its selection from array of block-templates to be randomized later
  let currentBlock = generateBlock(SHAPES)

  const dropButton = document.getElementById('dropDown')
  dropButton.addEventListener('click', () => {
    if (!intervalId) {
      userInitiatedDrop = true
    }
  })

  const leftButton = document.getElementById('moveLeft')
  leftButton.addEventListener('click', () => {
    if (!intervalId) {
      move(-1, 0)
    }
  })

  const rightButton = document.getElementById('moveRight')
  rightButton.addEventListener('click', () => {
    if (!intervalId) {
      move(1, 0)
    }
  })

  if (checkIfCanRender(currentBlock, 0)) {
    render('paint', currentBlock)
  } else {
    console.log('Game over!') // end game here if no more new block can be renderred
  }

  // let dropDelay = 1000
  userInitiatedDrop = false
  moveDown(currentBlock)
}
