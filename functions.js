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
var style = { font: '44px Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 900, backgroundColor: "rgba(0,0,0,0.4)", boundsAlignH: "center", boundsAlignV: "middle"};
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
var clouds;
var fish1;
var fish2;


function initTextVariables()
{
    text = "";
    corrCount = 0;
    incorrPos = -1;
    textPos = 0;

}

function initWarmUps()
{
    for(i = 0; i < 12; i++)
    {
        warmUps[i] = false;
    }

}

function Assignment(assignmentNr, exerciseNr) 
{
    initWarmUps();

    // Empty the canvas
    initGame();
    //intro.destroy();
  
    game.input.keyboard.start();
    $("#assignment").val("");    

   	// Load new background
    loadBackground(assignmentNr);
    
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);

    var instructor = addAssignmentInstructor(assignmentNr);

    // Load keyboard
    loadKeyboard(assignmentNr, exerciseNr);

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
    else
    {
        var balloon = game.add.sprite(475, 5, 'balloonSprite', addBalloon(assignmentNr));
        balloon.scale.setTo(0.9);
        addFinalSound(assignmentNr);
        instructor.play('talk');
    }
    
    addExitButton();
    addMuteButton();

    addExercises(assignmentNr);
    if(exerciseNr >= 0)
    {
        exerciseBtnGlowArray[assignmentNr][exerciseNr].alpha = 0.8;
    }
}

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
          //  finishSound.onStop.addOnce( function(){finishSound.stop();loadHomePage();}, this);
            finishSound.play();
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
    // Add hover affect
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
    logo.events.onInputDown.add(function(){quitExercise(); loadHomePage();});

    assignmentBtn = game.add.button(25, 100, 'btnSprite');
    assignmentBtn.frame = assignmentNr;

    assignmentBtn.events.onInputDown.add(function(){
            initWarmUps();
            quitExercise(); 
            Assignment(assignmentNr, exerciseNr);
            balloon.visible = false;
    });

    logo = game.add.image(30, 660, 'logo');
    logo.scale.setTo(0.45);
}

function addSkipButton(assignmentNr, exerciseNr, nextFunction)
{
    var arrowBtn = game.add.button(870, 630, 'arrow');
    arrowBtn.frame = 0;
    arrowBtn.events.onInputOver.add(function(){ arrowBtn.frame = 1; }, this);
    arrowBtn.events.onInputOut.add(function(){ arrowBtn.frame = 0; }, this);
    arrowBtn.events.onInputDown.add(function(){nextFunction(assignmentNr, exerciseNr); }, this);
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
            sounds['finalFJ'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            break;
        case 1:
            sounds['finalDK'].play();
            sounds['finalDK'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            break;
        case 2:
            sounds['finalSL'].play();
            sounds['finalSL'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            break;
        case 3:
            sounds['finalAAE'].play();
            sounds['finalAAE'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            break;
        case 4:
            sounds['finalAll1'].play();
            sounds['finalAll1'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0; }, this);
            break;
        case 5:
            sounds['finalAll2'].play();
            sounds['finalAll2'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            break;
        case 6:
            sounds['finalEH'].play();
            sounds['finalEH'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            break;
        case 7:
            sounds['finalIG'].play();
            sounds['finalIG'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            break;
        case 8:
            sounds['finalBN'].play();
            sounds['finalBN'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
            break;
        case 9:
            sounds['finalRO'].play();
            sounds['finalRO'].onStop.addOnce(function(){ instructor.animations.stop(); instructor.frame = 0;}, this);
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
    initTextVariables();
}

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

function loadBackground(assignmentNr)
{ 
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    }
    else if(assignmentNr === 4 || assignmentNr === 5)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'farm');
        clouds = game.add.image(-1000, 10,'clouds');
    }
    else if(assignmentNr === 6 || assignmentNr === 7)
    {
        background = game.add.image(game.world.centerX, game.world.centerY, 'ocean');
        fish1 = game.add.sprite(800, 35, 'fishes', 2);
        fish2 = game.add.sprite(25, 175, 'fishes', 1);
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

function addExerciseImages(image, imageGlow, posArr, count, assignmentNr, exerciseNr)
{
    textPosArr = exerciseTextPosArray[assignmentNr];
    for(var i = 0; i < count; i++)
    {
        // Add the background image for glow
        exerciseBtnGlowArray[assignmentNr][exerciseNr+i] = game.add.image(posArr[i+exerciseNr][0]-10, posArr[i+exerciseNr][1]-10, imageGlow);
        // make the background image hidden.
        exerciseBtnGlowArray[assignmentNr][exerciseNr+i].alpha = 0;

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
            exerciseBtnArray[assignmentNr][exerciseNr+i].events.onInputDown.add(function(){ quitExercise(); Assignment(assignmentNr, exerciseNum); });
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
    initGame();

    loadBackground(assignmentNr);
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
        background = game.add.image(0, 0, 'instructionBg');
    }

    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    addExitButton();
    addMuteButton();
    
   if(assignmentNr < 12)
   {
       addSkipButton(assignmentNr, exerciseNr,  warmUpFunctions[assignmentNr]);
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

function addAssignmentInstructor(assignmentNr)
{
    if(assignmentNr === 0 || assignmentNr === 1 || assignmentNr === 2 || assignmentNr === 3)
    {
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
         instructor = game.add.sprite(810, 125, 'whale', 0);
         instructor.scale.setTo(0.5);
         instructor.animations.add('talk', [0, 1, 0, 1, 1, 0], 4, true);
         return instructor;
    }
    else if(assignmentNr === 8 || assignmentNr === 9)
    {
        instructor = game.add.sprite(785, 100, 'fish', 0);
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

function InstructionFJ(assignmentNr, exerciseNr)
{
    initGame();

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
    initGame();

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

    leftHand = game.add.sprite(175, 700, 'lHand', 2);
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

//Set name
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

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['rightFJ'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            warmupHead.animations.stop(); 
            warmupHead.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[3])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
                balloon.frame = 17;
                sounds['findAAE'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findAAE'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
            if(warmUps[3])
            {
                warmupHead.play('talk');
                warmupKeys.play('aBlink');
                balloon.frame = 18;
                sounds['findA'].play();
                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'a', instructionStyle);
                textArea.anchor.set(0.5);
                textArea.addColor('#000000',0);
            }
            
                            
        }, this).autoDestroy = true;
    });

    sounds['findA'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'a')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
                    warmupKeys.play('aeBlink');
                    balloon.frame = 19;
                    sounds['findAE'].play();
                    textArea.destroy();
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'æ', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                });
            }
        });
     });

     sounds['findAE'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){
            if(char === 'æ')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
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

//Set name
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

//Set name
function WarmUpEH(assignmentNr, exerciseNr){
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
    //leftHand.scale.setTo(1.1);  

    rightHand = game.add.sprite(475, 700, 'hands', 0);
    rightHand.animations.add('type', [0, 1, 0, 1, 0, 1, 0], 2, false);
    //rightHand.scale.setTo(1.1);

    balloon = game.add.sprite(475, 5, 'balloonSprite', 29);
    balloon.scale.setTo(0.9);

    addMuteButton();
    addExitButton();

    //Each animation section of WarmUpFJ is divided into sections where one doesn't start until the previous one is complete
    //fogj1 is the soundclip where he says "Finndu stafina A, S, D og F"
    sounds['handsEH'].onStop.addOnce(function(){

            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            
            //Pause for 2 seconds after fogj1 soundclip, then play fogj2
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
               
                //When fogj2 soundclip starts, make Maggi talk, put the correct text in speech bubble, make J, K, L and Æ blink 
                //and add the right hand into the game so it can start moving up towards the keys.
                if(warmUps[6])
                {
                    instructor.play('talk');
                    sounds['findE'].play();
                    keyboardKeysMap.get('e').play('blink');
                    balloon.frame = 30;
                }   
            }, this).autoDestroy = true;  
    }, this);

    //fogj2 is the soundclip where he says "Finndu stafina J, K, L og Æ"
     sounds['findE'].onStop.addOnce(function(){
            //Make Maggi stop moving his mouth in the 2 second pause between animations 
            instructor.animations.stop(); 
            instructor.frame = 0;
            //Pause for 2 seconds, then play the soundclip "Finndu stafina F og J" and make both F and J blink
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){            
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

    
    sounds['typingE'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            if(warmUps[6])
                {
                    instructor.play('talk');
                    balloon.frame = 32;
                    sounds['typeE'].play();
                    keyboardKeysMap.get('e').play('blink');
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'e', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                }
        });
    });

    sounds['typeE'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'e')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    sounds['findH'].play();
                    instructor.play('talk');
                    balloon.frame = 33;
                    keyboardKeysMap.get('h').play('blink');
                    textArea.destroy();
                });
            }
        });
    });

    sounds['findH'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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

    sounds['typingH'].onStop.addOnce(function(){ 
        warmupHead.animations.stop();
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            if(warmUps[6])
                {
                    instructor.play('talk');
                    balloon.frame = 36;
                    sounds['typeH'].play();
                    keyboardKeysMap.get('h').play('blink');
                    textArea = game.add.text(game.world.centerX, game.world.centerY - 150, 'h', instructionStyle);
                    textArea.anchor.set(0.5);
                    textArea.addColor('#000000',0);
                }
        });
    });

    sounds['typeH'].onStop.addOnce(function(){
        instructor.animations.stop(); 
        instructor.frame = 0;
        game.input.keyboard.start();
        game.input.keyboard.addCallbacks(this, null, null, function(char){    
            if(char === 'h')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    Assignment(assignmentNr, exerciseNr);
                });
            }
        });
    });     

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsEH'].play();
    instructor.play('talk');
}

//Set name
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
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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

//      sounds['gjIG'].onStop.addOnce(function(){ 
//         instructor.animations.stop();
//         instructor.frame = 0;
//         game.input.keyboard.start();
//         game.input.keyboard.addCallbacks(this, null, null, function(char){
//             if(char === 'k')
//             {
//                 game.input.keyboard.stop();
//                 game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
//                     sounds['finalDK'].play();
//                     balloon.frame = 11;
//                     Assignment(assignmentNr, exerciseNr);
//                 });
//             }
//         });
//      });

    //Play soundclip fogj1, make Maggi talk and make A, S, D and F blink.
    sounds['handsIG'].play();
    instructor.play('talk');
}

//Set name
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
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){  
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

//Set name
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

    balloon = game.add.sprite(475, 5, 'balloonSprite', 57);
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
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
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

//Set name
function WarmUpBRODD(assignmentNr, exerciseNr){
//    warmUps[1] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
//    warmupKeys.animations.add('dBlink', [0, , 0, , 0, , 0], 2, false, true);
//    warmupKeys.animations.add('kBlink', [0, , 0, , 0, , 0], 2, false, true);
//    warmupKeys.animations.add('bothBlink', [0, , 0, , 0, , 0, , 0, , 0], 2, false, true);

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
//                if(warmUps[1])
                {
                    warmupHead.play('talk');
                    sounds['rightFJ'].play();
                    warmupKeys.play('jklæBlink');
                    //balloon.frame = 1;
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
//            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
//                balloon.frame = 8;
//                sounds['findDK'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findDK'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
//            if(warmUps[1])
            {
                warmupHead.play('talk');
//                warmupKeys.play('dBlink');
//                balloon.frame = 9;
//                sounds['findD'].play();
//                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'd', instructionStyle);
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
 //           if(char === 'd')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
//                    warmupKeys.play('kBlink');
//                    balloon.frame = 10;
//                    sounds['findK'].play();
                    textArea.destroy();
//                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'k', instructionStyle);
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
//            if(char === 'k')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
//                    sounds['finalDK'].play();
//                    balloon.frame = 11;
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

//Set name
function WarmUpHA(assignmentNr, exerciseNr){
//    warmUps[1] = true;
    initGame();

    loadBackground(assignmentNr);
    addSkipButton(assignmentNr, exerciseNr,  Assignment);
    addLogoAndAssignmentID(assignmentNr, exerciseNr);

    warmupKeys = game.add.sprite(150, 380, 'warmupKeys', 0);
    warmupKeys.animations.add('asdfBlink', [0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0], 2, false, true);
    warmupKeys.animations.add('jklæBlink', [0, 16, 0, 16, 0, 16, 0, 16, 0, 16, 0], 2, false, true);
//    warmupKeys.animations.add('dBlink', [0, , 0, , 0, , 0], 2, false, true);
//    warmupKeys.animations.add('kBlink', [0, , 0, , 0, , 0], 2, false, true);
//    warmupKeys.animations.add('bothBlink', [0, , 0, , 0, , 0, , 0, , 0], 2, false, true);

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
//                if(warmUps[1])
                {
                    warmupHead.play('talk');
                    sounds['rightFJ'].play();
                    warmupKeys.play('jklæBlink');
                    //balloon.frame = 1;
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
//            if(warmUps[1])
            {
                warmupHead.play('talk');
                warmupKeys.play('bothBlink');
//                balloon.frame = 8;
//                sounds['findDK'].play();
            }
            
                            
            }, this).autoDestroy = true;  
    }, this);

    sounds['findDK'].onStop.addOnce(function(){
        warmupHead.animations.stop(); 
        warmupHead.frame = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                          
            //Make Maggi talk, blink both F and J, set correct text in speech bubble and play soundclip
//            if(warmUps[1])
            {
                warmupHead.play('talk');
//                warmupKeys.play('dBlink');
//                balloon.frame = 9;
//                sounds['findD'].play();
//                textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'd', instructionStyle);
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
 //           if(char === 'd')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    warmupHead.play('talk');
//                    warmupKeys.play('kBlink');
//                    balloon.frame = 10;
//                    sounds['findK'].play();
                    textArea.destroy();
//                    textArea = game.add.text(game.world.centerX, game.world.centerY - 50, 'k', instructionStyle);
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
//            if(char === 'k')
            {
                game.input.keyboard.stop();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    
//                    sounds['finalDK'].play();
//                    balloon.frame = 11;
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
