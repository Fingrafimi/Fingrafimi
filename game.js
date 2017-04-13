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

}
// Load the home page
function loadHomePage() 
{
    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    homePage.width = width;
    homePage.height = height;

    var btnFj = game.add.button(30, 35, 'fj');
    btnFj.events.onInputDown.add(function(){ Assignment(0,0); });

    var btnDk = game.add.button(30, 75, 'dk');
    btnDk.events.onInputDown.add(function(){ Assignment(1,0); });

    var btnSl = game.add.button(30, 115, 'sl');
    btnSl.events.onInputDown.add(function(){ Assignment(2,0); });

    var btnAae = game.add.button(30, 155, 'aae');
    btnAae.events.onInputDown.add(function(){ Assignment(3,0); });

    var btnHome1 = game.add.button(25, 195, 'heimalyklar1');
    btnHome1.events.onInputDown.add(function(){ Assignment(4,0); });

    var btnHome2 = game.add.button(15, 245, 'heimalyklar2');
    btnHome2.events.onInputDown.add(function(){ Assignment(5,0); });

    var btnEh = game.add.button(30, 305, 'eh');
    btnEh.events.onInputDown.add(function(){ Assignment(6,0); });

    var btnIg = game.add.button(30, 345, 'ig');
    btnIg.events.onInputDown.add(function(){ Assignment(7,0); });

    var btnBn = game.add.button(30, 385, 'bn');
    btnBn.events.onInputDown.add(function(){ Assignment(8,0); });
    
    var btnRo = game.add.button(30, 425, 'ro'); 
    btnRo.events.onInputDown.add(function(){ Assignment(9,0); });

    var btnBrodd = game.add.button(30, 465, 'broddstafir');
    btnBrodd.events.onInputDown.add(function(){ Assignment(10,0); });
    
    var btnHastafir = game.add.button(30, 520, 'hastafir');
    btnHastafir.events.onInputDown.add(function(){ Assignment(11,0); });
    
    // stop event listener for keyboard
    game.input.keyboard.stop();
    
    // Initialize variables for assignments
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;

    addMuteButton();
}

function Assignment(assignmentNr, exerciseNr) 
{
    // Empty the canvas
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();
	
    if(this.exerciseNr === undefined)
    {
        this.exerciseNr = exerciseNr;
    }
    if(this.assignmentNr === undefined)
    {
        this.assignmentNr = assignmentNr;
    }

   	// Load new background
    loadBackground(assignmentNr);

    // Create the textArea
    text = exercisesArray[assignmentNr][exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, function(char){
        keyPress(char, assignmentNr, exerciseNr);
    });
    
    addExitButton();
    addMuteButton();

    addExercises(assignmentNr);
}

function keyPress(char, assignmentNr, exerciseNr) 
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
        quitExercise();
        exercisesFinished[assignmentNr][exerciseNr] = true;
        if(exerciseNr + 1 < exercisesArray[assignmentNr].length)
        {
             Assignment(assignmentNr, exerciseNr + 1);  
        }
        else
        {
            loadHomePage();
        }
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
    exitBtn.events.onInputDown.add(quitExercise);
}

function quitExercise()
{
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;
}

function addExercises(assignmentNr)
{
    
    if(assignmentNr === 0 || assignmentNr === 1)
    {
        addExerciseImages('mus', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('robot', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
    }
    else if(assignmentNr === 2)
    {
         addExerciseImages('mus', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
         addExerciseImages('robot', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 3);
    }
    else if(assignmentNr === 3)
    {
        addExerciseImages('mus' , exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('robot', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('mus', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
    }
    else if(assignmentNr === 4)
    {
        addExerciseImages('heyBaggi', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 0);
        addExerciseImages('blom', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 4);
        addExerciseImages('mus2', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 8);
    }
    else if(assignmentNr === 5)
    {
        addExerciseImages('heyBaggi', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 0);
        addExerciseImages('blom', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 4);
        addExerciseImages('mus2', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 8);
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        addExerciseImages('shell', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('starfish', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('shrimp', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('jellyfish', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('seahorse', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        addExerciseImages('saxafonn', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('tromma', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('piano', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('gitar', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('nota', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        addExerciseImages('korfubolti', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('blakbolti', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('rubbybolti',  exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('fotbolti',  exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('tennisbolti',  exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
}

function loadBackground(assignmentNr)
{
    
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
        background.anchor.setTo(0.5, 0.5);
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
        background = game.add.image(game.world.centerX, 204, 'blueBackground');
        game.add.image(0, 10,'clouds');
        game.add.image(0, 0,'farm');
        background.anchor.setTo(0.5, 0.5);
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'ocean');
        background.anchor.setTo(0.5, 0.5);
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'stage');
        background.anchor.setTo(0.5, 0.5);
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'blueBackground2');
        game.add.image(0, 103,'box');
        background.anchor.setTo(0.5, 0.5);
    }
}

// Breyta nefninu í addExerciseImages
function addExerciseImages(image, posArr, count, assignmentNr, exerciseNr)
{
    for(var i = 0; i < count; i++)
    {
        exerciseBtnArray[assignmentNr][exerciseNr+i]= game.add.button(posArr[i+exerciseNr][0], posArr[i+exerciseNr][1], image);
        //img.scale.setTo(0.8);
        if(exercisesFinished[assignmentNr][exerciseNr+i] === true)
        {
            exerciseBtnArray[assignmentNr][exerciseNr+i].frame = 1;
        }

        (function() 
        {
            var exerciseNum = exerciseNr + i;
            exerciseBtnArray[assignmentNr][exerciseNr+i].events.onInputDown.add(function(){ Assignment(assignmentNr, exerciseNum); });
        }()); // immediate invocation
    }
}