/*jshint sub:true*/

// Create instance of the game
var width = 1000;
var height = 700;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// Create a variable for bitMapData to display text, used in functions Assignment and KeyPress
var textArea;
// Define the size of the area
var textAreaX = 1000;
var textAreaY = 65;
var inExercise = false;

// Variables for the assignments text
var style = { font: '44px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 600 };
var text = "";
var textX = 500;
var textY = 50;

//Variables for text positions
var corrCount = 0;
var incorrPos = -1;
var textPos = 0;

// Variables for into sound
var intro;
var firstLoad = true;

// Buttons
var exitBtn;
var muteBtn;

//Other variables
var wrongSound;
var currentExecBtn = [0, 0];

// Load the resources needed
function preload()
{
    // Background images
    game.load.image('homePage', 'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');
    
    //Images
    game.load.image('keyboard', 'Assets/Images/Keyboard/lyklabord-4/lyklabord/grind-small.png');
    game.load.spritesheet('asdf', 'Assets/Images/Keyboard/newKeyboard/asdf-sprite.png', 43, 45);

    // Small icons
    game.load.spritesheet('exit', 'Assets/Images/Buttons/Global/x.png', 42, 42);
    game.load.spritesheet('sound', 'Assets/Images/Buttons/Global/sound.png', 99, 95);

    // Assignments buttons
    game.load.image('fj', 'Assets/Images/Buttons/Homescreen/fogj.png');
    game.load.image('dk', 'Assets/Images/Buttons/Homescreen/dogk.png');
    game.load.image('sl', 'Assets/Images/Buttons/Homescreen/sogl.png');
    game.load.image('aae', 'Assets/Images/Buttons/Homescreen/aogae.png');
    game.load.image('heimalyklar1', 'Assets/Images/Buttons/Homescreen/allir1.png');
    game.load.image('heimalyklar2', 'Assets/Images/Buttons/Homescreen/allir2.png');
    game.load.image('eh', 'Assets/Images/Buttons/Homescreen/eogh.png');
    game.load.image('ig', 'Assets/Images/Buttons/Homescreen/iogg.png');
    game.load.image('bn', 'Assets/Images/Buttons/Homescreen/bogn.png');
    game.load.image('ro', 'Assets/Images/Buttons/Homescreen/rogo.png');
    game.load.image('broddstafir', 'Assets/Images/Buttons/Homescreen/btn11.png');
    game.load.image('hastafir', 'Assets/Images/Buttons/Homescreen/btn12.png');
 /*   game.load.image('fj', 'Assets/Images/Buttons/Homescreen/fogj.png');
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
    game.load.image('hastafir2', 'Assets/Images/Buttons/Homescreen/btn12.png');*/

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
}

function create() 
{
    intro = game.add.audio('intro');
    if(firstLoad)
    {
        //intro.play();
        firstLoad = false;
    }
    loadHomePage();
}

function update()
{
    //console.log('Update');
}

// Load the home page
function loadHomePage() 
{
    game.input.keyboard.stop();

    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    // Add offset of 4px to remove black frame
    homePage.width = width;
    homePage.height = height;

    var btnFj = game.add.button(28, 20, 'fj');
    btnFj.events.onInputDown.add(Assignment, {exerciseRow: 0, exerciseIndex: 0});
    btnFj.scale.setTo(0.85);

    var btnDk = game.add.button(28, 70, 'dk');
    btnDk.events.onInputDown.add(Assignment, {exerciseRow: 1, exerciseIndex: 0});
    btnDk.scale.setTo(0.85);

    var btnSl = game.add.button(28, 120, 'sl');
    btnSl.events.onInputDown.add(Assignment, {exerciseRow: 2, exerciseIndex: 0});
    btnSl.scale.setTo(0.85);

    var btnAae = game.add.button(28, 170, 'aae');
    btnAae.events.onInputDown.add(Assignment, {exerciseRow: 3, exerciseIndex: 0});
    btnAae.scale.setTo(0.85);

    var btnHome1 = game.add.button(28, 215, 'heimalyklar1');
    btnHome1.events.onInputDown.add(Assignment, {exerciseRow: 4, exerciseIndex: 0});
    btnHome1.scale.setTo(0.85);

    var btnHome2 = game.add.button(23, 275, 'heimalyklar2');
    btnHome2.events.onInputDown.add(Assignment, {exerciseRow: 5, exerciseIndex: 0});
    btnHome2.scale.setTo(0.85);

    var btnEh = game.add.button(30, 340, 'eh');
    btnEh.events.onInputDown.add(Assignment, {exerciseRow: 6, exerciseIndex: 0});
    btnEh.scale.setTo(0.85);

    var btnIg = game.add.button(30, 388, 'ig');
    btnIg.events.onInputDown.add(Assignment, {exerciseRow: 7, exerciseIndex: 0});
    btnIg.scale.setTo(0.85);

    var btnBn = game.add.button(30, 437, 'bn');
    btnBn.events.onInputDown.add(Assignment, {exerciseRow: 8, exerciseIndex: 0});
    btnBn.scale.setTo(0.85);

    var btnRo = game.add.button(30, 485, 'ro');
    btnRo.events.onInputDown.add(Assignment, {exerciseRow: 9, exerciseIndex: 0});
    btnRo.scale.setTo(0.85);

    var btnBrodd = game.add.button(30, 535, 'broddstafir');
    btnBrodd.events.onInputDown.add(Assignment, {exerciseRow: 10, exerciseIndex: 0});
    btnBrodd.scale.setTo(0.85);

    var btnHastafir = game.add.button(30, 605, 'hastafir');
    btnHastafir.events.onInputDown.add(Assignment, {exerciseRow: 11, exerciseIndex: 0});
    btnHastafir.scale.setTo(0.85);
/*    var btnFj = game.add.button(30, 35, 'fj');
    btnFj.events.onInputDown.add(Assignment, {exerciseRow: 0, exerciseIndex: 0});

    var btnDk = game.add.button(30, 75, 'dk');
    btnDk.events.onInputDown.add(Assignment, {exerciseRow: 1, exerciseIndex: 0});

    var btnSl = game.add.button(30, 115, 'sl');
    btnSl.events.onInputDown.add(Assignment, {exerciseRow: 2, exerciseIndex: 0});

    var btnAae = game.add.button(30, 155, 'aae');
    btnAae.events.onInputDown.add(Assignment, {exerciseRow: 3, exerciseIndex: 0});

    var btnHome1 = game.add.button(25, 195, 'heimalyklar1');
    btnHome1.events.onInputDown.add(Assignment, {exerciseRow: 4, exerciseIndex: 0});

    var btnHome2 = game.add.button(15, 245, 'heimalyklar2');
    btnHome2.events.onInputDown.add(Assignment, {exerciseRow: 5, exerciseIndex: 0});

    var btnEh = game.add.button(30, 305, 'eh');
    btnEh.events.onInputDown.add(Assignment, {exerciseRow: 6, exerciseIndex: 0});

    var btnIg = game.add.button(30, 345, 'ig');
    btnIg.events.onInputDown.add(Assignment, {exerciseRow: 7, exerciseIndex: 0});

    var btnBn = game.add.button(30, 385, 'bn');
    btnBn.events.onInputDown.add(Assignment, {exerciseRow: 8, exerciseIndex: 0});

    var btnRo = game.add.button(30, 425, 'ro');
    btnRo.events.onInputDown.add(Assignment, {exerciseRow: 9, exerciseIndex: 0});

    var btnBrodd = game.add.button(30, 465, 'broddstafir');
    btnBrodd.events.onInputDown.add(Assignment, {exerciseRow: 10, exerciseIndex: 0});

    var btnHastafir = game.add.button(30, 520, 'hastafir');
    btnHastafir.events.onInputDown.add(Assignment, {exerciseRow: 11, exerciseIndex: 0});*/
    addMuteButton();

}

function Assignment()
{
    game.world.removeAll();
    intro.destroy();
    game.input.keyboard.start();

    // Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);
    background.width = width;
    background.height = height;

    // Create the textArea
    text = exercisesArray[this.exerciseRow][this.exerciseIndex];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);


    if(this.exerciseRow === 0)
    {
        addAssignmentImages('mus', exercisesArray[this.exerciseRow], 25, 475, 0, 3, 100, 0, 0);
        addAssignmentImages('robot', exercisesArray[this.exerciseRow], 500, 450, 3, 3, 100, 0, 3);
    }
    else if(this.exercise == dk)
    {
        addAssignmentImages('mus', exercisesArray[this.exerciseRow], 25, 475, 0, 3, 100, 1, 0);
        addAssignmentImages('robot', exercisesArray[this.exerciseRow], 500, 450, 3, 3, 100, 1, 3);
    }

    addMuteButton();

    addExitButton();
}

function keyPress(char) 
{
    wrongSound = game.add.audio('wrongSound');

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
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
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

        quitExercise();
        exercisesFinished[this.exerciseRow][this.exerciseIndex] = true;
        exerciseBtnArray[this.exerciseRow][this.exerciseIndex].frame = 1;
        //console.log(exercisesFinished);
    }
}


function addMuteButton()
{
    muteBtn = game.add.button(890, 20, 'sound');
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

function addExitButton()
{
    exitBtn = game.add.button(930, 15, 'exit');
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

function overExit()
{
    exitBtn.frame = 1;
}

function outExit()
{
    exitBtn.frame = 0;
}

function addAssignmentImages(image, exerc, x, y, startNr, count, xOffset, arrayIndex, iteration)
{
    var yOffset = -1;
    for(i = 0; i < count; i++)
    {
        //var img = game.add.button(x, y + yOffset * 25, image);
        exerciseBtnArray[arrayIndex][iteration + i] = game.add.button(x, y + yOffset * 25, image);
        if(exercisesFinished[arrayIndex][iteration + i] === true)
        {
            exerciseBtnArray[arrayIndex][iteration + i].frame = 1;
        }
        //exerciseBtnArray[arrayIndex][iteration + i] = img;
        exerciseBtnArray[arrayIndex][iteration + i].scale.setTo(0.8);
        exerciseBtnArray[arrayIndex][iteration + i].events.onInputDown.add(Assignment, { exerciseRow: arrayIndex, exerciseIndex: iteration + i});
        //img.events.onInputDown.add(transportBtn, {x: arrayIndex, y: iteration + i});
        x = x + xOffset;
        yOffset = yOffset * (-1);
    }
}