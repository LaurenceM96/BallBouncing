class Boundary { 
	constructor(x1, y1, x2, y2) {
		this.a = createVector(x1,y1);
		this.b = createVector(x2,y2);
		
		//tricking to get the right angle
		let temp;
		temp = x1;
		x1 = x2;
		x2 = temp;
		
		push();
		translate(this.a);
		if(((x2-x1)/(y2-y1))>0) {
			this.angle = atan(abs((x2-x1)/(y2-y1)));
		} else {
			this.angle = atan((x2-x1)/(y2-y1));
		}
		if(this.angle < 0) { this.angle += PI}
		pop();
	}
	
	show() {
		stroke(255);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}
}