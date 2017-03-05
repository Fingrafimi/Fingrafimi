// Create instance of the game
var width = 900;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update}, true);

// Create a variable for bitMapData to display text, used in functions Assignment and KeyPress
var textArea;
// Define the size of the area
var textAreaX = 900;
var textAreaY = 65;

// Variables for the assignments text
var text = "carlos carlos";
var textX = 450;
var textY = 50;
var cursor = "|";
var correctInput = "";

// Load the resources needed
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

// Load the home page
function loadHomePage() 
{
	var homePage = game.add.image(game.world.centerX, game.world.centerY, 'homePage');
	homePage.anchor.setTo(0.5, 0.5);
	// Add offset of 4px to remove black frame
    homePage.width = width + 4;
    homePage.height = height + 4;

    var btnFj = game.add.button(45, 35, 'fj');
    btnFj.events.onInputDown.add(Assignment);

}

function Assignment() 
{
	// Empty the canvas
   	game.world.removeAll();

   	// Load new background
    background = game.add.image(game.world.centerX, game.world.centerY, 'homeKeysBackground');
    background.anchor.setTo(0.5, 0.5);

    // Create the textArea
    textArea = game.make.bitmapData(game.world.width, textAreaY);
    
    // Add style to the textArea
    textArea.context.font = '64px Arial';

    // Set the color for cursor
    textArea.context.fillStyle = '#000000';

    // Calculate position to center text
    textX = (textAreaX - textArea.context.measureText(text).width)/2;
    
    // Display the cursor
    textArea.context.fillText(cursor, textX, textY);

    // Set color for the assignment text
    textArea.context.fillStyle = '#ffffff';

    // Display the text
    textArea.context.fillText(text, textX + textArea.context.measureText(cursor).width-5, textY);
    textArea.addToWorld();

    // When key is pressed the function keyPress is called
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

}

function keyPress(char) 
{
	if(text == "")
	{
		alert("TIL HAMINGJU ÞÚ ERT BÚINN !");
		return;
	}

    if(char == text.charAt(0))
    {
        correctInput = correctInput + text.charAt(0);
        text = text.substr(1);
    }

    // Clear the textArea
    textArea.cls();

    // Define variables for length of the text area content
    var correctLength = textArea.context.measureText(correctInput).width;
    var cursorLength = textArea.context.measureText(cursor).width;
    
    // Display correct text
    textArea.context.fillText(correctInput, textX, textY);

    // Set the style for cursor and display it
    textArea.context.fillStyle = '#000000';
    textArea.context.fillText(cursor, textX + correctLength, textY);

    // Set the style for the assignment text and display it
    textArea.context.fillStyle = '#ffffff';
    textArea.context.fillText(text, textX + cursorLength + correctLength, textY);


}