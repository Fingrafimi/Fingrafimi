// create instance of the game
var width = 900;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// load the resources needed
function preload () 
{
	game.load.image('homePage', 'Assets/homePage.bmp');

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

}