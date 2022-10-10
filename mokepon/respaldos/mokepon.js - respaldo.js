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

let mokepones = []
//let playerAttack
let enemyAttack = []
let mokeponesOption

let inputHipodoge 
let inputCapipepo 
let inputRatigueya

let mokeponPlayer
let mokeponButtonsAttack
let mokeponEnemyAttacks

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

class Mokepon {
	constructor(name, photo, life) {
		this.name = name
		this.photo = photo
		this.life = life
		this.attacks = []
	}
}

let hipodoge = new Mokepon('Hipodoge', './assets/hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/ratigueya.png', 5)

hipodoge.attacks.push(
	{ name: '💦', id: 'water-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '🌱', id: 'land-button' }
)

capipepo.attacks.push(
	{ name: '🌱', id: 'land-button' },
	{ name: '🌱', id: 'land-button' },
	{ name: '🌱', id: 'land-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🔥', id: 'fire-button' }
)

ratigueya.attacks.push(
	{ name: '🔥', id: 'fire-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '🔥', id: 'fire-button' },
	{ name: '💦', id: 'water-button' },
	{ name: '🌱', id: 'land-button' }
)

mokepones.push(hipodoge, capipepo, ratigueya)

function startGame() {
	sectionAttackChoice.style.display = 'none'

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

	/*let sectionResetGame = document.getElementById('reset-game')
	sectionResetGame = document.style.display = 'none'*/

	characterButton.addEventListener('click', characterPlayerChoice)
	resetButton.addEventListener('click', resetGame)
	resetButton.style.display = 'none'
}

function characterPlayerChoice() {
	let choiceToPlay = 1

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
		mokeponAttacks(mokeponPlayer)
		characterEnemyChoice()

		sectionAttackChoice.style.display = 'flex'
		selectCharacter.style.display = 'none'
		characterButton.style.display = 'none'
	}		
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
			enemyRandomAttack()
		})
	})
}

function characterEnemyChoice() {
	let enemyRandomCharacter = randomEnemyChoice(0, mokepones.length - 1)
	
	spanEnemyCharacter.innerHTML = mokepones[enemyRandomCharacter].name
	mokeponEnemyAttacks = mokepones[enemyRandomCharacter].attacks
	buttonAttackSecuence()

	/*
	if(enemyRandomCharacter == 1) {
		spanEnemyCharacter.innerHTML = 'Hipodoge'
	}
	else if(enemyRandomCharacter == 2) {
		spanEnemyCharacter.innerHTML = 'Capipepo'
	}
	else if (enemyRandomCharacter == 3) {
		spanEnemyCharacter.innerHTML = 'Ratigueya'
	}
	*/
}

function enemyRandomAttack() {
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
	for (let i = 0; i < attackPlayer.length; i++) {
		if (attackPlayer[i] === enemyAttack[i]) {
			versusIterationPoints(i, i)
			createMessage("TIE!")
		}
		else if((attackPlayer[i] === 'FIRE' && enemyAttack[i] === 'LAND') || (attackPlayer[i] === 'WATER' && enemyAttack[i] === 'FIRE') || (attackPlayer[i] === 'LAND' && enemyAttack[i] === 'WATER')) {
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

	/*
	if (enemyAttack == attackPlayer) {
		createMessage(" TIE!")
	}
	else if ((attackPlayer == 'FIRE' && enemyAttack == 'LAND') || (attackPlayer == 'WATER' && enemyAttack == 'FIRE') || (attackPlayer == 'LAND' && enemyAttack == 'WATER')) {
		createMessage(" YOU WIN! 🤩")
		lifesEnemy --
		spanEnemyLifes.innerHTML = lifesEnemy
	}
	else {
		createMessage(" YOU LOSE! 🤬")
		lifesPlayer --
		spanPlayerLifes.innerHTML = lifesPlayer
	}
	*/
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

	//let text = document.createElement('p')
	//text.innerHTML = 'Your character attacked with '  + playerAttack + ' , the enemy attacked with ' + enemyAttack + ' - ' + result
	//sectionMessages.appendChild(text)

	characterAttackSection.appendChild(playerAttackMessage)
	enemyAttackSection.appendChild(enemyAttackMessage)
	
	/*
	if(lifesPlayer == 0) {
		text.innerHTML = "YOU LOSE! 🤬"
		sectionMessages.appendChild(text)
	}
	else if (lifesEnemy == 0) {
		text.innerHTML = "YOU WIN! 🤩"
		sectionMessages.appendChild(text)
	}*/
}

function gameResultMessage(finalResult) {
	//let text = document.createElement('p')
	sectionMessages.innerHTML = finalResult

	//sectionMessages.appendChild(text)

	//sectionResetGame.style.display = 'block'*/
}

function resetGame() {
	location.reload()
}

function randomEnemyChoice(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', startGame)