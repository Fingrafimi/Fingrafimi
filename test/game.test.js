QUnit.test("Test size of canvas", function( assert ) {
    var canvasWidth = game.width;
    var canvasHeight = game.height;
    assert.equal(canvasWidth, 1000, "Canvas should be 1000px wide");
    assert.notEqual(canvasWidth, 1200, "Canvas should not be 1200px wide");
    assert.equal(canvasHeight, 700, "Canvas should be 700px high");
    assert.notEqual(canvasHeight, 800, "Canvas should not be 800px high");
});

QUnit.test("Test initWarmUps() function", function( assert ) {
    var mockArray = warmUps;
    for(i = 0; i < 12; i++)
    {
        warmUps[i] = true;
    }
    assert.deepEqual(mockArray, warmUps, "warmUps array is not equal to mockArray");
    initWarmUps();
    for(i = 0; i < 12; i++)
    {
        assert.ok(warmUps[i] === false, "warmUps[i] value is now set to false");
    }
});

QUnit.test("Test initTextVariables() function", function( assert ) {
    text = "Bla";
    corrCount = 1;
    incorrPos = 1;
    textPos = 1;

    assert.notEqual(text, "",       "text is not what InitTextVariables() sets it to");
    assert.notEqual(corrCount, 0,   "text is not what InitTextVariables() sets it to");
    assert.notEqual(incorrPos, -1,  "text is not what InitTextVariables() sets it to");
    assert.notEqual(textPos, 0,     "text is not what InitTextVariables() sets it to");

    initTextVariables();

    assert.equal(text, "",          "text is now what InitTextVariables() sets it to");
    assert.equal(corrCount, 0,      "text is now what InitTextVariables() sets it to");
    assert.equal(incorrPos, -1,     "text is now what InitTextVariables() sets it to");
    assert.equal(textPos, 0,        "text is now what InitTextVariables() sets it to");
});

 QUnit.test("Test finishedAssignment() function", function( assert ) {
    for(i = 0; i < exercisesFinished.length; i++)
    {
        for(j = 0; j < i.length; j++)
        {
            exercisesFinished[i][j] = false;
        }
    }

    assert.equal(finishedAssignment(1), false, "Assignment is not finished");

    exercisesFinished[1][0] = true;

    assert.equal(exercisesFinished[1][0], true, "exercisesFinished[1][2] is now set to true");

    assert.equal(finishedAssignment(1), false, "Assignment is not finished");

    exercisesFinished[1][1] = true;
    exercisesFinished[1][2] = true;
    exercisesFinished[1][3] = true;
    exercisesFinished[1][4] = true;
    exercisesFinished[1][5] = true;

    assert.equal(finishedAssignment(1), true, "Assignment is now finished");
 });

 QUnit.test("Test findNextExercise() function", function( assert ) {
    for(i = 0; i < exercisesFinished.length; i++)
    {
        for(j = 0; j < i.length; j++)
        {
            exercisesFinished[i][j] = false;
        }
    }
    
    exercisesFinished[0][3] = false;
    exercisesFinished[1][2] = false;
    exercisesFinished[1][3] = false;
    exercisesFinished[3][5] = false;

    assert.equal(exercisesFinished[0][3], false, "Variable set to false");
    assert.equal(exercisesFinished[1][2], false, "Variable set to false");
    assert.equal(exercisesFinished[1][3], false, "Variable set to false");
    assert.equal(exercisesFinished[3][5], false, "Variable set to false");

    exercisesFinished[0][3] = true;
    exercisesFinished[1][2] = true;
    exercisesFinished[1][3] = true;
    exercisesFinished[3][5] = true;
    
    assert.equal(exercisesFinished[0][3], true, "Variable set to true");
    assert.equal(exercisesFinished[1][2], true, "Variable set to true");
    assert.equal(exercisesFinished[1][3], true, "Variable set to true");
    assert.equal(exercisesFinished[3][5], true, "Variable set to true");

    assert.equal(findNextExercise(0, 3), 4, "Next exercise is not 3 since that one is already finished");
    assert.equal(findNextExercise(1, 2), 4, "Next exercise is not 3 since that one is already finished");
    assert.equal(findNextExercise(3, 5), 6, "Next exercise is not 3 since that one is already finished");
 });

 QUnit.test("Test addBalloon() function", function( assert ) {
    assert.equal(addBalloon(0), 3, "addBalloon returns correct index");
    assert.equal(addBalloon(1), 11, "addBalloon returns correct index");
    assert.equal(addBalloon(2), 16, "addBalloon returns correct index");
    assert.equal(addBalloon(3), 16, "addBalloon returns correct index");
    assert.equal(addBalloon(4), 24, "addBalloon returns correct index");
    assert.equal(addBalloon(5), 28, "addBalloon returns correct index");
    assert.equal(addBalloon(6), 37, "addBalloon returns correct index");
    assert.equal(addBalloon(7), 46, "addBalloon returns correct index");
    assert.equal(addBalloon(8), 56, "addBalloon returns correct index");
    assert.equal(addBalloon(9), 56, "addBalloon returns correct index");
    assert.equal(addBalloon(10), 73, "addBalloon returns correct index");
    assert.equal(addBalloon(11), 48, "addBalloon returns correct index");
 });


// QUnit.test("", function( assert ) {
    
// });

// QUnit.test("", function( assert ) {
    
// });

// QUnit.test("", function( assert ) {
    
// });

// QUnit.test("", function( assert ) {
    
// });

// QUnit.test("", function( assert ) {
    
// });
// /*var jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const {jsdom2} = new JSDOM("<!DOCTYPE html>");
// //JSDOM.fromFile("../index.html");
// //const {window}= new JSDOM("<!DOCTYPE html><html><head><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script></head><body></body></html>");
// //var window = document.defaultView;
// //window = document.createWindow();

// //var window = jsdom.defaultView;
// //var jquery = require('jquery');


// global.window = window;
// global.navigator = window.navigator;

// global.document = window.document;
// global.Element = window.element;

// //global.$ = jQuery(window.defaultView);



// var Canvas = require('canvas');
// global.Image = Canvas.Image;
// PIXI = require('./pixi.js');
// p2 = require('./p2.js');
// Phaser = require('../phaser.min.js');
// exercises = require('../exercises.js');

// game = require('../game.js');
// console.log("bla");
// console.log(game);
// console.log(exercises);


// //exec('../game.js');

// QUnit.test("Initialize Text variables1", function( assert ) {
//    /*game.text = "someText";
//     game.corrCount = 1;
//     game.inCorrPos = 1;
//     Game.textPos = 1;*/
//     var text ="hello";
//     assert.equal(game.addBalloon(0), 3);
//   });

// QUnit.test("Initialize Text variables", function( assert ) {
//     game.text = "someText";
//     game.corrCount = 1;
//     game.inCorrPos = 1;
//     Game.textPos = 1;
//     //game.initTextVariables();
//     assert.equal(text, "");
//     assert.equal(corrCount, 0);
//     assert.equal(incorrPos, -1);
//     assert.equal(textPos, 0);
//   });