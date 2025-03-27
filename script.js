const board = document.querySelector(".board");
const path = [];
let playerElements = [];

const positions = [
    { x: 0, y: 10, name: "Start" },
    { x: 1, y: 10, name: "Pyongyang", color: "dimgray", price: 200, isAvailable: true, owner: null },
    { x: 2, y: 10, name: "Tehran", color: "firebrick", price: 230, isAvailable: true, owner: null },
    { x: 3, y: 10, name: "Tokyo", color: "goldenrod", price: 300, isAvailable: true, owner: null },
    { x: 4, y: 10, name: "Hanoi", color: "orange", price: 250, isAvailable: true, owner: null },
    { x: 5, y: 10, name: "Delhi", color: "pink", price: 270, isAvailable: true, owner: null },
    { x: 6, y: 10, name: "Seoul", color: "blue", price: 400, isAvailable: true, owner: null },
    { x: 7, y: 10, name: "Kuala Lumpur", color: "purple", price: 350, isAvailable: true, owner: null },
    { x: 8, y: 10, name: "Manila", color: "grey", price: 260, isAvailable: true, owner: null },
    { x: 9, y: 10, name: "Dili", color: "olive", price: 120, isAvailable: true, owner: null },
    { x: 10, y: 10, name: "Masuk Penjara" },
    { x: 10, y: 9, name: "Tiket" },
    { x: 10, y: 8, name: "Phnom Penh", color: "gold", price: 180, isAvailable: true, owner: null },
    { x: 10, y: 7, name: "Beijing", color: "green", price: 450, isAvailable: true, owner: null },
    { x: 10, y: 6, name: "Manama", color: "beige", price: 330, isAvailable: true, owner: null },
    { x: 10, y: 5, name: "Damaskus", color: "cyan", price: 150, isAvailable: true, owner: null },
    { x: 10, y: 4, name: "PLN" },
    { x: 10, y: 3, name: "Kathmandu", color: "silver", price: 220, isAvailable: true, owner: null },
    { x: 10, y: 2, name: "Vientiane", color: "brown", price: 200, isAvailable: true, owner: null },
    { x: 10, y: 1, name: "PDAM" },
    { x: 10, y: 0, name: "Bebas Parkir" },
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

function startGame(mode) {
    gameMode = mode;
    initializePlayers();
    initializePlayerElements();
    if (gameMode === 'ai') {
        initializeAI();
    }
    document.getElementById('rollDiceButton').style.display = 'block';
    initPlayersPosition();
    document.getElementById("actionMessage").textContent = "";
}

function initializePlayers() {
    players = [];
    players.push({ name: 'Player 1', money: 1500, position: 0 });
    if (gameMode === 'local') {
        players.push({ name: 'Player 2', money: 1500, position: 0 });
    } else if (gameMode === 'ai') {
        players.push({ name: 'AI', money: 1500, position: 0 });
    }
}

function initializePlayerElements() {
    playerElements = [];
    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.innerHTML = index === 0 ? "♟" : "♞";
        playerDiv.style.backgroundColor = index === 0 ? "red" : "blue";
        document.body.appendChild(playerDiv);
        playerElements.push(playerDiv);
    });
}

function initPlayersPosition() {
    players.forEach((player, index) => {
        const startCell = path.find(cell => cell.dataset.pos == 0);
        const rect = startCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        const offsetX = rect.left - boardRect.left + (index * 10);
        const offsetY = rect.top - boardRect.top + (index * 10);
        playerElements[index].style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function rollDice() {
    if (!isPlayerTurn) {
        alert("Tunggu giliranmu!");
        return;
    }

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").textContent = "Dadu: " + dice;

    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.position = (currentPlayer.position + dice) % positions.length;

    movePlayer(currentPlayerIndex);
    handleTileAction(currentPlayer, currentPlayerIndex);
    updateTurnStatus();
}

function movePlayer(playerIndex) {
    const target = positions[players[playerIndex].position];
    const targetCell = path.find(cell => cell.dataset.pos == players[playerIndex].position);

    if (targetCell) {
        const rect = targetCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        const offsetX = rect.left - boardRect.left + (playerIndex * 10);
        const offsetY = rect.top - boardRect.top + (playerIndex * 10);

        playerElements[playerIndex].style.transition = "transform 0.5s ease";
        playerElements[playerIndex].style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
}

function handleTileAction(player, playerIndex) {
    const tile = positions[player.position];
    if (tile.price && tile.isAvailable) {
        if (player.money >= tile.price) {
            buyProperty(player, tile);
            document.getElementById("actionMessage").textContent = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
        } else {
            document.getElementById("actionMessage").textContent = `${player.name} tidak punya cukup uang untuk membeli ${tile.name}.`;
        }
    } else if (tile.price && !tile.isAvailable && tile.owner !== player.name) {
        document.getElementById("actionMessage").textContent = `${tile.name} sudah dimiliki oleh ${tile.owner}.`;
    } else {
        document.getElementById("actionMessage").textContent = `${player.name} mendarat di ${tile.name}.`;
    }
}

function updateTurnStatus() {
    isPlayerTurn = !isPlayerTurn;
    const turnStatus = document.getElementById("turnStatus");
    turnStatus.textContent = isPlayerTurn ? `Giliran ${players[currentPlayerIndex].name}!` : `${players[currentPlayerIndex].name} sedang bermain`;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function buyProperty(player, property) {
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.name;
        property.isAvailable = false;
    }
}const board = document.querySelector(".board");
const path = [];
let playerElements = [];

const positions = [
    { x: 0, y: 10, name: "Start" },
    { x: 1, y: 10, name: "Pyongyang", color: "dimgray", price: 200, isAvailable: true, owner: null },
    { x: 2, y: 10, name: "Tehran", color: "firebrick", price: 230, isAvailable: true, owner: null },
    { x: 3, y: 10, name: "Tokyo", color: "goldenrod", price: 300, isAvailable: true, owner: null },
    { x: 4, y: 10, name: "Hanoi", color: "orange", price: 250, isAvailable: true, owner: null },
    { x: 5, y: 10, name: "Delhi", color: "pink", price: 270, isAvailable: true, owner: null },
    { x: 6, y: 10, name: "Seoul", color: "blue", price: 400, isAvailable: true, owner: null },
    { x: 7, y: 10, name: "Kuala Lumpur", color: "purple", price: 350, isAvailable: true, owner: null },
    { x: 8, y: 10, name: "Manila", color: "grey", price: 260, isAvailable: true, owner: null },
    { x: 9, y: 10, name: "Dili", color: "olive", price: 120, isAvailable: true, owner: null },
    { x: 10, y: 10, name: "Masuk Penjara" },
    { x: 10, y: 9, name: "Tiket" },
    { x: 10, y: 8, name: "Phnom Penh", color: "gold", price: 180, isAvailable: true, owner: null },
    { x: 10, y: 7, name: "Beijing", color: "green", price: 450, isAvailable: true, owner: null },
    { x: 10, y: 6, name: "Manama", color: "beige", price: 330, isAvailable: true, owner: null },
    { x: 10, y: 5, name: "Damaskus", color: "cyan", price: 150, isAvailable: true, owner: null },
    { x: 10, y: 4, name: "PLN" },
    { x: 10, y: 3, name: "Kathmandu", color: "silver", price: 220, isAvailable: true, owner: null },
    { x: 10, y: 2, name: "Vientiane", color: "brown", price: 200, isAvailable: true, owner: null },
    { x: 10, y: 1, name: "PDAM" },
    { x: 10, y: 0, name: "Bebas Parkir" },
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

function startGame(mode) {
    gameMode = mode;
    initializePlayers();
    initializePlayerElements();
    if (gameMode === 'ai') {
        initializeAI();
    }
    document.getElementById('rollDiceButton').style.display = 'block';
    initPlayersPosition();
    document.getElementById("actionMessage").textContent = "";
}

function initializePlayers() {
    players = [];
    players.push({ name: 'Player 1', money: 1500, position: 0 });
    if (gameMode === 'local') {
        players.push({ name: 'Player 2', money: 1500, position: 0 });
    } else if (gameMode === 'ai') {
        players.push({ name: 'AI', money: 1500, position: 0 });
    }
}

function initializePlayerElements() {
    playerElements = [];
    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.innerHTML = index === 0 ? "♟" : "♞";
        playerDiv.style.backgroundColor = index === 0 ? "red" : "blue";
        document.body.appendChild(playerDiv);
        playerElements.push(playerDiv);
    });
}

function initPlayersPosition() {
    players.forEach((player, index) => {
        const startCell = path.find(cell => cell.dataset.pos == 0);
        const rect = startCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        const offsetX = rect.left - boardRect.left + (index * 10);
        const offsetY = rect.top - boardRect.top + (index * 10);
        playerElements[index].style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function rollDice() {
    if (!isPlayerTurn) {
        alert("Tunggu giliranmu!");
        return;
    }

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").textContent = "Dadu: " + dice;

    const currentPlayer = players[currentPlayerIndex];
    currentPlayer.position = (currentPlayer.position + dice) % positions.length;

    movePlayer(currentPlayerIndex);
    handleTileAction(currentPlayer, currentPlayerIndex);
    updateTurnStatus();
}

function movePlayer(playerIndex) {
    const target = positions[players[playerIndex].position];
    const targetCell = path.find(cell => cell.dataset.pos == players[playerIndex].position);

    if (targetCell) {
        const rect = targetCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        const offsetX = rect.left - boardRect.left + (playerIndex * 10);
        const offsetY = rect.top - boardRect.top + (playerIndex * 10);

        playerElements[playerIndex].style.transition = "transform 0.5s ease";
        playerElements[playerIndex].style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
}

function handleTileAction(player, playerIndex) {
    const tile = positions[player.position];
    if (tile.price && tile.isAvailable) {
        if (player.money >= tile.price) {
            buyProperty(player, tile);
            document.getElementById("actionMessage").textContent = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
        } else {
            document.getElementById("actionMessage").textContent = `${player.name} tidak punya cukup uang untuk membeli ${tile.name}.`;
        }
    } else if (tile.price && !tile.isAvailable && tile.owner !== player.name) {
        document.getElementById("actionMessage").textContent = `${tile.name} sudah dimiliki oleh ${tile.owner}.`;
    } else {
        document.getElementById("actionMessage").textContent = `${player.name} mendarat di ${tile.name}.`;
    }
}

function updateTurnStatus() {
    isPlayerTurn = !isPlayerTurn;
    const turnStatus = document.getElementById("turnStatus");
    turnStatus.textContent = isPlayerTurn ? `Giliran ${players[currentPlayerIndex].name}!` : `${players[currentPlayerIndex].name} sedang bermain`;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function buyProperty(player, property) {
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.name;
        property.isAvailable = false;
    }
}
