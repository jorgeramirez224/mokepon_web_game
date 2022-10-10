function sendPosition(x, y) {
	fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
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
							if(enemy.mokepon !== undefined) {
								const mokeponName = enemy.mokepon.name
								if (mokeponName === "Hipodoge") {
									mokeponEnemy = new Mokepon('Hipodoge', './assets/hipodoge.png', 5, './assets/hipodoge_head.png')
								}
								else if (mokeponName === "Capipepo") {
									mokeponEnemy = new Mokepon('Capipepo', './assets/capipepo.png', 5, './assets/capipepo_head.png')
								}
								else if (mokeponName === "Ratigueya") {
									mokeponEnemy = new Mokepon('Ratigueya', './assets/ratigueya.png', 5, './assets/ratigueya_head.png')
								}

								mokeponEnemy.x = enemy.x
								mokeponEnemy.y = enemy.y
							}
							return mokeponEnemy
							//mokeponEnemy.paintMokepon()
						})

						mokeponesEnemies.forEach(function(mokepon) {
							if (mokepon !== undefined) {
								mokepon.paintMokepon()
								checkCollision(mokepon)
							}
						})
					})
				}
			})
}