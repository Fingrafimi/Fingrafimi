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
var style = { font: '44px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 600 };

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
function preload()
{
    // ================ Background images ================ 
    game.load.image('homePage', 'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');
    game.load.image('blueBackground', 'Assets/Images/Backgrounds/blueBackground.png');
    game.load.image('farm', 'Assets/Images/Backgrounds/sveit.png');
    game.load.image('clouds', 'Assets/Images/Backgrounds/sky.png');
    game.load.image('blueBackground2', 'Assets/Images/Backgrounds/blueBackground2.png');
    game.load.image('box', 'Assets/Images/Backgrounds/box.png');

    game.load.image('stage', 'Assets/Images/Backgrounds/svid.png');
    game.load.image('ocean', 'Assets/Images/Backgrounds/sandur.png');



    


    // ================ Small icons ================ 
    game.load.spritesheet('exit', 'Assets/Images/Buttons/Global/x.png', 42, 42);
    game.load.spritesheet('sound', 'Assets/Images/Buttons/Global/sound.png', 100, 96);

    // ================ Assignments buttons ================ 
    game.load.image('fj', 'Assets/Images/Buttons/Homescreen/fj.png');
    game.load.image('dk', 'Assets/Images/Buttons/Homescreen/dk.png');
    game.load.image('sl', 'Assets/Images/Buttons/Homescreen/sl.png');
    game.load.image('aae', 'Assets/Images/Buttons/Homescreen/aae.png');
    game.load.image('heimalyklar1', 'Assets/Images/Buttons/Homescreen/heimalyklar1.png');
    game.load.image('heimalyklar2', 'Assets/Images/Buttons/Homescreen/heimalyklar2.png');
    game.load.image('eh', 'Assets/Images/Buttons/Homescreen/eh.png');
    game.load.image('ig', 'Assets/Images/Buttons/Homescreen/ig.png');
    game.load.image('bn', 'Assets/Images/Buttons/Homescreen/bn.png');
    game.load.image('ro', 'Assets/Images/Buttons/Homescreen/ro.png');
    game.load.image('broddstafir', 'Assets/Images/Buttons/Homescreen/broddstafir.png');
    game.load.image('hastafir', 'Assets/Images/Buttons/Homescreen/hastafir.png');

    // Audio files
    game.load.audio('wrongSound', 'Assets/Sounds/wrongSound.mp3');
    game.load.audio('intro', 'Assets/Sounds/Inngangur.mp3');

    // Images for Assigments
    game.load.spritesheet('mus', 'Assets/Images/Buttons/Assignments/mus.png', 110, 70);
    game.load.spritesheet('robot', 'Assets/Images/Buttons/Assignments/robot.png', 105, 127);
    game.load.spritesheet('heyBaggi', 'Assets/Images/Buttons/Assignments/hey.png', 122, 95);
    game.load.spritesheet('blom', 'Assets/Images/Buttons/Assignments/blom.png', 73, 95);
    game.load.spritesheet('mus2', 'Assets/Images/Buttons/Assignments/mus2.png', 91, 84);
    game.load.spritesheet('shell', 'Assets/Images/Buttons/Assignments/shell.png', 57, 65);

    game.load.spritesheet('blakbolti', 'Assets/Images/Buttons/Assignments/blakbolti.png', 61, 65);
    game.load.spritesheet('fotbolti', 'Assets/Images/Buttons/Assignments/fotbolti.png', 61, 61);
    game.load.spritesheet('korfubolti', 'Assets/Images/Buttons/Assignments/korfubolti.png', 60, 61);
    game.load.spritesheet('rubbybolti', 'Assets/Images/Buttons/Assignments/rubbybolti.png', 78, 53);
    game.load.spritesheet('tennisbolti', 'Assets/Images/Buttons/Assignments/tennisbolti.png', 28, 28);

    game.load.spritesheet('gitar', 'Assets/Images/Buttons/Assignments/gitar.png', 69, 99);
    game.load.spritesheet('tromma', 'Assets/Images/Buttons/Assignments/trommur.png', 47, 44);
    game.load.spritesheet('nota', 'Assets/Images/Buttons/Assignments/nota.png', 54, 42);
    game.load.spritesheet('piano', 'Assets/Images/Buttons/Assignments/piano.png', 101, 48);
    game.load.spritesheet('saxafonn', 'Assets/Images/Buttons/Assignments/saxafonn.png', 48, 87);

    game.load.spritesheet('jellyfish', 'Assets/Images/Buttons/Assignments/jellyfish.png', 60, 68);
    game.load.spritesheet('starfish', 'Assets/Images/Buttons/Assignments/starfish.png', 77, 74);
    game.load.spritesheet('shrimp', 'Assets/Images/Buttons/Assignments/shrimp.png', 77, 76);
    game.load.spritesheet('seahorse', 'Assets/Images/Buttons/Assignments/seahorse.png', 54, 109);
    game.load.spritesheet('shell', 'Assets/Images/Buttons/Assignments/shell.png', 67, 65);
}

function create() 
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
    console.log('Update');
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
    btnFj.events.onInputDown.add(Assignment1, {exercise: fj});

    var btnDk = game.add.button(30, 75, 'dk');
    btnDk.events.onInputDown.add(Assignment1, {exercise: dk});

    var btnSl = game.add.button(30, 115, 'sl');
    btnSl.events.onInputDown.add(Assignment1, {exercise: sl});

    var btnAae = game.add.button(30, 155, 'aae');
    btnAae.events.onInputDown.add(Assignment1, {exercise: aae});

    var btnHome1 = game.add.button(25, 195, 'heimalyklar1');
    btnHome1.events.onInputDown.add(Assignment2, {exercise: heimalyklar1});

    var btnHome2 = game.add.button(15, 245, 'heimalyklar2');
    btnHome2.events.onInputDown.add(Assignment2, {exercise: heimalyklar2});

    var btnEh = game.add.button(30, 305, 'eh');
    btnEh.events.onInputDown.add(Assignment3, {exercise: eh}); //3

    var btnIg = game.add.button(30, 345, 'ig');
    btnIg.events.onInputDown.add(Assignment3, {exercise: ig}); // 3

    var btnBn = game.add.button(30, 385, 'bn');
    btnBn.events.onInputDown.add(Assignment4, {exercise: bn}); // 4

    var btnRo = game.add.button(30, 425, 'ro'); 
    btnRo.events.onInputDown.add(Assignment4, {exercise: ro}); // 4

    var btnBrodd = game.add.button(30, 465, 'broddstafir');
    btnBrodd.events.onInputDown.add(Assignment5, {exercise: broddstafir}); 

    var btnHastafir = game.add.button(30, 520, 'hastafir');
    btnHastafir.events.onInputDown.add(Assignment, {exercise: hastafir});

    // stop event listener for keyboard
    game.input.keyboard.stop();
    
    // Initialize variables for assignments
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;

    addMuteButton();
}

function Assignment1(exerciseNr) 
{
	// Empty the canvas
   	game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }
  

   	// Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    
    addExitButton();
    addMuteButton();

    addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100, Assignment1);
    if(this.exercise === sl  )
    {
        // add 4 robots in postition (500,450) with start index 3.
        addAssignmentImages('robot', this.exercise, 500, 450, 3, 4, 100, Assignment1);
    }
    else if(this.exercise === aae)
    {
        addAssignmentImages('robot', this.exercise, 350, 450, 3, 3, 100, Assignment1);
        addAssignmentImages('mus', this.exercise, 600, 475, 6, 3, 100, Assignment1);
    }
    else
    {
        addAssignmentImages('robot', this.exercise, 500, 450, 3, 3, 100, Assignment1);
    }
}

function Assignment2(exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }

    // Load new background
    background = game.add.image(game.world.centerX, 204, 'blueBackground');
    game.add.image(0, 10,'clouds');
    game.add.image(0, 0,'farm');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 + 50 , text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    addExitButton();
    addMuteButton();

    addAssignmentImages('heyBaggi', this.exercise, 25, 475, 0, 4, 100, Assignment2);
    addAssignmentImages('blom', this.exercise, 430, 475, 4, 4, 60, Assignment2);
    addAssignmentImages('mus2', this.exercise, 650, 475, 8, 3, 75, Assignment2);

}

function Assignment3(exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }

    // Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'ocean');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 + 50 , text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    addExitButton();
    addMuteButton();

    addAssignmentImages('shell', this.exercise, 25, 500, 0, 3, 60, Assignment3);
    addAssignmentImages('starfish', this.exercise, 205, 500, 3, 3, 60, Assignment3);
    addAssignmentImages('shrimp', this.exercise, 385, 500, 6, 3, 60, Assignment3);
    addAssignmentImages('jellyfish', this.exercise, 565, 500, 9, 3, 60, Assignment3);
    addAssignmentImages('seahorse', this.exercise, 750, 500, 12, 3, 50, Assignment3);
}


function Assignment4(exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }

    // Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'stage');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 + 50 , text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    addExitButton();
    addMuteButton();

    addAssignmentImages('saxafonn', this.exercise, 25, 500, 0, 3, 60, Assignment4);
    addAssignmentImages('tromma', this.exercise, 205, 500, 3, 3, 60, Assignment4);
    addAssignmentImages('piano', this.exercise, 385, 500, 6, 3, 60, Assignment4);
    addAssignmentImages('gitar', this.exercise, 565, 500, 9, 3, 60, Assignment4);
    addAssignmentImages('nota', this.exercise, 750, 500, 12, 3, 50, Assignment4);

}

function Assignment5(exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }

    // Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'blueBackground2');
    game.add.image(0, 103,'box');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 + 50 , text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    addExitButton();
    addMuteButton();

    addAssignmentImages('blakbolti', this.exercise, 25, 475, 0, 3, 60, Assignment5);
    addAssignmentImages('fotbolti', this.exercise, 205, 475, 3, 3, 60, Assignment5);
    addAssignmentImages('korfubolti', this.exercise, 385, 475, 6, 3, 60, Assignment5);
    addAssignmentImages('rubbybolti', this.exercise, 565, 475, 9, 3, 60, Assignment5);
    addAssignmentImages('tennisbolti', this.exercise, 750, 475, 12, 3, 60, Assignment5);

}


function Assignment(exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }
  

    // Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    
    

    addExitButton();
    addMuteButton();
    if(this.exercise === fj || this.exercise === dk || this.exercise === sl || this.exercise === aae)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100);
        if(this.exercise === sl  )
        {
            // add 4 robots in postition (500,450) with start index 3.
            addAssignmentImages('robot', this.exercise, 500, 450, 3, 4, 100);
        }
        else if(this.exercise === aae)
        {
            addAssignmentImages('robot', this.exercise, 350, 450, 3, 3, 100);
            addAssignmentImages('mus', this.exercise, 600, 475, 6, 3, 100);
        }
        else
        {
            addAssignmentImages('robot', this.exercise, 500, 450, 3, 3, 100);
        }
    }
    else if(this.exercise === heimalyklar1 || this.exercise === heimalyklar2 )
    {
        addAssignmentImages('heyBaggi', this.exercise, 25, 475, 0, 4, 100);
        addAssignmentImages('blom', this.exercise, 430, 475, 4, 4, 60);
        addAssignmentImages('mus2', this.exercise, 650, 475, 8, 3, 75);
    }
}

function keyPress(char) 
{
    var wrongSound = game.add.audio('wrongSound');

    if(incorrPos != -1)
    {
        if(char === text.charAt(incorrPos))
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
        if(char === text.charAt(textPos))
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

    if(textPos >= text.length && incorrPos === -1)
    {
        alert("TIL HAMINGJU ÞÚ ERT BÚINN !");

        text = "";
        corrCount = 0;
        incorrPos = -1;
        textPos = 0;

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

function addExitButton()
{
    exitBtn = game.add.button(850, 15, 'exit');
    exitBtn.events.onInputOver.add(overExit);
    exitBtn.events.onInputOut.add(outExit);
    exitBtn.events.onInputDown.add(loadHomePage);
}

function addMouse(exerc, pos, startIndex, count)
{
     for(i = 0; i < count; i++)
    {
        var mus = game.add.button(pos, 475, 'mus');
        mus.events.onInputDown.add(Assignment, {exerciseNr: startIndex + i, exercise: exerc});
        pos = pos + 100;
    }
}

function addRobot(exerc, pos, startNr, count)
{
    for(i = 0; i < count; i++)
    {
        var robot = game.add.button(pos, 450, 'robot');
        robot.events.onInputDown.add(Assignment, {exerciseNr: startNr + i, exercise: exerc});
        pos = pos + 100;
    }
}


function addAssignmentImages(image, exerc, x, y, startNr, count, xOffset,func)
{
    var yOffset = -1;
    for(i = 0; i < count; i++)
    {
        var img = game.add.button(x, y + yOffset * 25, image);
        img.scale.setTo(0.8);
        img.events.onInputDown.add(func, {exerciseNr: startNr + i, exercise: exerc});
        x = x + xOffset;
        yOffset = yOffset * (-1);
    }
}