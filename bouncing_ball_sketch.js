let ball;
let wall;

function setup() {
	createCanvas(500,500);
	ball = new Array();
	wall = new Array();
	no_balls = 10;
	
	wall[0] = new Boundary(0,0,0,height); // left wall
	wall[1] = new Boundary(0,0,width,0); // top wall
	wall[2] = new Boundary(width,0,width,height); // right wall
	wall[3] = new Boundary(0,height,width,height); // bottom wall
	//wall[4] = new Boundary(random(width), random(height), random(width), random(height)); // random wall
	wall[4] = new Boundary(60, 0, width-60, height); // test wall
	
	for( let i = 0; i < no_balls; i++) {
		ball[i] = new Ball(random(40, width-40), random(40, height-40), angle = random(2*PI), speed = random(1,5), radius = random(5,40));
		for( let j = 4; j < wall.length; j++) {
			console.log(j);
			while(ball[i].calcDistToLine(wall[j]) < ball[i].radius) {
				ball[i] = new Ball(random(40, width-40), random(40, height-40), angle = random(2*PI), speed = random(1,5), radius = random(5,40));
			}
		}
	}
}

function draw() {
	background('darkblue');
	for(let i = 0; i < wall.length; i++){
		wall[i].show();
	}
	for(let i = 0; i < no_balls; i++) {	
		ball[i].update(wall, ball);
	}
}