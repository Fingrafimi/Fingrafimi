/*jshint sub:true*/

// Create instance of the game
var width = 900;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// Create a variable for bitMapData to display text, used in functions Assignment and KeyPress
var textArea;
// Define the size of the area
var textAreaX = 900;
var textAreaY = 65;
var inExercise = false;

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

var fKey;
var currentExecBtn = [0, 0];
var keyboardMap = new Map();

// Load the resources needed
function preload()
{
    // Background images
    game.load.image('homePage', 'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');

    
    //Images
    game.load.image('keyboard', 'Assets/Images/Keyboard/lyklabord-4/lyklabord/grind-small.png');
    /*game.load.spritesheet('qwerty', 'Assets/Images/Keyboard/qwerty.png', 492, 50);
    game.load.spritesheet('asdfgh', 'Assets/Images/Keyboard/asdfgh - Copy.png', 439, 47);
    game.load.spritesheet('spaceBar', 'Assets/Images/Keyboard/spaceBar.png', 420, 70);*/
    
    

    //Images for keyboard 
    //game.load.image('keyboardLayout', 'Assets/Images/Keyboard/lyklabord-3/lyklabord/grind.png');
    game.load.spritesheet('asdf', 'Assets/Images/Keyboard/newKeyboard/asdf-sprite.png', 43, 45);
    //game.load.image('a-g2', 'Assets/Images/Keyboard/lyklabord-4/lyklabord/a - sprite.png');


    // Small icons
    game.load.spritesheet('exit', 'Assets/Images/Buttons/Global/x.png', 42, 42);
    game.load.spritesheet('sound', 'Assets/Images/Buttons/Global/sound.png', 99, 95);

    // Assignments buttons
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
    inExercise = false;

    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    // Add offset of 4px to remove black frame
    homePage.width = width;
    homePage.height = height;

    var btnFj = game.add.button(30, 35, 'fj');
    btnFj.events.onInputDown.add(Assignment, {exercise: fj});
    btnFj.events.onInputDown.add(function(){ currentExecBtn[0] = 0; });

    var btnDk = game.add.button(30, 75, 'dk');
    btnDk.events.onInputDown.add(Assignment, {exercise: dk});
    btnDk.events.onInputDown.add(function(){ currentExecBtn[0] = 1; });

    var btnSl = game.add.button(30, 115, 'sl');
    btnSl.events.onInputDown.add(Assignment, {exercise: sl});
    btnSl.events.onInputDown.add(function(){ currentExecBtn[0] = 2; });

    var btnAae = game.add.button(30, 155, 'aae');
    btnAae.events.onInputDown.add(Assignment, {exercise: aae});
    btnAae.events.onInputDown.add(function(){ currentExecBtn[0] = 3; });

    var btnHome1 = game.add.button(25, 195, 'heimalyklar1');
    btnHome1.events.onInputDown.add(Assignment, {exercise: heimalyklar1});
    btnHome1.events.onInputDown.add(function(){ currentExecBtn[0] = 4; });

    var btnHome2 = game.add.button(15, 245, 'heimalyklar2');
    btnHome2.events.onInputDown.add(Assignment, {exercise: heimalyklar2});
    btnHome2.events.onInputDown.add(function(){ currentExecBtn[0] = 5; });

    var btnEh = game.add.button(30, 305, 'eh');
    btnEh.events.onInputDown.add(Assignment, {exercise: eh});
    btnEh.events.onInputDown.add(function(){ currentExecBtn[0] = 6; });

    var btnIg = game.add.button(30, 345, 'ig');
    btnIg.events.onInputDown.add(Assignment, {exercise: ig});
    btnIg.events.onInputDown.add(function(){ currentExecBtn[0] = 7; });

    var btnBn = game.add.button(30, 385, 'bn');
    btnBn.events.onInputDown.add(Assignment, {exercise: bn});
    btnBn.events.onInputDown.add(function(){ currentExecBtn[0] = 8; });

    var btnRo = game.add.button(30, 425, 'ro');
    btnRo.events.onInputDown.add(Assignment, {exercise: ro});
    btnRo.events.onInputDown.add(function(){ currentExecBtn[0] = 9; });

    var btnBrodd = game.add.button(30, 465, 'broddstafir');
    btnBrodd.events.onInputDown.add(Assignment, {exercise: broddstafir});
    btnBrodd.events.onInputDown.add(function(){ currentExecBtn[0] = 10; });

    var btnHastafir = game.add.button(30, 520, 'hastafir');
    btnHastafir.events.onInputDown.add(Assignment, {exercise: hastafir});
    btnHastafir.events.onInputDown.add(function(){ currentExecBtn[0] = 11; });

    addMuteButton();
}

function Assignment(exerciseNr) 
{
    console.log(currentExecBtn);

    inExercise = true;
	// Empty the canvas
   	game.world.removeAll();
    intro.destroy();

    if(!this.exerciseNr)
    {
        this.exerciseNr = 0;
    }

    //console.log(this.startNr);
    //console.log(this.count);

   	// Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

    keyboard = game.add.image(0, 0, 'keyboard');
    aKey = game.add.sprite(241, game.world.centerY + 49, 'asdf', 0);
    aKey.animations.add('blink', [0, 1, 0, 1, 0], 2, false);

    sKey = game.add.sprite(285, game.world.centerY + 49, 'asdf', 2);
    sKey.animations.add('blink', [2, 3, 2, 3, 2], 2, false);

    dKey = game.add.sprite(328, game.world.centerY + 49, 'asdf', 4);
    dKey.animations.add('blink', [4, 5, 4, 5, 4], 2, false);

    fKey = game.add.sprite(371, game.world.centerY + 49, 'asdf', 6);
    fKey.animations.add('blink', [6, 7, 6, 7, 6], 2, false);

    gKey = game.add.sprite(416, game.world.centerY + 49, 'asdf', 8);
    gKey.animations.add('blink', [8, 9, 8, 9, 8], 2, false);

    hKey = game.add.sprite(460, game.world.centerY + 49, 'asdf', 10);
    hKey.animations.add('blink', [10, 11, 10, 11, 10], 2, false);

    /*jKey = game.add.sprite(504, game.world.centerY + 49, 'asdf', 12);
    jKey.animations.add('blink', [12, 13, 12, 13, 12], 2, false);
    keyboardMap['j'] =jKey;*/

    jKey = game.add.sprite(504, game.world.centerY + 49, 'asdf', 12);
    //keyboardMap.set('j', jKey);
    //keyboardMap.get('j').animations.add('blink', [12, 13, 12, 13, 12], 2, false);

    //a_g = game.add.image(0, 0, 'a-g');
    //a_g.scale.setTo(1.25);

    /*
    //Create the keyboard
    keyboard = game.add.image(game.world.centerX, game.world.centerY - 25, 'keyboard');
    keyboard.anchor.setTo(0.5);
    keyboard.scale.setTo(0.75);
    setup1 = game.add.image(game.world.centerX - 50, game.world.centerY - 82, 'qwerty');
    setup1.anchor.setTo(0.5);
    setup1.scale.setTo(1.073);
    setup1.frame = 6;
    */
    //setup2 = game.add.image(game.world.centerX + 9, game.world.centerY + 71, 'asdfgh');
    //setup2.anchor.setTo(0.5);

    //a_g = game.add.image(0, 0, 'a-g');
    //a_g2 = game.add.image(40, 0, 'a-g2');
    //setup2.scale.setTo(0.755);
    /*
    spacebar = game.add.image(game.world.centerX - 24, game.world.centerY + 76, 'spaceBar');
    spacebar.anchor.setTo(0.5);
    spacebar.scale.setTo(0.75);
    */

    // Create the textArea
    text = this.exercise[this.exerciseNr];
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
    textArea.anchor.set(0.5);

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
    
    exitBtn = game.add.button(850, 15, 'exit');
    exitBtn.events.onInputOver.add(overExit);
    exitBtn.events.onInputOut.add(outExit);
    exitBtn.events.onInputDown.add(loadHomePage);
    exitBtn.events.onInputDown.add(quitExercise);


    addMuteButton();

    if(this.exercise == fj)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100, 0, 0);
        addAssignmentImages('robot', this.exercise, 500, 450, 3, 3, 100, 0, 3);
    }
    else if(this.exercise == dk)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100, 1, 0);
        addAssignmentImages('robot', this.exercise, 500, 450, 3, 3, 100, 1, 3);
    }
    else if(this.exercise == sl)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100, 2, 0);
        addAssignmentImages('robot', this.exercise, 500, 450, 3, 4, 100, 2, 3);
    }
    else if(this.exercise == aae)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100, 3, 0);
        addAssignmentImages('robot', this.exercise, 350, 450, 3, 3, 100, 3, 3);
        addAssignmentImages('mus', this.exercise, 600, 475, 6, 3, 100, 3, 6);
    }

    /*if(this.exercise == fj || this.exercise == dk || this.exercise == sl || this.exercise == aae)
    {
        addAssignmentImages('mus',this.exercise, 25, 475, 0, 3, 100);
        if(this.exercise == sl  )
        {
            // add 4 robots in postition (500,450) with start index 3.
            addAssignmentImages('robot', this.exercise, 500, 450, 3, 4, 100);
        }
        else if(this.exercise == aae)
        {
            addAssignmentImages('robot', this.exercise, 350, 450, 3, 3, 100);
            addAssignmentImages('mus', this.exercise, 600, 475, 6, 3, 100);
        }
        else
        {
            addAssignmentImages('robot', this.exercise, 500, 450, 3, 3, 100);
        }
    }*/ 

    if(this.exercise == heimalyklar1 || this.exercise == heimalyklar2 )
    {
        addAssignmentImages('heyBaggi', this.exercise, 25, 475, 0, 4, 100);
        addAssignmentImages('blom', this.exercise, 430, 475, 4, 4, 60);
        addAssignmentImages('mus2', this.exercise, 650, 475, 8, 3, 75);
    }

    //exerciseBtnArray[this.startNr][this.count].frame = 1;
    //console.log(exerciseBtnArray);

}

function keyPress(char) 
{
    if(inExercise)
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
                fKey.play('blink');
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
                fKey.play('blink');

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
            exercisesFinished[currentExecBtn[0]][currentExecBtn[1]] = true;
            //exerciseBtnArray[currentExecBtn[0]][currentExecBtn[1]].frame = 1;
            console.log(exercisesFinished);
            return;
        }

        //console.log(currentExecBtn);
        
    }
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


function addAssignmentImages(image, exerc, x, y, startNr, count, xOffset, arrayIndex, iteration)
{
    var yOffset = -1;
    for(i = 0; i < count; i++)
    {
        var img = game.add.button(x, y + yOffset * 25, image);
        if(exercisesFinished[arrayIndex][iteration + i] === true)
        {
            img.frame = 1;
        }
        exerciseBtnArray[startNr][i] = img;
        img.scale.setTo(0.8);
        img.events.onInputDown.add(Assignment, {exerciseNr: startNr + i, exercise: exerc, startNr: startNr, count: i});
        img.events.onInputDown.add(transportBtn, {x: arrayIndex, y: iteration + i});
        //console.log('startNr: ' + startNr);1
        //console.log('exerc: ' + exerc);
        //exerciseBtnArray[startNr][exerc] = image;
        //console.log(image);
        x = x + xOffset;
        yOffset = yOffset * (-1);
    }
}

function transportBtn()
{
    currentExecBtn[0] = this.x;
    currentExecBtn[1] = this.y;
}