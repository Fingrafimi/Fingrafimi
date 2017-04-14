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
    // ================ Background images ================ 
    game.load.image('homePage', 'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');
    
    //Images
    game.load.image('keyboard', 'Assets/Images/keyboardSprite/v2/lyklabord700.png');
    game.load.spritesheet('keys', 'Assets/Images/keyboardSprite/v2/keySprite.png', 49, 45);
    game.load.spritesheet('spacebar', 'Assets/Images/keyboardSprite/v2/spacebarSprite.png', 259, 44);
    game.load.spritesheet('lShift', 'Assets/Images/keyboardSprite/v2/leftShiftSprite.png', 59, 43);
    game.load.spritesheet('rShift', 'Assets/Images/keyboardSprite/v2/rightShiftsprite.png', 118, 43);

    // Small icons
    game.load.image('blueBackground', 'Assets/Images/Backgrounds/blueBackground.png');
    game.load.image('farm', 'Assets/Images/Backgrounds/sveit.png');
    game.load.image('clouds', 'Assets/Images/Backgrounds/sky.png');
    game.load.image('blueBackground2', 'Assets/Images/Backgrounds/blueBackground2.png');
    game.load.image('box', 'Assets/Images/Backgrounds/box.png');
    game.load.image('stage', 'Assets/Images/Backgrounds/svid.png');
    game.load.image('ocean', 'Assets/Images/Backgrounds/sandur.png');

    // ================ Small icons ================ 
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

    // Audio files
    game.load.audio('wrongSound', 'Assets/Sounds/wrongSound.mp3');
    game.load.audio('intro', 'Assets/Sounds/Inngangur.mp3');

    // Images for Assigments
    game.load.spritesheet('mus', 'Assets/Images/Buttons/Assignments/mus.png', 110, 70);
    game.load.spritesheet('robot', 'Assets/Images/Buttons/Assignments/robot.png', 105, 127);
    game.load.spritesheet('heyBaggi', 'Assets/Images/Buttons/Assignments/hey.png', 80, 62);
    game.load.spritesheet('blom', 'Assets/Images/Buttons/Assignments/blom.png', 73, 95);
    game.load.spritesheet('mus2', 'Assets/Images/Buttons/Assignments/mus2.png', 91, 84);
    game.load.spritesheet('shell', 'Assets/Images/Buttons/Assignments/shell.png', 44, 43);

    game.load.spritesheet('blakbolti', 'Assets/Images/Buttons/Assignments/blakbolti.png', 48, 52);
    game.load.spritesheet('fotbolti', 'Assets/Images/Buttons/Assignments/fotbolti.png', 45, 45);
    game.load.spritesheet('korfubolti', 'Assets/Images/Buttons/Assignments/korfubolti.png', 50, 52);
    game.load.spritesheet('rubbybolti', 'Assets/Images/Buttons/Assignments/rubbybolti.png', 62, 42);
    game.load.spritesheet('tennisbolti', 'Assets/Images/Buttons/Assignments/tennisbolti.png', 26, 26);

    game.load.spritesheet('gitar', 'Assets/Images/Buttons/Assignments/gitar.png', 51, 73);
    game.load.spritesheet('tromma', 'Assets/Images/Buttons/Assignments/trommur.png', 37, 35);
    game.load.spritesheet('nota', 'Assets/Images/Buttons/Assignments/nota.png', 50, 40);
    game.load.spritesheet('piano', 'Assets/Images/Buttons/Assignments/piano.png', 81, 38);
    game.load.spritesheet('saxafonn', 'Assets/Images/Buttons/Assignments/saxafonn.png', 57, 96);

    game.load.spritesheet('jellyfish', 'Assets/Images/Buttons/Assignments/jellyfish.png', 39, 44);
    game.load.spritesheet('starfish', 'Assets/Images/Buttons/Assignments/starfish.png', 50, 49);
    game.load.spritesheet('shrimp', 'Assets/Images/Buttons/Assignments/shrimp.png', 50, 50);
    game.load.spritesheet('seahorse', 'Assets/Images/Buttons/Assignments/seahorse.png', 35, 72);
    game.load.spritesheet('shell', 'Assets/Images/Buttons/Assignments/shell.png', 67, 65);
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

}

// Load the home page
function loadHomePage() 
{
    game.input.keyboard.stop();

    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    homePage.width = width;
    homePage.height = height;

    var btnFj = game.add.button(28, 20, 'fj');
    btnFj.events.onInputDown.add(function(){ Assignment(0, 0); });

    var btnDk = game.add.button(28, 70, 'dk');
    btnDk.events.onInputDown.add(function(){ Assignment(1, 0); });

    var btnSl = game.add.button(28, 120, 'sl');
    btnSl.events.onInputDown.add(function(){ Assignment(2, 0); });

    var btnAae = game.add.button(28, 170, 'aae');
    btnAae.events.onInputDown.add(function(){ Assignment(3, 0); });

    var btnHome1 = game.add.button(28, 215, 'heimalyklar1');
    btnHome1.events.onInputDown.add(function(){ Assignment(4, 0); });

    var btnHome2 = game.add.button(23, 275, 'heimalyklar2');
    btnHome2.events.onInputDown.add(function(){ Assignment(5, 0); });

    var btnEh = game.add.button(30, 340, 'eh');
    btnEh.events.onInputDown.add(function(){ Assignment(6, 0); });

    var btnIg = game.add.button(30, 388, 'ig');
    btnIg.events.onInputDown.add(function(){ Assignment(7, 0); });

    var btnBn = game.add.button(30, 437, 'bn');
    btnBn.events.onInputDown.add(function(){ Assignment(8, 0); });
    
    var btnRo = game.add.button(30, 485, 'ro'); 
    btnRo.events.onInputDown.add(function(){ Assignment(9, 0); });

    var btnBrodd = game.add.button(30, 535, 'broddstafir');
    btnBrodd.events.onInputDown.add(function(){ Assignment(10, 0); });
    
    var btnHastafir = game.add.button(30, 605, 'hastafir');
    btnHastafir.events.onInputDown.add(function(){ Assignment(11, 0); });
    
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

   	// Load new background
    loadBackground(assignmentNr);

    // Load keyboard
    loadKeyboard(this.exerciseRow, this.exerciseIndex);

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
    wrongSound = game.add.audio('wrongSound');
    if(incorrPos != -1)
    {
        if(char === text.charAt(incorrPos))
        {
            incorrPos = -1;
            corrCount = corrCount + 1;
        }
        else
        {
            if(text.charAt(incorrPos) == text.charAt(incorrPos).toUpperCase())
            {
                keyboardKeysMap.get('shift').callAll('animations.play', 'animations', 'blink');
                keyboardKeysMap.get(text.charAt(incorrPos).toLowerCase()).play('blink');
            }
            else
            {
                keyboardKeysMap.get(text.charAt(incorrPos)).play('blink');
            }
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
            if(text.charAt(incorrPos) == text.charAt(incorrPos).toUpperCase())
            {
                keyboardKeysMap.get('shift').callAll('animations.play', 'animations', 'blink');
                keyboardKeysMap.get(text.charAt(incorrPos).toLowerCase()).play('blink');
            }
            else
            {
                keyboardKeysMap.get(text.charAt(incorrPos)).play('blink');
            }
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
    game.input.keyboard.stop();
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
    background.width = width;
    background.height = height;
}

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

function loadKeyboard(exerciseRow, exerciseIndex)
{
    keyboardKeysMap.set('a', game.add.sprite(241, 341, 'keys', 9));
    keyboardKeysMap.get('a').animations.add('blink', [9, 10, 9, 10, 9], 2, false);

    keyboardKeysMap.set('s', game.add.sprite(285, 341, 'keys', 27));   
    keyboardKeysMap.get('s').animations.add('blink', [27, 34, 27, 34, 27], 2, false); 
    
    keyboardKeysMap.set('d', game.add.sprite(328, 341, 'keys', 15));
    keyboardKeysMap.get('d').animations.add('blink', [15, 16, 15, 16, 15], 2, false);
    
    keyboardKeysMap.set('f', game.add.sprite(371, 341, 'keys', 21));
    keyboardKeysMap.get('f').animations.add('blink', [21, 22, 21, 22, 21], 2, false);
    
    keyboardKeysMap.set('g', game.add.sprite(416, 341, 'keys', 23));
    keyboardKeysMap.get('g').animations.add('blink', [23, 24, 23, 24, 23], 2, false);
    
    keyboardKeysMap.set('h', game.add.sprite(459, 340, 'keys', 25));
    keyboardKeysMap.get('h').animations.add('blink', [25, 26, 25, 26, 25], 2, false);
    
    keyboardKeysMap.set('j', game.add.sprite(502, 340, 'keys', 31));
    keyboardKeysMap.get('j').animations.add('blink', [31, 32, 31, 32, 31], 2, false);
    
    keyboardKeysMap.set('k', game.add.sprite(547, 340, 'keys', 33));
    keyboardKeysMap.get('k').animations.add('blink', [33, 35, 33, 35, 33], 2, false);
    
    keyboardKeysMap.set('l', game.add.sprite(589, 340, 'keys', 39));
    keyboardKeysMap.get('l').animations.add('blink', [39, 40, 39, 40, 39], 2, false);
    
    keyboardKeysMap.set('æ', game.add.sprite(636, 340, 'keys', 7));
    keyboardKeysMap.get('æ').animations.add('blink', [7, 8, 7, 8, 7], 2, false);

    keyboardKeysMap.set(' ', game.add.sprite(340, 429, 'spacebar', 0));
    keyboardKeysMap.get(' ').width = 264;
    keyboardKeysMap.get(' ').animations.add('blink', [0, 1, 0, 1, 0], 2, false);

    if(exerciseRow > 5)
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 17));
        keyboardKeysMap.get('e').animations.add('blink', [17, 18, 17, 18, 17], 2, false);
    }
    else
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 19));
    }

    if(exerciseRow > 6)
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 28));
        keyboardKeysMap.get('i').animations.add('blink', [28, 29, 28, 29, 28], 2, false);
    }
    else
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 30));
    }

    if(exerciseRow > 7)
    {
        keyboardKeysMap.set('b', game.add.sprite(437, 384, 'keys', 11));
        keyboardKeysMap.get('b').animations.add('blink', [11, 12, 11, 12, 11], 2, false);
        
        keyboardKeysMap.set('n', game.add.sprite(481, 384, 'keys', 6));
        keyboardKeysMap.get('n').animations.add('blink', [6, 13, 6, 13, 6], 2, false);
    }
    else
    {
        keyboardKeysMap.set('b', game.add.sprite(437, 384, 'keys', 14));
        keyboardKeysMap.set('n', game.add.sprite(481, 384, 'keys', 20));
    }

    if(exerciseRow > 8)
    {
        keyboardKeysMap.set('r', game.add.sprite(361, 298, 'keys', 3));
        keyboardKeysMap.get('r').animations.add('blink', [3, 4, 3, 4, 3], 2, false);
        
        keyboardKeysMap.set('o', game.add.sprite(581, 297, 'keys', 0));
        keyboardKeysMap.get('o').animations.add('blink', [0, 1, 0, 1, 0], 2, false);
    }
    else
    {
        keyboardKeysMap.set('r', game.add.sprite(361, 298, 'keys', 5));
        keyboardKeysMap.set('o', game.add.sprite(581, 297, 'keys', 2));
    }

    if(exerciseRow > 9)
    {
        keyboardKeysMap.set('´', game.add.sprite(677, 340, 'keys', 36));
        keyboardKeysMap.get('´').animations.add('blink', [36, 37, 36, 37, 36], 2, false);
    }
    else
    {
        keyboardKeysMap.set('´', game.add.sprite(677, 340, 'keys', 38));
    }

    keyboardKeysMap.set('shift', game.add.group());
    if(exerciseRow > 10)
    {
        keyboardKeysMap.get('shift').add(game.add.sprite(166, 386, 'lShift', 1));
        keyboardKeysMap.get('shift').add(game.add.sprite(702, 384, 'rShift', 1));
        keyboardKeysMap.get('shift').callAll('animations.add', 'animations', 'blink', [1, 2, 1, 2, 1], 2, false);
    }
    else
    {
        keyboardKeysMap.get('shift').add(game.add.sprite(166, 386, 'lShift', 0));
        keyboardKeysMap.get('shift').add(game.add.sprite(702, 384, 'rShift', 0));
    }
    
    keyboard = game.add.image(150, 175, 'keyboard');
}