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
  var output = [];
  var board = makeBoard(n);

  var walker = function(board, curRow){
   var copy = window.deepCopy(board);
   for (var column = 0; column < copy.length; column++) {
      copy[curRow][column] = 1;
      if(curRow === board.length-1) {
        if (rookScore(copy, curRow)) {
          output.push(copy); 
          console.log('board ' + '\n' + copy[0] + '\n' + copy[1] + '\n' + copy[2] + '\n' + copy[3] + '\n' + copy[4]);
          copy[curRow][column] = 0;
        }else {
          copy[curRow][column] = 0;
        }

      } else {
        if(rookScore(copy, curRow)) {
          walker(copy, curRow+1);
        }
        copy[curRow][column] = 0;
     }
      // return solutionBoards = window.rookTraverse(board, curRow+1, solutionBoards);
   }
  };

  walker(board, 0);

  return output.length;

};

window.findNQueensSolution = function(n){
  var board = makeBoard(n);
  var output = [];

  var walker = function(board, curRow){
   var copy = window.deepCopy(board);
   for (var column = 0; column < copy.length; column++) {
      copy[curRow][column] = 1;
      if(curRow === board.length-1) {
        if (queenScore(copy, curRow)) {
          output.push(copy);
          console.log('board ' + '\n' + copy[0] + '\n' + copy[1] + '\n' + copy[2] + '\n' + copy[3] + '\n' + copy[4]);
          break;
        }else {
          copy[curRow][column] = 0;
        }

      } else {
        if(queenScore(copy, curRow)) {
          walker(copy, curRow+1);
        }
        if (!output.length) {
          copy[curRow][column] = 0;
        }
        else {
          return;
        }
     }
   }
  };
  walker(board, 0);
  return output[0];
};

window.countNQueensSolutions = function(n){
  var board = makeBoard(n);
  var output = [];
  var ld;
  var rd;
  var cols;
  var numSolutions = 0;


  var walker = function(board, curRow, ld, rd, cols){
   var copy = window.deepCopy(board);
   console.log(n);
   for (var column = 0; column < copy.length; column++) {
      var newLd;
      var newRd;
      var newCols;
      copy[curRow][column] = 1;

     for (var col = 0; col < n; col++) {
       if (copy[curRow][col] === 1) {
         newLd = 1 << (n - (col+1) + curRow);
         newRd = 1 << ((2*n - 2) - curRow - col);
         newCols = 1 << (n - 1) - col;
       }
    }

     if(curRow === board.length-1) { //if board complete
      debugger;
       if( !(ld & newLd) && !(rd & newRd) && !(cols & newCols) ) { //if board wins
        //good board. do stuff;
         numSolutions++;
         console.log("numSolutions = " + numSolutions);
         console.log("i'm at this level: " + n);
         console.log('board ' + '\n' + copy[0] + '\n' + copy[1] + '\n' + copy[2] + '\n' + copy[3] + '\n' + copy[4]);
         copy[curRow][column] = 0;
       }else {
          copy[curRow][column] = 0;
       }
     }else {                   //board not complete
        if( !(ld & newLd) && !(rd & newRd) && !(cols & newCols) ) { // if board valid
          ld = ld ^ newLd; 
          rd = rd ^ newRd;
          cols = cols ^ newCols;
          //we need to backtrack on the bitshift!!!
          walker(copy, curRow+1, ld, rd, cols);
         }
         copy[curRow][column] = 0;
      }

     // if(curRow === board.length-1) {
     //   if (queenScore(copy, curRow)) {
     //     output.push(copy);
     //     console.log('board ' + '\n' + copy[0] + '\n' + copy[1] + '\n' + copy[2] + '\n' + copy[3] + '\n' + copy[4]);
     //     copy[curRow][column] = 0;
     //   }else {
     //     copy[curRow][column] = 0;
     //   }

     // } else {
     //     if(queenScore(copy, curRow)) {
     //     walker(copy, curRow+1);
     //     }
     //     copy[curRow][column] = 0;
     //   }
    }
  };
  debugger;
  walker(board, 0, 0, 0, 0);

  return numSolutions;
};

window.deepCopy = function(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var newRow = array[i].slice();
    result.push(newRow);
  }
  return result;
};


window.rookScore = function(board, curRow) {
  var cols = {};
  var n = board.length;

  for (var row = 0; row < curRow+1; row++) {
    for (var col = 0; col < n; col++) {
      if (board[row][col] === 1) {
        cols[col] = 1;
      }
    }
  }
  if (Object.keys(cols).length === curRow+1) {
    return true;
  }
  else{
    return false;
  }
};

window.queenBinScore = function(row) {
  var n = row.length;
  var ld;
  var rd;
  var cols;
  for (var col = 0; col < row.length; col++) {
    if (row[col] === 1) {
      ld = 1 << (n - (col+1) + row);
      rd = 1 << ((2*n - 1) - 1 - col);
      cols = 1 << (n - 1) - col;
    }
  }
};

window.queenScore = function(board, curRow) {
  var ld = {}; //number
  var rd = {}; //number
  var cols = {}; //number
  // and the old number with the new number
  // if we get all zeroes, it's still valid. else throw away
  // XOR the old with the new, and pass to next level.
  // don't worry about leading zeroes
  // you can get the binary by doing .toString(2);


  //to get LD -- bitshift by n-(col+1)+row
  //to get RD -- bitshift by (2n-1)-1-col
  //to get col -- bitshift by (n-1)-col

  var n = board.length;

  for (var row = 0; row < curRow+1; row++) {
    for (var col = 0; col < n; col++) {
      if (board[row][col] === 1) {
        ld[ (n -1) - row + col] = 1;
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
