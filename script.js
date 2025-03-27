const board = document.querySelector(".board");
const path = [];
let playerElements = [];

const positions = [
    { x: 0, y: 10, name: "Start" }, 
    { x: 1, y: 10, name: "Pyongyang", color: "dimgray", price: 200, rent: 20, isAvailable: true, owner: null }, 
    { x: 2, y: 10, name: "Tehran", color: "firebrick", price: 230, rent: 23, isAvailable: true, owner: null }, 
    { x: 3, y: 10, name: "Tokyo", color: "goldenrod", price: 300, rent: 30, isAvailable: true, owner: null },
    { x: 4, y: 10, name: "Hanoi", color: "orange", price: 250, rent: 25, isAvailable: true, owner: null }, 
    { x: 5, y: 10, name: "Delhi", color: "pink", price: 270, rent: 27, isAvailable: true, owner: null }, 
    { x: 6, y: 10, name: "Seoul", color: "blue", price: 400, rent: 40, isAvailable: true, owner: null }, 
    { x: 7, y: 10, name: "Kuala Lumpur", color: "purple", price: 350, rent: 35, isAvailable: true, owner: null },
    { x: 8, y: 10, name: "Manila", color: "grey", price: 260, rent: 26, isAvailable: true, owner: null }, 
    { x: 9, y: 10, name: "Dili", color: "olive", price: 120, rent: 12, isAvailable: true, owner: null }, 
    { x: 10, y: 10, name: "Masuk Penjara" },
    { x: 10, y: 9, name: "Tiket" }, 
    { x: 10, y: 8, name: "Phnom Penh", color: "gold", price: 180, rent: 18, isAvailable: true, owner: null }, 
    { x: 10, y: 7, name: "Beijing", color: "green", price: 450, rent: 45, isAvailable: true, owner: null }, 
    { x: 10, y: 6, name: "Manama", color: "beige", price: 330, rent: 33, isAvailable: true, owner: null },
    { x: 10, y: 5, name: "Damaskus", color: "cyan", price: 150, rent: 15, isAvailable: true, owner: null }, 
    { x: 10, y: 4, name: "PLN", cost: 50 },
    { x: 10, y: 3, name: "Kathmandu", color: "silver", price: 220, rent: 22, isAvailable: true, owner: null }, 
    { x: 10, y: 2, name: "Vientiane", color: "brown", price: 200, rent: 20, isAvailable: true, owner: null },
    { x: 10, y: 1, name: "PDAM", cost: 50 },
    { x: 10, y: 0, name: "Bebas Parkir" }
];

for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 11; x++) {
        const div = document.createElement("div");
        div.classList.add("cell");

        const tile = positions.find(p => p.x === x && p.y === y);
        if (tile) {
            div.textContent = tile.name || "⏳";
            div.dataset.pos = positions.indexOf(tile);
            if (tile.color) {
                div.style.backgroundColor = tile.color;
                div.textContent += `\nHarga: ${tile.price}`;
            }
            path.push(div);
        } else {
            div.classList.add("empty");
        }

        if ((x === 0 && y === 10) || (x === 10 && y === 10) || (x === 10 && y === 0) || (x === 0 && y === 0)) {
            div.classList.add("corner");
        }

        board.appendChild(div);
    }
}

let gameMode = 'local';
let players = [];
let currentPlayerIndex = 0;
let isPlayerTurn = true;
let gameActive = false;

function startGame(mode) {
    gameMode = mode;
    initializePlayers();
    initializePlayerElements();
    document.getElementById('rollDiceButton').style.display = 'block';
    initPlayersPosition();
    document.getElementById("actionMessage").textContent = "";
    document.getElementById("gameOver").style.display = "none";
    gameActive = true;
    updatePlayerStatus();
}

function initializePlayers() {
    players = [];
    players.push({ name: 'Player 1', money: 1500, position: 0, bankrupt: false });
    if (gameMode === 'local') {
        players.push({ name: 'Player 2', money: 1500, position: 0, bankrupt: false });
    }
}

function initializePlayerElements() {
    playerElements = [];
    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.innerHTML = index === 0 ? "♟" : "♞";
        playerDiv.style.backgroundColor = index === 0 ? "red" : "blue";
        const startCell = path.find(cell => cell.dataset.pos == 0);
        startCell.appendChild(playerDiv);
        playerElements.push(playerDiv);
    });
}

function rollDice() {
    if (!gameActive || !isPlayerTurn) return;

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").textContent = "Dadu: " + dice;

    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.position = (currentPlayer.position + dice) % positions.length;

    movePlayer(currentPlayerIndex);
    handleTileAction(currentPlayer, currentPlayerIndex);
    updateTurnStatus();
}

function movePlayer(playerIndex) {
    const targetCell = path.find(cell => cell.dataset.pos == players[playerIndex].position);
    if (targetCell) {
        targetCell.appendChild(playerElements[playerIndex]);
    }
}

function handleTileAction(player, playerIndex) {
    if (player.bankrupt) return;

    const tile = positions[player.position];
    let message = `${player.name} mendarat di ${tile.name}.`;

    if (tile.tax) {
        player.money -= tile.tax;
        checkBankruptcy(player);
        message = `${player.name} membayar pajak ${tile.tax}.`;
    } else if (tile.cost) {
        player.money -= tile.cost;
        checkBankruptcy(player);
        message = `${player.name} membayar ${tile.cost} untuk ${tile.name}.`;
    }

    document.getElementById("actionMessage").textContent = message;
    updatePlayerStatus();
}

function updateTurnStatus() {
    if (!gameActive) return;

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    checkGameOver();
}

function checkBankruptcy(player) {
    if (player.money < 0) {
        player.bankrupt = true;
        playerElements[players.indexOf(player)].style.display = "none";
        document.getElementById("actionMessage").textContent = `${player.name} bangkrut!`;
    }
}

function checkGameOver() {
    const activePlayers = players.filter(p => !p.bankrupt);
    if (activePlayers.length <= 1) {
        gameActive = false;
        document.getElementById("rollDiceButton").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("gameOver").textContent = activePlayers.length === 1 ? 
            `${activePlayers[0].name} menang!` : "Permainan berakhir tanpa pemenang!";
    }
}

function updatePlayerStatus() {
    const statusDiv = document.getElementById("playerStatus");
    statusDiv.innerHTML = "";
    players.forEach(player => {
        const statusText = `${player.name}: Uang = ${player.money} ${player.bankrupt ? "(Bangkrut)" : ""}`;
        const p = document.createElement("div");
        p.textContent = statusText;
        statusDiv.appendChild(p);
    });
}