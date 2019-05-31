class Ball {
	constructor(x, y, angle = 0, speed = 1, radius = 12) {
		this.pos = createVector(x, y);
		this.dir = angle; //radians
		this.speed = speed;
		this.radius = radius;
	}
	
	update(wall, ball) {
		// this.finish_pt is where the ball will end up after the update if not colliding with anything, used for calculations
		this.finish_pt = createVector(this.pos.x + this.speed * cos(this.dir), this.pos.y + this.speed * sin(this.dir));
		
		//for loop to check each other ball to see if they collides
		for(let i=0; i < ball.length; i++) {
			if(ball[i].pos != this.pos){
				if(this.checkBallCollision(ball[i])) {
					//console.log("Collision");
					
				}
			}
		}
		
		//for loop to check each wall to see if the ball collides with any
		let collision;
		for(let i=0; i < wall.length; i++){
			collision = this.checkWallCollision(wall[i]); // need to make sure it actually collides and the wall hasnt ended
			if(collision) {
				this.bounce(wall[i].angle);
			}
		}
		
		//update with new coords and draw
		this.pos.x += this.speed * cos(this.dir);
		this.pos.y += this.speed * sin(this.dir);
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
	}
	
	checkWallCollision(wall) { // checks if it hits a wall in next update, returns point of collision (with line of direction) or false
		if(this.calcDistToLine(wall) <= this.radius) {
			return this.pointOfIntersection(wall);
		} else {
			return ;
		}
	}		
	
	checkBallCollision(b2) {
		if(dist(this.pos.x, this.pos.y, b2.pos.x, b2.pos.y) <= (this.radius + b2.radius)) {
			return true;
		} else {
			return false;
		}
	}
	
	calcDistToLine(line) { // calculate distance between the ball centre and the line.
		return abs((line.b.y - line.a.y)*this.pos.x - (line.b.x - line.a.x)*this.pos.y + line.b.x*line.a.y - line.b.y*line.a.x)/
		sqrt(pow((line.b.y-line.a.y),2) + pow((line.b.x - line.a.x),2));
	}
	
	pointOfIntersection(wall) {
		//making it easier to read...
		const x1 = wall.a.x;
		const y1 = wall.a.y;
		const x2 = wall.b.x;
		const y2 = wall.b.y;
		
		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + cos(this.dir);
		const y4 = this.pos.y + sin(this.dir);
		
		//checks if the ball direction hits the wall or not
		let denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
		if (denom == 0) {
			return false;
		}
		
		let tnum = (x1-x3)*(y3-y4) - (y1-y3)*(x3-x4);
		
		let t = tnum/denom;
		
		let pt;
		pt = createVector(x1 + t*(x2-x1), y1 + t*(y2-y1));	
		return pt;
	}
	
	bounce(wallAngle) { // bounce off of a wall with given angle
		let quadrant = floor(this.dir/(PI/2)); // quadrants are off because it starts on the horizontal (whoops)
		let angle_of_incidence;
		
		if(quadrant == 0) { // case ball is travelling in first quadrant (down and right)
			if(wallAngle > (this.dir + (PI/2))){
				angle_of_incidence = PI - wallAngle + this.dir;
				this.dir = wallAngle - angle_of_incidence;
			} else {
				angle_of_incidence = this.dir-wallAngle;
				this.dir = wallAngle + (PI) - angle_of_incidence;
			}
		}
		
		if(quadrant == 1) { // case ball is travelling in second quadrant (down and left)
			this.dir -= (PI/2);
			if(this.dir < wallAngle) {
				angle_of_incidence = PI/2 - wallAngle + this.dir;
				this.dir = wallAngle - (PI) - angle_of_incidence;
			} else {
				angle_of_incidence = PI/2 - this.dir + wallAngle;
				this.dir = wallAngle + angle_of_incidence;
			}
		}
				
		if(quadrant == 2) { // case ball is travelling in third quadrant (up and left)
			this.dir -= PI
			if((wallAngle - (PI/2)) > this.dir){
				angle_of_incidence = this.dir-(wallAngle-(PI/2));
				this.dir = wallAngle - (PI) - angle_of_incidence - (PI/2);
			} else {
				angle_of_incidence = this.dir - wallAngle;
				this.dir = wallAngle - angle_of_incidence;
			}
		}
				
		if(quadrant == 3) { // case ball is travelling in fourth quadrant (up and right)
			this.dir -= ((3*PI)/2);
			if(wallAngle > this.dir) {
				angle_of_incidence = (PI/2) - (wallAngle - this.dir);
				this.dir = wallAngle + (2*PI) - angle_of_incidence;
			} else {
				angle_of_incidence = (PI/2 - this.dir) + wallAngle;
				this.dir = wallAngle - PI + angle_of_incidence;
			}
		}
				
		//checks the angle is within range of 0 and 2*PI
		if(this.dir<0){
			this.dir += (2*PI);
		}
		if(this.dir > (2*PI)){
			this.dir -= (2*PI);
		}
	}
}
