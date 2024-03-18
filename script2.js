var canvas = new handwriting.Canvas(document.getElementById("canvas"), 3);

// Set callback function for recognizing alphabet
canvas.setCallBack(function(data, err) {
  console.log(data);
  if (err) throw err;
  else document.getElementById("result").innerHTML = data;
});

// Set default line width
canvas.setLineWidth(5);

// Set options
canvas.setOptions({
  language: "en",
  numOfReturn: 1
});

var alphabetIndex = 0; // Initialize alphabet index

// Define alphabet data
var alphabetData = [
    { img: "images/a.png", pronunciation: "A as in Apple" },
    { img: "images/b.png", pronunciation: "B as in Ball" },
    { img: "images/c.png", pronunciation: "C as in Cat" },
    { img: "images/d.png", pronunciation: "D as in Dog" },
    { img: "images/e.png", pronunciation: "E as in Elephant" },
    { img: "images/f.png", pronunciation: "F as in Fish" },
    { img: "images/g.png", pronunciation: "G as in Goat" },
    { img: "images/h.png", pronunciation: "H as in Hat" },
    { img: "images/i.png", pronunciation: "I as in Ice Cream" },
    { img: "images/j.png", pronunciation: "J as in Jellyfish" },
    { img: "images/k.png", pronunciation: "K as in Kangaroo" },
    { img: "images/l.png", pronunciation: "L as in Lion" },
    { img: "images/m.png", pronunciation: "M as in Monkey" },
    { img: "images/n.png", pronunciation: "N as in Nest" },
    { img: "images/o.png", pronunciation: "O as in Orange" },
    { img: "images/p.png", pronunciation: "P as in Penguin" },
    { img: "images/q.png", pronunciation: "Q as in Queen" },
    { img: "images/r.png", pronunciation: "R as in Rabbit" },
    { img: "images/s.png", pronunciation: "S as in Sun" },
    { img: "images/t.png", pronunciation: "T as in Tiger" },
    { img: "images/u.png", pronunciation: "U as in Umbrella" },
    { img: "images/v.png", pronunciation: "V as in Violin" },
    { img: "images/w.png", pronunciation: "W as in Whale" },
    { img: "images/x.png", pronunciation: "X as in Xylophone" },
    { img: "images/y.png", pronunciation: "Y as in Yak" },
    { img: "images/z.png", pronunciation: "Z as in Zebra" }
];

// Function to load alphabet based on index
function loadAlphabet(index) {
  var alphabet = alphabetData[index];
  document.getElementById("alphabet-img").src = alphabet.img;
  document.getElementById("pronunciation").innerText = "Pronunciation: " + alphabet.pronunciation;

}
function checkDrawingMatch() {
  // Get the drawn alphabet from the result
  
  var drawnAlphabet = document.getElementById("result").innerText.trim();

  // Compare the drawn alphabet with the current alphabet
  var currentAlphabet = alphabetData[alphabetIndex].pronunciation.charAt(0).toUpperCase();
  var isMatch = drawnAlphabet === currentAlphabet;

  // Display the outcome
  var outcomeElement = document.getElementById("outcome");
  if (isMatch) {
      outcomeElement.innerText = "Correct :)!!";
      speakText("Wow !! It's correct!");
  } else {
      outcomeElement.innerText = "Wrong :(";
      speakText("Oops! Wrong drawing. Try again one more time.");
  }
}

function speakText(text) {
  var speechSynthesis = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}



// Function to handle undo action
function undo() {
  // Undo handwriting canvas
  canvas.undo();
}

// Function to handle redo action
function redo() {
  // Redo handwriting canvas
  canvas.redo();
}

// Function to load next alphabet
function nextAlphabet() {
  alphabetIndex = (alphabetIndex + 1) % alphabetData.length;
  loadAlphabet(alphabetIndex);
}

// Function to load previous alphabet
function prevAlphabet() {
  alphabetIndex = (alphabetIndex - 1 + alphabetData.length) % alphabetData.length;
  loadAlphabet(alphabetIndex);
}

// Function to speak pronunciation
function speakPronunciation() {
  var pronunciation = alphabetData[alphabetIndex].pronunciation;
  var speechSynthesis = window.speechSynthesis;
  if(speechSynthesis.speaking){
    speechSynthesis.cancel();
  }
  var utterance = new SpeechSynthesisUtterance(pronunciation);
  speechSynthesis.speak(utterance);
}
console.log("Adding event listeners");
document.getElementById("next-img").addEventListener("click", nextAlphabet);
document.getElementById("prev-img").addEventListener("click", prevAlphabet);
document.getElementById("speak-img").addEventListener("click", speakPronunciation);
console.log("Event listeners added successfully");
document.getElementById("check-btn").addEventListener("click",checkDrawingMatch)
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowLeft':
      prevAlphabet();
      break;
    case 'ArrowRight':
      nextAlphabet();
      break;
  }
});
document.querySelectorAll('.alphabet-key').forEach(function(key, index) {
key.addEventListener('click', function() {
  loadAlphabet(index);
});
});

document.addEventListener('keydown', function(event) {
var keyPressed = event.key.toUpperCase();

var index = alphabetData.findIndex(function(alphabet) {
    return alphabet.pronunciation.startsWith(keyPressed);
});
if (index !== -1) {
    loadAlphabet(index);
}
});

loadAlphabet(alphabetIndex);
