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
    { x: 10, y: 0, name: "Bebas Parkir" },
    { x: 9, y: 0, name: "Thimphu", color: "navy", price: 160, rent: 16, isAvailable: true, owner: null }, 
    { x: 8, y: 0, name: "Ulaanbaatar", color: "magenta", price: 140, rent: 14, isAvailable: true, owner: null }, 
    { x: 7, y: 0, name: "Bangkok", color: "yellow", price: 350, rent: 35, isAvailable: true, owner: null }, 
    { x: 6, y: 0, name: "Dhaka", color: "lime", price: 280, rent: 28, isAvailable: true, owner: null },
    { x: 5, y: 0, name: "Islamabad", color: "maroon", price: 200, rent: 20, isAvailable: true, owner: null }, 
    { x: 4, y: 0, name: "Bea Cukai", tax: 100 },
    { x: 3, y: 0, name: "Dushanbe", color: "coral", price: 210, rent: 21, isAvailable: true, owner: null }, 
    { x: 2, y: 0, name: "Ashgabat", color: "violet", price: 240, rent: 24, isAvailable: true, owner: null },
    { x: 0, y: 0, name: "Kesempatan" }, 
    { x: 1, y: 0, name: "Sana'a", color: "red", price: 230, rent: 23, isAvailable: true, owner: null },
    { x: 0, y: 1, name: "Yerevan", color: "orchid", price: 130, rent: 13, isAvailable: true, owner: null }, 
    { x: 0, y: 2, name: "Tbilisi", color: "plum", price: 240, rent: 24, isAvailable: true, owner: null }, 
    { x: 0, y: 3, name: "Baku", color: "peru", price: 260, rent: 26, isAvailable: true, owner: null }, 
    { x: 0, y: 4, name: "Tashkent", color: "tan", price: 190, rent: 19, isAvailable: true, owner: null },
    { x: 0, y: 5, name: "Jakarta", color: "purple", price: 300, rent: 30, isAvailable: true, owner: null }, 
    { x: 0, y: 6, name: "Amman", color: "chocolate", price: 290, rent: 29, isAvailable: true, owner: null }, 
    { x: 0, y: 7, name: "Doha", color: "crimson", price: 320, rent: 32, isAvailable: true, owner: null }, 
    { x: 0, y: 8, name: "Baghdad", color: "lightblue", price: 270, rent: 27, isAvailable: true, owner: null },
    { x: 0, y: 9, name: "Jerusalem", color: "indigo", price: 270, rent: 27, isAvailable: true, owner: null }
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
    if (gameMode === 'ai') {
        initializeAI();
    }
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
    } else if (gameMode === 'ai') {
        players.push({ name: 'AI', money: 1500, position: 0, bankrupt: false });
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

function initPlayersPosition() {
    players.forEach((player, index) => {
        const startCell = path.find(cell => cell.dataset.pos == 0);
        playerElements[index].style.left = `${50 + index * 10}%`; 
        playerElements[index].style.top = `${50 + index * 10}%`; 
        playerElements[index].style.transform = "translate(-50%, -50%)";
    });
}

function rollDice() {
    if (!gameActive || !isPlayerTurn) {
        alert("Tunggu giliranmu atau permainan sudah selesai!");
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
    const targetCell = path.find(cell => cell.dataset.pos == players[playerIndex].position);
    if (targetCell) {
        targetCell.appendChild(playerElements[playerIndex]);
        playerElements[playerIndex].style.left = `${50 + playerIndex * 10}%`;
        playerElements[playerIndex].style.top = `${50 + playerIndex * 10}%`;
        playerElements[playerIndex].style.transform = "translate(-50%, -50%)";
    }
}

function handleTileAction(player, playerIndex) {
    if (player.bankrupt) return;

    const tile = positions[player.position];
    let message = "";

    if (tile.name === "Masuk Penjara") {
        player.position = positions.findIndex(t => t.name === "Masuk Penjara");
        movePlayer(playerIndex);
        message = `${player.name} masuk penjara!`;
    } else if (tile.name === "Kesempatan") {
        const chance = Math.random();
        if (chance < 0.5) {
            player.money += 100;
            message = `${player.name} mendapat 100 dari Kesempatan!`;
        } else {
            player.money -= 100;
            checkBankruptcy(player);
            message = `${player.name} kehilangan 100 dari Kesempatan!`;
        }
    } else if (tile.tax) {
        player.money -= tile.tax;
        checkBankruptcy(player);
        message = `${player.name} membayar pajak ${tile.tax} di Bea Cukai.`;
    } else if (tile.cost) {
        player.money -= tile.cost;
        checkBankruptcy(player);
        message = `${player.name} membayar ${tile.cost} untuk ${tile.name}.`;
    } else if (tile.price && tile.isAvailable) {
        if (player.money >= tile.price) {
            buyProperty(player, tile);
            message = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
        } else {
            message = `${player.name} tidak punya cukup uang untuk membeli ${tile.name}.`;
        }
    } else if (tile.price && !tile.isAvailable && tile.owner !== player.name) {
        const owner = players.find(p => p.name === tile.owner);
        if (!owner.bankrupt && player.money >= tile.rent) {
            player.money -= tile.rent;
            owner.money += tile.rent;
            message = `${player.name} membayar sewa ${tile.rent} ke ${tile.owner} untuk ${tile.name}.`;
        } else if (!owner.bankrupt) {
            player.money -= tile.rent;
            checkBankruptcy(player);
            message = `${player.name} tidak punya cukup uang untuk membayar sewa ${tile.rent} di ${tile.name}.`;
        }
    } else {
        message = `${player.name} mendarat di ${tile.name}.`;
    }

    document.getElementById("actionMessage").textContent = message;
    updatePlayerStatus();
}

function updateTurnStatus() {
    if (!gameActive) return;

    isPlayerTurn = !isPlayerTurn;
    const turnStatus = document.getElementById("turnStatus");
    if (isPlayerTurn) {
        turnStatus.textContent = `Giliran ${players[currentPlayerIndex].name}!`;
    } else {
        turnStatus.textContent = `${players[currentPlayerIndex].name} sedang bermain`;
        if (gameMode === 'ai' && currentPlayerIndex === 1) {
            aiTakeTurn();
        }
    }
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    checkGameOver();
}

function aiTakeTurn() {
    if (!gameActive) return;

    setTimeout(() => {
        const aiPlayer = players[1];
        if (aiPlayer.bankrupt) {
            updateTurnStatus();
            return;
        }

        let dice = Math.floor(Math.random() * 6) + 1;
        document.getElementById("diceResult").textContent = "Dadu AI: " + dice;

        aiPlayer.position = (aiPlayer.position + dice) % positions.length;
        movePlayer(1);
        handleTileAction(aiPlayer, 1);
        updateTurnStatus();
    }, 1000);
}

function buyProperty(player, property) {
    if (player.money >= property.price) {
        player.money -= property.price;
        property.owner = player.name;
        property.isAvailable = false;
    }
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
        const ownedProperties = positions.filter(p => p.owner === player.name).map(p => p.name).join(", ");
        const statusText = `${player.name}: Uang = ${player.money}, Properti = ${ownedProperties || "Tidak ada"} ${player.bankrupt ? "(Bangkrut)" : ""}`;
        const p = document.createElement("div");
        p.textContent = statusText;
        statusDiv.appendChild(p);
    });
}