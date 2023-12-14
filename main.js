var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    minerCost = 50,
    minerCount = 0,
}

function mineGold() {
    gameData.gold += gameData.goldPerClick
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + gameData.minerCount + "/s)"
}

function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 1.5
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + gameData.minerCount + "/s)"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }
}

function buyMiner() {
    if (gameData.gold >= gameData.minerCost) {
        gameData.gold -= gameData.minerCost
        gameData.minerCount += 1
        gameData.minerCost *= 1.75
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + gameData.minerCount + "/s)"
        document.getElementById("minerBuy").innerHTML = "Buy Miner (Currently have " + gameData.minerCount + ") Cost: " + gameData.minerCost + " Gold"
    }
}

var mainGameLoop = window.setInterval(function () {
    for (let i = 0; i < minerCount; i++) {
        mineGold()
    }
}, 1000)

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("goldMinerSave"))
if (savegame !== null) {
    gameData = savegame
}
