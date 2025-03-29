const board = document.querySelector(".board");
const path = [];
let playerElements = [];

const positions = [
    { x: 0, y: 10, name: "Start" },
    { x: 1, y: 10, name: "Dili", color: "coklat", price: 60, rent: 6, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 2, y: 10, name: "Apes", symbol: "💀" },
    { x: 3, y: 10, name: "Kabul", color: "coklat", price: 80, rent: 8, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 4, y: 10, name: "Tiket", cost: 50, symbol: "✈️" },
    { x: 5, y: 10, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 6, y: 10, name: "Hanoi", color: "cyan", price: 100, rent: 10, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 7, y: 10, name: "Kesempatan", symbol: "❓" },
    { x: 8, y: 10, name: "Dhaka", color: "cyan", price: 120, rent: 12, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 9, y: 10, name: "Manila", color: "cyan", price: 140, rent: 14, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 10, name: "Masuk Penjara" },
    { x: 10, y: 9, name: "Delhi", color: "pink", price: 160, rent: 16, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 8, name: "PLN", cost: 75, symbol: "⚡" },
    { x: 10, y: 7, name: "Bangkok", color: "pink", price: 180, rent: 18, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 6, name: "Beirut", color: "pink", price: 200, rent: 20, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 5, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 10, y: 4, name: "Tashkent", color: "oren", price: 220, rent: 22, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 3, name: "Apes", symbol: "💀" },
    { x: 10, y: 2, name: "Astana", color: "oren", price: 240, rent: 24, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 1, name: "Manama", color: "oren", price: 260, rent: 26, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 10, y: 0, name: "Bebas Parkir" },
    { x: 9, y: 0, name: "Tehran", color: "merah", price: 280, rent: 28, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 8, y: 0, name: "Kesempatan", symbol: "❓" },
    { x: 7, y: 0, name: "Bagdad", color: "merah", price: 300, rent: 30, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 6, y: 0, name: "Riyadh", color: "merah", price: 320, rent: 32, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 5, y: 0, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 4, y: 0, name: "Amman", color: "kuning", price: 340, rent: 34, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 3, y: 0, name: "Doha", color: "kuning", price: 360, rent: 36, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 2, y: 0, name: "PDAM", cost: 75, symbol: "🚰" },
    { x: 0, y: 0, name: "Lelang", symbol: "🔨" },
    { x: 1, y: 0, name: "Male", color: "kuning", price: 380, rent: 38, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 0, y: 1, name: "Beijing", color: "hijau", price: 400, rent: 40, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 0, y: 2, name: "Taipei", color: "hijau", price: 420, rent: 42, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 0, y: 3, name: "Apes", symbol: "💀" },
    { x: 0, y: 4, name: "Seoul", color: "hijau", price: 440, rent: 44, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 0, y: 5, name: "KAI", cost: 100, symbol: "🚂" },
    { x: 0, y: 6, name: "Kesempatan", symbol: "❓" },
    { x: 0, y: 7, name: "Tokyo", color: "ungu", price: 460, rent: 46, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 },
    { x: 0, y: 8, name: "Tiket VIP", cost: 150, symbol: "🎟️" },
    { x: 0, y: 9, name: "Jakarta", color: "ungu", price: 500, rent: 50, isAvailable: true, owner: null, upgradeLevel: 0, rentIncome: 0 }
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

const bankImage = document.createElement("div");
bankImage.classList.add("bank-image");
bankImage.style.backgroundImage = "url('bank.png')";
bankImage.style.backgroundSize = "cover";
bankImage.style.backgroundPosition = "center";
board.appendChild(bankImage);

let gameMode = 'local';
let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let roundCount = 0;
const MAX_ROUNDS = 33;
const WINNING_RENT_INCOME = 2000;
let playerElo = 1200;
let aiElo = 1200;

const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const rollDiceSound = new Audio('sounds/roll-dice.mp3');
const moveSound = new Audio('sounds/move.mp3');
const transactionSound = new Audio('sounds/transaction.mp3');
const moneySound = new Audio('sounds/money.mp3');
const jailSound = new Audio('sounds/jail.mp3');

const chanceEffects = [
    (player) => { player.money += 170; moneySound.play(); return `${player.name} mendapat hibah uang 170 dari Bank!`; },
    (player) => {
        player.money -= 130;
        const opponent = players.find(p => p.name !== player.name);
        if (opponent) {
            opponent.money += 130;
            transactionSound.play();
            return `${player.name} mendonasikan 130 kepada ${opponent.name}.`;
        }
        return `${player.name} tidak memiliki lawan untuk didonasikan.`;
    },
    (player) => { player.hasGetOutOfJailCard = true; return `${player.name} mendapatkan kartu bebas penjara!`; },
    (player, playerIndex) => {
        player.position = 0;
        movePlayer(playerIndex);
        player.money += 150;
        moneySound.play();
        return `${player.name} maju ke Start dan mendapat 150!`;
    }
];

const apesEffects = [
    (player) => { player.money -= 100; moneySound.play(); return `${player.name} kehilangan 100 karena apes!`; },
    (player) => {
        player.inJail = true;
        player.jailTurns = 2;
        player.position = positions.findIndex(t => t.name === "Masuk Penjara");
        jailSound.play();
        return `${player.name} masuk penjara selama 2 giliran karena apes!`;
    },
    (player) => { player.money -= 50; moneySound.play(); return `${player.name} membayar denda 50 karena apes!`; }
];

function showBubbleText(message) {
    const bubble = document.getElementById("bubbleText");
    bubble.textContent = message;
    bubble.style.display = "block";
    setTimeout(() => {
        bubble.style.display = "none";
    }, 3000);
}

window.onload = () => {
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("modeSelection").style.display = "flex";
        updateEloDisplay();
    }, 2000);
};

function startGame(mode) {
    gameMode = mode;
    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    initializePlayers();
    initializePlayerElements();
    document.getElementById('rollDiceButton').style.display = 'block';
    initPlayersPosition();
    document.getElementById("gameOver").style.display = "none";
    gameActive = true;
    currentPlayerIndex = 0;
    roundCount = 0;
    updateTurnStatus();
    updatePlayerIcons();
    updateMoneyStatus();
}

function initializePlayers() {
    players = [];
    players.push({ name: 'Player 1', money: 2000, rentIncome: 0, position: 0, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
    if (gameMode === 'local') {
        players.push({ name: 'Player 2', money: 2000, rentIncome: 0, position: 0, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
    } else if (gameMode === 'ai') {
        players.push({ name: 'AI', money: 2000, rentIncome: 0, position: 0, inJail: false, jailTurns: 0, hasGetOutOfJailCard: false });
        aiElo = getAiEloBasedOnPlayerElo(playerElo);
    }
}

function initializePlayerElements() {
    playerElements.forEach(el => el.remove());
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

function updatePlayerIcons() {
    const player2Icon = document.getElementById("player2Icon");
    player2Icon.innerHTML = gameMode === 'ai' ? '<span class="material-symbols-outlined">smart_toy</span>' : '<span class="material-symbols-outlined">person</span>';
}

function rollDice() {
    if (!gameActive || (gameMode === 'ai' && currentPlayerIndex !== 0)) return;
    const currentPlayer = players[currentPlayerIndex];
    const rollDiceButton = document.getElementById("rollDiceButton");
    rollDiceButton.disabled = true;

    const diceElement = document.getElementById("dice");
    diceElement.style.display = "block";
    diceElement.classList.add("rolling");
    rollDiceSound.play();

    let dice = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
        diceElement.classList.remove("rolling");
        diceElement.textContent = diceFaces[dice - 1];

        if (currentPlayer.inJail) {
            handleJailTurn(currentPlayer, dice);
        } else {
            const oldPosition = currentPlayer.position;
            currentPlayer.position = (currentPlayer.position + dice) % positions.length;
            checkPassStart(oldPosition, currentPlayer.position, currentPlayer);
            movePlayer(currentPlayerIndex);
            handleTileAction(currentPlayer, currentPlayerIndex);
        }
        setTimeout(() => {
            diceElement.style.display = "none";
            updateRollDiceButtonState();
        }, 500);
    }, 1000);
}

function checkPassStart(oldPos, newPos, player) {
    if (oldPos > newPos || newPos === 0) {
        player.money += 150;
        moneySound.play();
        showBubbleText(`${player.name} melewati Start dan mendapat 150!`);
    }
}

function movePlayer(playerIndex) {
    const targetCell = path.find(cell => cell.dataset.pos == players[playerIndex].position);
    if (targetCell) {
        targetCell.appendChild(playerElements[playerIndex]);
        playerElements[playerIndex].style.left = `${50 + playerIndex * 10}%`;
        playerElements[playerIndex].style.top = `${50 + playerIndex * 10}%`;
        playerElements[playerIndex].style.transform = "translate(-50%, -50%)";
        moveSound.play();
    }
}

function calculateRent(tile) {
    return Math.floor(tile.rent * (1 + tile.upgradeLevel * 0.5));
}

function upgradeProperty(player, property, playerIndex) {
    const upgradeCost = Math.floor(property.price / 3);
    if (player.money >= upgradeCost) {
        player.money -= upgradeCost;
        property.upgradeLevel += 1;
        const newRent = calculateRent(property);
        transactionSound.play();

        const cell = path.find(c => c.dataset.pos == positions.indexOf(property));
        const label = cell.querySelector(".property-label");
        if (label) {
            label.textContent = `Sewa: ${newRent} (Lv${property.upgradeLevel})`;
        }

        return `${player.name} meningkatkan ${property.name} ke level ${property.upgradeLevel} seharga ${upgradeCost}! Sewa sekarang ${newRent}.`;
    }
    return `${player.name} tidak punya cukup uang untuk meningkatkan ${property.name}.`;
}

function handleTileAction(player, playerIndex) {
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
                jailSound.play();
                message = `${player.name} masuk penjara selama 3 giliran!`;
            }
            break;
        case "Kesempatan":
            message = chanceEffects[Math.floor(Math.random() * chanceEffects.length)](player, playerIndex);
            break;
        case "Apes":
            message = apesEffects[Math.floor(Math.random() * apesEffects.length)](player);
            break;
        case "Tiket":
        case "KAI":
        case "PLN":
        case "PDAM":
        case "Tiket VIP":
            player.money -= tile.cost;
            transactionSound.play();
            message = `${player.name} membayar ${tile.cost} untuk ${tile.name}.`;
            break;
        case "Lelang":
            message = handleAuction(player, playerIndex);
            break;
        default:
            if (tile.price && tile.isAvailable) {
                if (player.money >= tile.price) {
                    if (player.name === 'AI') {
                        const shouldBuy = aiDecideToBuy(player, tile);
                        if (shouldBuy) {
                            buyProperty(player, tile, playerIndex);
                            message = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
                        } else {
                            message = `${player.name} tidak membeli ${tile.name}.`;
                        }
                    } else if (confirm(`Beli ${tile.name} seharga ${tile.price}?`)) {
                        buyProperty(player, tile, playerIndex);
                        message = `${player.name} membeli ${tile.name} seharga ${tile.price}!`;
                    } else {
                        message = `${player.name} tidak membeli ${tile.name}.`;
                    }
                } else {
                    message = `${player.name} tidak punya cukup uang untuk membeli ${tile.name}.`;
                }
            } else if (tile.price && tile.owner === player.name) {
                const upgradeCost = Math.floor(tile.price / 3);
                if (player.money >= upgradeCost) {
                    if (player.name === 'AI') {
                        const shouldUpgrade = aiDecideToUpgrade(player, tile);
                        if (shouldUpgrade) {
                            message = upgradeProperty(player, tile, playerIndex);
                        } else {
                            message = `${player.name} memilih tidak meningkatkan ${tile.name}.`;
                        }
                    } else if (confirm(`Tingkatkan ${tile.name} seharga ${upgradeCost} untuk meningkatkan sewa?`)) {
                        message = upgradeProperty(player, tile, playerIndex);
                    } else {
                        message = `${player.name} mendarat di ${tile.name} miliknya sendiri.`;
                    }
                }
            } else if (tile.price && tile.owner && tile.owner !== player.name) {
                const owner = players.find(p => p.name === tile.owner);
                const currentRent = calculateRent(tile);
                player.money -= currentRent;
                player.rentIncome -= currentRent;
                owner.money += currentRent;
                owner.rentIncome += currentRent;
                tile.rentIncome += currentRent;
                transactionSound.play();
                message = `${player.name} membayar sewa ${currentRent} ke ${tile.owner}.`;
            } else {
                message = `${player.name} mendarat di ${tile.name}.`;
            }
    }

    if (player.money < 0) {
        endGame(`${player.name} bangkrut! Permainan berakhir.`);
        return;
    }

    showBubbleText(message);
    updateMoneyStatus();
    updateTurnStatus();
}

function handleJailTurn(player, dice) {
    if (dice === 6) {
        player.inJail = false;
        player.jailTurns = 0;
        player.position = (player.position + dice) % positions.length;
        movePlayer(players.indexOf(player));
        showBubbleText(`${player.name} melempar dadu 6 dan keluar dari penjara! Bergerak ${dice} langkah.`);
        handleTileAction(player, players.indexOf(player));
    } else {
        player.jailTurns -= 1;
        if (player.jailTurns <= 0) {
            player.inJail = false;
            showBubbleText(`${player.name} keluar dari penjara setelah melempar dadu.`);
        } else {
            showBubbleText(`${player.name} melempar dadu ${dice}, tetap di penjara. Sisa ${player.jailTurns} giliran.`);
        }
    }
    updateMoneyStatus();
    updateTurnStatus();
}

function buyProperty(player, property, playerIndex) {
    player.money -= property.price;
    property.owner = player.name;
    property.isAvailable = false;
    transactionSound.play();

    const cell = path.find(c => c.dataset.pos == positions.indexOf(property));
    const label = document.createElement("div");
    label.classList.add("property-label");
    label.classList.add(player.name === "Player 1" ? "player1" : "player2");
    label.textContent = `Sewa: ${property.rent} (Lv${property.upgradeLevel})`;
    const thead = cell.querySelector("thead");
    thead.insertAdjacentElement("afterend", label);
}

function handleAuction(player, playerIndex) {
    const owned = positions.filter(p => p.owner === player.name && p.price);
    if (owned.length === 0) return `${player.name} tidak punya properti untuk dilelang.`;

    let selectedProperty = null;
    if (player.name !== 'AI') {
        showBubbleText(`${player.name}, pilih properti untuk dilelang dengan menge-tap petak.`);
        path.forEach(cell => {
            const pos = positions[cell.dataset.pos];
            if (pos && pos.owner === player.name && pos.price) {
                cell.style.cursor = "pointer";
                cell.onclick = () => {
                    selectedProperty = pos;
                    cell.style.cursor = "default";
                    cell.onclick = null;
                    proceedWithAuction(player, selectedProperty, playerIndex);
                };
            }
        });
        return `${player.name} sedang memilih properti untuk dilelang...`;
    } else {
        selectedProperty = owned[Math.floor(Math.random() * owned.length)];
        return proceedWithAuction(player, selectedProperty, playerIndex);
    }
}

function proceedWithAuction(player, property, playerIndex) {
    if (!property) return `${player.name} tidak memilih properti untuk dilelang.`;

    const opponent = players.find(p => p.name !== player.name);
    if (confirm(`${player.name} ingin menukar ${property.name}. ${opponent.name}, tertarik untuk barter?`)) {
        const opponentOwned = positions.filter(p => p.owner === opponent.name && p.price);
        if (opponentOwned.length === 0) {
            return `${opponent.name} tidak punya properti untuk ditukar.`;
        }

        let opponentProperty = null;
        if (opponent.name !== 'AI') {
            showBubbleText(`${opponent.name}, pilih properti untuk ditukar dengan menge-tap petak.`);
            path.forEach(cell => {
                const pos = positions[cell.dataset.pos];
                if (pos && pos.owner === opponent.name && pos.price) {
                    cell.style.cursor = "pointer";
                    cell.onclick = () => {
                        opponentProperty = pos;
                        cell.style.cursor = "default";
                        cell.onclick = null;
                        finalizeAuction(player, property, opponent, opponentProperty);
                    };
                }
            });
            return `${opponent.name} sedang memilih properti untuk ditukar...`;
        } else {
            opponentProperty = opponentOwned[Math.floor(Math.random() * opponentOwned.length)];
            return finalizeAuction(player, property, opponent, opponentProperty);
        }
    } else {
        return `${opponent.name} menolak barter.`;
    }
}

function finalizeAuction(player, property, opponent, opponentProperty) {
    if (!opponentProperty) return `${opponent.name} tidak memilih properti untuk ditukar.`;

    const tempOwner = property.owner;
    property.owner = opponent.name;
    opponentProperty.owner = player.name;
    player.money += 150;
    opponent.money += 150;
    transactionSound.play();
    moneySound.play();

    updatePropertyLabels(property);
    updatePropertyLabels(opponentProperty);

    return `${player.name} dan ${opponent.name} menukar ${property.name} dengan ${opponentProperty.name} dan masing-masing mendapat 150 dari bank!`;
}

function updatePropertyLabels(property) {
    const cell = path.find(c => c.dataset.pos == positions.indexOf(property));
    const label = cell.querySelector(".property-label");
    if (label) {
        label.classList.remove("player1", "player2");
        label.classList.add(property.owner === "Player 1" ? "player1" : "player2");
        label.textContent = `Sewa: ${calculateRent(property)} (Lv${property.upgradeLevel})`;
    }
}

function updateTurnStatus() {
    if (!gameActive) return;
    document.getElementById("turnPlayer1").style.display = currentPlayerIndex === 0 ? "block" : "none";
    document.getElementById("turnPlayer2").style.display = currentPlayerIndex === 1 ? "block" : "none";

    if (currentPlayerIndex === 0) {
        roundCount++;
        showBubbleText(`Ronde ${roundCount} dari ${MAX_ROUNDS}`);
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateRollDiceButtonState();
    if (gameMode === 'ai' && currentPlayerIndex === 1) aiTakeTurn();
    checkGameOver();
}

function aiTakeTurn() {
    setTimeout(() => {
        const aiPlayer = players[1];
        const diceElement = document.getElementById("dice");
        diceElement.style.display = "block";
        diceElement.classList.add("rolling");
        rollDiceSound.play();

        let dice = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => {
            diceElement.classList.remove("rolling");
            diceElement.textContent = diceFaces[dice - 1];

            if (aiPlayer.inJail) {
                handleJailTurn(aiPlayer, dice);
            } else {
                const oldPosition = aiPlayer.position;
                aiPlayer.position = (aiPlayer.position + dice) % positions.length;
                checkPassStart(oldPosition, aiPlayer.position, aiPlayer);
                movePlayer(1);
                handleTileAction(aiPlayer, 1);
            }
            setTimeout(() => {
                diceElement.style.display = "none";
                updateRollDiceButtonState();
            }, 500);
        }, 1000);
    }, 1000);
}

function getAiEloBasedOnPlayerElo(playerElo) {
    if (playerElo < 1350) return 1200; 
    if (playerElo <= 1500) return 1425; 
    return 1600; 
}

function aiDecideToBuy(aiPlayer, tile) {
    if (playerElo < 1350) {
        return Math.random() > 0.5;
    } else if (playerElo <= 1500) {
        const roi = tile.rent / tile.price;
        return aiPlayer.money > tile.price * 1.5 && roi > 0.08;
    } else {
        const roi = tile.rent / tile.price;
        const ownedInColor = positions.filter(p => p.color === tile.color && p.owner === aiPlayer.name).length;
        const totalInColor = positions.filter(p => p.color === tile.color).length;
        const reserveMoney = 300;

        return (aiPlayer.money > tile.price + reserveMoney) &&
               (ownedInColor === totalInColor - 1 || roi > 0.1 || roundCount < 15);
    }
}

function aiDecideToUpgrade(aiPlayer, tile) {
    if (playerElo < 1350) {
        return Math.random() > 0.8;
    } else if (playerElo <= 1500) {
        const upgradeCost = Math.floor(tile.price / 3);
        return aiPlayer.money > upgradeCost * 2;
    } else {
        const upgradeCost = Math.floor(tile.price / 3);
        const ownedInColor = positions.filter(p => p.color === tile.color && p.owner === aiPlayer.name).length;
        const totalInColor = positions.filter(p => p.color === tile.color).length;
        const reserveMoney = 300;

        return (aiPlayer.money > upgradeCost + reserveMoney) &&
               (ownedInColor === totalInColor || (roundCount > 20 && tile.rentIncome > 0));
    }
}

function updateElo(result) {
    if (gameMode !== 'ai') return;
    const aiLevel = getAiEloBasedOnPlayerElo(playerElo);
    if (aiLevel === 1200) { // Easy
        playerElo += result === 1 ? 5 : -15;
    } else if (aiLevel === 1425) { // Medium
        playerElo += result === 1 ? 10 : -10;
    } else { // Hard
        playerElo += result === 1 ? 15 : -5;
    }
    updateEloDisplay();
}

function updateEloDisplay() {
    document.getElementById("playerElo").textContent = playerElo;
}

function checkGameOver() {
    for (const player of players) {
        if (player.rentIncome >= WINNING_RENT_INCOME) {
            endGame(`${player.name} menang dengan pendapatan sewa ${player.rentIncome}!`, player.name);
            if (gameMode === 'ai') updateElo(player.name === 'Player 1' ? 1 : 0);
            return;
        }
    }

    if (roundCount >= MAX_ROUNDS) {
        const totalScores = players.map(p => ({ name: p.name, total: p.money + p.rentIncome }));
        const winner = totalScores.reduce((max, p) => p.total > max.total ? p : max, totalScores[0]);
        endGame(`Ronde habis! ${winner.name} menang dengan total ${winner.total} (Uang: ${players.find(p => p.name === winner.name).money}, Sewa: ${winner.total - players.find(p => p.name === winner.name).money})!`, winner.name);
        if (gameMode === 'ai') updateElo(winner.name === 'Player 1' ? 1 : 0);
    }
}

function endGame(message, winnerName) {
    gameActive = false;
    document.getElementById("rollDiceButton").style.display = "none";
    const gameOverDiv = document.getElementById("gameOver");
    gameOverDiv.innerHTML = `<span style="background-color: yellow; padding: 5px; border-radius: 5px;">${message}</span>`;
    gameOverDiv.style.display = "block";

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("game-over-buttons");
    buttonsDiv.innerHTML = `
        <button onclick="restartGame()">Main Lagi</button>
        <button onclick="returnToModeSelection()">Kembali</button>
    `;
    gameOverDiv.insertAdjacentElement("afterend", buttonsDiv);

    updateRollDiceButtonState();
}

function updateMoneyStatus() {
    players.forEach((player, index) => {
        document.getElementById(`moneyPlayer${index + 1}`).textContent = `${player.money}(${player.rentIncome})`;
    });
}

function updateRollDiceButtonState() {
    const rollDiceButton = document.getElementById("rollDiceButton");
    if (!gameActive || (gameMode === 'ai' && currentPlayerIndex !== 0)) {
        rollDiceButton.disabled = true;
    } else {
        rollDiceButton.disabled = false;
    }
}

function resetProperties() {
    positions.forEach(pos => {
        if (pos.price) {
            pos.isAvailable = true;
            pos.owner = null;
            pos.upgradeLevel = 0;
            pos.rentIncome = 0;
            const cell = path.find(c => c.dataset.pos == positions.indexOf(pos));
            const label = cell.querySelector(".property-label");
            if (label) label.remove();
        }
    });
}

function restartGame() {
    resetProperties();
    const buttonsDiv = document.querySelector(".game-over-buttons");
    if (buttonsDiv) buttonsDiv.remove();
    startGame(gameMode);
}

function returnToModeSelection() {
    resetProperties();
    const buttonsDiv = document.querySelector(".game-over-buttons");
    if (buttonsDiv) buttonsDiv.remove();
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("modeSelection").style.display = "flex";
}