var n = 10;
var board = createGrid(n);
var board1 = createGrid(n);
var grid = document.getElementById('grid')

function createGrid(rows) {
    var board = [];
    for (var i = 0; i < rows; i++) {
        var columns = [];
        for (var j = 0; j < rows; j++) {
            //var k = Math.random();
            var k = 0;
            if (k < 0.5)
                columns[j] = Math.floor(k);
            else
                columns[j] = Math.ceil(k);
        }
        board[i] = columns;
    }
    return board;
}
function renderBoard() {
    var data = "";
    clearGrid();
    var count = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] == 1)
                color = "black";
            else
                color = "white";

            data += '<div onClick="pressDiv(this)" style="background-color:' + color + '" id="' + (+i) + (+j) + '">' + i + ',' + j + '</div>';
        }
        count++;
    }
    document.getElementById('grid').innerHTML += data;
}
function clearGrid() {
    document.getElementById('grid').innerHTML = "";
}
function calculateNextGeneration() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            board1[i][j] = board[i][j];
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var elements = 0;

            if (i - 1 != -1 && j - 1 != -1)
                elements += board[i - 1][j - 1]; //top left

            if (i - 1 != -1 && j != -1)
                elements += board[i - 1][j]; //top

            if (i - 1 != -1 && j + 1 != -1 && j + 1 < 10)
                elements += board[i - 1][j + 1]; // top right

            if (i != -1 && j - 1 != -1)
                elements += board[i][j - 1]; //left

            if (i != -1 && j + 1 != -1 && j + 1 < 10)
                elements += board[i][j + 1]; //right

            if ((i + 1) != -1 && (j - 1) != -1 && i + 1 < 10)
                elements += board[i + 1][j - 1]; //down left 

            if (i + 1 != -1 && j != -1 && i + 1 < 10)
                elements += board[i + 1][j]; //down

            if (i + 1 != -1 && j + 1 != -1 && i + 1 < 10 && j + 1 < 10)
                elements += board[i + 1][j + 1]; //down right

            //•	Any live cell with fewer than two live neighbours dies, as if caused by underpopulation
            //•	Any live cell with two or three live neighbours lives on to the next generation.
            //•	Any live cell with more than three live neighbours dies, as if by overpopulation.
            //•	Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            // 2 or 3 live less or more die
            // 1 live
            // 0 die

            if (board[i][j] == 1) {
                switch (elements) {
                    case 2:
                        board1[i][j] = 1;
                        break;
                    case 3:
                        board1[i][j] = 1;
                        break;
                    default:
                        board1[i][j] = 0;
                }
            }

            if (board[i][j] == 0 && elements == 3) {
                console.log("celula morta");
                board1[i][j] = 1;
            }
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            board[i][j] = board1[i][j];
        }
    }

    renderBoard();
}
function pressDiv(obj) {
    console.log(JSON.stringify(board));
    var arrDigits = obj.id;
    board[arrDigits[0]][arrDigits[1]] = (+!board[arrDigits[0]][arrDigits[1]]);
    renderBoard();
    console.log(JSON.stringify(board));
}
function digits(n) {
    return Array.from(String(n), Number);
}

function advanceNGenerations(){
    var n = document.getElementById("nGenerations").value;
    for(var i = 0; i < n ;i++ ){
        setTimeout(function(){  
            calculateNextGeneration();
            console.log("Test");}, 200);    
    }
}
function init(board) { };
function exportboard() { };
function test() { };
function printMatriz(board) {
    document.getElementById('grid').setAttribute("style", "width:" + 30 * n + "px;");
    renderBoard();
}


