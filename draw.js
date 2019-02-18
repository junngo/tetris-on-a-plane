function draw_blocks(rows, num_rows, num_cols) {
    var boardElem = document.createElement('div');
    for (var i = 0; i < num_rows; i++) {
        for (var j = 0; j < num_cols; j++) {
            var blockElem = document.createElement('div');
            blockElem.classList.add('tetrisBlock');
    
            if (rows[i][j])
                blockElem.classList.add('habitated');
        
            blockElem.style.top = (i * BLOCK_HEIGHT) + 'px';
            blockElem.style.left = (j * BLOCK_WIDTH) + 'px';
            boardElem.appendChild(blockElem);
        }
    }

    return boardElem;
}

function draw_tetrisGame(game, isPaused) {
    var leftPaneElem = draw_tetrisLeftPane(game, isPaused);
    var rightPaneElem = draw_tetrisRightPane(game);
    var gameElem = document.createElement('div');

    gameElem.classList.add('tetrisGame');
    gameElem.appendChild(leftPaneElem);
    gameElem.appendChild(rightPaneElem);

    return gameElem;
}

function draw_tetrisLeftPane(game, isPaused) {
    var scoreElem = draw_tetrisScore(game, isPaused);
    var previewElem = draw_tetrisPreview(game);
    var usageElem = draw_tetrisUsage(game);
    var leftPaneElem = document.createElement('div');

    leftPaneElem.classList.add('tetrisLeftPane');
    leftPaneElem.appendChild(previewElem);
    leftPaneElem.appendChild(scoreElem);
    leftPaneElem.appendChild(usageElem);

    return leftPaneElem;
}

function draw_tetrisRightPane(game) {
    var boardElem = draw_tetrisBoard(game);
    var rightPaneElem = document.createElement('div');

    rightPaneElem.classList.add('tetrisRightPane');
    rightPaneElem.appendChild(boardElem);

    return rightPaneElem;
}

function draw_tetrisBoard(game) {
    var rows = game.get_rows();
    var boardElem = draw_blocks(rows, NUM_ROWS, NUM_COLS);

    boardElem.classList.add('tetrisBoard');

    return boardElem;
}

function draw_tetrisScore(game, isPaused) {
    var score = game.get_score();
    var scoreElem = document.createElement('div');

    scoreElem.classList.add('tetrisScore');
    scoreElem.innerHTML = '<p>SCORE: ' + score + '</p>';

    if (isPaused)
        scoreElem.innerHTML += '<p>PAUSED</p>'

    if (game.get_game_over())
        scoreElem.innerHTML += '<p>GAME OVER</p>'

    return scoreElem;
}

function draw_tetrisPreview(game) {
    var piece = game.get_next_piece();
    var pieceElem = draw_blocks(piece, 4, 4);
    var previewElem = document.createElement('div');

    previewElem.classList.add('tetrisPreview');
    previewElem.appendChild(pieceElem);

    return previewElem;
}

function draw_tetrisUsage(game) {
    var usageElem = document.createElement('div');

    usageElem.classList.add('tetrisUsage');
    usageElem.innerHTML =
            "<table>" +
        "<tr><th>Cursor Keys</th><td>Steer</td></tr>" +
        "<tr><th>a/d</th><td>Rotate</td></tr>" +
        "<tr><th>Space bar</th><td>Let fall</td></tr>" +
        "<tr><th>Enter</th><td>Toggle pause</td></tr>" +
        "<tr><th>r</th><td>Restart game</td></tr>" +
        "</table>";

    return usageElem;
}

function redraw(game, isPaused, containerElem) {
    var gameElem = draw_tetrisGame(game, isPaused);

    containerElem.innerHTML = '';
    containerElem.appendChild(gameElem);
}
