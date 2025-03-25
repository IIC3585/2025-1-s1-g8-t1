function createIterator(arr) {
    let rowIndex = 0;
    let columnIndex = 0;
    return {
    nextRow: function() {
    if (rowIndex < arr.length) {
    return { value: arr[rowIndex++][columnIndex], done: false };
    } else {
    return { done: true };
    }
    },
    nextColumn: function(){
    if (columnIndex < arr[0].length) {
        return {value: arr[rowIndex][columnIndex++], done: false};
    } else {
    return { done: true }; 
    }
    }
    };
}

module.exports = createIterator;