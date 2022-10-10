let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0
			
function aletorio (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
	//let pc = Math.floor(Math.random() * 3) + 1; 
}

function gameChoice(gameAction) {
	let resultado = ""
	if(gameAction == 1) {
		resultado = "Piedra 🥌";
	}
	else if(gameAction == 2) {
		resultado = "Papel 📃";
	}
	else if (gameAction == 3) {
		resultado = "Tijera ✂";
	}
	else {
		resultado = "No valido ❌";
	}
	return resultado
}
//HORA DEL COMBATE MOOORTAAALL
function combatGame(jugador, pc) {
	if(pc == jugador) {
		alert("EMPATE 🌀");
	}
	else if((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)) {
		alert("Tú ganas 🤩");
		triunfos = triunfos + 1
	}
	else {
		alert("Tú perdiste 🤡");
		perdidas = perdidas + 1
	}
}

while(triunfos < 3 && perdidas < 3) {
	pc = aletorio(1, 3)
	jugador = prompt("Elige: 1 - piedra, 2 - papel, 3 - tijera")
				
	alert("PC eligió: " + gameChoice(pc))
	alert("Tú eligiste: " + gameChoice(jugador))
	combatGame(jugador, pc)
}

alert("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces")