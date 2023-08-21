const T_SHAPE = {
  'currentOrientation': 'normal',
  'center': [1, 5],
  'normal': {
    'bricks': [[0, 0], [-1, 0], [0, 1], [0, -1]],
    'ifRotateLeft': [[-1, -1], [1, -1], [-1, 1]],
    'ifRotateRight': [[-1, -1], [-1, 1], [1, 1]],
  },
  'turnedRight': {
    'bricks': [[0, 0], [-1, 0], [0, 1], [1, 0]],
    'ifRotateLeft': [[-1, -1], [-1, 1], [1, 1]],
    'ifRotateRight': [[-1, 1], [1, 1], [1, -1]],

  },
  'upsideDown': {
    'bricks': [[0, 0], [0, 1], [1, 0], [0, -1]],
    'ifRotateLeft': [[-1, 1], [1, 1], [1, -1]],
    'ifRotateRight': [[-1, -1], [1, 1], [1, -1]],

  },
  'turnedLeft': {
    'bricks': [[0, 0], [-1, 0], [1, 0], [0, -1]],
    'ifRotateLeft': [[-1, -1], [1, 1], [1, -1]],
    'ifRotateRight': [[-1, -1], [-1, 1], [1, -1]],
  },
}
