const images = [
    { src: 'images/1.jpg', answer: false, name: 'aymerich' },
    { src: 'images/2.jpg', answer: false, name: 'zoé' },
    { src: 'images/3.jpg', answer: true, name: null },
    { src: 'images/4.jpg', answer: false, name: 'titouan' },
    { src: 'images/5.jpg', answer: false, name: 'aymerich' },
    { src: 'images/6.jpg', answer: true, name: null },
    { src: 'images/7.jpg', answer: false, name: 'titouan' },
    { src: 'images/8.jpg', answer: true, name: null },
    { src: 'images/9.jpg', answer: true, name: null },
    { src: 'images/10.jpg', answer: false, name: 'lucien' },
    { src: 'images/11.jpg', answer: false, name: null },
    { src: 'images/12.jpg', answer: false, name: null },
    { src: 'images/13.jpg', answer: false, name: 'antoine' },
    { src: 'images/14.jpg', answer: false, name: 'aymerich' },
    { src: 'images/15.jpg', answer: true, name: null }
];

let currentIndex = 0;
let score = 0;

// Shuffle images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledImages = shuffle(images);

function displayImage(index) {
    const imageElement = document.getElementById('gameImage');
    imageElement.src = shuffledImages[index].src;
}

function showFeedback(message) {
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.textContent = message;
}

function updateScore(points) {
    score += points;
    document.getElementById('scoreValue').textContent = score;
}

function handleAnswer(userAnswer) {
    const currentImage = shuffledImages[currentIndex];
    const correctAnswer = currentImage.answer;

    if (userAnswer === correctAnswer) {
        updateScore(1);
        showFeedback('Bonne réponse !');
        if (userAnswer === false) {
            document.getElementById('nameInputContainer').style.display = 'block';
        } else {
            nextImage();
        }
    } else {
        showFeedback('Mauvaise réponse.');
        nextImage();
    }
}

function nextImage() {
    currentIndex++;
    if (currentIndex < shuffledImages.length) {
        setTimeout(() => {
            displayImage(currentIndex);
            document.getElementById('nameInputContainer').style.display = 'none';
            showFeedback('');
        }, 1000);
    } else {
        showFeedback('Fin du jeu !');
    }
}

document.getElementById('trueButton').addEventListener('click', () => {
    handleAnswer(true);
});

document.getElementById('falseButton').addEventListener('click', () => {
    handleAnswer(false);
});

document.getElementById('submitNameButton').addEventListener('click', () => {
    const nameInput = document.getElementById('nameInput').value.toLowerCase();
    const currentImage = shuffledImages[currentIndex - 1];
    if (currentImage.name && currentImage.name.toLowerCase() === nameInput) {
        updateScore(1);
        showFeedback('Réponse incorrecte, mais vous gagnez un point.');
    } else {
        updateScore(2);
        showFeedback('Bonne réponse avec prénom !');
    }
    document.getElementById('nameInputContainer').style.display = 'none';
    nextImage();
});

// Initialize the game
displayImage(currentIndex);
