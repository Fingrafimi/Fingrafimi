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

//  QUnit.test("Test ", function( assert ) {

//  });

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