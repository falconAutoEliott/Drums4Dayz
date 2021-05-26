var ctlrName = "Touch any key on your controller";

//var navigator = require('jzz');
var navigator = 'jzz';
require([navigator], function(result){
    navigator = result;
});


navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    console.log("Using google MIDI access.");
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    ctlrName = midiAccess.name;
    for (var input of inputs.values()){
      input.onmidimessage = getMIDIMessage;
      
  }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

//function mapController(){
//
//}

const pads = document.querySelectorAll('.pad')
const buttons = document.querySelectorAll('.button')
const display = document.getElementById('display')
const sounds = {
  12: {
    char: 'A',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/kick.WAV'),
    vol: 1,
    name: 'KICK 1'
  },
  65: {
    char: 'A',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/kick.WAV'),
    vol: 1,
    name: 'KICK'
  },
  83: {
    char: 'S',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/Snare%207Mile%201.wav'),
    vol: 1,
    name: 'SNARE'
  },
  68: {
    char: 'D',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/OpenHH.wav'),
    vol: 0.6,
    name: 'HH-O'
  },
  70: {
    char: 'F',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/ClosedHH%207Mile.wav'),
    vol: 1,
    name: 'HH-C'
  },
  81: {
    char: 'Q',
audio: new Audio('Test-LocalAudio/sideburnz_1-a_a.wav'),
    vol: 0.7,
    name: 'SideBurnz'
  },
  87: {
    char: 'W',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'SideBurnz'
  },
  69: {
    char: 'E',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  82: {
    char: 'R',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 0.5,
    name: 'Empty'
  },
  72: {
    char: 'H',
    audio: new Audio('gs://plethora-drums-db.appspot.com/SAMPLE/sideburnz_1-a_a.wav'),
    vol: 1,
    name: 'Empty'
  },
  74: {
    char: 'J',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  75: {
    char: 'K',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  76: {
    char: 'L',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  85: {
    char: 'U',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  73: {
    char: 'I',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  79: {
    char: 'O',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  },
  80: {
    char: 'P',
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'Empty'
  }
}

display.innerText = ctlrName;


// Play sounds
function playSound(code) {
  const sound = sounds[code].audio;
  const text = sounds[code].name;
  sound.play(code);
  sound.volume = sounds[code].vol;
  sound.currentTime = 0;
  display.innerText = display.innerText + "\n" + text;
}

function getMIDIMessage(midiMessage) {
  console.log(midiMessage.data[1]);
  let code = midiMessage.data[1]; 
  ctlrName = midiMessage.currentTarget.name
  display.innerText = "";
  display.innerText = ctlrName;
  playSound(code);
}

// Trigger sounds on key press
document.addEventListener('keydown', keyPress)

function keyPress(e) {
  
  let key = document.querySelector(`.pad[data-key='${e.keyCode}']`);
  let code = e.keyCode;
  if (key === null) {
    return
  }
  key.classList.add('pressed');
  display.innerText = "";
  display.innerText = "Keyboard: ";
  playSound(code);
}

// Trigger sounds on pad click
pads.forEach(function(pad) {
  addEventListener('click', padClick)
})

function padClick(e) {
  if (e.target.className === 'pad') {
    let code = e.target.dataset.key;
    e.target.classList.add('pressed');
    display.innerText = "";
    display.innerText = "Mouse: ";
    playSound(code);
  }
}

// Remove pressed CSS class
pads.forEach(function(pad) {
  pad.addEventListener('transitionend', removePressed)
})

function removePressed(e) {
  e.target.classList.remove('pressed');
}

// Clicks for buttons
function pressBtn(e) {
  e.target.classList.toggle('btn-pressed');
}

buttons.forEach(function(button) {
  button.addEventListener('click', pressBtn)
})

// Change cursor
pads.forEach(function(pad) {
  addEventListener('mouseover', changeCursor)
})

function changeCursor(e) {
  if (e.target.classList.contains('pad')) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'default';
  }
}
