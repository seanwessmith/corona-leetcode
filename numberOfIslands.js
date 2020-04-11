/**
 * @param {character[][]} grid
 * @return {number}
 */

const buildReferenceArray = function (grid) {
  const rowCount = grid.length;
  const colCount = grid[0] ? grid[0].length : 0;
  const arr = [];
  for (let row = 0; row < rowCount; row++) {
    arr[row] = [];
    for (let col = 0; col < colCount; col++) {
      arr[row][col] = false;
    }
  }
  return arr;
}

// The purpose of this helper function is to queue a neighboring location if its island and not checked
const addIslandNeighborsToQueue = function (curr_pixel, queue, grid, visited) {
  let [row, col] = curr_pixel;
  const downRow = row - 1;
  const upRow = row + 1;
  const leftCol = col - 1;
  const rightCol = col + 1;

  // get the horizontal and vertical neighbors inside the grid
  if (visited[downRow] && visited[downRow][col] === false && grid[downRow][col] === '1') {
    queue.push([downRow, col]);
    visited[downRow][col] = true;
  }
  if (grid[upRow] && visited[upRow][col] === false && grid[upRow][col] === '1') {
    queue.push([upRow, col]);
    visited[upRow][col] = true;
  }
  if (visited[row][leftCol] === false && grid[row][leftCol] === '1') {
    queue.push([row, leftCol]);
    visited[row][leftCol] = true;
  }
  if (visited[row][rightCol] === false && grid[row][rightCol] === '1') {
    queue.push([row, rightCol]);
    visited[row][rightCol] = true;
  }
}

// The purpose of this function is to mark every location on the island as visited
const visitIsland = function (grid, row, col, visited) {
  // mark current location as visited
  visited[row][col] = true;

  const queue = [];
  queue.push([row, col]);
  while (queue.length !== 0) {
    const [cur_row, cur_col] = queue.pop();
    visited[cur_row][cur_col] = true;
    addIslandNeighborsToQueue([cur_row, cur_col], queue, grid, visited);
  }
}


const numIslands = function (grid) {
  const visited = buildReferenceArray(grid);
  let totalIslands = 0;

  const rowCount = grid.length;
  const colCount = grid[0] ? grid[0].length : 0;

  // iterate through islands
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (grid[row][col] === '1' && !visited[row][col]) {
        visitIsland(grid, row, col, visited);
        totalIslands++;
      }
    }
  }
  return totalIslands;
};

// Uncomment this to run a test case
// const grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
// const islands = numIslands(grid);

// console.log(`there are ${islands} islands`);