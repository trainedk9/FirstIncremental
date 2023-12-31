var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    minerCost: 50,
    minerCount: 0,
    depthCost: 125,
    depth: 1,
    depthMultiply: 1,
    hiringManagers: 0,
    managersCost: 10000000,
    factories: 0,
    factoryCost: 75000000,
    update: 1.17
}

function mineGold() {
    gameData.gold += (gameData.goldPerClick * gameData.depthMultiply)
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
}

function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 2
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
    }
}

function buyMiner() {
    if (gameData.gold >= gameData.minerCost) {
        gameData.gold -= gameData.minerCost
        gameData.minerCount += 1
        gameData.minerCost *= 3
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
        document.getElementById("minerBuy").innerHTML = "Buy Miner (Currently have " + gameData.minerCount + ") Cost: " + gameData.minerCost + " Gold"
    }
}

function buyDepthUpgrade() {
    if (gameData.gold >= gameData.depthCost) {
        gameData.gold -= gameData.depthCost
        gameData.depth += 1
        gameData.depthMultiply *= 2
        gameData.depthCost *= 4
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
        document.getElementById("depthBuy").innerHTML = "Go Deeper (Currently Multiplying Gold x" + gameData.depthMultiply + ") Cost: " + gameData.depthCost + " Gold"
    }
}

function buyManager() {
    if (gameData.gold >= gameData.managersCost) {
        gameData.gold -= gameData.managersCost
        gameData.hiringManagers += 1
        gameData.managersCost *= 20
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
        document.getElementById("managerBuy").innerHTML = "Buy Manager (Currently have " + gameData.hiringManagers + ") Cost: " + gameData.managersCost +" gold"
    }
}

function buyFactory() {
    if (gameData.gold >= gameData.factoryCost) {
        gameData.gold -= gameData.factoryCost
        gameData.factories += 1
        gameData.factoryCost *= 30
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
        document.getElementById("factoryBuy").innerHTML = "Buy Factory (Currently have " + gameData.factories + ") Cost: " + gameData.factoryCost + " gold"
    }
}

function wipeSave() {
    gameData = {
        gold: 0,
        goldPerClick: 1,
        goldPerClickCost: 10,
        minerCost: 50,
        minerCount: 0,
        depthCost: 125,
        depth: 1,
        depthMultiply: 1,
        hiringManagers: 0,
        managersCost: 10000000,
        factories: 0,
        factoryCost: 75000000,
        update: 1.17
    }
}

var mainGameLoop = window.setInterval(function () {
    for (let i = 0; i < gameData.minerCount; i++) {
        mineGold()
    }
    gameData.minerCount += gameData.hiringManagers
    gameData.goldPerClick += gameData.factories
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined (+" + (gameData.minerCount * gameData.goldPerClick) * gameData.depthMultiply + "/s)"
    document.getElementById("minerBuy").innerHTML = "Buy Miner (Currently have " + gameData.minerCount + ") Cost: " + gameData.minerCost + " Gold"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold"
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
