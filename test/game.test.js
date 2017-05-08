QUnit.test("First Test with Phaser", function( assert ) {
    
    assert.equal( value, "1", "Value should be one");
});

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