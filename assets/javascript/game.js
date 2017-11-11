//Necessary global variables
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
    "y", "z"]
var answerWords = ["Arryn", "Baratheon", "Bolton", "Frey", "Greyjoy",
    "Hightower", "Lannister", "Martell", "Mormont",
    "Stark", "Targaryen", "Tarly", "Tully", "Tyrell",];

//Pick random word from list
var currentWord = answerWords[Math.floor(Math.random() * answerWords.length)];
var wins = 0;
var losses = 0;
var lives = currentWord.length + 3;
var currentWord;
var activeWord = [];
var underscoreWord = [];
var correctLetters = [];
var inputLetters = [];
var userGuess;

// Play audio file
var audio = new Audio('assets/audio/GoT-theme.mp3');
audio.play();
audio.volume = 0.05;

//Retrieving elements to update game-state
var playingWord = document.getElementById("current-word");
var lettersGuessed = document.getElementById("letters-guessed");
var livesRemaining = document.getElementById("lives-remaining");
var numberWins = document.getElementById("number-wins");
var numberLosses = document.getElementById("number-losses");

//Reset game-state
function resetGame() {
    currentWord = answerWords[Math.floor(Math.random() * answerWords.length)];
    lives = currentWord.length + 3
    activeWord = [];
    inputLetters = [];
    correctLetters = [];
    underscoreWord = [];
}



function game() {
    //Generate array of blanks for current word
    for (var i = 0; i < currentWord.length; i++) {
        activeWord.push(currentWord[i].toLowerCase());
        underscoreWord.push("_");
    }

    //Start of logic - on-key event
    document.onkeyup = function (event) {
        //Generate array of blanks, add to HTML
        if (activeWord.length === 0)
            for (var i = 0; i < currentWord.length; i++) {
                activeWord.push(currentWord[i].toLowerCase());
                underscoreWord.push("_");
            }
        //Display chances left
        livesRemaining.innerHTML = lives

        userGuess = event.key.toLowerCase();

        playingWord.innerHTML = underscoreWord.join(" ");
        
        //Checks if the letter pressed has been entered and is actually a letter
        if (inputLetters.indexOf(userGuess) === -1 && alphabet.indexOf(userGuess) !== -1) {
            
            // Incorrect - adds to array below, subtracts life
            if (activeWord.indexOf(userGuess) === -1) {
                inputLetters.push(userGuess);

                lettersGuessed.innerHTML = inputLetters.join(",").toUpperCase();

                lives--;
            }

            //If correct, adds to array and displays
            if (activeWord.indexOf(userGuess) > -1); {

                for (var i = 0; i < activeWord.length; i++) {

                    if (activeWord[i] === userGuess) {
                        underscoreWord[i] = currentWord[i];
                        playingWord.innerHTML = underscoreWord.join(" ");

                        //Game end - win
                        if (underscoreWord.indexOf("_") === -1) {
                            ++wins
                            numberWins.innerHTML = wins;
                            resetGame()
                            playingWord.innerHTML = "Congratulations! Play Again!"
                        }

                        //Game end - loss
                        if (lives === 0) {
                            ++losses
                            numberLosses.innerHTML = losses;
                            resetGame()
                            playingWord.innerHTML = "Sorry, better luck next time!"
                        }
                    }
                }
            }
        }
    }
}


game()