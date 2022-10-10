const sectionAttackChoice =document.getElementById('select-attack')
const sectionResetGame = document.getElementById('reset-game')
const characterButton = document.getElementById('character-button')

const spanCharacterPlayer = document.getElementById('character-player')
const selectCharacter = document.getElementById('select-character')

const spanEnemyCharacter = document.getElementById('character-enemy')
const resetButton = document.getElementById('reset-button')

const spanPlayerLifes = document.getElementById('lifes-player')
const spanEnemyLifes = document.getElementById('lifes-enemy')

const sectionMessages =  document.getElementById('result')
const characterAttackSection =  document.getElementById('character-attack-section')
const enemyAttackSection =  document.getElementById('enemy-attack-section')

const containerCards = document.getElementById('container-cards')

const containerAttacks = document.getElementById('container-attacks')

const sectionWatchMap = document.getElementById('watch-map')
const map = document.getElementById('map')

let playerId = null
let enemyId = null

let mokepones = []
let mokeponesEnemies = []
let enemyAttack = []
let mokeponesOption

let inputHipodoge 
let inputCapipepo 
let inputRatigueya

let mokeponPlayer
let mokeponButtonsAttack
let mokeponEnemyAttacks
let characterPlayerObject

let fireButton 
let waterButton 
let landButton 															

let buttons = []
let attackPlayer = []

let indexAttackPlayer
let indexEnemyAttack

let victoriesPlayer = 0
let victoriesEnemy = 0

let lifesPlayer = 3	
let lifesEnemy = 3

let lienzo = map.getContext("2d")
let intervalo
let backgroundMap = new Image()
backgroundMap.src = './assets/mokemap.png'

let newHeight
let newWidth = window.innerWidth - 20

const mapMaximumWidth = 350
if (newWidth > mapMaximumWidth) {
	newWidth = mapMaximumWidth - 20
}

newHeight = newWidth * 600 / 800
map.width = newWidth
map.height = newHeight

class Mokepon {
	constructor(name, photo, life, photoMap, id = null) {
		this.id = id
		this.name = name
		this.photo = photo
		this.life = life
		this.attacks = []
		this.width = 40
		this.height = 40
		this.x = randomEnemyChoice(0, map.width - this.width)
		this.y = randomEnemyChoice(0, map.height - this.height)
		this.photoMap = new Image()
		this.photoMap.src = photoMap
		this.speedX = 0
		this.speedY = 0
	}

	paintMokepon() {
		lienzo.drawImage(
		this.photoMap,
		this.x,
		this.y,
		this.width,
		this.height
	)
	}
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge_head.png')
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo_head.png')
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya_head.png')

const HIPODOGE_ATTACKS = [
	{ name: '💦', id: 'water-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '🌱', id: 'land-button' },
]

const CAPIPEPO_ATTACKS = [
	{ name: '🌱', id: 'land-button' },
	{ name: '🌱', id: 'land-button' },
	{ name: '🌱', id: 'land-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🔥', id: 'fire-button' },
]

const RATIGUEYA_ATTACKS = [
	{ name: '🔥', id: 'fire-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🌱', id: 'land-button' }
]

//It transforms the array into a list ("...") 
hipodoge.attacks.push(...HIPODOGE_ATTACKS)

capipepo.attacks.push(...CAPIPEPO_ATTACKS)

ratigueya.attacks.push(...RATIGUEYA_ATTACKS)

mokepones.push(hipodoge, capipepo, ratigueya)

function startGame() {
	sectionAttackChoice.style.display = 'none'
	sectionWatchMap.style.display = 'none'

	mokepones.forEach((mokepon) => {
		mokeponesOption = `
		<input class="radio-character" type="radio" name="character" id=${mokepon.name} />
		<label class="mokepon-card" for=${mokepon.name}>
			<p>${mokepon.name}</p>
			<img src=${mokepon.photo} alt=${mokepon.name}>
		</label>
		` 
		containerCards.innerHTML += mokeponesOption

		inputHipodoge = document.getElementById('Hipodoge')
		inputCapipepo = document.getElementById('Capipepo')
		inputRatigueya = document.getElementById('Ratigueya')
	})

	characterButton.addEventListener('click', characterPlayerChoice)
	resetButton.addEventListener('click', resetGame)
	resetButton.style.display = 'none'
	joinToGame()
}

//This function works with the server and it's making a call to return an ID through promises and asycnc functions
function joinToGame() {
	fetch("http://192.168.1.73:8080/join")
		.then(function (res) {
			if (res.ok) {
				res.text()
					.then(function(answer) {
						console.log(answer)
						playerId = answer
					})
			}
		})
}

function characterPlayerChoice() {
	let choiceToPlay = 1
	/*let capipepoImage = new Image()
	capipepoImage.src = capipepo.photo*/

	if(inputHipodoge.checked) {
		spanCharacterPlayer.innerHTML = inputHipodoge.id
		mokeponPlayer = inputHipodoge.id
	}
	else if (inputCapipepo.checked) {
		spanCharacterPlayer.innerHTML = inputCapipepo.id
		mokeponPlayer = inputCapipepo.id
	}
	else if (inputRatigueya.checked) {
		spanCharacterPlayer.innerHTML = inputRatigueya.id
		mokeponPlayer = inputRatigueya.id
	}
	else {
		alert("You must select a character to play!")
		choiceToPlay = 0
	}

	if(choiceToPlay == 1) {

		selectMokepon(mokeponPlayer)
		mokeponAttacks(mokeponPlayer)
	
		//sectionAttackChoice.style.display = 'flex'
		selectCharacter.style.display = 'none'
		characterButton.style.display = 'none'
		//Canvas 
		sectionWatchMap.style.display = 'flex'
		startMap()
		//Draw a rectangle inside the canvas
		//lienzo.fillRect(5, 15, 20, 40)
	}		
}

function selectMokepon(mokeponPlayer) {
	fetch(`http://192.168.1.73:8080/mokepon/${playerId}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body:JSON.stringify({
			mokepon: mokeponPlayer
		})

	})
}

function mokeponAttacks(mokeponPlayer) {
	let attacks 
	for (let i = 0; i < mokepones.length; i++) {
		if (mokeponPlayer === mokepones[i].name) {
			attacks = mokepones[i].attacks
		}
	}
	showAttacks(attacks)
}

function showAttacks(attacks) {
	attacks.forEach((attack) => {
		mokeponButtonsAttack = `
		<button id=${attack.id} class="attack-button BAttack">${attack.name}</button>
		`
		containerAttacks.innerHTML += mokeponButtonsAttack 
	})

		fireButton = document.getElementById('fire-button')
		waterButton = document.getElementById('water-button')
		landButton = document.getElementById('land-button')
		buttons = document.querySelectorAll('.BAttack')
}

function buttonAttackSecuence() {
	buttons.forEach((button) =>{
		button.addEventListener('click', (e) =>{
			if (e.target.textContent === '🔥') {
				attackPlayer.push('FIRE')
				console.log(attackPlayer)
				button.style.background = '#112f58'
				button.disabled = true	
			} 
			else if(e.target.textContent === '💦') {
				attackPlayer.push('WATER')
				console.log(attackPlayer)
				button.style.background = '#112f58'
				button.disabled = true	
			}
			else {
				attackPlayer.push('LAND')
				console.log(attackPlayer)
				button.style.background = '#112f58'
				button.disabled = true	
			}

			if (attackPlayer.length === 5) {
				sendAttacks()	
			}
			//enemyRandomAttack()
		})
	})
}

function sendAttacks() {
	fetch(`http://192.168.1.73:8080/mokepon/${playerId}/attacks`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			attacks: attackPlayer
		})
	})
	intervalo = setInterval(obtainAttacks, 50)
}

function obtainAttacks() {
	fetch(`http://192.168.1.73:8080/mokepon/${enemyId}/attacks`)
		.then(function (res) {
			if (res.ok) {
				res.json()
					.then(function ({ attacks }){
						if (attacks.length === 5) {
							enemyAttack = attacks
							winnerAndLoser()
						}
					})
			}
		})
}

function characterEnemyChoice(enemy) {
	let enemyRandomCharacter = randomEnemyChoice(0, mokepones.length - 1)
	
	spanEnemyCharacter.innerHTML = enemy.name
	mokeponEnemyAttacks = enemy.attacks
	//spanEnemyCharacter.innerHTML = mokepones[enemyRandomCharacter].name
	//mokeponEnemyAttacks = mokepones[enemyRandomCharacter].attacks
	buttonAttackSecuence()
}

function enemyRandomAttack() {
	console.log('Enemy Attacks: ', mokeponEnemyAttacks)
	let randomAttack = randomEnemyChoice(0, mokeponEnemyAttacks.length - 1)

	if(randomAttack == 0 || randomAttack == 1) {
		//enemyAttack = 'FIRE'
		enemyAttack.push('FIRE')
	}
	else if(randomAttack == 3 || randomAttack == 4) {
		//enemyAttack = 'WATER'
		enemyAttack.push('WATER')
	}
	else {
		//enemyAttack = 'LAND'
		enemyAttack.push('LAND')
	}
	console.log(enemyAttack)
	//winnerAndLoser()
	startCombat()
}

function startCombat() {
	if (attackPlayer.length === 5) {
		winnerAndLoser()
	}
}

function versusIterationPoints(player, enemy) {
	indexEnemyAttack = enemyAttack[enemy]
	indexAttackPlayer = attackPlayer[player]
}

function winnerAndLoser() {
	clearInterval(intervalo)

	for (let i = 0; i < attackPlayer.length; i++) {
		if (attackPlayer[i] === enemyAttack[i]) {
			versusIterationPoints(i, i)
			createMessage("TIE!")
		}
		else if((attackPlayer[i] === 'FIRE' && enemyAttack[i] === 'LAND') || 
				(attackPlayer[i] === 'WATER' && enemyAttack[i] === 'FIRE') || 
				(attackPlayer[i] === 'LAND' 	&& enemyAttack[i] === 'WATER')) {
			versusIterationPoints(i, i)
			createMessage("YOU WIN!")
			victoriesPlayer++
			spanPlayerLifes.innerHTML = victoriesPlayer
		}
		else {
			versusIterationPoints(i, i)
			createMessage("YOU LOSE!")
			victoriesEnemy++
			spanEnemyLifes.innerHTML = victoriesEnemy

		}
	}
	andTheWinnerIs()
}

function andTheWinnerIs() {
	if(victoriesPlayer == victoriesEnemy) {
		//alert("YOU LOSE! 🤬")
		gameResultMessage("TIE! 🌀")
		//let resetButton = document.getElementById('reset-button')
		resetButton.style.display = 'block'
	}
	else if (victoriesPlayer > victoriesEnemy) {
		gameResultMessage("YOU WIN! 🤩")
		resetButton.style.display = 'block'
	}
	else {
		//alert("YOU WIN! 🤩")
		gameResultMessage("YOU LOSE! 🤬")
		//let resetButton = document.getElementById('reset-button')
		resetButton.style.display = 'block'
	}
}

function createMessage(result) {
	let playerAttackMessage = document.createElement('p')
	let enemyAttackMessage = document.createElement('p')

	sectionMessages.innerHTML = result
	playerAttackMessage.innerHTML = indexAttackPlayer
	enemyAttackMessage.innerHTML = indexEnemyAttack

	characterAttackSection.appendChild(playerAttackMessage)
	enemyAttackSection.appendChild(enemyAttackMessage)
}

function gameResultMessage(finalResult) {
	sectionMessages.innerHTML = finalResult
}

function startMap() {
	/*map.width = 320
	map.height = 240*/
	characterPlayerObject = getCharacterObject(mokeponPlayer)
	//calls a function and executes it with a fixed time
	intervalo = setInterval(paintCanvas, 50)
	window.addEventListener('keydown', pressedKey)
	window.addEventListener('keyup', stopMove)
}

function getCharacterObject() {
	for (let i = 0; i < mokepones.length; i++) {
		if (mokeponPlayer === mokepones[i].name) {
			return mokepones[i]
		}
	}
}

function paintCanvas() {
	characterPlayerObject.x = characterPlayerObject.x + characterPlayerObject.speedX
	characterPlayerObject.y = characterPlayerObject.y + characterPlayerObject.speedY
	//cleans our canvas
	lienzo.clearRect(0, 0, map.width, map.height)
	//drawImage draws an image of an object
	lienzo.drawImage(
		backgroundMap,
		0,
		0,
		map.width,
		map.height
	)
	characterPlayerObject.paintMokepon()
	//function to send the mokepon current position on the map 
	sendPosition(characterPlayerObject.x, characterPlayerObject.y)

	mokeponesEnemies.forEach(function(mokepon) {
		mokepon.paintMokepon()
		checkCollision(mokepon)
	})

	/*if (characterPlayerObject.speedX !== 0 || characterPlayerObject.speedY !== 0) {
		checkCollision(hipodogeEnemy)
		checkCollision(capipepoEnemy)
		checkCollision(ratigueyaEnemy)
	}

	hipodogeEnemy.paintMokepon()
	capipepoEnemy.paintMokepon()
	ratigueyaEnemy.paintMokepon()

	lienzo.drawImage(
		characterPlayerObject.photoMap,
		characterPlayerObject.x,
		characterPlayerObject.y,
		characterPlayerObject.width,
		characterPlayerObject.height
	)
	*/
}

function sendPosition(x, y) {
	fetch(`http://192.168.1.73:8080/mokepon/${playerId}/position`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			//When it's only one x or y (variable) it indicates that will be the same value as Content & Value
			x,
			y
		})
	})
	.then(function (res) {
			if (res.ok) {
				res.json()
					.then(function({ enemies }) {
						console.log(enemies)
						mokeponesEnemies = enemies.map(function (enemy) {
							let mokeponEnemy = null
							const mokeponName = enemy.mokepon.name || ""
							if (mokeponName === "Hipodoge") {
								mokeponEnemy = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge_head.png', enemy.id)
							}
							else if (mokeponName === "Capipepo") {
								mokeponEnemy = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo_head.png', enemy.id)
							}
							else if (mokeponName === "Ratigueya") {
								mokeponEnemy = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya_head.png', enemy.id)
							}
							mokeponEnemy.x = enemy.x
							mokeponEnemy.y = enemy.y
							return mokeponEnemy
							//mokeponEnemy.paintMokepon()
						})
					})
				}
			})
}

function checkCollision(enemy) {
	const upEnemy = enemy.y 
	const downEnemy = enemy.y + enemy.height 
	const rightEnemy = enemy.x + enemy.width 
	const leftEnemy = enemy.x 

	const upCharacter = characterPlayerObject.y + 25
	const downCharacter = characterPlayerObject.y + characterPlayerObject.height - 25
	const rightCharacter = characterPlayerObject.x + characterPlayerObject.width - 25
	const leftCharacter = characterPlayerObject.x + 25

	if (downCharacter < upEnemy || upCharacter > downEnemy || rightCharacter < leftEnemy || leftCharacter > rightEnemy) {
		return
	}
	stopMove()
	clearInterval(intervalo)
	console.log('Collision detected');

	enemyId = enemy.id
	sectionAttackChoice.style.display = 'flex'
	sectionWatchMap.style.display = 'none'
	characterEnemyChoice(enemy)
	//alert("There's Collision with " + enemy.name)
}

function moveUp() {
	/*capipepo.y = capipepo.y - 5
	paintCharacter()*/
	characterPlayerObject.speedY = -5
}

function moveLeft() {
	/*capipepo.x = capipepo.x - 5
	paintCharacter()*/
	characterPlayerObject.speedX = -5
}

function moveRight() {
	/*capipepo.x = capipepo.x + 5
	paintCharacter()*/
	characterPlayerObject.speedX = 5
}

function moveDown() {
	/*capipepo.y = capipepo.y + 5
	paintCharacter()*/
	characterPlayerObject.speedY = 5
}

function stopMove() {
	characterPlayerObject.speedX = 0
	characterPlayerObject.speedY = 0
}

function pressedKey(event) {
	switch(event.key) {
		case 'ArrowUp':
			moveUp()
			break
		case 'ArrowLeft':
			moveLeft()
			break
		case 'ArrowRight':
			moveRight()
			break
		case 'ArrowDown':
			moveDown()
			break
		default:
			break
	}
}

function resetGame() {
	location.reload()
}

function randomEnemyChoice(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)
