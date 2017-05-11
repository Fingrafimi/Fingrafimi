/*jshint sub:true*/

// Entering each assignment ("F og J" or "D og K") is a sequence of functions which we have named the following:
// Instruction: The first animation when you choose an assignment
// WarmUp: The rest of the animations which happen when you press the arrow ("Skip button") after the first animation
// Assignment: The main screen of an assignment. Here you can choose different exercises, once an exercise is selected
// the keyboad input is activated and the exercise text is displayed above the displayed keyboard so the user can execute the exercise.
// We reffer to the assignments by numbers from 0 (F og J) to 11 (Hástafir)

// Create instance of the game
var width = 1000;
var height = 700;
var game = new Phaser.Game(width, height, Phaser.CANVAS, '', { preload: preload, create: create, update: update}, true);

// Create a variable for bitMapData to display text, used in functions Assignment and KeyPress
var textArea;
var textAreaX = 1000;
var textAreaY = 65;

// Variables for the assignments texts and its stylings
var style = { font: '44px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 900, backgroundColor: "rgba(0,0,0,0.4)", boundsAlignH: "center", boundsAlignV: "middle"};
var instructionStyle = { font: '64px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 600 };
var text = "";
var textX = 500;
var textY = 50;

//Variables for text positions used by keyPress
var corrCount = 0;
var incorrPos = -1;
var textPos = 0;

// Variables for intro sound
var intro;
var firstLoad = true;

// Exit button, mute button and logo
var exitBtn;
var logo;
var logoS;
var muteBtn;

// Buttons that need to be initialized at beginning
var balloon;
var clouds;
var fish1;
var fish2;
var instructorMaggi;
var leftHand;
var rightHand;
var warmupHead;

//Audio variables
var sounds = {};
var wrongSound;

//Other variables
var comingFromExercise = false;
var warmUps = [ false, false, false, false, false, false, false, false, false, false, false, false ];
var preloadBar;

// Function which preload all the necessary resources
function preload()
{    
    preloadBar = game.add.graphics(0, 50); 
    preloadBar.lineStyle(3, 0xffffff, 1);  
    preloadBar.moveTo(0, 0);  
    preloadBar.lineTo(game.width, 0);      
    preloadBar.scale.x = 0; 

    // =================================== Images ===================================
    //Background images
    game.load.image('homePage',                 'Assets/Images/Backgrounds/homePage.png');
    game.load.image('homeKeysBackground',       'Assets/Images/Backgrounds/homeKeysBackground.png');
    game.load.image('instructionBg',            'Assets/Images/Backgrounds/instructionBackground.png');
    game.load.image('blueBackground',           'Assets/Images/Backgrounds/blueBackground.png');
    game.load.image('farm',                     'Assets/Images/Backgrounds/farm.png');
    game.load.image('clouds',                   'Assets/Images/Backgrounds/clouds.png');
    game.load.image('blueBackground2',          'Assets/Images/Backgrounds/blueBackground2.png');
    game.load.image('box',                      'Assets/Images/Backgrounds/box.png');
    game.load.image('stage',                    'Assets/Images/Backgrounds/svid.png');
    game.load.image('ocean',                    'Assets/Images/Backgrounds/sandur.png');

    //Keyboard related images and sprites
    game.load.image('keyboard',                 'Assets/Images/keyboardSprite/v2/lyklabord700.png');
    game.load.spritesheet('keys',               'Assets/Images/keyboardSprite/v2/keySprite.png', 49, 45);
    game.load.spritesheet('spacebar',           'Assets/Images/keyboardSprite/v2/spacebarSprite.png', 259, 44);
    game.load.spritesheet('lShift',             'Assets/Images/keyboardSprite/v2/leftShiftSprite.png', 56, 43);
    game.load.spritesheet('rShift',             'Assets/Images/keyboardSprite/v2/rightShiftSprite.png', 125, 45);

    //Images of hands used in game
    game.load.image('lHand',                    'Assets/Images/Maggi/vinstri.png');
    game.load.image('rHand',                    'Assets/Images/Maggi/haegri.png');
    game.load.spritesheet('handsSprite',        'Assets/Images/Maggi/handSprite.png', 276, 450);

    // Various images
    game.load.image('logo',                     'Assets/Images/logo.png');
    game.load.image('logoS',                    'Assets/Images/titill.png');
    game.load.image('logoL',                    'Assets/Images/titillStaerri2.png');
    game.load.image('teacher',                  'Assets/Images/Buttons/Global/teacher.png');
    game.load.image('mat',                      'Assets/Images/Buttons/Global/mat.png');
    game.load.image('about',                    'Assets/Images/Buttons/Global/about.png');
    game.load.image('aboutInfo',                'Assets/Images/Buttons/Global/aboutInfo.png');
    game.load.spritesheet('exit',               'Assets/Images/Buttons/Global/xSprite.png', 32, 32);
    game.load.spritesheet('sound',              'Assets/Images/Buttons/Global/soundSprite.png', 100, 96);
    game.load.spritesheet('arrow',              'Assets/Images/Buttons/Global/arrowSprite.png', 93, 48);

    // Images for assignment buttons
    game.load.image('fj',                       'Assets/Images/Buttons/Assignments/fogj.png');
    game.load.image('dk',                       'Assets/Images/Buttons/Assignments/dogk.png');
    game.load.image('sl',                       'Assets/Images/Buttons/Assignments/sogl.png');
    game.load.image('aae',                      'Assets/Images/Buttons/Assignments/aogae.png');
    game.load.image('heimalyklar1',             'Assets/Images/Buttons/Assignments/allir1.png');
    game.load.image('heimalyklar2',             'Assets/Images/Buttons/Assignments/allir2.png');
    game.load.image('eh',                       'Assets/Images/Buttons/Assignments/eogh.png');
    game.load.image('ig',                       'Assets/Images/Buttons/Assignments/iogg.png');
    game.load.image('bn',                       'Assets/Images/Buttons/Assignments/bogn.png');
    game.load.image('ro',                       'Assets/Images/Buttons/Assignments/rogo.png');
    game.load.image('broddstafir',              'Assets/Images/Buttons/Assignments/btn11.png');
    game.load.image('hastafir',                 'Assets/Images/Buttons/Assignments/btn12.png');
    game.load.spritesheet('btnSprite',          'Assets/Images/Buttons/Assignments/buttons.png', 124, 81);

    // Images for exercise buttons
    game.load.spritesheet('mus',                'Assets/Images/Buttons/Exercises/mus.png', 110, 70);
    game.load.spritesheet('robot',              'Assets/Images/Buttons/Exercises/robot.png', 105, 127);
    game.load.spritesheet('heyBaggi',           'Assets/Images/Buttons/Exercises/hey.png', 80, 62);
    game.load.spritesheet('blom',               'Assets/Images/Buttons/Exercises/blom.png', 73, 95);
    game.load.spritesheet('mus2',               'Assets/Images/Buttons/Exercises/mus2.png', 91, 84);
    game.load.spritesheet('blakbolti',          'Assets/Images/Buttons/Exercises/blakbolti.png', 48, 52);
    game.load.spritesheet('fotbolti',           'Assets/Images/Buttons/Exercises/fotbolti.png', 45, 45);
    game.load.spritesheet('korfubolti',         'Assets/Images/Buttons/Exercises/korfubolti.png', 50, 52);
    game.load.spritesheet('rubbybolti',         'Assets/Images/Buttons/Exercises/rubbybolti.png', 62, 42);
    game.load.spritesheet('tennisbolti',        'Assets/Images/Buttons/Exercises/tennisbolti.png', 26, 26);
    game.load.spritesheet('gitar',              'Assets/Images/Buttons/Exercises/gitar.png', 51, 73);
    game.load.spritesheet('tromma',             'Assets/Images/Buttons/Exercises/trommur.png', 37, 35);
    game.load.spritesheet('nota',               'Assets/Images/Buttons/Exercises/nota.png', 50, 40);
    game.load.spritesheet('piano',              'Assets/Images/Buttons/Exercises/piano.png', 81, 38);
    game.load.spritesheet('saxafonn',           'Assets/Images/Buttons/Exercises/saxafonn.png', 57, 96);
    game.load.spritesheet('jellyfish',          'Assets/Images/Buttons/Exercises/jellyfish.png', 39, 44);
    game.load.spritesheet('starfish',           'Assets/Images/Buttons/Exercises/starfish.png', 50, 49);
    game.load.spritesheet('shrimp',             'Assets/Images/Buttons/Exercises/shrimp.png', 50, 50);
    game.load.spritesheet('seahorse',           'Assets/Images/Buttons/Exercises/seahorse.png', 35, 72);
    game.load.spritesheet('shell',              'Assets/Images/Buttons/Exercises/shell.png', 44, 43);

    //Images for glow around exercise buttons for the exercise you are currently in
    game.load.image('musGlow',                  'Assets/Images/Buttons/Exercises/mus-glow.png');
    game.load.image('robotGlow',                'Assets/Images/Buttons/Exercises/robot-glow.png');
    game.load.image('heyBaggiGlow',             'Assets/Images/Buttons/Exercises/hey-glow.png');
    game.load.image('blomGlow',                 'Assets/Images/Buttons/Exercises/blom-glow.png');
    game.load.image('mus2Glow',                 'Assets/Images/Buttons/Exercises/mus2-glow.png');
    game.load.image('blakboltiGlow',            'Assets/Images/Buttons/Exercises/blakbolti-glow.png');
    game.load.image('tennisboltiGlow',          'Assets/Images/Buttons/Exercises/tennisbolti-glow.png');
    game.load.image('fotboltiGlow',             'Assets/Images/Buttons/Exercises/fotbolti-glow.png');
    game.load.image('korfuboltiGlow',           'Assets/Images/Buttons/Exercises/korfubolti-glow.png');
    game.load.image('rubbyboltiGlow',           'Assets/Images/Buttons/Exercises/rubbybolti-glow.png');
    game.load.image('gitarGlow',                'Assets/Images/Buttons/Exercises/gitar-glow.png');
    game.load.image('trommurGlow',              'Assets/Images/Buttons/Exercises/trommur-glow.png');
    game.load.image('notaGlow',                 'Assets/Images/Buttons/Exercises/nota-glow.png');
    game.load.image('pianoGlow',                'Assets/Images/Buttons/Exercises/piano-glow.png');
    game.load.image('saxafonnGlow',             'Assets/Images/Buttons/Exercises/saxafonn-glow.png');
    game.load.image('jellyfishGlow',            'Assets/Images/Buttons/Exercises/jellyfish-glow.png');
    game.load.image('starfishGlow',             'Assets/Images/Buttons/Exercises/starfish-glow.png');
    game.load.image('shrimpGlow',               'Assets/Images/Buttons/Exercises/shrimp-glow.png');
    game.load.image('seahorseGlow',             'Assets/Images/Buttons/Exercises/seahorse-glow.png');
    game.load.image('shellGlow',                'Assets/Images/Buttons/Exercises/shell-glow.png');

    // Images related to WarmUp animations
    game.load.spritesheet('balloonSprite',      'Assets/Images/Maggi/bubbleSprite.png', 344, 191);
    game.load.spritesheet('warmupKeys',         'Assets/Images/Keyboard/asdfgh.png', 699, 77);
    game.load.spritesheet('warmupHead',         'Assets/Images/Maggi/warmupHead2.png', 159, 155);
    game.load.spritesheet('instructorMaggi',    'Assets/Images/Maggi/instructionMaggi.png', 524, 572);
    game.load.spritesheet('pig',                'Assets/Images/Maggi/svin.png', 522, 756);
    game.load.spritesheet('fish',               'Assets/Images/Maggi/fish.png', 414, 503);
    game.load.spritesheet('horse',              'Assets/Images/Maggi/horse.png', 371, 672);
    game.load.spritesheet('whale',              'Assets/Images/Maggi/whale.png', 372, 711);
    game.load.spritesheet('fishes',             'Assets/Images/Maggi/fishes.png', 149, 94);
    game.load.spritesheet('hands',              'Assets/Images/Maggi/handSprite2.png', 240, 381);

    // =================================== Audio ===================================
    //Audio for when entering game
    game.load.audio('intro',            'Assets/Sounds/Inngangur.mp3');

    //Audio for when a wrong key is pressed in an exercise
    game.load.audio('wrongSound',       'Assets/Sounds/wrongSound.mp3');

    //Audio files related to WarmUp animation for "F og J"
    game.load.audio('leftFJ',           'Assets/Sounds/F_og_J_1.mp3');
    game.load.audio('rightFJ',          'Assets/Sounds/F_og_J_2.mp3');
    game.load.audio('findFJ',           'Assets/Sounds/F_og_J_3.mp3');
    game.load.audio('findF',            'Assets/Sounds/F_og_J_4.mp3');
    game.load.audio('findJ',            'Assets/Sounds/F_og_J_5.mp3');
    game.load.audio('spaceFJ',          'Assets/Sounds/F_og_J_6.mp3');
    game.load.audio('finalFJ',          'Assets/Sounds/F_og_J_7.mp3');
    
    //Audio files related to WarmUp animation for "D og K"
    game.load.audio('findDK',           'Assets/Sounds/D_og_K_3.mp3');
    game.load.audio('findD',            'Assets/Sounds/D_og_K_4.mp3');
    game.load.audio('findK',            'Assets/Sounds/D_og_K_5.mp3');
    game.load.audio('finalDK',          'Assets/Sounds/D_og_K_6.mp3');
    
    //Audio files related to WarmUp animation for "S og L"
    game.load.audio('findSL',           'Assets/Sounds/S_og_L_3.mp3');
    game.load.audio('findS',            'Assets/Sounds/S_og_L_4.mp3');
    game.load.audio('findL',            'Assets/Sounds/S_og_L_5.mp3');
    game.load.audio('finalSL',          'Assets/Sounds/S_og_L_6.mp3');
    
    //Audio files related to WarmUp animation for "A og Æ"
    game.load.audio('findAAE',          'Assets/Sounds/A_og_AE_3.mp3');
    game.load.audio('findA',            'Assets/Sounds/A_og_AE_4.mp3');
    game.load.audio('findAE',           'Assets/Sounds/A_og_AE_5.mp3');
    game.load.audio('finalAAE',         'Assets/Sounds/A_og_AE_6.mp3');
    
    //Audio files related to WarmUp animation for "Allir heimalyklar 1"
    game.load.audio('leftAll1',         'Assets/Sounds/Heimalyklar_1_2.mp3');
    game.load.audio('rightAll1',        'Assets/Sounds/Heimalyklar_1_3.mp3');
    game.load.audio('finalAll1',        'Assets/Sounds/Heimalyklar_1_4.mp3');
    
    //Audio files related to WarmUp animation for "Allir heimalyklar 2"
    game.load.audio('leftAll2',         'Assets/Sounds/Heimalyklar_2_2.mp3');
    game.load.audio('rightAll2',        'Assets/Sounds/Heimalyklar_2_3.mp3');
    game.load.audio('finalAll2',        'Assets/Sounds/Heimalyklar_2_4.mp3');
    
    //Audio files related to WarmUp animation for "E og H"
    game.load.audio('handsEH',          'Assets/Sounds/E_og_H_2.mp3');
    game.load.audio('findE',            'Assets/Sounds/E_og_H_3.mp3');
    game.load.audio('typingE',          'Assets/Sounds/E_og_H_4.mp3');
    game.load.audio('typeE',            'Assets/Sounds/E_og_H_5.mp3');
    game.load.audio('findH',            'Assets/Sounds/E_og_H_6.mp3');
    game.load.audio('typingH',          'Assets/Sounds/E_og_H_7.mp3');
    game.load.audio('typeH',            'Assets/Sounds/E_og_H_8.mp3');
    game.load.audio('finalEH',          'Assets/Sounds/E_og_H_9.mp3');
    
    //Audio files related to WarmUp animation for "I og G"
    game.load.audio('handsIG',          'Assets/Sounds/I_og_G_2.mp3');
    game.load.audio('findI',            'Assets/Sounds/I_og_G_3.mp3');
    game.load.audio('typingI',          'Assets/Sounds/I_og_G_4.mp3');
    game.load.audio('typeI',            'Assets/Sounds/I_og_G_5_1.mp3');
    game.load.audio('gjIG',             'Assets/Sounds/I_og_G_5_2.mp3');
    game.load.audio('findG',            'Assets/Sounds/I_og_G_6.mp3');
    game.load.audio('typingG',          'Assets/Sounds/I_og_G_7.mp3');
    game.load.audio('typeG',            'Assets/Sounds/I_og_G_8.mp3');
    game.load.audio('finalIG',          'Assets/Sounds/I_og_G_9.mp3');
    
    //Audio files related to WarmUp animation for "B og N"
    game.load.audio('handsBN',          'Assets/Sounds/B_og_N_1.mp3');
    game.load.audio('findB',            'Assets/Sounds/B_og_N_2.mp3');
    game.load.audio('typingB',          'Assets/Sounds/B_og_N_3.mp3');
    game.load.audio('typeB',            'Assets/Sounds/B_og_N_4.mp3');
    game.load.audio('gjBN',             'Assets/Sounds/B_og_N_7_2.mp3');
    game.load.audio('findN',            'Assets/Sounds/B_og_N_5.mp3');
    game.load.audio('typingN',          'Assets/Sounds/B_og_N_6.mp3');
    game.load.audio('typeN',            'Assets/Sounds/B_og_N_7_1.mp3');
    game.load.audio('finalBN',          'Assets/Sounds/B_og_N_8.mp3');    
    
    //Audio files related to WarmUp animation for "R og O"
    game.load.audio('handsRO',          'Assets/Sounds/R_og_O_1.mp3');
    game.load.audio('findR',            'Assets/Sounds/R_og_O_2.mp3');
    game.load.audio('typingR',          'Assets/Sounds/R_og_O_3.mp3');
    game.load.audio('typeR',            'Assets/Sounds/R_og_O_4.mp3');
    game.load.audio('findO',            'Assets/Sounds/R_og_O_5.mp3');
    game.load.audio('typingO',          'Assets/Sounds/R_og_O_6.mp3');
    game.load.audio('typeO',            'Assets/Sounds/R_og_O_7.mp3');
    game.load.audio('finalRO',          'Assets/Sounds/R_og_O_8.mp3');

    //Audio files related to WarmUp animation for Broddstafir
    game.load.audio('handsBRODD',       'Assets/Sounds/Broddstafir_1.mp3');
    game.load.audio('findComma',        'Assets/Sounds/Broddstafir_2.mp3');
    game.load.audio('typingComma',      'Assets/Sounds/Broddstafir_3.mp3');
    game.load.audio('typingComma2',     'Assets/Sounds/Broddstafir_4.mp3');
    game.load.audio('typingComma3',     'Assets/Sounds/Broddstafir_5.mp3');
    game.load.audio('typeCommaE',       'Assets/Sounds/Broddstafir_6.mp3');
    game.load.audio('finalBRODD',       'Assets/Sounds/Broddstafir_7.mp3');

    //Audio files related to WarmUp animation for Hástafir
    game.load.audio('handsHA',          'Assets/Sounds/Hastafir_2.mp3');
    game.load.audio('findLShift',       'Assets/Sounds/Hastafir_3.mp3');
    game.load.audio('typingLShift',     'Assets/Sounds/Hastafir_4.mp3');
    game.load.audio('findRShift',       'Assets/Sounds/Hastafir_5.mp3');
    game.load.audio('typingRShift',     'Assets/Sounds/Hastafir_6.mp3');
    game.load.audio('typingOHA',        'Assets/Sounds/Hastafir_7.mp3');
    game.load.audio('typingOHA2',       'Assets/Sounds/Hastafir_8.mp3');
    game.load.audio('typeOHA',          'Assets/Sounds/Hastafir_9.mp3');
    game.load.audio('finalHA',          'Assets/Sounds/Hastafir_10.mp3');

    //Audio files for the Instructions
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

    //Audio files that are played when the user finishes an exercise
    game.load.audio('complimentFJ',     'Assets/Sounds/Compliments/FJ_hros.mp3');
    game.load.audio('complimentDK',     'Assets/Sounds/Compliments/DK_hros.mp3');
    game.load.audio('complimentSL',     'Assets/Sounds/Compliments/SL_hros.mp3');
    game.load.audio('complimentAAE',    'Assets/Sounds/Compliments/AAE_hros.mp3');
    game.load.audio('complimentALL1',   'Assets/Sounds/Compliments/Allir1_hros.mp3');
    game.load.audio('complimentALL2',   'Assets/Sounds/Compliments/Allir2_hros.mp3');
    game.load.audio('complimentEH',     'Assets/Sounds/Compliments/EH_hros.mp3');
    game.load.audio('complimentIG',     'Assets/Sounds/Compliments/IG_hros.mp3');
    game.load.audio('complimentBN',     'Assets/Sounds/Compliments/BN_hros.mp3');
    game.load.audio('complimentBRODD',  'Assets/Sounds/Compliments/Broddstafir_hros.mp3');

    //Audio files that are played when the user has finished all the exercises in an assignment
    game.load.audio('finishFJ',         'Assets/Sounds/Finished/FJ_buin.mp3');
    game.load.audio('finishDK',         'Assets/Sounds/Finished/DK_buin.mp3');
    game.load.audio('finishSL',         'Assets/Sounds/Finished/SL_buin.mp3');
    game.load.audio('finishAAE',        'Assets/Sounds/Finished/AAE_buin.mp3');
    game.load.audio('finishALL1',       'Assets/Sounds/Finished/Allir1_buin.mp3');
    game.load.audio('finishALL2',       'Assets/Sounds/Finished/Allir2_buin.mp3');
    game.load.audio('finishEH',         'Assets/Sounds/Finished/EH_buin.mp3');
    game.load.audio('finishIG',         'Assets/Sounds/Finished/IG_buin.mp3');
    game.load.audio('finishBN',         'Assets/Sounds/Finished/BN_buin.mp3');
    game.load.audio('finishRO',         'Assets/Sounds/Finished/RO_buin.mp3');
    game.load.audio('finishBRODD',      'Assets/Sounds/Finished/Broddstafir_buin.mp3');
    game.load.audio('finishHA',         'Assets/Sounds/Finished/Hastafir_buin.mp3');
    
    //Displays how much of the game has been loaded on the canvas
    var loadingText = game.add.text(game.world.centerX, game.world.centerY, 'Hleð inn 0%', { fill: '#00000' });
    loadingText.anchor.setTo(0.5);
    var progressDisplay = 0;

    var timerEvt = game.time.events.loop(1, function ()
    {
        if(game.load.progress < 100)
        {
            if(progressDisplay < game.load.progress)
            {
                loadingText.text = 'Hleð inn '+(++progressDisplay)+'%';
            }
        }
        else
        {
            loadingText.text = 'Hlaðið 100%';
            game.time.events.remove(timerEvt);
        }
    }, this);
}

function create() 
{
    //Objects that need to be created at first to be moved later by the Update() function
    balloon = game.add.sprite(100, 100, 'balloonSprite', 0);
    clouds = game.add.image(0, 10,'clouds');
    fish1 = game.add.sprite(50, 50, 'fishes', 2);
    fish2 = game.add.sprite(50, 150, 'fishes', 1);
    instructorMaggi = game.add.sprite(500, 150, 'instructorMaggi', 0);
    intro = game.add.audio('intro');
    leftHand = game.add.sprite(200, 700, 'lHand', 2);
    rightHand = game.add.sprite(200, 700, 'rHand', 0);
    warmupHead = game.add.sprite(1000, 210, 'warmupHead', 0);

    //Sound files initialized in a map so it is always accessible
    //Sounds initialized in map regarding the F og J assignment
    sounds['leftFJ']      = game.add.audio('leftFJ');
    sounds['rightFJ'] =     game.add.audio('rightFJ');
    sounds['findFJ'] =      game.add.audio('findFJ');
    sounds['findF'] =       game.add.audio('findF');
    sounds['findJ'] =       game.add.audio('findJ');
    sounds['spaceFJ'] =     game.add.audio('spaceFJ');
    sounds['finalFJ'] =     game.add.audio('finalFJ');

    //Sounds initialized in map regarding the D og K assignment
    sounds['findDK'] =      game.add.audio('findDK');
    sounds['findD'] =       game.add.audio('findD');
    sounds['findK'] =       game.add.audio('findK');
    sounds['finalDK'] =     game.add.audio('finalDK');

    //Sounds initialized in map regarding the S og L assignment
    sounds['findSL'] =      game.add.audio('findSL');
    sounds['findS'] =       game.add.audio('findS');
    sounds['findL'] =       game.add.audio('findL');
    sounds['finalSL'] =     game.add.audio('finalSL');

    //Sounds initialized in map regarding the A og Æ assignment
    sounds['findAAE'] =     game.add.audio('findAAE');
    sounds['findA'] =       game.add.audio('findA');
    sounds['findAE'] =      game.add.audio('findAE');
    sounds['finalAAE'] =    game.add.audio('finalAAE');

    //Sounds initialized in map regarding the Allir heimalyklar 1 assignment
    sounds['leftAll1'] =    game.add.audio('leftAll1');
    sounds['rightAll1'] =   game.add.audio('rightAll1');
    sounds['finalAll1'] =   game.add.audio('finalAll1');

    //Sounds initialized in map regarding the Allir heimalyklar 2 assignment
    sounds['leftAll2'] =    game.add.audio('leftAll2');
    sounds['rightAll2'] =   game.add.audio('rightAll2');
    sounds['finalAll2'] =   game.add.audio('finalAll2');

    //Sounds initialized in map regarding the E og H assignment
    sounds['handsEH'] =     game.add.audio('handsEH');
    sounds['findE'] =       game.add.audio('findE');
    sounds['typingE'] =     game.add.audio('typingE');
    sounds['typeE'] =       game.add.audio('typeE');
    sounds['findH'] =       game.add.audio('findH');
    sounds['typingH'] =     game.add.audio('typingH');
    sounds['typeH'] =       game.add.audio('typeH');
    sounds['finalEH'] =     game.add.audio('finalEH');

    //Sounds initialized in map regarding the I og G assignment
    sounds['handsIG'] =     game.add.audio('handsIG');
    sounds['findI'] =       game.add.audio('findI');
    sounds['typingI'] =     game.add.audio('typingI');
    sounds['typeI'] =       game.add.audio('typeI');
    sounds['gjIG1'] =       game.add.audio('gjIG');
    sounds['gjIG2'] =       game.add.audio('gjIG');
    sounds['findG'] =       game.add.audio('findG');
    sounds['typingG'] =     game.add.audio('typingG');
    sounds['typeG'] =       game.add.audio('typeG');
    sounds['finalIG'] =     game.add.audio('finalIG');

    //Sounds initialized in map regarding the B og N assignment
    sounds['handsBN'] =     game.add.audio('handsBN');
    sounds['findB'] =       game.add.audio('findB');
    sounds['typingB'] =     game.add.audio('typingB');
    sounds['typeB'] =       game.add.audio('typeB');
    sounds['gjBN1'] =       game.add.audio('gjBN');
    sounds['gjBN2'] =       game.add.audio('gjBN');
    sounds['findN'] =       game.add.audio('findN');
    sounds['typingN'] =     game.add.audio('typingN');
    sounds['typeN'] =       game.add.audio('typeN');
    sounds['finalBN'] =     game.add.audio('finalBN'); 

    //Sounds initialized in map regarding the R og O assignment
    sounds['handsRO'] =     game.add.audio('handsRO');
    sounds['findR'] =       game.add.audio('findR');
    sounds['typingR'] =     game.add.audio('typingR');
    sounds['typeR'] =       game.add.audio('typeR');
    sounds['findO'] =       game.add.audio('findO');
    sounds['typingO'] =     game.add.audio('typingO');
    sounds['typeO'] =       game.add.audio('typeO');
    sounds['finalRO'] =     game.add.audio('finalRO');

    //Sounds initialized in map regarding the Broddstafir assignment
    sounds['handsBRODD'] =      game.add.audio('handsBRODD');
    sounds['findComma'] =       game.add.audio('findComma');
    sounds['typingComma'] =     game.add.audio('typingComma');
    sounds['typingComma2'] =    game.add.audio('typingComma2');
    sounds['typingComma3'] =    game.add.audio('typingComma3');
    sounds['typeCommaE'] =      game.add.audio('typeCommaE');
    sounds['finalBRODD'] =      game.add.audio('finalBRODD');

    //Sounds initialized in map regarding the Hástafir assignment
    sounds['handsHA'] =         game.add.audio('handsHA');
    sounds['findLShift'] =      game.add.audio('findLShift');
    sounds['typingLShift'] =    game.add.audio('typingLShift');
    sounds['findRShift'] =      game.add.audio('findRShift');
    sounds['typingRShift'] =    game.add.audio('typingRShift');
    sounds['typingOHA'] =       game.add.audio('typingOHA');
    sounds['typingOHA2'] =      game.add.audio('typingOHA2');
    sounds['typeOHA'] =         game.add.audio('typeOHA');
    sounds['finalHA'] =         game.add.audio('finalHA');

    //loadHomePage will display the main screen of the game
    loadHomePage();    
}

//This function is called upon and repaints the canvas constantly, thus the actions in here are only called upon at certain times
function update()
{
    //This IF statement will only run if we are inside the WarmUp animation of the first 6 assignments
    if(warmUps[0] === true || warmUps[1] === true || warmUps[2] === true || warmUps[3] === true || warmUps[4] === true || warmUps[5] === true)
    {
        //Maggi minnkur peeks from the right side of the screen, angle of image at start is 0 and will stop rotating at -46. It will also
        //slightly move the image to the left.
        if(warmupHead.angle > -46 && warmupHead.x > 1015)
        {
            warmupHead.x -= 2;
            warmupHead.angle -= 1;
        }

        //This will make the left and right hand move from below the visible part of the canvas to their correct positions above the keys
        if(leftHand.y > 390 && balloon.visible === true)
        {
            leftHand.y -= 4;
        }
        if(rightHand.y > 390 && balloon.visible === true)
        {
            rightHand.y -= 4;
        }
    }

    //This IF statement will only run if we are inside the WarmUp animation of the last 6 assignments
    if(warmUps[6] === true || warmUps[7] === true  ||  warmUps[8] === true || warmUps[9] === true || warmUps[10] === true || warmUps[11])
    {
        //This will make the left and right hand move from below the visible part of the canvas to their correct positions above the keys
        if(leftHand.y > 320 && balloon.visible === true)
        {
            leftHand.y -= 4;
        }
        if(rightHand.y > 295 && balloon.visible === true)
        {
            rightHand.y -= 4;
        }
    }

    //The clouds will constantly move to the right, although the clouds are not visible when not inside the
    //Allir heimalyklar 1 and 2.
    clouds.x += 1;

    //The clouds position will reset at a certain position and keep moving from there, making the illusion that
    //they are continiously moving to the right 
    if(clouds.x === -129)
    {
        clouds.x = -995;
    }

    //The orange fish in "E og H" and "I og G" assignments moves at different speeds depending on which direction
    //he is heading.
    if(fish1.frame === 0)
    {
        fish1.x += 1.5;
    }
    else
    {
        fish1.x -= 1;
    }

    //If the orange fish reaches a certain point on the right side of the canvas, we switch frames in the sprite
    //which makes the fish face the other direction, by switching frames he will move in the opposite direction too
    if(fish1.x >= 850)
    {
        fish1.frame = 2;
    }
    if(fish1.x <= 15)
    {
        fish1.frame = 0;
    }

    //The green fish in "E og H" and "I og G" assignments moves at different speeds depending on which direction
    //he is heading.
    if(fish2.frame === 1)
    {
        fish2.x += 2;
    }
    else
    {
        fish2.x -= 1;
    }

    //If the green fish reaches a certain point on the right side of the canvas, we switch frames in the sprite
    //which makes the fish face the other direction, by switching frames he will move in the opposite direction too
    if(fish2.x >= 850)
    {
        fish2.frame = 3;
    }
    if(fish2.x <= 25)
    {
        fish2.frame = 1;
    }

    
}

// loadHomePage initializes and displays the necessary items for the Home Page of the game where the user can
// select assignments to practice in
function loadHomePage() 
{
    //Sets all of the warmUps array to false
    initWarmUps();
    //Clears canvas, stops all currently playing sounds and erases all CallBack events.
    initGame();

    //Background loaded
    var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
    homePage.anchor.setTo(0.5, 0.5);
    homePage.width = width;
    homePage.height = height;

    //Fingrafimi logo loaded
    var logoL = game.add.image(200, 40, 'logoL');

    //Instructor Maggi Minnkur loaded and the animation of moving his mouth to make him talk.
    var instructorMaggi = game.add.sprite(500, 150, 'instructorMaggi', 0);
    instructorMaggi.scale.setTo(0.8);
    instructorMaggi.animations.add('talk', [0, 1, 0, 1, 1, 0], 6, true);

    //Buttons for all assignments added, clicking on them calls on the Instructions function first sending into it
    //the number of the assignment and exercise chosen
    var btnFj = game.add.button(28, 20, 'fj');
    btnFj.events.onInputDown.add(function(){ Instructions(0, -1); });

    var btnDk = game.add.button(28, 70, 'dk');
    btnDk.events.onInputDown.add(function(){ Instructions(1, -1); });

    var btnSl = game.add.button(28, 120, 'sl');
    btnSl.events.onInputDown.add(function(){ Instructions(2, -1); });
    
    var btnAae = game.add.button(28, 170, 'aae');
    btnAae.events.onInputDown.add(function(){ Instructions(3, -1); });

    var btnHome1 = game.add.button(28, 215, 'heimalyklar1');
    btnHome1.events.onInputDown.add(function(){ Instructions(4, -1); });

    var btnHome2 = game.add.button(23, 275, 'heimalyklar2');
    btnHome2.events.onInputDown.add(function(){ Instructions(5, -1); });

    var btnEh = game.add.button(30, 340, 'eh');
    btnEh.events.onInputDown.add(function(){ Instructions(6, -1); });

    var btnIg = game.add.button(30, 388, 'ig');
    btnIg.events.onInputDown.add(function(){ Instructions(7, -1); });

    var btnBn = game.add.button(30, 437, 'bn');
    btnBn.events.onInputDown.add(function(){ Instructions(8, -1); });
    
    var btnRo = game.add.button(30, 485, 'ro'); 
    btnRo.events.onInputDown.add(function(){ Instructions(9, -1); });

    var btnBrodd = game.add.button(30, 535, 'broddstafir');
    btnBrodd.events.onInputDown.add(function(){ Instructions(10, -1); });
    
    var btnHastafir = game.add.button(30, 605, 'hastafir');
    btnHastafir.events.onInputDown.add(function(){ Instructions(11, -1); });
    
    // Turn off keyboard listening events
    game.input.keyboard.stop();
    
    //Resets all variables regarding the exercise text
    initTextVariables();

    //Displays the logo from Menntamálastofnun in the botton left corner
    addLogo(170, 0.5);

    //Displays a button which can mute or unmute the sound for the game
    addMuteButton();

    //Displays a button which when clicked on it will open a teachers manual PDF on the game in a new tab
    var btnteacher = game.add.button(830, 610, 'teacher', function() { window.open("http://vefir.nams.is/fingrafimi/fingrafimi_klbtilb.pdf", "_blank");}, this);   
    btnteacher.scale.setTo(0.8);

    //Displays a button which when clicked on it will open a progress sheet PDF for students in a new tab
    var btnmat = game.add.button(890, 610, 'mat', function() { window.open("http://vefir.nams.is/fingrafimi/fingrafimi_matsbl.pdf", "_blank");}, this);    
    btnmat.scale.setTo(0.8);

    //Displays a small window in the canvas with information about the game and its creaters
    var btnabout = game.add.button(950, 605, 'about', function(){ loadAbout(); }, this);    
    btnabout.scale.setTo(0.8);
    
    //If this is the first time loadHomePage is loaded then do the following
    if(firstLoad)
    {
        //Once the intro sound file is finished playing stop the talking animation and the the frame on Maggi minnkur
        //to 0 which will leave his mouth closed 
        intro.onStop.addOnce(function(){ instructorMaggi.animations.stop(); instructorMaggi.frame = 0; }, this);
        //Start playing intro audio
        intro.play();
        //Start animation of Maggi Minnkur talking
        instructorMaggi.play('talk');
        //Make sure this will not be played again unless browser is refreshed
        firstLoad = false;
    }
}

//Resets all variables regarding the exercise text
function initTextVariables()
{
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;

}

//Sets all of the warmUps array to false
function initWarmUps()
{
    for(i = 0; i < 12; i++)
    {
        warmUps[i] = false;
    }

}

//Remove all CallBack events, clears the canvas and stops all currently playing sounds in that order
function initGame()
{
    game.input.keyboard.onDownCallback = game.input.keyboard.onUpCallback = game.input.keyboard.onPressCallback = null;
    game.world.removeAll();
    game.sound.stopAll();
}

//The assignment function is where the exercises can be executed, all of its objects are initialized here and they are different
//depending on which assignment we are on
function Assignment(assignmentNr, exerciseNr) 
{
    //Sets all of the warmUps array to false
    initWarmUps();

    //Remove all CallBack events, clears the canvas and stops all currently playing sounds in that order
    initGame();
  
    //Turn on keyboard event listeners
    game.input.keyboard.start();
    //Empty the hidden text box in the HTML page
    $("#assignment").val("");    

   	// Load background depending on which assignment
    loadBackground(assignmentNr);
    

    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    //Add logo 
    addLogo(30, 0.45);

    // Add the correct instructor with a talking animation
    var instructor = addAssignmentInstructor(assignmentNr);

    // Load keyboard and animations which make the keys blink
    loadKeyboard(assignmentNr, exerciseNr);

    //If exercise number is greater or equal than 0 when the Assignment function is called then we are in an exercise, thus
    //we must display the exercise text, empty the hidden HTML input textbox and call keyPress which will turn on the
    //keyboard event listeners and process the input of keys  
    if(exerciseNr >= 0)
    {
        // Create the textArea
        text = exercisesArray[assignmentNr][exerciseNr];
        textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 20, text, style);
        textArea.anchor.set(0.5);

        // When key is pressed the function keyPress is called
        game.input.keyboard.addCallbacks(this, null, function(){
            char = document.getElementById('assignment').value;
            $("#assignment").val(""); 
            if(char !== '' && char != "´")
            {
                keyPress(char, assignmentNr, exerciseNr);
            }
        },null);
    }
    //If exercise number is less than 0, then we are calling the Assignment function from the WarmUp function, thus
    //we must add the speech bubble for the instructor, play the correct audio and make the instructor talk
    else
    {
        var balloon = game.add.sprite(475, 5, 'balloonSprite', addBalloon(assignmentNr));
        balloon.scale.setTo(0.9);
        addFinalSound(assignmentNr);
        instructor.play('talk');
    }
    
    //Add the exit button to the canvas so we can return to the home page
    addExitButton();
    //Add the mute button to the canvas so we can mute the in-game sound if we want
    addMuteButton();
    //Add the exercise buttons which will activate 
    addExercises(assignmentNr);
    if(exerciseNr >= 0)
    {
        exerciseBtnGlowArray[assignmentNr][exerciseNr].alpha = 0.8;
    }

    //Simple boolean variable comingFromExercise tells us if we are calling the Assignment function from another Assignment function, this
    //means that we have come from completing an exercise and so we must play the audio that compliments the user when he finishes an exercise
    if(comingFromExercise)
    {
        var complimentSound = addComplimentSound(assignmentNr);
        instructor.play('talk');
        complimentSound.onStop.addOnce(function(){instructor.animations.stop();instructor.frame = 0;});
        complimentSound.play();
        comingFromExercise = false;
    }
}

//Iterate through the map for keyboardKeysMap which contains the keyboard and all the blinking animations for the keys and 
//call an animation stop event on all keys
function stopKeyboardAnimations()
{
    keyboardKeysMap.forEach(function(key,value,map) 
    {
       if(keyboardKeysMap.get(`${value}`).animations)
       {  
            keyboardKeysMap.get(`${value}`).animations.stop(false,true);
       }
    });
}

function keyPress(char, assignmentNr, exerciseNr) 
{
    stopKeyboardAnimations();
   
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
            if(text.charAt(incorrPos).toLowerCase() === 'á')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                     
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('a').play('blink');                
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'é')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                      
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('e').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'í')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                      
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('i').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'ó')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                      
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('o').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === ' ')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                      
                    keyboardKeysMap.get(' ').play('blink');
                    keyboardKeysMap.get(' ').play('blink');
                }
            }
            else if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
            {                     
                keyboardKeysMap.get('lShift').play('blink');
                keyboardKeysMap.get('rShift').play('blink');
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

            if(text.charAt(incorrPos).toLowerCase() === 'á')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                     
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('a').play('blink');                
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'é')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                     
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('e').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'í')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                { 
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('i').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === 'ó')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                { 
                    keyboardKeysMap.get('lShift').play('blink');
                    keyboardKeysMap.get('rShift').play('blink');
                }

                keyboardKeysMap.get('o').play('blink');
                keyboardKeysMap.get('´').play('blink');
            }
            else if(text.charAt(incorrPos).toLowerCase() === ' ')
            {
                if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
                {                      
                    keyboardKeysMap.get(' ').play('blink');
                    keyboardKeysMap.get(' ').play('blink');
                }
            }
            else if(text.charAt(incorrPos) === text.charAt(incorrPos).toUpperCase())
            {
                keyboardKeysMap.get('lShift').play('blink');
                keyboardKeysMap.get('rShift').play('blink');
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
    textArea = game.add.text(game.world.centerX, game.world.centerY/2 - 20, text, style);
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
            finishSound.onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            instructor.play('talk');
            finishSound.play();
            return;
        }

        exerciseNr = findNextExercise(assignmentNr, exerciseNr);
        
        comingFromExercise = true;
        Assignment(assignmentNr, exerciseNr);
        return;
    }
}

//Check if all exercises are complete in a certain assignment
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

//Find the next exercise in the assignment which is not complete, returns the index for said exercise
function findNextExercise(assignmentNr, exerciseNr)
{
    //Iterate through exercisesFinished[assignmentNr] and return the first index which is not complete, said index is then used 
    //in exercisesArray to load the correct next unfinished exercise
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

// Add the mute button to the canvas, this is called upon on all functions, Home Page, Instructions, WarmUps and Assignment
function addMuteButton()
{
    muteBtn = game.add.button(890, 20, 'sound');
    // Add hover affect
    muteBtn.events.onInputOver.add(function(){ 
        if(game.sound.mute === false)
        { 
            muteBtn.frame = 2; 
        } 
    });
    muteBtn.events.onInputOut.add(function(){ 
        if(game.sound.mute === false)
        { 
            muteBtn.frame = 0; 
        } 
    });

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

//Mutes or unmutes the sound for the game, it also changes the frame of the button to identify if it is muted or not
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

//Adds to the canvas an exit button in three places which will take the user back to the home page: Instructions, WarmUps and Assignment
function addExitButton()
{
    //Add the button
    exitBtn = game.add.button(930, 20, 'exit');
    //Add hover affect which changes the button if the mouse is hovering over the button or not
    exitBtn.events.onInputOver.add(function(){ exitBtn.frame = 1;});
    exitBtn.events.onInputOut.add(function(){ exitBtn.frame = 0;});

    //When the button is clicked, quitExercise() and loadHomePage() are called 
    exitBtn.events.onInputDown.add(quitExercise);
    exitBtn.events.onInputDown.add(loadHomePage);
}

//Add the Fingrafimi logo and the assignment for the current assignment, clicking on the assignment button calls the Assignment function and skips through both through
//the Instruction and WarmUp animations. Clicking on the Fingrafimi logo takes the user back to the home page.
function addLogoAndAssignmentID(assignmentNr, exerciseNr)
{
    //Add the Fingrafimi logo
    logoS = game.add.button(25, 25, 'logoS');
    //Add the click event that loads the home page
    logoS.events.onInputDown.add(function(){quitExercise(); loadHomePage();});

    //Add the assignment button
    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    //Set the frame of the button to the current 
    assignmentBtn.frame = assignmentNr;

    //Add the click event that loads the home page
    assignmentBtn.events.onInputDown.add(function(){
            initWarmUps();
            quitExercise(); 
            Assignment(assignmentNr, exerciseNr);
            balloon.visible = false;
    });

    //Add the logo of Menntamálastofnun
    addLogo(30, 0.45);
}

//Adds a skip button in Instruction and WarmUps, where the user can skip the animations if he choses too, if the user skips in Instruction
//the warmUp function is called, if the user skips in warmUp the Assignment function is called
function addSkipButton(assignmentNr, exerciseNr, nextFunction)
{
    //Add the button
    var arrowBtn = game.add.button(870, 630, 'arrow');
    //Frame 0 is a blue arrow
    arrowBtn.frame = 0;
    //If mouse hovers over the arrow it will turn red
    arrowBtn.events.onInputOver.add(function(){ arrowBtn.frame = 1; }, this);
    //If mouse hovers out of the arrow it will turn blue again
    arrowBtn.events.onInputOut.add(function(){ arrowBtn.frame = 0; }, this);
    //If selected it will call nextFunction
    arrowBtn.events.onInputDown.add(function(){nextFunction(assignmentNr, exerciseNr); }, this);
}

//Returns the correct frame index needed for the speech bubble in the Assignment function
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

//Depending on what assignment you are on, it will play the correct sound when you are entering the Assignment page coming from the
//warmUp animations
function addFinalSound(assignmentNr)
{
    switch(assignmentNr)
    {
        case 0:
            sounds['finalFJ'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            sounds['finalFJ'].play();
            break;
        case 1:
            sounds['finalDK'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            sounds['finalDK'].play();
            break;
        case 2:
            sounds['finalSL'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            sounds['finalSL'].play();
            break;
        case 3:
            sounds['finalAAE'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            sounds['finalAAE'].play();
            break;
        case 4:
            sounds['finalAll1'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            sounds['finalAll1'].play();
            break;
        case 5:
            sounds['finalAll2'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalAll2'].play();
            break;
        case 6:
            sounds['finalEH'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalEH'].play();
            break;
        case 7:
            sounds['finalIG'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalIG'].play();
            break;
        case 8:
            sounds['finalBN'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalBN'].play();
            break;
        case 9:
            sounds['finalRO'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalRO'].play();
            break;
        case 10:
            sounds['finalBRODD'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalBRODD'].play();
            break;
        case 11:
            sounds['finalHA'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            sounds['finalHA'].play();
            break;
    }
}

//Quitting an exercise requires that we turn off the keyboard event listener and reset the variables for the exercise text
function quitExercise()
{
    game.input.keyboard.stop();
    initTextVariables();
}

//Load and display the exercise buttons in Assignment, they vary depending on the assignmentNr and addExerciseImage is called 
//and it loads the correct button for each exercise
function addExercises(assignmentNr)
{
    if(assignmentNr === 0 || assignmentNr === 1)
    {
        addExerciseImages('mus', 'musGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('robot', 'robotGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
    }
    else if(assignmentNr === 2)
    {
         addExerciseImages('mus', 'musGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
         addExerciseImages('robot', 'robotGlow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 3);
    }
    else if(assignmentNr === 3)
    {
        addExerciseImages('mus' , 'musGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('robot', 'robotGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('mus', 'musGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
    }
    else if(assignmentNr === 4)
    {
        addExerciseImages('heyBaggi','heyBaggiGlow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 0);
        addExerciseImages('blom','blomGlow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 4);
        addExerciseImages('mus2','mus2Glow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 8);
    }
    else if(assignmentNr === 5)
    {
        addExerciseImages('heyBaggi','heyBaggiGlow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 0);
        addExerciseImages('blom','blomGlow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 4);
        addExerciseImages('mus2','mus2Glow', exerciseBtnPosArray[assignmentNr], 4, assignmentNr, 8);
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        addExerciseImages('shell','shellGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('starfish','starfishGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('shrimp', 'shrimpGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('jellyfish', 'jellyfishGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('seahorse', 'seahorseGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        addExerciseImages('saxafonn','saxafonnGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('tromma','trommurGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('piano','pianoGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('gitar','gitarGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('nota','notaGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        addExerciseImages('korfubolti','korfuboltiGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 0);
        addExerciseImages('blakbolti','blakboltiGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 3);
        addExerciseImages('rubbybolti', 'rubbyboltiGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 6);
        addExerciseImages('fotbolti', 'fotboltiGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 9);
        addExerciseImages('tennisbolti', 'tennisboltiGlow', exerciseBtnPosArray[assignmentNr], 3, assignmentNr, 12);
    }
}

//Load and display the correct background depending on what assignmentNr is
function loadBackground(assignmentNr)
{ 
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        //Add blue background
        background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
        //Add farm background
        background = game.add.image(game.world.centerX, game.world.centerY, 'farm');
        //Add clouds which will be constantly moving to the right
        clouds = game.add.image(-1000, 10,'clouds');
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        //Load ocean floor background
        background = game.add.image(game.world.centerX, game.world.centerY, 'ocean');
        //Add orange fish which will move from end to end then turn around repeatedly
        fish1 = game.add.sprite(800, 35, 'fishes', 2);
        //Add green fish which will move from end to end then turn around repeatedly
        fish2 = game.add.sprite(25, 175, 'fishes', 1);
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        //Add stage background
        background = game.add.image(game.world.centerX, game.world.centerY, 'stage');
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        //Add boxing ring background
        background = game.add.image(game.world.centerX, game.world.centerY, 'box');
    }
    //Set the width and height of the background to match the witdh and height of the canvas
    background.width = width;
    background.height = height;
    background.anchor.setTo(0.5, 0.5);
}

//Add the exercise images as buttons
function addExerciseImages(image, imageGlow, posArr, count, assignmentNr, exerciseNr)
{
    textPosArr = exerciseTextPosArray[assignmentNr];
    for(var i = 0; i < count; i++)
    {
        // Add the background image that makes the exercise buttons glow
        exerciseBtnGlowArray[assignmentNr][exerciseNr+i] = game.add.image(posArr[i+exerciseNr][0]-10, posArr[i+exerciseNr][1]-10, imageGlow);
        // Make the background image hidden
        exerciseBtnGlowArray[assignmentNr][exerciseNr+i].alpha = 0;

        //Add the exercise button for exercise in index exercisesArray[assignmentNr][exerciseNr]
        exerciseBtnArray[assignmentNr][exerciseNr+i] = game.add.button(posArr[i+exerciseNr][0], posArr[i+exerciseNr][1], image);
        //Check if the exercise is finished, if it is we make the button green
        if(exercisesFinished[assignmentNr][exerciseNr+i] === true)
        {
            //Make the button green
            exerciseBtnArray[assignmentNr][exerciseNr+i].frame = 1;
        }

        (function() 
        {
            var exerciseNum = exerciseNr + i;
            var textNum = exerciseNum + 1;

            // Add number above every image
            game.add.text(textPosArr[i+exerciseNr][0], textPosArr[i+exerciseNr][1], textNum, { font: "bold 16px Arial"});
            // Add the event of calling the function Assignment to the exercise
            exerciseBtnArray[assignmentNr][exerciseNr+i].events.onInputDown.add(function(){ quitExercise(); Assignment(assignmentNr, exerciseNum); });
        }()); // immediate invocation
    }
}

//Displays the keyboard used in assignment, it is composed of many smaller pictures, all keys used in assignments are added to the canvas
//along with a blinking animation, then a keyboard outline with some grey filled keys is drawn over the other single keys
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

    //If We are in assignment 5 or higher, the e key will be colored and have a blinking animation, else it will just be grey
    if(assignmentNr > 5)
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 17));
        keyboardKeysMap.get('e').animations.add('blink', [17, 18, 17, 18, 17], 2, false);
    }
    else
    {
        keyboardKeysMap.set('e', game.add.sprite(317, 298, 'keys', 19));
    }

    //If We are in assignment 6 or higher, the i key will be colored and have a blinking animation, else it will just be grey
    if(assignmentNr > 6)
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 28));
        keyboardKeysMap.get('i').animations.add('blink', [28, 29, 28, 29, 28], 2, false);
    }
    else
    {
        keyboardKeysMap.set('i', game.add.sprite(536, 296, 'keys', 30));
    }

    //If We are in assignment 7 or higher, the b key will be colored and have a blinking animation, else it will just be grey
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

    //If We are in assignment 8 or higher, the r key will be colored and have a blinking animation, else it will just be grey
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

    //If We are in assignment 5 or higher, the ´ key will be colored and have a blinking animation, else it will just be grey
    if(assignmentNr > 9)
    {
        keyboardKeysMap.set('´', game.add.sprite(678, 340, 'keys', 36));
        keyboardKeysMap.get('´').animations.add('blink', [36, 37, 36, 37, 36], 2, false);
    }
    else
    {
        keyboardKeysMap.set('´', game.add.sprite(678, 340, 'keys', 38));
    }

    ////If We are in assignment 10 or higher, the shift keys will be colored and both will have a blinking animation, else they will just be grey
    if(assignmentNr > 10)
    {
        keyboardKeysMap.set('lShift', game.add.sprite(165, 386, 'lShift', 1));
        keyboardKeysMap.get('lShift').animations.add('blink', [1, 2, 1, 2, 1], 2, false);
        keyboardKeysMap.set('rShift', game.add.sprite(700, 384, 'rShift', 1));
        keyboardKeysMap.get('rShift').animations.add('blink', [1, 2, 1, 2, 1], 2, false);
    }
    else
    {
        keyboardKeysMap.set('lShift', game.add.sprite(165, 386, 'lShift', 0));
        keyboardKeysMap.set('rShift', game.add.sprite(700, 384, 'rShift', 0));
    }
    
    //The keyboard outline that is over the single images is added in the end
    keyboard = game.add.image(150, 175, 'keyboard');
}

//Add the logo from Menntamálastofnun on the bottom left of the screen, x is the x coordinate on where to put the logo and sc is the scale we want
function addLogo(x, sc)
{
    logo = game.add.image(x, 660, 'logo');
    logo.scale.setTo(sc);
}

//Load and display the Instruction for the Assignments, after Instructions the WarmUp is called
function Instructions(assignmentNr, exerciseNr)
{
    //Remove all CallBack events, clears the canvas and stops all currently playing sounds in that order
    initGame();

    //Load and display the correct background
    loadBackground(assignmentNr);
    //If the assignmentNr is between 0 and 4, a part is added to the background
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        background = game.add.image(0, 0, 'instructionBg');
    }

    //Add the Fingrafimi logo and Assignment buttons on the top left corner
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    //Add the Exit button
    addExitButton();
    //Add the Mute button
    addMuteButton();
    
    //Add the skip button to skip the Instructions and go to the correct warmUp
    addSkipButton(assignmentNr, exerciseNr,  warmUpFunctions[assignmentNr]);
 
    var instructor = addInstructionAnimation(assignmentNr);
    var instructionSound = addInstructionSound(assignmentNr);
    instructionSound.onStop.addOnce(function(){ 
    	instructor.animations.stop(); 
    	instructor.frame = 0;     	
    }, this);

    instructionSound.play();
    instructor.play('talk');
}

//Load and display the correct instructor depending on which Instruction you are in
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
         instructor.scale.setTo(0.75);
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

//Load and display the correct instructor depending on which Assignment you are in
function addAssignmentInstructor(assignmentNr)
{
    //Maggi minnkur is the assignment instructor in the first 4 assignments
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        //Load the image of the instructor
        instructor = game.add.sprite(1015, 210, 'warmupHead', 0);
        //Add the animation that makes him talk
        instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
        //Move the anchor point of the image
        instructor.anchor.setTo(0.75, 1);
        //Rotate the image
        instructor.angle = -41;
        //Return the object
        return instructor;
    }
    //The pig is the assignment instructor for Allir heimalyklar 1 and 2
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
         instructor = game.add.sprite(750, 100, 'pig', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    //The horse is the assignment instructor for the E og H and I og G assignments
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
         instructor = game.add.sprite(810, 125, 'whale', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    //The fish with sunglasses is the assignment instructor for the B og N and R og O assignments
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        instructor = game.add.sprite(785, 100, 'fish', 0);
        instructor.scale.setTo(0.5);
        instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
        return instructor;
    }
    //The horse is the assignment instructor for the Broddstafir and Hástafir assignments
    else
    {
        instructor = game.add.sprite(785, 100, 'horse', 0);
        instructor.scale.setTo(0.5);
        instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
        return instructor;
    }
}

//Returns the correct audio to play for when you select an assignment in the home page
function addInstructionSound(assignmentNr)
{
    if(assignmentNr === 0)
    {
            return game.add.audio('instructionFJ');
    }
    else if(assignmentNr === 1)
    {
            return game.add.audio('instructionDK');
    }
    else if(assignmentNr === 2)
    {
            return game.add.audio('instructionSL');
    }
    else if(assignmentNr == 3)
    {
            return game.add.audio('instructionAAE');
    }
    else if(assignmentNr === 4)
    {
            return game.add.audio('instructionALL1');
    }
    else if(assignmentNr === 5)
    {
            return game.add.audio('instructionALL2');
    }
    else if(assignmentNr === 6)
    {
            return game.add.audio('instructionEH');
    }
    else if(assignmentNr === 7)
    {
            return game.add.audio('instructionIG');
    }
    else if(assignmentNr === 8)
    {
            return game.add.audio('instructionBN');
    }
    else if(assignmentNr === 9)
    {
            return game.add.audio('instructionRO');
    }
    else if(assignmentNr === 10)
    {
            return game.add.audio('instructionBRODD');
    }
    else if(assignmentNr === 11)
    {
            return game.add.audio('instructionHA');
    }
}

//Returns the correct audio to play for when you have finished an exercises in an assignment
function addComplimentSound(assignmentNr)
{
    if(assignmentNr === 0)
    {
        return this.game.add.sound('complimentFJ');
    }
    else if(assignmentNr === 1)
    {
        return game.add.audio('complimentDK');
    }
    else if(assignmentNr === 2)
    {
        return game.add.audio('complimentSL');
    }
    else if(assignmentNr === 3)
    {
        return game.add.audio('complimentAAE');
    }
    else if(assignmentNr === 4)
    {
        return game.add.audio('complimentALL1');
    }
    else if(assignmentNr === 5)
    {
        return game.add.audio('complimentALL2');
    }
    else if(assignmentNr === 6)
    {
        return game.add.audio('complimentEH');
    }
    else if(assignmentNr === 7)
    {
        return game.add.audio('complimentIG');
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        return game.add.audio('complimentBN');
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        return game.add.audio('complimentBRODD');
    }
}

//Returns the correct audio to play for when you have finished all the exercises in an assignment
function addFinishSound(assignmentNr)
{
    if(assignmentNr === 0)
    {
        return game.add.audio('finishFJ');
    }
    else if(assignmentNr === 1)
    {
        return game.add.audio('finishDK');
    }
    else if(assignmentNr === 2)
    {
        return game.add.audio('finishSL');
    }
    else if(assignmentNr === 3)
    {
        return game.add.audio('finishAAE');
    }
    else if(assignmentNr === 4)
    {
        return game.add.audio('finishALL1');
    }
    else if(assignmentNr === 5)
    {
        return game.add.audio('finishALL2');
    }
    else if(assignmentNr === 6)
    {
        return game.add.audio('finishEH');
    }
    else if(assignmentNr === 7)
    {
        return game.add.audio('finishIG');
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        return game.add.audio('finishBN');
    }
    else if(assignmentNr === 10 || assignmentNr === 11)
    {
        return game.add.audio('finishBRODD');
    }
}

function stopWarmupHeadTalk()
{
    warmupHead.animations.stop(); 
    warmupHead.frame = 0;
}

// Display the text in the letter variable in the textArea with the specified color centerd in the canvas, 
// but subtract the offset to the Y coordinates to move it slightly up on the canvas
function addWarmUpTextArea(letter, offset, color)
{
    textArea = game.add.text(game.world.centerX, game.world.centerY - offset, letter, instructionStyle);
    textArea.anchor.set(0.5);
    textArea.addColor(color, 0);
}

//WarmUp animation for F og J, this function is mainly just animation sequences where one doesnt start until the previous one has finished playing
//The soundclips are played in the following order: leftFJ, rightFJ, findFJ, findF, FindJ and spaceFJ
function WarmUpFJ(assignmentNr, exerciseNr)
{
    //Set warmUps[0] to true so that all the callBacks here work while in the warmup
    warmUps[0] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    //Add the "heimalyklar" keys to the canvas, they have some blinking animations but only the ones needed which are:
    //1: A, S, D and F all blink simultaneously
    //2: J, K, L and Æ all blink simultaneously
    //3: Just F blinks
    //4: Just J blinks
    //5: Both F and J blink simultaneously
    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
    warmupKeys.animations.add('fBlink', [0, 4, 0, 4, 0, 4, 0], 2, false, true);
    warmupKeys.animations.add('jBlink', [0, 7, 0, 7, 0, 7, 0], 2, false, true);
    warmupKeys.animations.add('bothBlink', [0, 11, 0, 11, 0, 11, 0, 11, 0, 11, 0], 2, false, true);

    //Add the image and talking animation of the instructor
    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    //Add the left hand to the game so that it starts moving from below the visible canvas to the A, S, D and F keys.
    leftHand = game.add.sprite(175, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    //Add the speech bubble with the correct text
    balloon = game.add.sprite(500, 25, 'balloonSprite', 0);

    addMuteButton();
    addExitButton();

    //Each animation of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the first soundclip where he says "Finndu stafina A, S, D og F", the second clip where he says "Finndu stafina
    //J, K, L og Æ" does not start untill after the first soundclip has finished playing
    sounds['leftFJ'].onStop.addOnce(function()
    {
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            stopWarmupHeadTalk();
            
            //Pause for 2 seconds between soundclips
            game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {   
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
     sounds['rightFJ'].onStop.addOnce(function()
     {
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            stopWarmupHeadTalk();
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {          
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

    //This is after the end of "Finndu stafina J, K, L og Æ", here we want to focus on F and J and make them blink
    sounds['findFJ'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk();

        //2 second pause between findFJ soundclip and next one
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[0])
            {
                //Make the Instructor talk
                warmupHead.play('talk');
                //Make F blink
                warmupKeys.play('fBlink');
                //Set speech bubble
                balloon.frame = 4;
                //Play correct soundclip
                sounds['findF'].play();
                // Display the letter in the textArea
                addWarmUpTextArea('f', 50, '#000000');
            }                    
        }, this).autoDestroy = true;
    });

    sounds['findF'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk();        

        //Turn on keyboard event listener
        game.input.keyboard.start();

        //Event for keyboard inputs
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {
            //We only want to proceed when the F key is pressed    
            if(char === 'f')
            {
                //Turn off keyboard event listener
                game.input.keyboard.stop();
                //Remove the textArea to display the text green
                textArea.destroy();

                // Display the letter in the textArea in green
                addWarmUpTextArea('f', 50, '#00ff00');

                // 1 second pause
                game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    warmupHead.play('talk');
                    warmupKeys.play('jBlink');
                    balloon.frame = 5;
                    sounds['findJ'].play();
                    textArea.destroy();
                    // Display the letter in the textArea
                    addWarmUpTextArea('f', 50, '#000000');
                });
            }
        });
     });

     sounds['findJ'].onStop.addOnce(function()
     { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {
            if(char === 'j')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'j', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    game.input.keyboard.stop();
                    leftHand.destroy();
                    rightHand.destroy();
                    warmupKeys.destroy();
                    textArea.destroy();
                    
                    loadKeyboard(assignmentNr, exerciseNr);

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
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === ' ')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){ Assignment(assignmentNr, exerciseNr); });
            }
        });
    });


    //Play soundclip fogj1
    sounds['leftFJ'].play();
    //Make Maggi talk
    warmupHead.play('talk');
    //make A, S, D and F blink.
    warmupKeys.play('asdfBlink');
}

//The soundclips are played in the following order: leftFJ, rightFJ, findFJ, findF, FindJ and spaceFJ
function WarmUpDK(assignmentNr, exerciseNr)
{
    warmUps[1] = true;

    initGame();

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

    addMuteButton();
    addExitButton();

    sounds['leftFJ'].onStop.addOnce(function()
    {
            stopWarmupHeadTalk(); 
            
            game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {   
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

     sounds['rightFJ'].onStop.addOnce(function()
     {
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {         
            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 8;
                sounds['findDK'].play();
            }              
        }, this).autoDestroy = true;  
    }, this);

    sounds['findDK'].onStop.addOnce(function()
    {
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {                  
            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('dBlink');
                balloon.frame = 9;
                sounds['findD'].play();
                // Display the letter in the textArea
                addWarmUpTextArea('d', 50, '#000000');
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['findD'].onStop.addOnce(function()
    { 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {    
            if(char === 'd')
            {
                game.input.keyboard.stop();
                textArea.destroy();

                // Display the letter in the textArea
                addWarmUpTextArea('d', 50, '#00ff00');

                game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    warmupHead.play('talk');
                    warmupKeys.play('kBlink');
                    balloon.frame = 10;
                    sounds['findK'].play();
                    textArea.destroy();
                    // Display the letter in the textArea
                    addWarmUpTextArea('k', 50, '#000000');
                });
            }
        });

        //game.time.events.add(Phaser.Timer.SECOND * 2, function(){});
     });

     sounds['findK'].onStop.addOnce(function(){ 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'k')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'k', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
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

function WarmUpSL(assignmentNr, exerciseNr)
{
    warmUps[2] = true;

    initGame();

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

    addMuteButton();
    addExitButton();

    sounds['leftFJ'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        //Pause for 2 seconds after fogj1 soundclip, then play fogj2
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
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

    sounds['rightFJ'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk();

        //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {        
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

    sounds['findSL'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {            
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[2])
            {
                warmupHead.play('talk');
                warmupKeys.play('sBlink');
                balloon.frame = 14;
                sounds['findS'].play();
                // Display the letter in the textArea
                addWarmUpTextArea('s', 50, '#000000');
            }          
        }, this).autoDestroy = true;
    });

    sounds['findS'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {    
            if(char === 's')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                // Display the letter in the textArea
                addWarmUpTextArea('s', 50, '#00ff00');
                game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    warmupHead.play('talk');
                    warmupKeys.play('lBlink');
                    balloon.frame = 15;
                    sounds['findL'].play();
                    textArea.destroy();
                    // Display the letter in the textArea
                    addWarmUpTextArea('l', 50, '#000000');
                });
            }
        }); 
     });

     sounds['findL'].onStop.addOnce(function()
     { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk();

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {
            if(char === 'l')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                // Display the letter in the textArea
                addWarmUpTextArea('l', 50, '#00ff00');
                game.time.events.add(Phaser.Timer.SECOND * 1, function()
                {
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

function WarmUpAAE(assignmentNr, exerciseNr){
    warmUps[3] = true;
    
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
    warmupKeys.animations.add('aBlink', [0, 1, 0, 1, 0, 1, 0], 2, false, true);
    warmupKeys.animations.add('aeBlink', [0, 10, 0, 10, 0, 10, 0], 2, false, true);
    warmupKeys.animations.add('bothBlink', [0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0], 2, false, true);

    warmupHead = game.add.sprite(1096, 210, 'warmupHead', 0);
    warmupHead.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
    warmupHead.anchor.setTo(0.75, 1);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 0);

    addMuteButton();
    addExitButton();

    sounds['leftFJ'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        //Pause for 2 seconds after fogj1 soundclip, then play fogj2
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
            if(warmUps[3])
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

    sounds['rightFJ'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
            if(warmUps[3])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 17;
                sounds['findAAE'].play();
            }                            
        }, this).autoDestroy = true;  
    }, this);

    sounds['findAAE'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {                  
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[3])
            {
                warmupHead.play('talk');
                warmupKeys.play('aBlink');
                balloon.frame = 18;
                sounds['findA'].play();

                // Display the letter in the textArea
                addWarmUpTextArea('a', 50, '#000000');
            }                            
        }, this).autoDestroy = true;
    });

    sounds['findA'].onStop.addOnce(function(){ 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {    
            if(char === 'a')
            {
                game.input.keyboard.stop();
                textArea.destroy();

                // Display the letter in the textArea
                addWarmUpTextArea('a', 50, '#00ff00');

                game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    warmupHead.play('talk');
                    warmupKeys.play('aeBlink');
                    balloon.frame = 19;
                    sounds['findAE'].play();
                    textArea.destroy();
                    // Display the letter in the textArea
                    addWarmUpTextArea('æ', 50, '#000000');
                });
            }
        });
     });

    sounds['findAE'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {
            if(char === 'æ')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                // Display the letter in the textArea
                addWarmUpTextArea('æ', 50, '#00ff00');
                game.time.events.add(Phaser.Timer.SECOND * 1, function()
                {
                    sounds['finalAAE'].play();
                    balloon.frame = 21;
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

function WarmUpALL1(assignmentNr, exerciseNr){
    warmUps[4] = true;
    
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    var instructor = game.add.sprite(750, 100, 'pig', 0);
    instructor.scale.setTo(0.50);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);


    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 22);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['leftAll1'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[4])
                {
                    instructor.play('talk');
                    sounds['rightAll1'].play();
                    warmupKeys.play('jklæBlink');
                    balloon.frame = 23;
                    rightHand = game.add.sprite(535, 700, 'rHand', 0);
                    rightHand.scale.setTo(1.1);
                }
                
                  
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightAll1'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[4])
            {
                Assignment(assignmentNr, exerciseNr);
            }            
            }, this).autoDestroy = true;  
    }, this);

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['leftAll1'].play();
    instructor.play('talk');
    warmupKeys.play('asdfBlink');
}

function WarmUpALL2(assignmentNr, exerciseNr){
    warmUps[5] = true;
    
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    var instructor = game.add.sprite(750, 100, 'pig', 0);
    instructor.scale.setTo(0.50);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);

    leftHand = game.add.sprite(155, 700, 'lHand', 2);
    leftHand.scale.setTo(1.1);  

    balloon = game.add.sprite(500, 25, 'balloonSprite', 25);
    //balloon.visible = false;

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['leftAll2'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[5])
                {
                    instructor.play('talk');
                    sounds['rightAll2'].play();
                    warmupKeys.play('jklæBlink');
                    balloon.frame = 26;
                    rightHand = game.add.sprite(535, 700, 'rHand', 0);
                    rightHand.scale.setTo(1.1);
                }
                
                  
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightAll2'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[5])
            {
                Assignment(assignmentNr, exerciseNr);
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['leftAll2'].play();
    instructor.play('talk');
    warmupKeys.play('asdfBlink');
}

function WarmUpEH(assignmentNr, exerciseNr)
{
    warmUps[6] = true;

    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(810, 125, 'whale', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(210, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 16, 9, 16, 9, 16, 9], 2, false);

    rightHand = game.add.sprite(475, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 1, 0, 1, 0, 1, 0], 2, false);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 29);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    sounds['handsEH'].onStop.addOnce(function()
    {
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        
        //Pause for 2 seconds after fogj1 soundclip, then play fogj2
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {    
            if(warmUps[6])
            {
                instructor.play('talk');
                sounds['findE'].play();
                keyboardKeysMap.get('e').play('blink');
                balloon.frame = 30;
            }   
        }, this).autoDestroy = true;  
    }, this);

    sounds['findE'].onStop.addOnce(function(){
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {            
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[6])
            {
                instructor.play('talk');
                balloon.frame = 31;
                sounds['typingE'].play();
                leftHand.play('type');
            }            
        }, this).autoDestroy = true;  
    }, this);

    sounds['typingE'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
            if(warmUps[6])
            {
                instructor.play('talk');
                balloon.frame = 32;
                sounds['typeE'].play();
                keyboardKeysMap.get('e').play('blink');
                
                // Display the letter in the textArea
                addWarmUpTextArea('e', 150, '#000000');
            }
        });
    });

    sounds['typeE'].onStop.addOnce(function()
    {
        instructor.animations.stop(); 
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {    
            if(char === 'e')
            {
                game.input.keyboard.stop();
                textArea.destroy();

                // Display the letter in the textArea
                addWarmUpTextArea('e', 150, '#00ff00');
                game.time.events.add(Phaser.Timer.SECOND * 2, function()
                {
                    sounds['findH'].play();
                    instructor.play('talk');
                    balloon.frame = 33;
                    keyboardKeysMap.get('h').play('blink');
                    textArea.destroy();
                });
            }
        });
    });

    sounds['findH'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
            if(warmUps[6])
            {
                instructor.play('talk');
                balloon.frame = 35;
                sounds['typingH'].play();
                keyboardKeysMap.get('h').play('blink');
                rightHand.play('type');
            }
        });
     });

    
    sounds['typingH'].onStop.addOnce(function()
    { 
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        stopWarmupHeadTalk(); 

        game.time.events.add(Phaser.Timer.SECOND * 2, function()
        {
            if(warmUps[6])
                {
                    instructor.play('talk');
                    balloon.frame = 36;
                    sounds['typeH'].play();
                    keyboardKeysMap.get('h').play('blink');
                    // Display the letter in the textArea
                    addWarmUpTextArea('h', 150, '#000000');
                }
        });
    });

    sounds['typeH'].onStop.addOnce(function()
    {
        instructor.animations.stop(); 
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char)
        {    
            if(char === 'h')
            {
                game.input.keyboard.stop();
                textArea.destroy();
                // Display the letter in the textArea
                addWarmUpTextArea('h', 150, '#00ff00');
                game.time.events.add(Phaser.Timer.SECOND * 1, function()
                {
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
    });     

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsEH'].play();
    instructor.play('talk');
}

function WarmUpIG(assignmentNr, exerciseNr){
    warmUps[7] = true;

    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(810, 125, 'whale', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(210, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 5, 9, 5, 9, 5, 9], 2, false); 

    rightHand = game.add.sprite(475, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 2, 0, 2, 0, 2, 0], 2, false);
    
    balloon = game.add.sprite(475, 5, 'balloonSprite', 38);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsIG'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;

            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[7])
                {
                    instructor.play('talk');
                    sounds['findI'].play();
                    keyboardKeysMap.get('i').play('blink');
                    balloon.frame = 39;
                }
                
                  
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findI'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[7])
            {
                instructor.play('talk');
                balloon.frame = 40;
                sounds['typingI'].play();
                rightHand.play('type');
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['typingI'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){        
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[7])
            {
                instructor.play('talk');
                balloon.frame = 42;
                sounds['typeI'].play();
                keyboardKeysMap.get('i').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'i', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }          
        }, this).autoDestroy = true;
    });

    sounds['typeI'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'i' && warmUps[7])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'i', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    textArea.destroy();
                    instructor.play('talk');
                    balloon.visible = false;
                    sounds['gjIG1'].play();
                });
            }
        });
     });

     sounds['gjIG1'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[7])
            {
                instructor.play('talk');
                balloon.visible = true;
                balloon.frame = 43;
                sounds['findG'].play();
                keyboardKeysMap.get('g').play('blink');
            }
        });
     });

     sounds['findG'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[7])
            {
                instructor.play('talk');
                balloon.visible = true;
                leftHand.play('type');
                balloon.frame = 44;
                sounds['typingG'].play();
            }
        });
     });

     sounds['typingG'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[7])
            {
                instructor.play('talk');
                balloon.frame = 45;
                sounds['typeG'].play();
                keyboardKeysMap.get('g').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'g', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
        });
     });

     sounds['typeG'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'g' && warmUps[7])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'g', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    textArea.destroy();
                    instructor.play('talk');
                    balloon.visible = false;
                    sounds['gjIG2'].play();
                });
            }
        });
     });

    sounds['gjIG2'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
        if(warmUps[7])
            {
                Assignment(assignmentNr, exerciseNr);
            }
         });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsIG'].play();
    instructor.play('talk');
}

function WarmUpBN(assignmentNr, exerciseNr){
    warmUps[8] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(785, 100, 'fish', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(210, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 10, 9, 10, 9, 10, 9], 2, false); 
    leftHand.scale.setTo(1.1);

    rightHand = game.add.sprite(470, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 3, 0, 3, 0, 3, 0], 2, false);
    rightHand.scale.setTo(1.1);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 47);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsBN'].onStop.addOnce(function(){
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        
        //Pause for 2 seconds after fogj1 soundclip, then play fogj2
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            
            //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
            //and add the right hand into the game so it can start moving up towards the keys.
            if(warmUps[8])
            {
                instructor.play('talk');
                keyboardKeysMap.get('b').play('blink');
                sounds['findB'].play();
                balloon.frame = 49;
            }
            
                
        }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findB'].onStop.addOnce(function(){
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){         
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[8])
            {
                instructor.play('talk');
                balloon.frame = 50;
                sounds['typingB'].play();
                leftHand.play('type');
            }                        
        }, this).autoDestroy = true;  
    }, this);

    sounds['typingB'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[8])
            {
                instructor.play('talk');
                balloon.frame = 51;
                sounds['typeB'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'b', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
                keyboardKeysMap.get('b').play('blink');
            }            
        }, this).autoDestroy = true;
    });

    sounds['typeB'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'b' && warmUps[8])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'b', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    instructor.play('talk');
                    balloon.frame = 52;
                    sounds['gjBN1'].play();
                    textArea.destroy();
                });
            }
        });
     });

     sounds['gjBN1'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            if(warmUps[8])
            {
                instructor.play('talk');
                balloon.frame = 52;
                sounds['findN'].play();
                keyboardKeysMap.get('n').play('blink');
            }
        });
     });

     sounds['findN'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[8])
            {
                instructor.play('talk');
                balloon.frame = 53;
                sounds['typingN'].play();
                rightHand.play('type');
            }
        });
     });

     sounds['typingN'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[8])
            {
                instructor.play('talk');
                balloon.frame = 54;
                sounds['typeN'].play();
                keyboardKeysMap.get('n').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'n', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
        });
     });

     sounds['typeN'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'n' && warmUps[8])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'n', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){  
                    instructor.play('talk');
                    sounds['gjBN2'].play();
                });
            }
        });
     });

     sounds['gjBN2'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            if(warmUps[8])
            {
                Assignment(assignmentNr, exerciseNr);
            }
        });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsBN'].play();
    instructor.play('talk');
}

function WarmUpRO(assignmentNr, exerciseNr){
    warmUps[9] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(785, 100, 'fish', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(210, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 11, 9, 11, 9, 11, 9], 2, false); 
    leftHand.scale.setTo(1.1);

    rightHand = game.add.sprite(470, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 6, 0, 6, 0, 6, 0], 2, false);
    rightHand.scale.setTo(1.1);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 47);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsRO'].onStop.addOnce(function(){
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        
        //Pause for 2 seconds after fogj1 soundclip, then play fogj2
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            
            //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
            //and add the right hand into the game so it can start moving up towards the keys.
            if(warmUps[9])
            {
                instructor.play('talk');
                keyboardKeysMap.get('r').play('blink');
                sounds['findR'].play();
                balloon.frame = 58;
            }
            
                
        }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findR'].onStop.addOnce(function(){
        //Make Maggi stop moving his mouth in the 2 second pause between animations 
        instructor.animations.stop(); 
        instructor.frame = 0;
        //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){         
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[9])
            {
                instructor.play('talk');
                balloon.frame = 59;
                sounds['typingR'].play();
                leftHand.play('type');
            }                        
        }, this).autoDestroy = true;  
    }, this);

    sounds['typingR'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[9])
            {
                instructor.play('talk');
                balloon.frame = 60;
                sounds['typeR'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'r', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
                keyboardKeysMap.get('r').play('blink');
            }            
        }, this).autoDestroy = true;
    });

    sounds['typeR'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'r' && warmUps[9])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'r', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                    instructor.play('talk');
                    balloon.frame = 61;
                    sounds['findO'].play();
                    textArea.destroy();
                    keyboardKeysMap.get('o').play('blink');
                });
            }
        });
     });

     sounds['findO'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[9])
            {
                instructor.play('talk');
                balloon.frame = 63;
                sounds['typingO'].play();
                rightHand.play('type');
            }
        });
     });

     sounds['typingO'].onStop.addOnce(function(){
        instructor.animations.stop();
        instructor.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if(warmUps[9])
            {
                instructor.play('talk');
                balloon.frame = 64;
                sounds['typeO'].play();
                keyboardKeysMap.get('o').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'o', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
        });
     });

     sounds['typeO'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'o' && warmUps[9])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'o', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){  
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsRO'].play();
    instructor.play('talk');
}

function WarmUpBRODD(assignmentNr, exerciseNr){
    warmUps[10] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(785, 100, 'horse', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(210, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 16, 9, 16, 9, 16, 9], 2, false); 
    leftHand.scale.setTo(1.1);

    rightHand = game.add.sprite(470, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 8, 0, 8, 0, 8, 0], 2, false);
    rightHand.scale.setTo(1.1);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 66);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsBRODD'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;

            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[10])
                {
                    instructor.play('talk');
                    sounds['findComma'].play();
                    balloon.frame = 67;
                    keyboardKeysMap.get('´').play('blink');
                }
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findComma'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){       
                //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
                if(warmUps[10])
                {
                    instructor.play('talk');
                    balloon.frame = 68;
                    sounds['typingComma'].play();
                    rightHand.play('type');
                }      
            }, this).autoDestroy = true;  
    }, this);

    sounds['typingComma'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[10])
            {
                instructor.play('talk');
                balloon.frame = 70;
                sounds['typingComma2'].play();
                rightHand.frame = 8;
                keyboardKeysMap.get('´').frame = 37;
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['typingComma2'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[10])
            {
                instructor.play('talk');
                balloon.frame = 71;
                sounds['typingComma3'].play();
                leftHand.frame = 16;
                keyboardKeysMap.get('e').frame = 18;
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['typingComma3'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[10])
            {
                instructor.play('talk');
                balloon.frame = 72;
                sounds['typeCommaE'].play();
                leftHand.frame = 9;
                rightHand.frame = 0;
                keyboardKeysMap.get('e').frame = 17;
                keyboardKeysMap.get('´').frame = 36;
                keyboardKeysMap.get('´').play('blink');
                keyboardKeysMap.get('e').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'é', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['typeCommaE'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, function(){
        	char = document.getElementById('assignment').value;
            $("#assignment").val(""); 
            if(char === 'é' && warmUps[10])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'é', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        },null);
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsBRODD'].play();
    instructor.play('talk');
}

function WarmUpHA(assignmentNr, exerciseNr){
    warmUps[11] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    instructor = game.add.sprite(785, 100, 'horse', 0);
    instructor.scale.setTo(0.5);
    instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);

    loadKeyboard(assignmentNr, exerciseNr);

    leftHand = game.add.sprite(200, 700, 'hands', 9);
    leftHand.animations.add('type', [9, 12, 9, 12, 9, 12, 9], 2, false); 
    leftHand.scale.setTo(1.1);

    rightHand = game.add.sprite(470, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 7, 0, 7, 0, 7, 0], 2, false);
    rightHand.scale.setTo(1.1);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 74);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsHA'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;

            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function()
            {   
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[11])
                {
                    instructor.play('talk');
                    sounds['findLShift'].play();
                    balloon.frame = 75;
                    keyboardKeysMap.get('lShift').play('blink');
                }
            }, this).autoDestroy = true;
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findLShift'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){       
                //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
                if(warmUps[11])
                {
                    instructor.play('talk');
                    balloon.frame = 6;
                    sounds['typingLShift'].play();
                    leftHand.play('type');
                }      
            }, this).autoDestroy = true;  
    }, this);

    sounds['typingLShift'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[11])
            {
                instructor.play('talk');
                balloon.frame = 13;
                sounds['findRShift'].play();
                keyboardKeysMap.get('rShift').play('blink');
            }         
        }, this).autoDestroy = true;
    });

    sounds['findRShift'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[11])
            {
                instructor.play('talk');
                balloon.frame = 20;
                sounds['typingRShift'].play();
                rightHand.play('type');
            }    
        }, this).autoDestroy = true;
    });

    sounds['typingRShift'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[11])
            {
                instructor.play('talk');
                balloon.frame = 27;
                sounds['typingOHA'].play();
                leftHand.frame = 12;
                keyboardKeysMap.get('lShift').frame = 2;

            }    
        }, this).autoDestroy = true;
    });

    sounds['typingOHA'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[11])
            {
                instructor.play('talk');
                balloon.frame = 34;
                sounds['typingOHA2'].play();
                rightHand.frame = 6;
                keyboardKeysMap.get('o').frame = 1;
            }    
        }, this).autoDestroy = true;
    });

    sounds['typingOHA2'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[11])
            {
                instructor.play('talk');
                balloon.frame = 41;
                sounds['typeOHA'].play();
                keyboardKeysMap.get('o').play('blink');
                keyboardKeysMap.get('lShift').play('blink');
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'O', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }           
        }, this).autoDestroy = true;
    });

    sounds['typeOHA'].onStop.addOnce(function(){ 
        instructor.animations.stop();
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'O' && warmUps[11])
            {
                game.input.keyboard.stop();
                textArea.destroy();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'O', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#00ff00',0);
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
     });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsHA'].play();
    instructor.play('talk');
}

//Display the window with the game and its creators information
function loadAbout()
{
    var aboutWindow = game.add.image(200, 200, 'aboutInfo');

    exitBtn = game.add.button(520, 215, 'exit');
    exitBtn.events.onInputOver.add(function(){ exitBtn.frame = 2;});
    exitBtn.events.onInputOut.add(function(){ exitBtn.frame = 0;});
    exitBtn.events.onInputDown.add(function(){ exitBtn.destroy(); aboutWindow.destroy(); });
}

//Array which stores all the warmUp functions and are called from the Instructions function with the assignmentNr variable
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

