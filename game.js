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
var instructionStyle = { font: '64px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 600 };
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
var firstFJLoad = true;

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
var warmUps = [ false, false, false, false, false, false, false, false, false, false, false, false ];
var instructorMaggi;


// Load the resources needed
function preload()
{
    // ================ Background images ================ 
    game.load.image('homePage',           'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground', 'Assets/Images/Backgrounds/homeKeysBackground.png');
    game.load.image('instructionBg',      'Assets/Images/Backgrounds/instructionBackground.png');

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
    game.load.spritesheet('handsSprite',        'Assets/Images/Maggi/handSprite.png', 276, 450);

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
    game.load.spritesheet('exit',   'Assets/Images/Buttons/Global/xSprite.png', 32, 32);
    game.load.spritesheet('sound',  'Assets/Images/Buttons/Global/soundSprite.png', 100, 96);

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
    game.load.audio('leftFJ',           'Assets/Sounds/F_og_J_1.mp3');
    game.load.audio('rightFJ',          'Assets/Sounds/F_og_J_2.mp3');
    game.load.audio('findFJ',           'Assets/Sounds/F_OG_J_3.mp3');
    game.load.audio('findF',            'Assets/Sounds/F_og_J_4.mp3');
    game.load.audio('findJ',            'Assets/Sounds/F_og_J_5.mp3');
    game.load.audio('spaceFJ',          'Assets/Sounds/F_og_J_6.mp3');
    game.load.audio('finalFJ',          'Assets/Sounds/F_og_J_7.mp3');
    game.load.audio('findDK',           'Assets/Sounds/D_og_K_3.mp3');
    game.load.audio('findD',            'Assets/Sounds/D_og_K_4.mp3');
    game.load.audio('findK',            'Assets/Sounds/D_og_K_5.mp3');
    game.load.audio('finalDK',          'Assets/Sounds/D_og_K_6.mp3');
    game.load.audio('findSL',           'Assets/Sounds/S_og_L_3.mp3');
    game.load.audio('findS',            'Assets/Sounds/S_og_L_4.mp3');
    game.load.audio('findL',            'Assets/Sounds/S_og_L_5.mp3');
    game.load.audio('finalSL',          'Assets/Sounds/S_og_L_6.mp3');
    game.load.audio('instructionFJ',    'Assets/Sounds/Instructions/instructionFJ.mp3');
    game.load.audio('instructionDK',    'Assets/Sounds/Instructions/DK_instruction.mp3');
    game.load.audio('instructionSL',    'Assets/Sounds/Instructions/SL_instruction.mp3');
    game.load.audio('instructionAAE',   'Assets/Sounds/Instructions/AÆ_instruction.mp3');
    game.load.audio('instructionALL1',  'Assets/Sounds/Instructions/Allir1_instruction.mp3');
    game.load.audio('instructionALL2',  'Assets/Sounds/Instructions/Allir2_instruction.mp3');
    game.load.audio('instructionEH',    'Assets/Sounds/Instructions/EH_instruction.mp3');
    game.load.audio('instructionIG',    'Assets/Sounds/Instructions/IG_instruction.mp3');
    game.load.audio('instructionBN',    'Assets/Sounds/Instructions/BN_instruction.mp3');
    game.load.audio('instructionRO',    'Assets/Sounds/Instructions/RO_instruction.mp3');
    game.load.audio('instructionBRODD', 'Assets/Sounds/Instructions/Broddstafir_instruction.mp3');
    game.load.audio('instructionHA',    'Assets/Sounds/Instructions/Hastafir_instruction.mp3');

    game.load.audio('complimentFJ',    'Assets/Sounds/Compliments/FJ_hros.mp3');
    game.load.audio('complimentDK',    'Assets/Sounds/Compliments/DK_hros.mp3');
    game.load.audio('complimentSL',    'Assets/Sounds/Compliments/SL_hros.mp3');
    game.load.audio('complimentAAE',   'Assets/Sounds/Compliments/AAE_hros.mp3');
    game.load.audio('complimentALL1',  'Assets/Sounds/Compliments/Allir1_hros.mp3');
    game.load.audio('complimentALL2',  'Assets/Sounds/Compliments/Allir2_hros.mp3');
    game.load.audio('complimentEH',    'Assets/Sounds/Compliments/EH_hros.mp3');
    game.load.audio('complimentIG',    'Assets/Sounds/Compliments/IG_hros.mp3');
    game.load.audio('complimentBN',    'Assets/Sounds/Compliments/BN_hros.mp3');
    // RO
    game.load.audio('complimentBRODD',    'Assets/Sounds/Compliments/Broddstafir_hros.mp3');
    // Hástafir

    game.load.audio('finishFJ',    'Assets/Sounds/Finished/FJ_buin.mp3');
    game.load.audio('finishDK',    'Assets/Sounds/Finished/DK_buin.mp3');
    game.load.audio('finishSL',    'Assets/Sounds/Finished/SL_buin.mp3');
    game.load.audio('finishAAE',   'Assets/Sounds/Finished/AAE_buin.mp3');
    game.load.audio('finishALL1',  'Assets/Sounds/Finished/Allir1_buin.mp3');
    game.load.audio('finishALL2',  'Assets/Sounds/Finished/Allir2_buin.mp3');
    game.load.audio('finishEH',    'Assets/Sounds/Finished/EH_buin.mp3');
    game.load.audio('finishIG',    'Assets/Sounds/Finished/IG_buin.mp3');
    game.load.audio('finishBN',    'Assets/Sounds/Finished/BN_buin.mp3');
    game.load.audio('finishRO',    'Assets/Sounds/Finished/RO_buin.mp3');
    game.load.audio('finishBRODD', 'Assets/Sounds/Finished/Broddstafir_buin.mp3');
    game.load.audio('finishHA',    'Assets/Sounds/Finished/Hastafir_buin.mp3');


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

    game.load.image('logo',                 'Assets/Images/logo.png');
    game.load.spritesheet('balloons',       'Assets/Images/Maggi/balloons.png', 346, 192);
    game.load.spritesheet('balloonSprite',  'Assets/Images/Maggi/bubbleSprite.png', 345, 191);

    // Animations
    game.load.spritesheet('warmupKeys', 'Assets/Images/Keyboard/asdfgh.png', 699, 77);
    game.load.spritesheet('warmupHead', 'Assets/Images/Maggi/warmupHead2.png', 159, 155);
    game.load.spritesheet('pig',        'Assets/Images/Maggi/svin.png', 522, 756);
    game.load.spritesheet('fish',       'Assets/Images/Maggi/fish.png', 414, 503);
    game.load.spritesheet('horse',      'Assets/Images/Maggi/horse.png', 371, 672);
    game.load.spritesheet('whale',      'Assets/Images/Maggi/whale.png', 372, 711);
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
    sounds['leftFJ'] = game.add.audio('leftFJ');
    sounds['rightFJ'] = game.add.audio('rightFJ');
    sounds['findFJ'] = game.add.audio('findFJ');
    sounds['findF'] = game.add.audio('findF');
    sounds['findJ'] = game.add.audio('findJ');
    sounds['spaceFJ'] = game.add.audio('spaceFJ');
    sounds['finalFJ'] = game.add.audio('finalFJ');
    sounds['findDK'] = game.add.audio('findDK');
    sounds['findD'] = game.add.audio('findD');
    sounds['findK'] = game.add.audio('findK');
    sounds['finalDK'] = game.add.audio('finalDK');
    sounds['findSL'] = game.add.audio('findSL');
    sounds['findS'] = game.add.audio('findS');
    sounds['findL'] = game.add.audio('findL');
    sounds['finalSL'] = game.add.audio('finalSL');
    
    loadHomePage();
}

function update()
{
    if(warmUps[0] === true || warmUps[1] === true || warmUps[2] === true)
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

        if(leftHand.y > 390 && balloon.visible === true)
        {
            leftHand.y -= 4;
        }

        if(rightHand.y > 390 && balloon.visible === true)
        {
            rightHand.y -= 4;
        }
    }

}

// Load the home page
function loadHomePage() 
{
    warmUps[0] = false;
    warmUps[1] = false;
    warmUps[2] = false;
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

    var btnFj = game.add.button(28, 20, 'fj');
    btnFj.events.onInputDown.add(function(){ Instructions(0, -1); });
    //btnFj.scale.setTo(0.85);

    var btnDk = game.add.button(28, 70, 'dk');
    btnDk.events.onInputDown.add(function(){ Instructions(1, -1); });
    //btnDk.scale.setTo(0.85);

    var btnSl = game.add.button(28, 120, 'sl');
    btnSl.events.onInputDown.add(function(){ Instructions(2, -1); });
    //btnSl.scale.setTo(0.85);
    
    var btnAae = game.add.button(28, 170, 'aae');
    btnAae.events.onInputDown.add(function(){ Instructions(3, -1); });
    //btnAae.scale.setTo(0.85);

    var btnHome1 = game.add.button(28, 215, 'heimalyklar1');
    btnHome1.events.onInputDown.add(function(){ Instructions(4, -1); });
    //btnHome1.scale.setTo(0.85);

    var btnHome2 = game.add.button(23, 275, 'heimalyklar2');
    btnHome2.events.onInputDown.add(function(){ Instructions(5, -1); });
    //btnHome2.scale.setTo(0.85);

    var btnEh = game.add.button(30, 340, 'eh');
    btnEh.events.onInputDown.add(function(){ Instructions(6, -1); });
    //btnEh.scale.setTo(0.85);

    var btnIg = game.add.button(30, 388, 'ig');
    btnIg.events.onInputDown.add(function(){ Instructions(7, -1); });
    //btnIg.scale.setTo(0.85);

    var btnBn = game.add.button(30, 437, 'bn');
    btnBn.events.onInputDown.add(function(){ Instructions(8, -1); });
    //btnBn.scale.setTo(0.85);
    
    var btnRo = game.add.button(30, 485, 'ro'); 
    btnRo.events.onInputDown.add(function(){ Instructions(9, -1); });
    //btnRo.scale.setTo(0.85);

    var btnBrodd = game.add.button(30, 535, 'broddstafir');
    btnBrodd.events.onInputDown.add(function(){ Instructions(10, -1); });
    //btnBrodd.scale.setTo(0.85);
    
    var btnHastafir = game.add.button(30, 605, 'hastafir');
    btnHastafir.events.onInputDown.add(function(){ Instructions(11, -1); });
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

    if(firstLoad)
    {
        intro.onStop.addOnce(function(){ instructorMaggi.animations.stop(); instructorMaggi.frame = 0; }, this);
        intro.play();
        instructorMaggi.play('talk');
        firstLoad = false;
    }
}

function Assignment(assignmentNr, exerciseNr) 
{
    warmUps[0] = false;
    warmUps[1] = false;
    warmUps[2] = false;
    // Empty the canvas
    game.world.removeAll();
    game.sound.stopAll();
    intro.destroy();
    game.input.keyboard.start();

   	// Load new background
    loadBackground(assignmentNr);
    
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);

    // Load keyboard
    loadKeyboard(assignmentNr, exerciseNr);

    var instructor = addAssignmentInstructor(assignmentNr);

    if(exerciseNr >= 0)
    {
        // Create the textArea
        text = exercisesArray[assignmentNr][exerciseNr];
        textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 50, text, style);
        textArea.anchor.set(0.5);

        // When key is pressed the function keyPress is called
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            keyPress(char, assignmentNr, exerciseNr);
        });
    }
    else
    {
        var balloon = game.add.sprite(500, 25, 'balloonSprite', addBalloon(assignmentNr));
        addFinalSound(assignmentNr);
    }
    
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
        if(finishedAssignment(assignmentNr))
        {
            addExercises(assignmentNr);
            var finishSound = addFinishSound(assignmentNr);
          //  finishSound.onStop.addOnce( function(){finishSound.stop();loadHomePage();}, this);
            finishSound.play();
           // loadHomePage();
            return;
        }

        exerciseNr = findNextExercise(assignmentNr, exerciseNr);
    
        var complimentSound = addComplimentSound(assignmentNr);
        complimentSound.play();
        Assignment(assignmentNr, exerciseNr);
        return;
    }
}

function finishedAssignment(assignmentNr)
{
    for(i = 0 ; i  < exercisesFinished[assignmentNr].length ; i++)
    {
        // If at least one exercise is not finished, return false.
        if(!exercisesFinished[assignmentNr][i])
        {
            return false;
        }
    }
    return true;
}

function findNextExercise(assignmentNr, exerciseNr)
{
    for(i = exerciseNr; i < exercisesFinished[assignmentNr].length; i++)
    {
        if(!exercisesFinished[assignmentNr][i])
        {
            return i;
        }

    }
    for(i = 0 ; i  < exerciseNr ; i++)
    {
        // If at least one exercise is not finished, return false.
        if(!exercisesFinished[assignmentNr][i])
        {
            return i;
        }
    }
    return 0;
}

function addMuteButton()
{
    muteBtn = game.add.button(890, 20, 'sound');
    muteBtn.events.onInputOver.add(function(){ if(game.sound.mute === false){ muteBtn.frame = 2; } });
    muteBtn.events.onInputOut.add(function(){ if(game.sound.mute === false){ muteBtn.frame = 0; } });
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
    exitBtn = game.add.button(930, 20, 'exit');
    exitBtn.events.onInputOver.add(function(){ exitBtn.frame = 1;});
    exitBtn.events.onInputOut.add(function(){ exitBtn.frame = 0;});
    exitBtn.events.onInputDown.add(loadHomePage);
    exitBtn.events.onInputDown.add(quitExercise);

}

function addLogo()
{
    logo = game.add.image(170, 655, 'logo');
    logo.scale.setTo(0.5);
}

function addLogoAndAssignmentID(assignmentNr, exerciseNr)
{
    logo = game.add.image(25, 25, 'logoS');
    logo.events.onInputDown.add(function(){loadHomePage();});

    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    assignmentBtn.frame = assignmentNr;
    assignmentBtn.events.onInputDown.add(function(){warmUps[0] =false; warmUps[1] = false; warmUps[2] = false; Assignment(assignmentNr, exerciseNr);balloon.visible = false;});

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);
}

function addSkipButton(assignmentNr, exerciseNr, nextFunction)
{
    var arrowBtn = game.add.button(870, 630, 'arrow');
    arrowBtn.frame = 0;
    arrowBtn.events.onInputOver.add(function(){ arrowBtn.frame = 1; }, this);
    arrowBtn.events.onInputOut.add(function(){ arrowBtn.frame = 0; }, this);
    arrowBtn.events.onInputDown.add(function(){ nextFunction(assignmentNr, exerciseNr); }, this);
}

function addBalloon(assignmentNr)
{
    switch(assignmentNr)
    {
        case 0:
            return 3;
        case 1:
            return 11;
        case 2:
            return 16;
        case 3:
            return 16;
        case 4:
            return 24;
        case 5:
            return 28;
        case 6:
            return 37;
        case 7:
            return 46;
        case 8:
            return 56;
        case 9:
            return 56;
        case 10:
            return 73;
        case 11:
            return 48;
    }
}

function addFinalSound(assignmentNr)
{
    switch(assignmentNr)
    {
        case 0:
            sounds['finalFJ'].play();
            break;
        case 1:
            sounds['finalDK'].play();
            break;
        case 2:
            sounds['finalSL'].play();
            break;
        case 3:
            //sounds['finalFJ'].play();
            break;
        case 4:
            //sounds['finalFJ'].play();
            break;
        case 5:
            //sounds['finalFJ'].play();
            break;
        case 6:
            //sounds['finalFJ'].play();
            break;
        case 7:
            //sounds['finalFJ'].play();
            break;
        case 8:
            //sounds['finalFJ'].play();
            break;
        case 9:
            //sounds['finalFJ'].play();
            break;
        case 10:
            //sounds['finalFJ'].play();
            break;
        case 11:
            //sounds['finalFJ'].play();
            break;
    }
}

function quitExercise()
{
    game.input.keyboard.stop();
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
    textPosArr = exerciseTextPosArray[assignmentNr];
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

            var textNum = exerciseNum + 1;
            // Add number above every image
            game.add.text(textPosArr[i+exerciseNr][0], textPosArr[i+exerciseNr][1], textNum, { font: "bold 16px Arial"});
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

function Instructions(assignmentNr, exerciseNr)
{
    game.world.removeAll();
    game.sound.stopAll();

    loadBackground(assignmentNr);
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        background = game.add.image(0, 0, 'instructionBg');
    }

    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    addExitButton();
    addMuteButton();

   // addSkipButton(assignmentNr, exerciseNr,  WarmUpFJ);
   if(assignmentNr === 0)
   {
        addSkipButton(assignmentNr, exerciseNr,  WarmUpFJ);
   }
   else if(assignmentNr === 1)
   {
        addSkipButton(assignmentNr, exerciseNr,  WarmUpDK);
   }
   else if(assignmentNr === 2)
   {
       addSkipButton(assignmentNr, exerciseNr, WarmUpSL);
   }
   else
   {
        addSkipButton(assignmentNr, exerciseNr,  Assignment);
   }

    var instructor = addInstructionAnimation(assignmentNr);
    var instructionSound = addInstructionSound(assignmentNr);
    instructionSound.onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
    instructionSound.play();
    instructor.play('talk');
}

function addInstructionAnimation(assignmentNr)
{
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
         instructor = game.add.sprite(500, 150, 'instructorMaggi', 0);
         instructor.scale.setTo(0.8);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 6, true);
         return instructor;
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
         instructor = game.add.sprite(500, 100, 'pig', 0);
         instructor.scale.setTo(0.75);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
         instructor = game.add.sprite(500, 150, 'whale', 0);
         instructor.scale.setTo(0.8);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
         instructor = game.add.sprite(500, 150, 'fish', 0);
         instructor.scale.setTo(0.8);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else
    {
         instructor = game.add.sprite(500, 150, 'horse', 0);
         instructor.scale.setTo(0.8);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
}

function addAssignmentInstructor(assignmentNr)
{
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        //  instructor = game.add.sprite(500, 150, 'instructorMaggi', 0);
        //  instructor.scale.setTo(0.8);
        //  instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 6, true);
        instructor = game.add.sprite(1015, 210, 'warmupHead', 0);
        instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
        instructor.anchor.setTo(0.75, 1);
        instructor.angle = -41;
        return instructor;
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
         instructor = game.add.sprite(750, 100, 'pig', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
         instructor = game.add.sprite(700, 150, 'whale', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
         instructor = game.add.sprite(700, 150, 'fish', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else
    {
         instructor = game.add.sprite(700, 150, 'horse', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
}

function addInstructionSound(assignmentNr)
{
    if(assignmentNr == 0)
    {
            return game.add.audio('instructionFJ');
    }
    else if(assignmentNr == 1)
    {
            return game.add.audio('instructionDK');
    }
    else if(assignmentNr == 2)
    {
            return game.add.audio('instructionSL');
    }
    else if(assignmentNr == 3)
    {
            return game.add.audio('instructionAAE');
    }
    else if(assignmentNr == 4)
    {
            return game.add.audio('instructionALL1');
    }
    else if(assignmentNr == 5)
    {
            return game.add.audio('instructionALL2');
    }
    else if(assignmentNr == 6)
    {
            return game.add.audio('instructionEH');
    }
    else if(assignmentNr == 7)
    {
            return game.add.audio('instructionIG');
    }
    else if(assignmentNr == 8)
    {
            return game.add.audio('instructionBN');
    }
    else if(assignmentNr == 9)
    {
            return game.add.audio('instructionRO');
    }
    else if(assignmentNr == 10)
    {
            return game.add.audio('instructionBRODD');
    }
    else if(assignmentNr == 11)
    {
            return game.add.audio('instructionHA');
    }
}

function addComplimentSound(assignmentNr)
{
    if(assignmentNr == 0)
    {
            return this.game.add.sound('complimentFJ');
    }
    else if(assignmentNr == 1)
    {
            return game.add.audio('complimentDK');
    }
    else if(assignmentNr == 2)
    {
            return game.add.audio('complimentSL');
    }
    else if(assignmentNr == 3)
    {
            return game.add.audio('complimentAAE');
    }
    else if(assignmentNr == 4)
    {
            return game.add.audio('complimentALL1');
    }
    else if(assignmentNr == 5)
    {
            return game.add.audio('complimentALL2');
    }
    else if(assignmentNr == 6)
    {
            return game.add.audio('complimentEH');
    }
    else if(assignmentNr == 7)
    {
            return game.add.audio('complimentIG');
    }
    else if(assignmentNr == 8 || assignmentNr == 9)
    {
            return game.add.audio('complimentBN');
    }
    else if(assignmentNr == 10 || assignmentNr == 11)
    {
            return game.add.audio('complimentBRODD');
    }
}

function addFinishSound(assignmentNr)
{
    if(assignmentNr == 0)
    {
            return game.add.audio('finishFJ');
    }
    else if(assignmentNr == 1)
    {
            return game.add.audio('finishDK');
    }
    else if(assignmentNr == 2)
    {
            return game.add.audio('finishSL');
    }
    else if(assignmentNr == 3)
    {
            return game.add.audio('finishAAE');
    }
    else if(assignmentNr == 4)
    {
            return game.add.audio('finishALL1');
    }
    else if(assignmentNr == 5)
    {
            return game.add.audio('finishALL2');
    }
    else if(assignmentNr == 6)
    {
            return game.add.audio('finishEH');
    }
    else if(assignmentNr == 7)
    {
            return game.add.audio('finishIG');
    }
    else if(assignmentNr == 8 || assignmentNr == 9)
    {
            return game.add.audio('finishBN');
    }
    else if(assignmentNr == 10 || assignmentNr == 11)
    {
            return game.add.audio('finishBRODD');
    }
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
    sounds['instruction'].onStop.addOnce(function(){ instructorMaggi.animations.stop(); instructorMaggi.frame = 0; }, this);
    sounds['instruction'].play();
    instructorMaggi.play('talk');
}

function WarmUpFJ(assignmentNr, exerciseNr)
{
    //sounds['instruction'].stop();
    warmUps[0] = true;
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

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
    warmupKeys.animations.add('fBlink', [0, 4, 0, 4, 0, 4, 0], 2, false, true);
    warmupKeys.animations.add('jBlink', [0, 7, 0, 7, 0, 7, 0], 2, false, true);
    warmupKeys.animations.add('bothBlink', [0, 11, 0, 11, 0, 11, 0, 11, 0, 11, 0], 2, false, true);

    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 0);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['leftFJ'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[0])
                {
                    warmupHead.play('talk');
                    sounds['rightFJ'].play();
                    warmupKeys.play('jklæBlink');
                    balloon.frame = 1;
                    rightHand = game.add.sprite(535, 700, 'rHand', 0);
                    rightHand.scale.setTo(1.1);
                }
                
                  
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightFJ'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[0])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 2;
                sounds['findFJ'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findFJ'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[0])
            {
                warmupHead.play('talk');
                warmupKeys.play('fBlink');
                balloon.frame = 4;
                sounds['findF'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'f', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['findF'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'f')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
                    warmupKeys.play('jBlink');
                    balloon.frame = 5;
                    sounds['findJ'].play();
                    textArea.destroy();
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'j', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                });
            }
        });

        //game.time.events.add(Phaser.Timer.SECOND * 2, function(){});
     });

     sounds['findJ'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'j')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    game.input.keyboard.stop();
                    leftHand.destroy();
                    rightHand.destroy();
                    warmupKeys.destroy();
                    textArea.destroy();
                    
                    loadKeyboard(assignmentNr, exerciseNr);
//260 x 450
                    leftHand = game.add.sprite(210, 355, 'handsSprite', 2);
                    leftHand.scale.setTo(0.85);
                    leftHand.animations.add('lSpacePress', [2, 3, 2, 3, 2], 2, false);
                    rightHand = game.add.sprite(470, 355, 'handsSprite', 0);
                    rightHand.scale.setTo(0.85);
                    rightHand.animations.add('rSpacePress', [0, 1, 0, 1, 0], 2, false);
                    sounds['spaceFJ'].play();
                    leftHand.play('lSpacePress');
                    rightHand.play('rSpacePress');
                    balloon.frame = 7;
                    keyboardKeysMap.get(' ').play('blink');
                    
                });
            }
        });

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){   
        });
     });

     sounds['spaceFJ'].onStop.addOnce(function(){
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === ' ')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){ Assignment(assignmentNr, exerciseNr); });
            }
        });
    });


    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['leftFJ'].play();
    warmupHead.play('talk');
    warmupKeys.play('asdfBlink');
}

function WarmUpDK(assignmentNr, exerciseNr){
    warmUps[1] = true;
    game.world.removeAll();
    game.sound.stopAll();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
    warmupKeys.animations.add('dBlink', [0, 3, 0, 3, 0, 3, 0], 2, false, true);
    warmupKeys.animations.add('kBlink', [0, 8, 0, 8, 0, 8, 0], 2, false, true);
    warmupKeys.animations.add('bothBlink', [0, 12, 0, 12, 0, 12, 0, 12, 0, 12, 0], 2, false, true);

    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 0);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['leftFJ'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[1])
                {
                    warmupHead.play('talk');
                    sounds['rightFJ'].play();
                    warmupKeys.play('jklæBlink');
                    balloon.frame = 1;
                    rightHand = game.add.sprite(535, 700, 'rHand', 0);
                    rightHand.scale.setTo(1.1);
                }
                
                  
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightFJ'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 8;
                sounds['findDK'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findDK'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('dBlink');
                balloon.frame = 9;
                sounds['findD'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'd', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['findD'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'd')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
                    warmupKeys.play('kBlink');
                    balloon.frame = 10;
                    sounds['findK'].play();
                    textArea.destroy();
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'k', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                });
            }
        });

        //game.time.events.add(Phaser.Timer.SECOND * 2, function(){});
     });

     sounds['findK'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'k')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
                    sounds['finalDK'].play();
                    balloon.frame = 11;
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['leftFJ'].play();
    warmupHead.play('talk');
    warmupKeys.play('asdfBlink');
}

function WarmUpSL(assignmentNr, exerciseNr){
    warmUps[2] = true;
    game.world.removeAll();
    game.sound.stopAll();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
    warmupKeys.animations.add('sBlink', [0, 2, 0, 2, 0, 2, 0], 2, false, true);
    warmupKeys.animations.add('lBlink', [0, 9, 0, 9, 0, 9, 0], 2, false, true);
    warmupKeys.animations.add('bothBlink', [0, 13, 0, 13, 0, 13, 0, 13, 0, 13, 0], 2, false, true);

    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 0);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['leftFJ'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[2])
                {
                    warmupHead.play('talk');
                    sounds['rightFJ'].play();
                    warmupKeys.play('jklæBlink');
                    balloon.frame = 1;
                    rightHand = game.add.sprite(535, 700, 'rHand', 0);
                    rightHand.scale.setTo(1.1);
                }
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightFJ'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[2])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 12;
                sounds['findSL'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findSL'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[2])
            {
                warmupHead.play('talk');
                warmupKeys.play('sBlink');
                balloon.frame = 14;
                sounds['findS'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 's', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['findS'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 's')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
                    warmupKeys.play('lBlink');
                    balloon.frame = 15;
                    sounds['findL'].play();
                    textArea.destroy();
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'l', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                });
            }
        });

        //game.time.events.add(Phaser.Timer.SECOND * 2, function(){});
     });

     sounds['findL'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'l')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
                    sounds['finalSL'].play();
                    balloon.frame = 16;
                    warmUps[2] = false;
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['leftFJ'].play();
    warmupHead.play('talk');
    warmupKeys.play('asdfBlink');
}

function loadAbout()
{
    var aboutWindow = game.add.image(200, 200, 'aboutInfo');

    exitBtn = game.add.button(520, 215, 'exit');
    exitBtn.events.onInputOver.add(function(){ exitBtn.frame = 2;});
    exitBtn.events.onInputOut.add(function(){ exitBtn.frame = 0;});
    exitBtn.events.onInputDown.add(function(){ exitBtn.destroy(); aboutWindow.destroy(); });
}

var warmUpFunctions =
[
    WarmUpFJ,
    WarmUpDK,
    WarmUpSL,
    WarmUpAAE,
    WarmUpALL1,
    WarmUpALL2,
    WarmUpEH,
    WarmUpIG,
    WarmUpBN,
    WarmUpRO,
    WarmUpBRODD,
    WarmUpHA
];

