// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  //make nxn empty board.
  //pass this board to our traverse function

  var solution = undefined; //fixme

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

window.rookTraverse = function(board, curRow) {
  //iterating through curRow row, placing new rook in each column.
  if (curRow >= board.length) return board;

  for (var column = 0; column < board[curRow].length; column++) {
    board[curRow][column] = 1;
    return window.rookTraverse(board, curRow+1);
  }
};

window.rookScore = function(board) {
  var cols = [];
  _.each(board, function() {
    cols.push(0);
  });
  debugger
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


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
