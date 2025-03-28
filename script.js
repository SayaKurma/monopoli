const board = document.querySelector(".board");
const path = [];
let playerElements = [];

const positions = [
    { x: 0, y: 10, name: "Start" },
    { x: 1, y: 10, name: "Dili", color: "coklat", price: 60, rent: 6, isAvailable: true, owner: null },
    { x: 2, y: 10, name: "Apes", symbol: "💀" },
    { x: 3, y: 10, name: "Kabul", color: "coklat", price: 80, rent: 8, isAvailable: true, owner: null },
    { x: 4, y: 10, name: "Tiket", cost: 50, symbol: "✈️" },
    { x: 5, y: 10, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 6, y: 10, name: "Hanoi", color: "cyan", price: 100, rent: 10, isAvailable: true, owner: null },
    { x: 7, y: 10, name: "Kesempatan", symbol: "❓" },
    { x: 8, y: 10, name: "Dhaka", color: "cyan", price: 120, rent: 12, isAvailable: true, owner: null },
    { x: 9, y: 10, name: "Manila", color: "cyan", price: 140, rent: 14, isAvailable: true, owner: null },
    { x: 10, y: 10, name: "Masuk Penjara" },
    { x: 10, y: 9, name: "Delhi", color: "pink", price: 160, rent: 16, isAvailable: true, owner: null },
    { x: 10, y: 8, name: "PLN", cost: 75, symbol: "⚡" },
    { x: 10, y: 7, name: "Bangkok", color: "pink", price: 180, rent: 18, isAvailable: true, owner: null },
    { x: 10, y: 6, name: "Beirut", color: "pink", price: 200, rent: 20, isAvailable: true, owner: null },
    { x: 10, y: 5, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 10, y: 4, name: "Tashkent", color: "oren", price: 220, rent: 22, isAvailable: true, owner: null },
    { x: 10, y: 3, name: "Apes", symbol: "💀" },
    { x: 10, y: 2, name: "Astana", color: "oren", price: 240, rent: 24, isAvailable: true, owner: null },
    { x: 10, y: 1, name: "Manama", color: "oren", price: 260, rent: 26, isAvailable: true, owner: null },
    { x: 10, y: 0, name: "Bebas Parkir" },
    { x: 9, y: 0, name: "Tehran", color: "merah", price: 280, rent: 28, isAvailable: true, owner: null },
    { x: 8, y: 0, name: "Kesempatan", symbol: "❓" },
    { x: 7, y: 0, name: "Bagdad", color: "merah", price: 300, rent: 30, isAvailable: true, owner: null },
    { x: 6, y: 0, name: "Riyadh", color: "merah", price: 320, rent: 32, isAvailable: true, owner: null },
    { x: 5, y: 0, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 4, y: 0, name: "Amman", color: "kuning", price: 340, rent: 34, isAvailable: true, owner: null },
    { x: 3, y: 0, name: "Doha", color: "kuning", price: 360, rent: 36, isAvailable: true, owner: null },
    { x: 2, y: 0, name: "PDAM", cost: 75, symbol: "🚰" },
    { x: 0, y: 0, name: "Lelang", symbol: "🔨" },
    { x: 1, y: 0, name: "Male", color: "kuning", price: 380, rent: 38, isAvailable: true, owner: null },
    { x: 0, y: 1, name: "Beijing", color: "hijau", price: 400, rent: 40, isAvailable: true, owner: null },
    { x: 0, y: 2, name: "Taipei", color: "hijau", price: 420, rent: 42, isAvailable: true, owner: null },
    { x: 0, y: 3, name: "Apes", symbol: "💀" },
    { x: 0, y: 4, name: "Seoul", color: "hijau", price: 440, rent: 44, isAvailable: true, owner: null },
    { x: 0, y: 5, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 0, y: 6, name: "Kesempatan", symbol: "❓" },
    { x: 0, y: 7, name: "Tokyo", color: "ungu", price: 460, rent: 46, isAvailable: true, owner: null },
    { x: 0, y: 8, name: "Tiket VIP", cost: 150, symbol: "🎟️" },
    { x: 0, y: 9, name: "Jakarta", color: "ungu", price: 500, rent: 50, isAvailable: true, owner: null }
];

for (let y = 0; y < 11; y++) {
    for (let x = 0; x < 11; x++) {
        const div = document.createElement("div");
        div.classList.add("cell");

        const tile = positions.find(p => p.x === x && p.y === y);
        if (tile) {
            div.dataset.pos = positions.indexOf(tile);
            if (tile.color) {
                div.classList.add("property", tile.color);
                div.innerHTML = `
                    <table class="property-table">
                        <thead><tr><td>Harga: ${tile.price}</td></tr></thead>
                        <tbody><tr><td>${tile.name}</td></tr></tbody>
                    </table>
                `;
            } else {
                div.classList.add("special-tile");
                div.textContent = tile.symbol ? `${tile.symbol} ${tile.name}` : tile.name;
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
let gameActive = false;

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const chanceEffects = [
    (player) => { player.money += 170; return `${player.name} mendapat hibah uang 170 dari Bank!`; },
    (player) => {
        if (player.money >= 130) {
            player.money -= 130;
            const opponent = players.find(p => p.name !== player.name && !p.bankrupt);
            if (opponent) {
                opponent.money += 130;
                return `${player.name} mendonasikan 130 kepada ${opponent.name}.`;
            }
            return `${player.name} tidak memiliki lawan untuk didonasikan.`;
        }
        return `${player.name} tidak memiliki cukup uang untuk mendonasikan 130.`;
    },
    (player) => { player.hasGetOutOfJailCard = true; return `${player.name} mendapatkan kartu bebas penjara!`; },
    (player, playerIndex) => {
        player.position = 0;
        movePlayer(playerIndex);
        player.money += 150;
        return `${player.name} maju ke Start dan mendapat 150!`;
    }
];

const apesEffects = [
    (player) => { player.money -= 100; return `${player.name} kehilangan 100 karena apes!`; },
    (player) => {
        player.inJail = true;
        player.jailTurns = 2;
        player.position = positions.findIndex(t => t.name === "Masuk Penjara");
        return `${player.name} masuk penjara selama 2 giliran karena apes!`;
    },
    (player) => { player.money -= 50; return `${player.name} membayar denda 50 karena apes!`; }
];

function startGame(mode) {
    gameMode = mode;
    initializePlayers();
    initializePlayerElements();
    document.getElementById('rollDiceButton').style.display = 'block';
    initPlayersPosition();
    document.getElementById("actionMessage").textContent = "";
    document.getElementById("gameOver").style.display = "none";
    gameActive = true;
    currentPlayerIndex = 0;
    updateTurnStatus();
}

function initializePlayers() {
    players = [];
    players.push({ name: 'Player 1', money: 1500, position: 0, bankrupt: false, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
    if (gameMode === 'local') {
        players.push({ name: 'Player 2', money: 1500, position: 0, bankrupt: false, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
    } else if (gameMode === 'ai') {
        players.push({ name: 'AI', money: 1500, position: 0, bankrupt: false, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
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
    if (!gameActive || (gameMode === 'ai' && currentPlayerIndex !== 0)) return;
    const currentPlayer = players[currentPlayerIndex];
    if (currentPlayer.bankrupt) return;

    const diceElement = document.getElementById("dice");
    diceElement.style.display = "block";
    diceElement.classList.add("rolling");

    let dice = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
        diceElement.classList.remove("rolling");
        diceElement.textContent = diceFaces[dice - 1];
        document.getElementById("diceResult").textContent = `Dadu: ${dice}`;

        if (currentPlayer.inJail) {
            handleJailTurn(currentPlayer, dice);
        } else {
            currentPlayer.position = (currentPlayer.position + dice) % positions.length;
            movePlayer(currentPlayerIndex);
            handleTileAction(currentPlayer, currentPlayerIndex);
        }
        setTimeout(() => { diceElement.style.display = "none"; }, 500);
    }, 1000); // Durasi animasi sesuai dengan CSS (1 detik)
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

    switch (tile.name) {
        case "Masuk Penjara":
            if (player.hasGetOutOfJailCard) {
                player.hasGetOutOfJailCard = false;
                message = `${player.name} menggunakan kartu bebas penjara!`;
            } else {
                player.inJail = true;
                player.jailTurns = 3;
                player.position = positions.findIndex(t => t.name === "Masuk Penjara");
                movePlayer(playerIndex);
                message = `${player.name} masuk penjara selama 3 giliran!`;
            }
            break;
        case "Kesempatan":
            message = chanceEffects[Math.floor(Math.random() * chanceEffects.length)](player, playerIndex);
            break;
        case "Apes":
            message = apesEffects[Math.floor(Math.random() * apesEffects.length)](player);
            break;
        case "Start":
            player.money += 150;
            message = `${player.name} mendarat di Start dan mendapat 150!`;
            break;
        case "Tiket":
        case "KAI":
        case "PLN":
        case "PDAM":
        case "Tiket VIP":
            player.money -= tile.cost;
            checkBankruptcy(player);
            message = `${player.name} membayar ${tile.cost} untuk ${tile.name}.`;
            break;
        case "Lelang":
            const owned = positions.filter(p => p.owner === player.name && p.price);
            if (owned.length > 0) {
                const property = owned[Math.floor(Math.random() * owned.length)];
                const sellPrice = Math.floor(property.price * 1.15);
                player.money += sellPrice;
                property.owner = null;
                property.isAvailable = true;
                message = `${player.name} menjual ${property.name} seharga ${sellPrice}!`;
            } else {
                message = `${player.name} tidak punya properti untuk dilelang.`;
            }
            break;
        default:
            if (tile.price && tile.isAvailable) {
                if (player.money >= tile.price && confirm(`Beli ${tile.name} seharga ${tile.price}?`)) {
                    buyProperty(player, tile);
                    message = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
                } else {
                    message = `${player.name} tidak membeli ${tile.name}.`;
                }
            } else if (tile.price && tile.owner && tile.owner !== player.name) {
                const owner = players.find(p => p.name === tile.owner);
                if (!owner.bankrupt && player.money >= tile.rent) {
                    player.money -= tile.rent;
                    owner.money += tile.rent;
                    message = `${player.name} membayar sewa ${tile.rent} ke ${tile.owner}.`;
                } else {
                    checkBankruptcy(player);
                    message = `${player.name} bangkrut karena tidak bisa bayar sewa ${tile.rent}.`;
                }
            } else {
                message = `${player.name} mendarat di ${tile.name}.`;
            }
    }

    document.getElementById("actionMessage").textContent = message;
    updatePlayerStatus();
    updateTurnStatus();
}

function handleJailTurn(player, dice) {
    if (dice === 6) {
        player.inJail = false;
        player.jailTurns = 0;
        player.position = (player.position + dice) % positions.length;
        movePlayer(players.indexOf(player));
        document.getElementById("actionMessage").textContent = `${player.name} melempar dadu 6 dan keluar dari penjara! Bergerak ${dice} langkah.`;
        handleTileAction(player, players.indexOf(player));
    } else {
        player.jailTurns -= 1;
        if (player.jailTurns <= 0) {
            player.inJail = false;
            document.getElementById("actionMessage").textContent = `${player.name} keluar dari penjara setelah melempar dadu.`;
        } else {
            document.getElementById("actionMessage").textContent = `${player.name} melempar dadu ${dice}, tetap di penjara. Sisa ${player.jailTurns} giliran.`;
        }
    }
    updateTurnStatus();
}

function buyProperty(player, property) {
    player.money -= property.price;
    property.owner = player.name;
    property.isAvailable = false;
}

function checkBankruptcy(player) {
    if (player.money < 0) {
        player.bankrupt = true;
        playerElements[players.indexOf(player)].style.display = "none";
        document.getElementById("actionMessage").textContent = `${player.name} bangkrut!`;
    }
}

function updateTurnStatus() {
    if (!gameActive) return;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    while (players[currentPlayerIndex].bankrupt) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }
    document.getElementById("turnStatus").textContent = `Giliran ${players[currentPlayerIndex].name}!`;
    if (gameMode === 'ai' && currentPlayerIndex === 1) aiTakeTurn();
    checkGameOver();
}

function aiTakeTurn() {
    setTimeout(() => {
        const aiPlayer = players[1];
        if (aiPlayer.bankrupt) return updateTurnStatus();

        const diceElement = document.getElementById("dice");
        diceElement.style.display = "block";
        diceElement.classList.add("rolling");

        let dice = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => {
            diceElement.classList.remove("rolling");
            diceElement.textContent = diceFaces[dice - 1];
            document.getElementById("diceResult").textContent = `Dadu AI: ${dice}`;

            if (aiPlayer.inJail) {
                handleJailTurn(aiPlayer, dice);
            } else {
                aiPlayer.position = (aiPlayer.position + dice) % positions.length;
                movePlayer(1);
                handleTileAction(aiPlayer, 1);
            }
            setTimeout(() => { diceElement.style.display = "none"; }, 500);
        }, 1000); 
    }, 1000);
}

function checkGameOver() {
    const activePlayers = players.filter(p => !p.bankrupt);
    if (activePlayers.length <= 1) {
        gameActive = false;
        document.getElementById("rollDiceButton").style.display = "none";
        document.getElementById("gameOver").textContent = activePlayers.length === 1 ?
            `${activePlayers[0].name} menang!` : "Permainan berakhir tanpa pemenang!";
        document.getElementById("gameOver").style.display = "block";
    }
}

function updatePlayerStatus() {
    const statusDiv = document.getElementById("playerStatus");
    statusDiv.innerHTML = "";
    players.forEach(player => {
        const owned = positions.filter(p => p.owner === player.name).map(p => p.name).join(", ");
        let text = `${player.name}: Uang = ${player.money}, Properti = ${owned || "Tidak ada"}`;
        if (player.inJail) text += ` (Penjara: ${player.jailTurns} giliran)`;
        if (player.bankrupt) text += " (Bangkrut)";
        if (player.hasGetOutOfJailCard) text += " (Kartu Bebas)";
        statusDiv.innerHTML += `<div>${text}</div>`;
    });
}