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
var logo;

//Other variables
var wrongSound;
var currentExecBtn = [0, 0];

var warmupHead;
var balloon;
var leftHand;
var rightHand;
var sounds = {};
var logoS;
var inTutorial;
var instructorMaggi;

// Load the resources needed
function preload()
{
    // ================ Background images ================ 
    game.load.image('homePage',           'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');
   // game.load.image('instructionBg',      'Assets/Images/Backgrounds/instructionBackground');

    //Images
    game.load.image('keyboard',                 'Assets/Images/keyboardSprite/v2/lyklabord700.png');
    game.load.spritesheet('keys',               'Assets/Images/keyboardSprite/v2/keySprite.png', 49, 45);
    game.load.spritesheet('spacebar',           'Assets/Images/keyboardSprite/v2/spacebarSprite.png', 259, 44);
    game.load.spritesheet('lShift',             'Assets/Images/keyboardSprite/v2/leftShiftSprite.png', 56, 43);
    game.load.spritesheet('rShift',             'Assets/Images/keyboardSprite/v2/rightShiftSprite.png', 125, 45);
    game.load.image('lHand',                    'Assets/Images/New Folder/vinstri.png');
    game.load.image('rHand',                    'Assets/Images/New Folder/haegri.png');
    game.load.image('logoS',                    'Assets/Images/titill.png');
    game.load.image('logoL',                    'Assets/Images/titillStaerri2.png');
    game.load.spritesheet('instructorMaggi',    'Assets/Images/Maggi/instructionMaggi.png', 524, 572);
    game.load.spritesheet('arrow',              'Assets/Images/Buttons/Global/arrowSprite.png', 93, 48);
    game.load.image('aboutInfo',                'Assets/Images/New Folder/aboutInfo.png');
    

    // Small icons
    game.load.image('blueBackground',   'Assets/Images/Backgrounds/blueBackground.png');
    game.load.image('farm',             'Assets/Images/Backgrounds/farm.png');
    game.load.image('clouds',           'Assets/Images/Backgrounds/sky.png');
    game.load.image('blueBackground2',  'Assets/Images/Backgrounds/blueBackground2.png');
    game.load.image('box',              'Assets/Images/Backgrounds/box.png');
    game.load.image('stage',            'Assets/Images/Backgrounds/svid.png');
    game.load.image('ocean',            'Assets/Images/Backgrounds/sandur.png');
    game.load.image('teacher',          'Assets/Images/Buttons/Global/teacher.png');
    game.load.image('mat',              'Assets/Images/Buttons/Global/mat.png');
    game.load.image('about',            'Assets/Images/Buttons/Global/about.png');
    
    // ================ Small icons ================ 
    game.load.spritesheet('exit',   'Assets/Images/Buttons/Global/x.png', 42, 42);
    game.load.spritesheet('sound',  'Assets/Images/Buttons/Global/sound.png', 99, 95);

    // Assignments buttons
    game.load.image('fj',               'Assets/Images/Buttons/Assignments/fogj.png');
    game.load.image('dk',               'Assets/Images/Buttons/Assignments/dogk.png');
    game.load.image('sl',               'Assets/Images/Buttons/Assignments/sogl.png');
    game.load.image('aae',              'Assets/Images/Buttons/Assignments/aogae.png');
    game.load.image('heimalyklar1',     'Assets/Images/Buttons/Assignments/allir1.png');
    game.load.image('heimalyklar2',     'Assets/Images/Buttons/Assignments/allir2.png');
    game.load.image('eh',               'Assets/Images/Buttons/Assignments/eogh.png');
    game.load.image('ig',               'Assets/Images/Buttons/Assignments/iogg.png');
    game.load.image('bn',               'Assets/Images/Buttons/Assignments/bogn.png');
    game.load.image('ro',               'Assets/Images/Buttons/Assignments/rogo.png');
    game.load.image('broddstafir',      'Assets/Images/Buttons/Assignments/btn11.png');
    game.load.image('hastafir',         'Assets/Images/Buttons/Assignments/btn12.png');
    game.load.spritesheet('btnSprite',  'Assets/Images/Buttons/Assignments/buttons.png', 124, 81);
    
    // Audio files
    game.load.audio('wrongSound',       'Assets/Sounds/wrongSound.mp3');
    game.load.audio('intro',            'Assets/Sounds/Inngangur.mp3');
    game.load.audio('fogj1',            'Assets/Sounds/F_og_J_1.mp3');
    game.load.audio('fogj2',            'Assets/Sounds/F_og_J_2.mp3');
    game.load.audio('findFJ',           'Assets/Sounds/F_OG_J_3.mp3');
    game.load.audio('instructionFJ',    'Assets/Sounds/instructionFJ.mp3');

    // Images for Assigments
    game.load.spritesheet('mus',        'Assets/Images/Buttons/Exercises/mus.png', 110, 70);
    game.load.spritesheet('robot',      'Assets/Images/Buttons/Exercises/robot.png', 105, 127);
    game.load.spritesheet('heyBaggi',   'Assets/Images/Buttons/Exercises/hey.png', 80, 62);
    game.load.spritesheet('blom',       'Assets/Images/Buttons/Exercises/blom.png', 73, 95);
    game.load.spritesheet('mus2',       'Assets/Images/Buttons/Exercises/mus2.png', 91, 84);
    game.load.spritesheet('shell',      'Assets/Images/Buttons/Exercises/shell.png', 44, 43);

    game.load.spritesheet('blakbolti',   'Assets/Images/Buttons/Exercises/blakbolti.png', 48, 52);
    game.load.spritesheet('fotbolti',    'Assets/Images/Buttons/Exercises/fotbolti.png', 45, 45);
    game.load.spritesheet('korfubolti',  'Assets/Images/Buttons/Exercises/korfubolti.png', 50, 52);
    game.load.spritesheet('rubbybolti',  'Assets/Images/Buttons/Exercises/rubbybolti.png', 62, 42);
    game.load.spritesheet('tennisbolti', 'Assets/Images/Buttons/Exercises/tennisbolti.png', 26, 26);

    game.load.spritesheet('gitar',      'Assets/Images/Buttons/Exercises/gitar.png', 51, 73);
    game.load.spritesheet('tromma',     'Assets/Images/Buttons/Exercises/trommur.png', 37, 35);
    game.load.spritesheet('nota',       'Assets/Images/Buttons/Exercises/nota.png', 50, 40);
    game.load.spritesheet('piano',      'Assets/Images/Buttons/Exercises/piano.png', 81, 38);
    game.load.spritesheet('saxafonn',   'Assets/Images/Buttons/Exercises/saxafonn.png', 57, 96);

    game.load.spritesheet('jellyfish',  'Assets/Images/Buttons/Exercises/jellyfish.png', 39, 44);
    game.load.spritesheet('starfish',   'Assets/Images/Buttons/Exercises/starfish.png', 50, 49);
    game.load.spritesheet('shrimp',     'Assets/Images/Buttons/Exercises/shrimp.png', 50, 50);
    game.load.spritesheet('seahorse',   'Assets/Images/Buttons/Exercises/seahorse.png', 35, 72);
    game.load.spritesheet('shell',      'Assets/Images/Buttons/Exercises/shell.png', 67, 65);

    game.load.image('logo',             'Assets/Images/logo.png');
    game.load.spritesheet('warmupKeys', 'Assets/Images/Keyboard/asdfgh.png', 699, 77);
    game.load.spritesheet('warmupHead', 'Assets/Images/Maggi/warmupHead2.png', 159, 155);
    game.load.spritesheet('balloons',   'Assets/Images/Maggi/balloons.png', 346, 192);
}

function create() 
{
    warmupHead = game.add.sprite(1000, 210, 'warmupHead', 0);
    balloon = game.add.sprite(100, 100, 'balloons', 0);
    leftHand = game.add.sprite(200, 700, 'lHand', 2);
    rightHand = game.add.sprite(200, 700, 'rHand', 0);
    instructorMaggi = game.add.sprite(500, 150, 'instructorMaggi', 0);
    //sounds['intro'] = game.add.audio('intro');
    intro = game.add.audio('intro');
    sounds['fogj1'] = game.add.audio('fogj1');
    sounds['fogj2'] = game.add.audio('fogj2');
    sounds['findFJ'] = game.add.audio('findFJ');

    inTutorial = false;
    
    loadHomePage();
}

function update()
{
    if(warmupHead.angle > -46 && warmupHead.x > 1015)
    {
        warmupHead.x -= 2;
        warmupHead.angle -= 1;
    }

    /*if(warmupHead.angle < -40)
    {
        balloon.visible = true;       
    }*/

    if(leftHand.y > 320 && balloon.visible === true)
    {
        leftHand.y -= 5;
    }

    if(rightHand.y > 320 && balloon.visible === true)
    {
        rightHand.y -= 5;
    }

}

// Load the home page
function loadHomePage() 
{
    inTutorial = false;
    game.input.keyboard.stop();
    game.sound.stopAll();
    game.world.removeAll();

    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    homePage.width = width;
    homePage.height = height;

    var logoL = game.add.image(200, 40, 'logoL');

    var instructorMaggi = game.add.sprite(500, 150, 'instructorMaggi', 0);
    instructorMaggi.scale.setTo(0.8);
    instructorMaggi.animations.add('talk', [0, 1, 0, 1, 1, 0], 6, true);
    
    if(firstLoad)
    {
        intro.onStop.add(function(){ instructorMaggi.animations.stop(); instructorMaggi.frame = 0; }, this);
        intro.play();
        instructorMaggi.play('talk');
        firstLoad = false;
    }

    var btnFj = game.add.button(28, 20, 'fj');
    btnFj.events.onInputDown.add(function(){ InstructionFJ(0, 0); });
    //btnFj.scale.setTo(0.85);

    var btnDk = game.add.button(28, 70, 'dk');
    btnDk.events.onInputDown.add(function(){ Instructions(1, 0); });
    //btnDk.scale.setTo(0.85);

    var btnSl = game.add.button(28, 120, 'sl');
    btnSl.events.onInputDown.add(function(){ Instructions(2, 0); });
    //btnSl.scale.setTo(0.85);
    
    var btnAae = game.add.button(28, 170, 'aae');
    btnAae.events.onInputDown.add(function(){ Instructions(3, 0); });
    //btnAae.scale.setTo(0.85);

    var btnHome1 = game.add.button(28, 215, 'heimalyklar1');
    btnHome1.events.onInputDown.add(function(){ Instructions(4, 0); });
    //btnHome1.scale.setTo(0.85);

    var btnHome2 = game.add.button(23, 275, 'heimalyklar2');
    btnHome2.events.onInputDown.add(function(){ Instructions(5, 0); });
    //btnHome2.scale.setTo(0.85);

    var btnEh = game.add.button(30, 340, 'eh');
    btnEh.events.onInputDown.add(function(){ Instructions(6, 0); });
    //btnEh.scale.setTo(0.85);

    var btnIg = game.add.button(30, 388, 'ig');
    btnIg.events.onInputDown.add(function(){ Instructions(7, 0); });
    //btnIg.scale.setTo(0.85);

    var btnBn = game.add.button(30, 437, 'bn');
    btnBn.events.onInputDown.add(function(){ Instructions(8, 0); });
    //btnBn.scale.setTo(0.85);
    
    var btnRo = game.add.button(30, 485, 'ro'); 
    btnRo.events.onInputDown.add(function(){ Instructions(9, 0); });
    //btnRo.scale.setTo(0.85);

    var btnBrodd = game.add.button(30, 535, 'broddstafir');
    btnBrodd.events.onInputDown.add(function(){ Instructions(10, 0); });
    //btnBrodd.scale.setTo(0.85);
    
    var btnHastafir = game.add.button(30, 605, 'hastafir');
    btnHastafir.events.onInputDown.add(function(){ Instructions(11, 0); });
    //btnHastafir.scale.setTo(0.85);
    
    // stop event listener for keyboard
    game.input.keyboard.stop();
    
    // Initialize variables for assignments
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;

    addLogo();

    addMuteButton();

    var btnteacher = game.add.button(830, 610, 'teacher', function() { window.open("http://vefir.nams.is/fingrafimi/fingrafimi_klbtilb.pdf", "_blank");}, this);   
    btnteacher.scale.setTo(0.8, 0.8);

    var btnmat = game.add.button(890, 610, 'mat', function() { window.open("http://vefir.nams.is/fingrafimi/fingrafimi_matsbl.pdf", "_blank");}, this);    
    btnmat.scale.setTo(0.8, 0.8);

    var btnabout = game.add.button(950, 605, 'about', function(){ loadAbout(); }, this);    
    btnabout.scale.setTo(0.8, 0.8);
}

function Assignment(assignmentNr, exerciseNr) 
{
    inTutorial = false;
    // Empty the canvas
    game.world.removeAll();
    game.sound.stopAll();
    intro.destroy();
    game.input.keyboard.start();

   	// Load new background
    loadBackground(assignmentNr);

    logo = game.add.image(370, 660, 'logo');
    logo.scale.setTo(0.45);

    // Load keyboard
    loadKeyboard(assignmentNr, exerciseNr);

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
    muteBtn.frame = 0;

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
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'farm');
        game.add.image(0, 10,'clouds');
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'ocean');
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'stage');
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'box');
    }
    background.width = width;
    background.height = height;
    background.anchor.setTo(0.5, 0.5);
}

function addExerciseImages(image, posArr, count, assignmentNr, exerciseNr)
{
    for(var i = 0; i < count; i++)
    {
        exerciseBtnArray[assignmentNr][exerciseNr+i] = game.add.button(posArr[i+exerciseNr][0], posArr[i+exerciseNr][1], image);
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

function loadKeyboard(assignmentNr, exerciseNr)
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

    if(assignmentNr > 5)
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 17));
        keyboardKeysMap.get('e').animations.add('blink', [17, 18, 17, 18, 17], 2, false);
    }
    else
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 19));
    }

    if(assignmentNr > 6)
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 28));
        keyboardKeysMap.get('i').animations.add('blink', [28, 29, 28, 29, 28], 2, false);
    }
    else
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 30));
    }

    if(assignmentNr > 7)
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

    if(assignmentNr > 8)
    {
        keyboardKeysMap.set('r', game.add.sprite(361, 298, 'keys', 3));
        keyboardKeysMap.get('r').animations.add('blink', [3, 4, 3, 4, 3], 2, false);
        
        keyboardKeysMap.set('o', game.add.sprite(579, 297, 'keys', 0));
        keyboardKeysMap.get('o').animations.add('blink', [0, 1, 0, 1, 0], 2, false);
    }
    else
    {
        keyboardKeysMap.set('r', game.add.sprite(361, 298, 'keys', 5));
        keyboardKeysMap.set('o', game.add.sprite(579, 297, 'keys', 2));
    }

    if(assignmentNr > 9)
    {
        keyboardKeysMap.set('´', game.add.sprite(678, 340, 'keys', 36));
        keyboardKeysMap.get('´').animations.add('blink', [36, 37, 36, 37, 36], 2, false);
    }
    else
    {
        keyboardKeysMap.set('´', game.add.sprite(678, 340, 'keys', 38));
    }

    keyboardKeysMap.set('shift', game.add.group());
    if(assignmentNr > 10)
    {
        keyboardKeysMap.get('shift').add(game.add.sprite(165, 386, 'lShift', 1));
        keyboardKeysMap.get('shift').add(game.add.sprite(700, 384, 'rShift', 1));
        keyboardKeysMap.get('shift').callAll('animations.add', 'animations', 'blink', [1, 2, 1, 2, 1], 2, false);
    }
    else
    {
        keyboardKeysMap.get('shift').add(game.add.sprite(165, 386, 'lShift', 0));
        keyboardKeysMap.get('shift').add(game.add.sprite(700, 384, 'rShift', 0));
    }
    
    keyboard = game.add.image(150, 175, 'keyboard');
}

function addLogo()
{
    logo = game.add.image(170, 655, 'logo');
    logo.scale.setTo(0.5);
}

function Instructions(assignmentNr, exerciseNr)
{
    game.world.removeAll();
    game.sound.stopAll();

    loadBackground(assignmentNr);

    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    addExitButton();
    addMuteButton();

   // addSkipButton(assignmentNr, exerciseNr,  WarmUpFJ);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);


}

function InstructionFJ(assignmentNr, exerciseNr)
{
    game.world.removeAll();
    game.sound.stopAll();


    //var homePage = game.add.image(game.world.centerX, game.world.centerY, 'instructionBg');
    //homePage.anchor.setTo(0.5, 0.5);
    //homePage.width = width;
    //homePage.height = height;
    loadBackground(assignmentNr);

   /* logo = game.add.image(25, 25, 'logoS');

    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    assignmentBtn.frame = 0;
    assignmentBtn.events.onInputDown.add(function(){inTutorial =false; Assignment(assignmentNr, exerciseNr); balloon.visible = false;});

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);*/
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    addExitButton();
    addMuteButton();

    addSkipButton(assignmentNr, exerciseNr,  WarmUpFJ);

    var instructorMaggi = game.add.sprite(game.world.centerX, game.world.centerY, 'instructorMaggi', 0);
    instructorMaggi.animations.add('talk', [0, 1, 0, 1, 1, 0], 6, true);
    instructorMaggi.anchor.setTo(0.5, 0.5);

    sounds['instruction'] = game.add.audio('instructionFJ');
    sounds['instruction'].onStop.add(function(){ instructorMaggi.animations.stop(); instructorMaggi.frame = 0; }, this);
    sounds['instruction'].play();
    instructorMaggi.play('talk');
}

function addLogoAndAssignmentID(assignmentNr, exerciseNr)
{
    logo = game.add.image(25, 25, 'logoS');
    logo.events.onInputDown.add(function(){loadHomePage();});

    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    assignmentBtn.frame = assignmentNr;
    assignmentBtn.events.onInputDown.add(function(){inTutorial =false; Assignment(assignmentNr, exerciseNr);balloon.visible = false;});

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);
    
}

function addSkipButton(assignmentNr, exerciseNr,nextFunction)
{
    var arrowBtn = game.add.button(870, 630, 'arrow');
    arrowBtn.frame = 0;
    arrowBtn.events.onInputOver.add(function(){ arrowBtn.frame = 1; }, this);
    arrowBtn.events.onInputOut.add(function(){ arrowBtn.frame = 0; }, this);
    arrowBtn.events.onInputDown.add(function(){ nextFunction(assignmentNr, exerciseNr);}, this);
}

function WarmUpFJ(assignmentNr, exerciseNr)
{
    //sounds['instruction'].stop();
    inTutorial = true;
    game.world.removeAll();
    game.sound.stopAll();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);

  /*  logo = game.add.image(25, 25, 'logoS');

    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    assignmentBtn.frame = 0;
    assignmentBtn.events.onInputDown.add(function(){inTutorial =false; Assignment(assignmentNr, exerciseNr);sounds['fogj1'].stop();sounds['fogj2'].stop();balloon.visible = false;});

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);*/
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 310, 'warmupKeys', 0);
    warmupKeys.animations.add('leftBlink', [0, 12, 0, 12, 0, 12, 0, 12, 0, 12, 0], 2, false);
    warmupKeys.animations.add('rightBlink', [0, 13, 0, 13, 0, 13, 0, 13, 0, 13, 0], 2, false);
    warmupKeys.animations.add('fBlink', [0, 4, 0, 4, 0, 4, 0], 2, false);
    warmupKeys.animations.add('jBlink', [0, 7, 0, 7, 0, 7, 0], 2, false);
    warmupKeys.animations.add('bothBlink', [0, 11, 0, 11, 0, 11, 0, 11, 0, 11, 0], 2, false);

    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 50, 'balloons', 0);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    sounds['fogj1'].onStop.add(function(){  
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;
            sounds['fogj2'].onStop.add(function(){
                            warmupHead.animations.stop(); 
                            warmupHead.frame = 0;
                            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                                if(inTutorial)
                                {
                                    warmupHead.play('talk');
                                    warmupKeys.play('bothBlink');
                                    balloon.frame = 4;
                                    sounds['findFJ'].play();
                                } 
                            }, this).autoDestroy = true;  
                        }, this);
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    if(inTutorial)
                    {
                        warmupHead.play('talk');
                        sounds['fogj2'].play();
                        warmupKeys.play('rightBlink');
                        balloon.frame = 2;
                        rightHand = game.add.sprite(535, 700, 'rHand', 0);
                        rightHand.scale.setTo(1.1);
                    }
            }, this).autoDestroy = true;  
    }, this);
    sounds['fogj1'].play();
    warmupHead.play('talk');
    warmupKeys.play('leftBlink');
}

function loadAbout()
{
    var aboutWindow = game.add.image(200, 200, 'aboutInfo');

    exitBtn = game.add.button(525, 200, 'exit');
    exitBtn.events.onInputOver.add(overExit);
    exitBtn.events.onInputOut.add(outExit);
    exitBtn.events.onInputDown.add(loadHomePage);
}