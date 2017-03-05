// create instance of the game
var width = 900;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// load the resources needed
function preload () 
{
	// Background images
	game.load.image('homePage', 'Assets/homePage.bmp');
	game.load.image('homeKeysBackground','Assets/homeKeysBackground.png');

	// Assignments buttons
	game.load.image('fj', 'Assets/fj.png');

}

function create () 
{
	loadHomePage();
}

function update()
{

}

// load the home page
function loadHomePage() 
{
	var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
	homePage.anchor.setTo(0.5, 0.5);
	// add offset of 4px to remove black frame
    homePage.width = width + 4;
    homePage.height = height + 4;

    var btnFj = game.add.button(45, 35, 'fj');
    btnFj.events.onInputDown.add(Assignment);

}

function Assignment() 
{
	// remove the background from the homepage
   	game.world.removeAll();

    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

}