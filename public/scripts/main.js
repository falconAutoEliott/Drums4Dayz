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

navigator.or('Cannot start MIDI engine!')
     .openMidiOut().or('Cannot open MIDI Out port!')
     .wait(500).send([0x90,60,127]) // note on
     .wait(500).send([0x80,60,0]);  // note off
navigator.openMidiIn().or('Cannot open MIDI In port!')
     .and(function() { console.log('MIDI-In: ', this.name()); })
     .connect(function(msg) { console.log(msg.toString()); })
     .wait(10000).close();

//function getMIDIMessage(midiMessage) {
 // console.log(midiMessage.data[1]);
 // console.log(midiMessage.currentTarget.name);
 // ctlrName = midiMessage.currentTarget.name
 // display.innerText = ctlrName;
//}

//function mapController(){
//
//}

const pads = document.querySelectorAll('.pad')
const buttons = document.querySelectorAll('.button')
const display = document.getElementById('display')
const sounds = {
  65: {
    char: 'A',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/kick.WAV'),
    vol: 1,
    name: 'KICK 1'
  },
  83: {
    char: 'S',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/Snare%207Mile%201.wav'),
    vol: 1,
    name: 'KICK 2'
  },
  68: {
    char: 'D',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/OpenHH.wav'),
    vol: 0.6,
    name: 'SNARE 1'
  },
  70: {
    char: 'F',
    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/ClosedHH%207Mile.wav'),
    vol: 1,
    name: 'SNARE 2'
  },
  81: {
    char: 'Q',
/*    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/chord1.wav'), */
audio: new Audio('Test-LocalAudio/sideburnz_1-a_a.wav'),
    vol: 0.7,
    name: 'SideBurnz'
  },
  87: {
    char: 'W',
/*    audio: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/chord2.wav'), */
    audio: new Audio('Test-LocalAudio/sideburnz_1-a_b.wav'),
    vol: 1,
    name: 'SideBurnz'
  },
  69: {
    char: 'E',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/hat10.mp3'),
    vol: 1,
    name: 'HAT 1'
  },
  82: {
    char: 'R',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/hat7.mp3'),
    vol: 0.5,
    name: 'HAT 2'
  },
  72: {
    char: 'H',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/pop1.mp3'),
    vol: 1,
    name: 'PERC 1'
  },
  74: {
    char: 'J',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/synth3.mp3'),
    vol: 1,
    name: 'SYNTH'
  },
  75: {
    char: 'K',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/strings2.mp3'),
    vol: 1,
    name: 'STRINGS 1'
  },
  76: {
    char: 'L',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/strings22.mp3'),
    vol: 1,
    name: 'STRINGS 2'
  },
  85: {
    char: 'U',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/wood1.mp3'),
    vol: 1,
    name: 'PERC 2'
  },
  73: {
    char: 'I',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/harp1.mp3'),
    vol: 1,
    name: 'HARP 1'
  },
  79: {
    char: 'O',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/harp2.mp3'),
    vol: 1,
    name: 'HARP 2'
  },
  80: {
    char: 'P',
    audio: new Audio('https://mpc2000.nyc3.digitaloceanspaces.com/harp3.mp3'),
    vol: 1,
    name: 'HARP 3'
  }
}

display.innerText = ctlrName;


// Play sounds
function playSound(code) {
  const sound = sounds[code].audio;
  const text = sounds[code].name;
  sound.play();
  sound.volume = sounds[code].vol;
  sound.currentTime = 0;
  display.innerText = text;
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
