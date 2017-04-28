function walker(x, y, array) {
    this.x = x;
    this.y = y;
    this.hue = 0;
    this.array = array;
    this.multiply = function(current) {
        if(random(0, 1000) < .05){
            this.array.push(new walker(this.x, this.y, this.array));
            this.array[this.array.length - 1].hue = this.hue + 30;
            console.log('Multiply: '+current);
        }
        if(random(0, 1000) < .05){
            var selection = Math.floor(random(0, this.array.length));
            this.array.splice(selection, 1);
            console.log('Die: '+selection);
        }
    }
    this.draw = function(current) {
        this.hue += .05;
        if(this.hue > 360){
            this.hue %= 360;
        } else if(this.hue < 0){
            this.hue += 360;
        }
        stroke(this.hue, 100, 50, 1);
        point(this.x, this.y);
        this.multiply(current);
    }
    this.move = function() {
        var direction = Math.floor(random(4));
        switch(direction) {
            case 0:
                this.x += 1;
                break;
            case 1:
                this.x -= 1;
                break;
            case 2:
                this.y += 1;
                break;
            case 3:
                this.y -= 1;
                break;
            default:
                break;
        }
        if(this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight){

        }
    }
}

var walkers = [];
var speed = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#000');
    colorMode(HSL);
}

function draw() {
    if(frameCount % 10 == 0){
        background(0,0,0,.1);
    }
    for(var i = 0; i < walkers.length; i++){
        for(var j = 0; j < speed; j++){
            if(walkers[i] !== undefined){
                walkers[i].move();
                walkers[i].draw(i);
            }
        }
    }
}

function mousePressed() {
    walkers.push(new walker(mouseX, mouseY, walkers));
}