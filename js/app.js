// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = -100;
	this.y = Math.round((Math.random() * (200 - 72) + 72) / 72) * 72;
	this.size = [50, 50];
	this.speed = Math.round((Math.random() * (600 - 200) + 200) / 50) * 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	var currentX = this.x + this.speed * dt;
	this.x = currentX;
	if (this.x > 500) {
		this.x = -100;
		this.y = Math.round((Math.random() * (200 - 72) + 72) / 72) * 72;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	this.x = 202.5;
	this.y = 395;
	this.hitbox = [50, 50];
	this.sprite = 'images/char-boy.png';
};

//Check for collisions against all enemies
Player.prototype.update = function(dt) {
	for (var i = 0; i < 3; i++) {
		if ((this.x < allEnemies[i].x + allEnemies[i].size[0]) &&
		(allEnemies[i].x < this.x + this.hitbox[0]) &&
		(this.y < allEnemies[i].y + allEnemies[i].size[1]) &&
		(allEnemies[i].y < this.y + this.hitbox[1])) {
			this.x = 202.5;
			this.y = 395;
		}
	}
};

//Draw the player sprite
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle the player keyboard input commands
Player.prototype.handleInput = function(keys) {
	switch(keys) {
		case 'left':
			if (this.x < 10) {
				break;
			} else {
				this.x = this.x - 100;
			} break;
		case 'right':
			if (this.x > 400) {
				break;
			} else {
				this.x = this.x + 100;
			} break;
		case 'up':
			if (this.y < 90) {
				this.x = 202.5;
				this.y = 395;
				break;
			} else {
				this.y = this.y - 85;
			} break;
		case 'down':
			if (this.y > 370) {
				break;
			}
			else {
				this.y = this.y + 85;
				break;
			}
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
for (var i = 0; i < 3; i++) {
	allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});