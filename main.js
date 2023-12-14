var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    minerCost: 50,
    minerCount: 0,
    update: 1.12
}

function mineGold() {
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) + "/s)"
}

function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 2
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) + "/s)"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }
}

function buyMiner() {
    if (gameData.gold >= gameData.minerCost) {
        gameData.gold -= gameData.minerCost
        gameData.minerCount += 1
        gameData.minerCost *= 3
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) + "/s)"
        document.getElementById("minerBuy").innerHTML = "Buy Miner (Currently have " + gameData.minerCount + ") Cost: " + gameData.minerCost + " Gold"
    }
}

function wipeSave() {
    gameData = {
        gold: 0,
        goldPerClick: 1,
        goldPerClickCost: 10,
        minerCost: 50,
        minerCount: 0,
        update: 1.12
    }
}

var mainGameLoop = window.setInterval(function () {
    for (let i = 0; i < gameData.minerCount; i++) {
        mineGold()
    }
}, 1000)

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
    if (savegame.update == gameData.update) {
        gameData = savegame
    } else if (typeof savegame.dwarves !== "undefined") gameData.dwarves = savegame.dwarves;
}
