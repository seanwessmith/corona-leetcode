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

const addIslandNeighborsToQueue = function (curr_pixel, queue, grid, checked) {
  let [row, col] = curr_pixel;
  const downRow = row - 1;
  const upRow = row + 1;
  const leftCol = col - 1;
  const rightCol = col + 1;

  // get the horizontal and vertical neighbors inside the grid
  if (checked[downRow] && checked[downRow][col] === false && grid[downRow][col] === '1') {
    queue.push([downRow, col]);
    checked[downRow][col] = true;
  }
  if (grid[upRow] && checked[upRow][col] === false && grid[upRow][col] === '1') {
    queue.push([upRow, col]);
    checked[upRow][col] = true;
  }
  if (checked[row][leftCol] === false && grid[row][leftCol] === '1') {
    queue.push([row, leftCol]);
    checked[row][leftCol] = true;
  }
  if (checked[row][rightCol] === false && grid[row][rightCol] === '1') {
    queue.push([row, rightCol]);
    checked[row][rightCol] = true;
  }
}

const visitIslandNeighbors = function (grid, row, col, visited, checked) {
  const queue = [];
  queue.push([row, col]);
  while (queue.length !== 0) {
    let [cur_row, cur_col] = queue.pop(); // [row, col]
    visited[cur_row][cur_col] = true;
    addIslandNeighborsToQueue([cur_row, cur_col], queue, grid, checked);
  }
}

const visitIsland = function (grid, row, col, visited, checked) {
  visited[row][col] = true;
  visitIslandNeighbors(grid, row, col, grid, checked);
}

const numIslands = function (grid) {
  const visited = buildReferenceArray(grid);
  const checked = buildReferenceArray(grid);
  let totalIslands = 0;

  const rowCount = grid.length;
  const colCount = grid[0] ? grid[0].length : 0;

  // iterate through islands
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (grid[row][col] === '1' && !visited[row][col] && !checked[row][col]) {
        visitIsland(grid, row, col, visited, checked);
        totalIslands++;
      }
    }
  }
  return totalIslands;
};