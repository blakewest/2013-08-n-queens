(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
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
        return false;
      }
      else{
        return true;
      }
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      return _.reduce(this.rows[rowIndex], function(memo, item){
        if (memo > 1) return true;
        if (item === 1) memo++;
        return memo > 1;
      }, 0);
    },

    hasAnyRowConflicts: function(){
      //debugger
      that = this;
      return _.reduce(this, function(memo, row){
        if (memo) return true;
        else {
          memo = !!(this.hasRowConflictAt(that.indexOf(row)));
        }
      }, false);


    },

    hasColConflictAt: function(colIndex){
      return false; // fixme
    },

    hasAnyColConflicts: function(){
      return false; // fixme
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMajorDiagonalConflicts: function(){
      return false; // fixme
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      return false; // fixme
    },

    hasAnyMinorDiagonalConflicts: function(){
      return false; // fixme
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
