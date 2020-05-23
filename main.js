var gameData = {
  stamina: 0,
  maxStamina: 10,
  staminaPerRest: 1,
  gold: 0,
  maxGold: 15,
  doChoresCost: 0.5,
  doChoresRate: 0.25,
  gameTickSpeed: 10,       // Set to 1000 for release version 
  totalGoldEarned: 0,
  scrolls: 0,
  scrollFactor: 0.005,
  scrollCost: 10,
  scrollMax: 20,
  research: 0,
  researchMax: 30,
  pouchCost: 15,
  pouchIncrease: 10,
  maxPouches: 3,        // Acts wonky with find and replace for new var name, find better solution
  pouchesOwned: 0,
}

function rest() {
  if (gameData.stamina < gameData.maxStamina) {
      gameData.stamina += gameData.staminaPerRest
      document.getElementById("stamina").innerHTML = Math.floor(gameData.stamina) + " / " + gameData.maxStamina + " Stamina"
    }
  }

function research() {
  if (gameData.research < gameData.researchMax && gameData.scrolls >= 1) {
    gameData.researchOverTime = (gameData.scrolls * gameData.scrollFactor)
    gameData.research += gameData.researchOverTime
    document.getElementById("research").innerHTML = Math.floor(gameData.research) + " / " + gameData.researchMax + " Research"
  }
}

function doChores() {
  if (gameData.stamina >= gameData.doChoresCost) {
    gameData.stamina -= gameData.doChoresCost
    if (gameData.gold < gameData.maxGold) {
    gameData.gold += gameData.doChoresRate
    gameData.totalGoldEarned += gameData.doChoresRate
  }
      document.getElementById("gold").innerHTML = `${Math.floor(gameData.gold)} / ${gameData.maxGold} Gold`
      document.getElementById("stamina").innerHTML = Math.floor(gameData.stamina) + " / " + gameData.maxStamina + " Stamina"
  }
}

function buyPouch() {
  if (gameData.pouchesOwned < gameData.maxPouches && gameData.gold >= gameData.pouchCost) {
    gameData.gold -= gameData.pouchCost
    gameData.maxGold += gameData.pouchIncrease
    gameData.pouchesOwned += 1
    document.getElementById("gold").innerHTML = `${Math.floor(gameData.gold)} / ${gameData.maxGold} Gold`
    if (gameData.pouchesOwned >= gameData. maxPouches) {
      document.getElementById("buypouch").style.display="none";
    }
  }
}

function buyScroll() {
  if (gameData.scrolls < gameData.scrollMax && gameData.gold >= gameData.scrollCost) {
    gameData.gold -= gameData.scrollCost
    gameData.scrolls += 1
    document.getElementById("gold").innerHTML = `${Math.floor(gameData.gold)} / ${gameData.maxGold} Gold`
    document.getElementById("scrolls").innerHTML = gameData.scrolls + " / " + gameData.scrollMax + " Scrolls"
  }
}

var mainGameLoop = window.setInterval(function() {
  rest();
  research();
}, gameData.gameTickSpeed)

/* 
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("magicJourneySave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("magicJourneySave"))
  if (savegame !== null) {
  gameData = savegame
}
*/                               // Get this working later