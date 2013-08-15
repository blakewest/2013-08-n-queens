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

window.queenTraverse = function(bd) {
  var output = [];

  var walker = function(board, curRow){
   var copy = window.deepCopy(board);
   for (var column = 0; column < copy.length; column++) {
      copy[curRow][column] = 1;
      if(curRow === board.length-1) {
        if (queenScore(copy, curRow)) {
          output.push(copy); 
          console.log('board ' + '\n' + copy[0] + '\n' + copy[1] + '\n' + copy[2] + '\n' + copy[3] + '\n' + copy[4]);
          copy[curRow][column] = 0;
        }else {
          copy[curRow][column] = 0;
        }

      } else {
        debugger
        if(queenScore(copy, curRow)) {
          walker(copy, curRow+1);
        }
        copy[curRow][column] = 0;
     }
      // return solutionBoards = window.rookTraverse(board, curRow+1, solutionBoards);
   }
  };

  walker(bd, 0);

  return output;
};

window.rookTraverse = function(bd) {
  var output = [];

  var walker = function(board, curRow){
   var copy = window.deepCopy(board);
   for (var column = 0; column < copy[curRow].length; column++) {
      copy[curRow][column] = 1;
      if(curRow === board.length - 1) {
        debugger;

          // console.log('curRow: '+curRow+' ' +
          //   'board:\n'+board[0].toString()+'\n'+
          //   board[1].toString()+'\n'+board[2].toString()+'\n');
        if (rookScore(copy)) output.push(copy);
        return;
        // return solutionBoards.push(board);
      } else {
        if(rookScore(copy)) {
          walker(copy, curRow+1);
        }
        copy[curRow][column] = 0;
     }
      // return solutionBoards = window.rookTraverse(board, curRow+1, solutionBoards);
   }
  };

  walker(bd, 0);
  console.log(output);
  return output;
};

window.rookTraverse1 = function(bd) {
  //copy board
  //make options array 0,1,2,3,... length. length = bd.length
  //looped through each row of board
  //choose one at random from available options.
  //made that
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

window.queenScore = function(board, curRow) {
  var ld = {};
  var rd = {};
  var cols = {};
  var n = board.length;

  for (var row = 0; row < curRow+1; row++) {
    for (var col = 0; col < n; col++) {
      if (board[row][col] === 1) {
        ld[n - col + 1 + row] = 1;
        rd[row + col] = 1;
        cols[col] = 1;
      }
    }
  }
  if ((Object.keys(ld).length === curRow+1) && (Object.keys(rd).length === curRow+1) && (Object.keys(cols).length === curRow+1)) {
    return true;
  }
  else{
    return false;
  }
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
