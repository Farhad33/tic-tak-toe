const prompt = require('prompt-sync')();

function game() {
    let board = new boardInit()
    let nameOne = prompt('Whats the first player name? ');
    let nameSecond = prompt('Whats the second player name? ');

    let playerOne = new player(nameOne, true)
    let playerTwo = new player(nameSecond, false)
    display(board)

    while(true) {
        editBoard(playerOne, playerTwo, board)
        display(board)
        let result = check(board, playerOne, playerTwo)
        if(result.won) {
            return console.log(`Player ${result.name} Won!`);
        }
    }
}

function check(board, playerOne, playerTwo) {
    // check column
    for (let i = 0; i < board.length; i++) {
        let counter = {
            one:  0,
            two: 0
        }
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == playerOne.name[0]) {
                counter.one++
            }
            if (board[i][j] == playerTwo.name[0]) {
                counter.two++
            }
        }
        if (counter.one === 3) {
            return {
                ...playerOne,
                won: true
            }
        }
        if (counter.two === 3) {
            return {
                ...playerTwo,
                won: true
            }
        }
    }

    // check row
    for (let i = 0; i < board.length; i++) {
        let counter = {
            one:  0,
            two: 0
        }
        for (let j = 0; j < board[i].length; j++) {
            if (board[j][i] == playerOne.name[0]) {
                counter.one++
            }
            if (board[j][i] == playerTwo.name[0]) {
                counter.two++
            }
        }
        if (counter.one === 3) {
            return {
                ...playerOne,
                won: true
            }
        }
        if (counter.two === 3) {
            return {
                ...playerTwo,
                won: true
            }
        }
    }

    // check diagonal
    let counter = {
        one:  0,
        two: 0
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] == playerOne.name[0]) {
            counter.one++
        }
        if (board[i][i] == playerTwo.name[0]) {
            counter.two++
        }
        if (counter.one === 3) {
            return {
                ...playerOne,
                won: true
            }
        }
        if (counter.two === 3) {
            return {
                ...playerTwo,
                won: true
            }
        }
    }
    let j =  board.length - 1
    counter = {
        one:  0,
        two: 0
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i][j] == playerOne.name[0]) {
            counter.one++
        }
        if (board[i][j] == playerTwo.name[0]) {
            counter.two++
        }
        if (counter.one === 3) {
            return {
                ...playerOne,
                won: true
            }
        }
        if (counter.two === 3) {
            return {
                ...playerTwo,
                won: true
            }
        }
        j--
    }


    return {won: false}
}

function editBoard(playerOne, playerTwo, board) { 
    let move
    let name
    if(playerOne.turn) {
        move = prompt(`${playerOne.name}, it's your turn:`)
        name = playerOne.name[0]
    }
    if(playerTwo.turn) {
        move = prompt(`${playerTwo.name}, it's your turn:`)
        name = playerTwo.name[0]
    }
    playerOne.turn = !playerOne.turn
    playerTwo.turn = !playerTwo.turn
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == move) {
                board[i][j] = name
            }
        }   
    }
}

function player(name, turn) {
    this.name = name
    this.turn = turn
}

function boardInit() {
    this.board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    return this.board
}

function display(board) {
    board.forEach((column) => {
        column.forEach(row => {
            process.stdout.write(`${row}    `);
        })
        console.log('')
    })
}
game()