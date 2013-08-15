// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  //make nxn empty board.
  //pass this board to our traverse function
  var board = window.makeBoard(n);

  var solution = undefined;

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.deepCopy = function(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var newRow = array[i].slice();
    result.push(newRow);
  }
  return result;
};

window.rookTraverse = function(bd) {
  var output = [];

  var walker = function(board, curRow){
   var copy = window.deepCopy(board);
   for (var column = 0; column < copy[curRow].length; column++) {
      copy[curRow][column] = 1;
      if(curRow === board.length - 1) {
        debugger;
          console.log(copy[0]);
          console.log(copy[1]);
          console.log(copy[2]);
          // console.log('curRow: '+curRow+' ' +
          //   'board:\n'+board[0].toString()+'\n'+
          //   board[1].toString()+'\n'+board[2].toString()+'\n');
        if (rookScore(copy)) output.push(copy);
        console.log('output: ' + output);
        return;
        // return solutionBoards.push(board);
      } else {
        walker(copy, curRow+1);
        copy[curRow][column] = 0;
     }
      // return solutionBoards = window.rookTraverse(board, curRow+1, solutionBoards);
   }
  };

  walker(bd, 0);

  return output;
};

window.rookScore = function(board) {
  var cols = [];
  _.each(board, function() {
    cols.push(0);
  });
  for (var row = 0; row < board.length; row++) {
    for (var column = 0; column < board[row].length; column++) {
      if (board[row][column] === 1) {
        cols[column] = 1;
      }
    }
  }
  var count = _.reduce(cols, function(initialVal, item) {
    if(item === 1) return initialVal += 1;
  }, 0);
  return count === board.length ? true : false ;
};

window.makeBoard = function(n) {
  var board = [];
  var row = [];
  for (var i = 0; i < n; i++) {
    row[i] = 0;
  }
  for (var j = 0; j < n; j++) {
    var newRow = row.slice();
    board.push(newRow);
  }
  return board;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
