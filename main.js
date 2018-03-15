//Specify board size rows and columns. Default is 3.
let BOARD_SIZE = 3;

//Store cells into array
let cells = [];

//Store current player's turn
let currentPlayerTurn = 'X';

//Keep track of total moves made
let totalMoves = 0;

//Empty HTML Value of cell
const EMPTY_CELL = '&nbsp;';

//Specify tic-tac-toe div element board container id
const tictactoeContainerId = 'tictactoe_container';

//Specify reset element button id
const resetbuttonElId = 'resetGame';

//Specify total moves element id
const totalmovesElId = 'totalMoves';

//Specify current player turn element id
const currentPlayerTurnElId = 'currentPlayerTurn';

//Initiate the board and start new game
init();

//Bind click event listener to reset button -- if reset button is clicked, then start new game
document.getElementById(resetbuttonElId).addEventListener("click", startNewGame);

//Initialize the Tic Tac Toe board and start the game
function init() {
	
	//Create board table element
	let board = document.createElement('table');
  
	//Iterate through rows
	for (let row = 0; row < BOARD_SIZE; row++) {
    
		//Create table row
		let rowEl = document.createElement('tr');
    
		//Append row element to table board
		board.appendChild(rowEl);
	
		//Iterate through columns
		for (let col = 0; col < BOARD_SIZE; col++) {
			
			//Create cell
			let cell = document.createElement('td');
			
			//Add class to cell -- specify column position and row position
			cell.classList.add('col' + col, 'row' + row);
			
			//If row position is equal to column position
			if (row === col) {
				
				//Add diagonal0 class to cell
				cell.classList.add('diagonal0');
			}
			
			//If column position is equal to (BOARD_SIZE - row position - 1)
			if (col === BOARD_SIZE - row - 1) {
				
				//Add diagonal1 class to cell
				cell.classList.add('diagonal1');
			}
			
			//Bind click event listener to cell
			cell.addEventListener('click', function (event) {
				
				//Get cell clicked
				let cell = event.target;
				
				//If clicked cell inner html is not empty
				if (cell.innerHTML !== EMPTY_CELL) {
					
					//Ignore click
					return;
				}
				
				//Update cell inner html to current player turn
				cell.innerHTML = currentPlayerTurn;
				
				//Increment total moves by 1
				totalMoves += 1;
				
				//Update total moves on HTML View
				document.getElementById(totalmovesElId).innerHTML = totalMoves;
				
				//If the player won
				if (checkWin(cell)) {
					
					//Announce winner
					alert('Winner: Player ' + currentPlayerTurn);
					
					//Start New Game after user confirms
					startNewGame();
				}
				
				//Else if -- there are no more moves to make on the board
				else if (totalMoves === BOARD_SIZE * BOARD_SIZE) {
					
					//Announce draw
					alert('Draw');
					
					//Start New Game after user confirms
					startNewGame();
				}
				
				//Else
				else {
					
					//Toggle current player turn
					currentPlayerTurn = currentPlayerTurn === 'X' ? 'O' : 'X';
					
					//Update Current Player Turn on HTML view
					document.getElementById(currentPlayerTurnElId).innerHTML = currentPlayerTurn;
				}
			});
			
			//Append cell to row
			rowEl.appendChild(cell);
			
			//Push cell into array
			cells.push(cell);
		}
	}

	//Append new board to tic-tac-toe div container
	document.getElementById(tictactoeContainerId).appendChild(board);
	
	//Start New Game
	startNewGame();
}

//Start New Game
function startNewGame() {
	
	//Reset moves
	totalMoves = 0;
	
	//Update total moves on HTML View
	document.getElementById(totalmovesElId).innerHTML = totalMoves;
	
	//Reset current player's turn
	currentPlayerTurn = 'X';
	
	//Update Current Player Turn on HTML view
	document.getElementById(currentPlayerTurnElId).innerHTML = currentPlayerTurn;
	
	//Clear tic-tac-toe board
	cells.forEach(function (cell) {
		
		//Update cell inner html to empty
		cell.innerHTML = EMPTY_CELL;
	});
}

//Check if current player won
function checkWin(clicked) {
	
	//Get all clicked cell classes
	let classNames = clicked.className.split(/\s+/);
	
	//Iterate through clicked cell class names
	for (let counter = 0; counter < classNames.length; counter++) {
		
		//Get all cell elements with class name within tic tac toe div container
		let cellElements = document.querySelectorAll('#' + tictactoeContainerId + ' .' + classNames[counter]);
		
		//Initialize cell count with current player turn
		let cellCountWithCurrentPlayerTurn = 0;
		
		//Iterate through cell elements
		for(let col = 0; col < cellElements.length; col++) {
			
			//If cell's inner html is equal to current player turn
			if(cellElements[col].innerHTML === currentPlayerTurn) {
				
				//Increment cell count with current player turn by 1
				cellCountWithCurrentPlayerTurn++;
			}
		}
		
		//If cell count with current player turn equals BOARD_SIZE
		if (cellCountWithCurrentPlayerTurn === BOARD_SIZE) {
			
			//Current player won
			return true;
		}
	}
	
	//Current player did not win
	return false;
}