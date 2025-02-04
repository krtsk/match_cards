document.addEventListener('DOMContentLoaded', () => {
	const gameBoard = document.getElementById('game-board');
	const restartButton = document.getElementById('restart-button');
	const cards = [
		'🐶',
		'🐶',
		'🐱',
		'🐱',
		'🦊',
		'🦊',
		'🐻',
		'🐻',
		'🐼',
		'🐼',
		'🐰',
		'🐰',
		'🐹',
		'🐹',
		'🐯',
		'🐯',
		'🦁',
		'🦁',
		'🐨',
		'🐨',
	];

	let firstCard = null;
	let secondCard = null;
	let lockBoard = false;
	let matchedCount = 0;

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	};

	function createBoard() {
		const shuffledCards = shuffle([...cards]);
		shuffledCards.forEach(cardValue => {
			const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.dataset.value = cardValue;
			cardElement.textContent = '?';
			cardElement.addEventListener('click', handleCardClick);
			gameBoard.appendChild(cardElement);
		})
	};

	function handleCardClick(e) {
		if (lockBoard) return

		const clickedCard = e.target;
		if (clickedCard === firstCard) return

		clickedCard.textContent = clickedCard.dataset.value;
		clickedCard.classList.add('flipped');

		if (!firstCard) {
			firstCard = clickedCard;
		} else {
			secondCard = clickedCard;
			lockBoard = true;
			checkForMatch();
		}
	};

	function checkForMatch() {
		if (firstCard.dataset.value === secondCard.dataset.value) {
			firstCard.classList.add('matched');
			secondCard.classList.add('matched');
			matchedCount += 2;

			resetTurn();

			if (matchedCount === cards.length) {
				setTimeout(() => alert('You win!'), 500)
			}
		} else {
			setTimeout(() => {
				firstCard.textContent = '?';
				secondCard.textContent = '?';
				firstCard.classList.remove('flipped');
				secondCard.classList.remove('flipped');
				resetTurn()
			}, 1000);
		}
	};

	function resetTurn() {
		;[firstCard, secondCard] = [null, null]
		lockBoard = false;
	}

	function restartGame() {
		gameBoard.innerHTML = '';
		matchedCount = 0;
		resetTurn()
		createBoard()
	};

	restartButton.addEventListener('click', restartGame);

	createBoard();
})
