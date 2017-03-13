// Create instance of the game
var width = 900;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// Create a variable for bitMapData to display text, used in functions Assignment and KeyPress
var textArea;
// Define the size of the area
var textAreaX = 900;
var textAreaY = 65;

// Variables for the assignments text
var style = { font: '64px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 600 };

var text = "";

var textX = 450;
var textY = 50;

var corrCount = 0;
var incorrPos = -1;
var textPos = 0;

// Buttons
var exitBtn;
var muteBtn;

// Variables for into sound
var intro;
var firstLoad = true;

// Load the resources needed
function preload () 
{
    // Background images
    game.load.image('homePage', 'Assets/homePage.png');
    game.load.image('homeKeysBackground','Assets/homeKeysBackground.png');

    // Small icons
    game.load.spritesheet('exit', 'Assets/x.png', 42, 42); 
    game.load.spritesheet('sound', 'Assets/sound.png', 100, 96); 

    // Assignments buttons
    game.load.image('fj', 'Assets/fj.png');
    game.load.image('dk', 'Assets/dk.png');
    game.load.image('sl', 'Assets/sl.png');
    game.load.image('aae', 'Assets/aae.png');
    game.load.image('heimalyklar1', 'Assets/heimalyklar1.png');
    game.load.image('heimalyklar2', 'Assets/heimalyklar2.png');
    game.load.image('eh', 'Assets/eh.png');
    game.load.image('ig', 'Assets/ig.png');
    game.load.image('bn', 'Assets/bn.png');
    game.load.image('ro', 'Assets/ro.png');
    game.load.image('broddstafir', 'Assets/broddstafir.png');
    game.load.image('hastafir', 'Assets/hastafir.png');
	
    // Audio files
    game.load.audio('wrongSound', 'Assets/wrongSound.mp3');
    game.load.audio('intro', 'Assets/Inngangur.mp3');
}

function create () 
{
    intro = game.add.audio('intro');
    if(firstLoad)
    {
        intro.play();
        firstLoad = false;
    }
	loadHomePage();
}

function update()
{

}

// Load the home page
function loadHomePage() 
{
    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    // Add offset of 4px to remove black frame
    homePage.width = width;
    homePage.height = height;

    var btnFj = game.add.button(30, 35, 'fj');
    btnFj.events.onInputDown.add(Assignment, fj);

    var btnDk = game.add.button(30, 75, 'dk');
    btnDk.events.onInputDown.add(Assignment, dk);

    var btnSl = game.add.button(30, 115, 'sl');
    btnSl.events.onInputDown.add(Assignment, sl);

    var btnAae = game.add.button(30, 155, 'aae');
    btnAae.events.onInputDown.add(Assignment, aae);

    var btnHome1 = game.add.button(25, 195, 'heimalyklar1');
    btnHome1.events.onInputDown.add(Assignment, heimalyklar1);

    var btnHome2 = game.add.button(15, 245, 'heimalyklar2');
    btnHome2.events.onInputDown.add(Assignment, heimalyklar2);

    var btnEh = game.add.button(30, 305, 'eh');
    btnEh.events.onInputDown.add(Assignment, eh);

    var btnIg = game.add.button(30, 345, 'ig');
    btnIg.events.onInputDown.add(Assignment, ig);

    var btnBn = game.add.button(30, 385, 'bn');
    btnBn.events.onInputDown.add(Assignment, bn);

    var btnRo = game.add.button(30, 425, 'ro');
    btnRo.events.onInputDown.add(Assignment, ro);

    var btnBrodd = game.add.button(30, 465, 'broddstafir');
    btnBrodd.events.onInputDown.add(Assignment, broddstafir);

    var btnHastafir = game.add.button(30, 520, 'hastafir');
    btnHastafir.events.onInputDown.add(Assignment, hastafir);

    addMuteButton();
}

function Assignment(exerciseNr) 
{
	// Empty the canvas
   	game.world.removeAll();
    intro.destroy();

   	// Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this[0];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    
    exitBtn = game.add.button(850, 15, 'exit');
    exitBtn.events.onInputOver.add(overExit);
    exitBtn.events.onInputOut.add(outExit);
    exitBtn.events.onInputDown.add(loadHomePage);

    addMuteButton();

}

function keyPress(char) 
{
    var wrongSound = game.add.audio('wrongSound');

    if(incorrPos != -1)
    {
        if(char == text.charAt(incorrPos))
        {
            incorrPos = -1;
            corrCount = corrCount + 1;
        }
        else
        {
            wrongSound.play();
        }
    }
    else
    {
        if(char == text.charAt(textPos))
        {
            corrCount = corrCount + 1;
        }
        else
        {
            incorrPos = textPos;
            wrongSound.play();

        }
        textPos = textPos + 1;
    }
    // Clear the textArea
    textArea.destroy();
    textArea = game.add.text(game.world.centerX, game.world.centerY/2, text, style);
    textArea.anchor.set(0.5);

    textArea.addColor('#00ff00',0);
    if(incorrPos != -1)
    {
        textArea.addColor('#ffa500',incorrPos);
    }
    
    textArea.addColor('#ffffff', textPos);

    if(textPos >= text.length && incorrPos == -1)
    {
        alert("TIL HAMINGJU ÞÚ ERT BÚINN !");
        return;
    }
}

function overExit()
{
    exitBtn.frame = 1;
}

function outExit()
{
    exitBtn.frame = 0;
}

function muteSound()
{
    if(game.sound.mute)
    {
        game.sound.mute = false;
        muteBtn.frame = 0;
    }
    else
    {
        game.sound.mute = true;
        muteBtn.frame = 1;
    }
}

function addMuteButton()
{
    muteBtn = game.add.button(815, 20, 'sound');
    muteBtn.scale.setTo(0.35);
    muteBtn.events.onInputDown.add(muteSound);

    if(game.sound.mute)
    {
        muteBtn.frame = 1;
    }
    else
    {
        muteBtn.frame = 0;
    }
}

