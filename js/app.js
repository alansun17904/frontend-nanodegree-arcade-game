// Enemies our player must avoid
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

class Enemy {
    constructor(difficulty, player) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        let possibleStartingLanes = [60, 140, 225];
        this.sprite = 'images/enemy-bug.png';
        this.x = -100;
        this.y = possibleStartingLanes.randomElement();
        this.player = player;
        // 60
        // 140
        // 225
        this.speed = (Math.floor(Math.random() * 10) + 1) * difficulty;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -100;
            // Once it goes off-screen it also has the possiblity of switching lanes.
            this.y = [60, 140, 225].randomElement();
        }
        let collisonMinX,
            collisonMaxX,
            collisonMinY,
            collisonMaxY;

        [collisonMinX, collisonMaxX] = this.player.collisonRangeX;
        [collisonMinY, collisonMaxY] = this.player.collisonRangeY;
        if (this.x <= collisonMaxX && this.x >= collisonMinX) {
            if (this.y <= collisonMaxY && this.y >= collisonMinY) {
                console.log('Collison detected!');
                this.player.x = 300;
                this.player.y = 300;
            }
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x = 200;
        this.y = 300;
        this.collisonRangeX = [];
        this.collisonRangeY = [];
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {
        // collison detection
        this.collisonRangeX = [this.x - 60, this.x + 60];
        this.collisonRangeY = [this.y - 50, this.y + 30];

        if (this.x > 505) {
            this.x = -40;
        }
        if (this.y < -10) {
            this.y = 300;
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (input) {
        if (input === 'left') {
            if (this.x - 5 < -20) {
                return;
            } else {
                this.x -= 5
            };

        } else if (input === 'right') {
            if (this.x + 5 > 420) {
                return;
            } else {
                this.x += 5;
            };

        } else if (input === 'up') {
            if (this.y - 5 < -15) {
                return;
            } else {
                this.y -= 5;
            };

        } else if (input === 'down') {
            console.log(this.y)
            if (this.y + 5 > 400) {
                return;
            } else {
                this.y += 5;
            };
        };
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];
for (let total = 0; total < 5; total++) {
    let newEnemy = new Enemy(20, player);
    allEnemies.push(newEnemy);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

