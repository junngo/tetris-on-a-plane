function rotateLeft(piece) {
  return [
    [piece[0][3], piece[1][3], piece[2][3], piece[3][3]],
    [piece[0][2], piece[1][2], piece[2][2], piece[3][2]],
    [piece[0][1], piece[1][1], piece[2][1], piece[3][1]],
    [piece[0][0], piece[1][0], piece[2][0], piece[3][0]]
  ];
}

function rotateRight(piece) {
  return [
    [piece[3][0], piece[2][0], piece[1][0], piece[0][0]],
    [piece[3][1], piece[2][1], piece[1][1], piece[0][1]],
    [piece[3][2], piece[2][2], piece[1][2], piece[0][2]],
    [piece[3][3], piece[2][3], piece[1][3], piece[0][3]]
  ];
}

function intersects(rows, piece, y, x) {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (piece[i][j])
        if (y+i >= NUM_ROWS || x+j < 0 || x+j >= NUM_COLS || rows[y+i][x+j]){
          return true;
        }

  return false;
}

function apply_piece(rows, piece, y, x) {
  var newRows = [];
  for (var i = 0; i < NUM_ROWS; i++)
    newRows[i] = rows[i].slice();

  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (piece[i][j])
        newRows[y+i][x+j] = 1;
  
  return newRows;
}

function kill_rows(rows) {
  var newRows = [];
  var k = NUM_ROWS;
  for (var i = NUM_ROWS; i-- > 0;) {
    for (var j = 0; j < NUM_COLS; j++) {
      if (!rows[i][j]) {
        newRows[--k] = rows[i].slice();
        break;
      }
    }
  }

  for (var i = 0; i < k; i++) {
    newRows[i] = [];
    for (var j = 0; j < NUM_COLS; j++)
      newRows[i][j] = 0;
  }

  return {
    'rows': newRows,
    'numRowsKilled': k,
  };
}

function randomPiece() {
  return pieces[Math.floor(Math.random() * pieces.length)];
}

function TetrisGame() {
  this.gameOver = false;
  this.score = 0;
  this.currentPiece = pieces[0];//randomPiece();
  this.nextPiece = pieces[0];//randomPiece();
  this.pieceY = 0;
  this.pieceX = 3;
  this.rows = [];
  for (var i = 0; i < NUM_ROWS; i++) {
    this.rows[i] = []
    for (var j = 0; j < NUM_COLS; j++) {
      this.rows[i][j] = 0;
    }
  }
}

TetrisGame.prototype.tick = function () {
  if (this.gameOver)
    return false;

  if (intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX)) {
    /* burn current piece into board */
    this.rows = apply_piece(this.rows, this.currentPiece, this.pieceY, this.pieceX);
    var r = kill_rows(this.rows);
    this.rows = r.rows;
    this.score += 1 + r.numRowsKilled * r.numRowsKilled * NUM_COLS;
    
    /* fetch next piece */
    if (intersects(this.rows, this.nextPiece, 0, NUM_COLS / 2 - 2)) {
      this.gameOver = true;
    } else {
      this.currentPiece = this.nextPiece;
      this.pieceY = 0;
      this.pieceX = NUM_COLS / 2 - 2;
      this.nextPiece = randomPiece();
    }

  } else {
    this.pieceY += 1;
  }

  return true;
}

TetrisGame.prototype.steerLeft = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX - 1))
    this.pieceX -= 1;
}

TetrisGame.prototype.steerRight = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY, this.pieceX + 1))
    this.pieceX += 1;
}

TetrisGame.prototype.steerDown = function () {
  if (!intersects(this.rows, this.currentPiece, this.pieceY + 1, this.pieceX))
    this.pieceY += 1;
}

TetrisGame.prototype.rotateLeft = function () {
  var newPiece = rotateLeft(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.rotateRight = function () {
  var newPiece = rotateRight(this.currentPiece);
  if (!intersects(this.rows, newPiece, this.pieceY, this.pieceX))
    this.currentPiece = newPiece;
}

TetrisGame.prototype.letFall = function () {
  while (!intersects(this.rows, this.currentPiece, this.pieceY+1, this.pieceX))
    this.pieceY += 1;
  this.tick();
}

TetrisGame.prototype.get_rows = function () {
  return apply_piece(this.rows, this.currentPiece, this.pieceY, this.pieceX);
}

TetrisGame.prototype.get_next_piece = function () {
  return this.nextPiece;
}

TetrisGame.prototype.get_score = function () {
  return this.score;
}

TetrisGame.prototype.get_game_over = function () {
  return this.gameOver;
}

function tetris_run(containerElem) {
  
  var game = new TetrisGame();

  play();

  function play() {
    var intervalHandler = setInterval(
      function () {
        if (game.tick())
          redraw(game, false, containerElem);
      },
      TICK_MS
    );

    function keyHandler(kev) {
        if (kev.shiftKey || kev.altKey || kev.metaKey)
          return;
  
        var consumed = true;
        var mustpause = false;

        if (kev.keyCode === KEY_ENTER) {
          mustpause = true;
        } else if (kev.keyCode === KEY_R) {
          game = new TetrisGame();
        } else if (kev.keyCode === KEY_LEFT) {
          game.steerLeft();
        } else if (kev.keyCode === KEY_RIGHT) {
          game.steerRight();
        } else if (kev.keyCode === KEY_DOWN) {
          game.steerDown();
        } else if (kev.keyCode === KEY_A) {
          game.rotateLeft();
        } else if (kev.keyCode === KEY_D) {
          game.rotateRight();
        } else if (kev.keyCode === KEY_SPACE) {
          game.letFall();
        } else {
          consumed = false;
        }
        
        if (consumed) {
          kev.preventDefault();
          if (mustpause) {
            containerElem.removeEventListener('keydown', keyHandler);
            clearInterval(intervalHandler);
            pause();
          } else {
            redraw(game, false, containerElem);
          }
        }
    }

    containerElem.addEventListener('keydown', keyHandler);
  }

  function pause() {
    function keyHandler(kev) {
      if (kev.keyCode == KEY_ENTER) {
        containerElem.removeEventListener('keydown', keyHandler);
        play();
      }
    }

    containerElem.addEventListener('keydown', keyHandler);

    redraw(game, true, containerElem);
  }
}
