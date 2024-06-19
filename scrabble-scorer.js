// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let userWord

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
   console.log(letterPoints);
	return letterPoints;
 }
 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   userWord = input.question()
   return userWord
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word){
   let simpleScore = 0
   for (let i = 0; i < word.length; i++){
      simpleScore++
   }
   
   console.log(`Score for '${userWord}': ${simpleScore}`)
   return simpleScore
};
//simpleScorer(userWord)

let vowelBonusScorer = function(word){
   const vowels = ['A', 'E', 'I', 'O', 'U']
   let vowelBonusScore = 0
   word = word.toUpperCase()
   for (let i = 0; i < word.length; i++){
      if (vowels.includes(word[i])){
         vowelBonusScore += 3
      } else {
         vowelBonusScore++
      }
   }

   console.log(`Score for '${userWord}': ${vowelBonusScore}`)
   return vowelBonusScore
};
//vowelBonusScorer(userWord)

let scrabbleScorer = function(word){
   word = word.toLowerCase()
   let scrabbleScore = 0
   for (let i = 0; i < word.length; i++){
      scrabbleScore += newPointStructure[word[i]]
   }
   console.log(`Score for '${userWord}': ${scrabbleScore}`)
   return scrabbleScore
};


const scoringAlgorithms = [
   
   simpleScoreFunction = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer

}, bonusVowelFunction = {
   name: "Bonus Vowel",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer

}, scrabbleScoreFunction = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}
];
   
let userChoice;

function scorerPrompt(arr) {
   console.log("What scoring algorithm would you like to use?");
   for (let i = 0; i < arr.length; i++){
      console.log(i , arr[i].name + ":" , arr[i].description)
   }
   userChoice = input.question("Enter 0, 1, or 2: ");
   arr[userChoice].scorerFunction(userWord)
}

function transform(object) {
   let letterKeyArr = {};
   for (item in object){
      for (let i = 0; i < object[item].length; i++){
         letterKeyArr[object[item][i].toLowerCase()] = Number(item)
      }

   }
   return letterKeyArr
};

function runProgram() {
   initialPrompt();
   scorerPrompt(scoringAlgorithms)
}

runProgram()

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
