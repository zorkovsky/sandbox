let hw="Ahoj trpajzliku.";

//console.log(hw);

/*
const myFunction = (w,x,y,z) => {console.log(w+x+y+z)};
const myFunction2 = (...args) => { for (arg in args) {console.log(args[arg])}; }

let arguments = [1,2,3,6,5];

myFunction2(2,5,...arguments,4,4);
*/

//const myfunc = x => x*x;
//myfunc = x => x/x;
//console.log(myfunc(4));
/*
const obj = {x:2,y:3};
const obj2 = {z:4,w:5};
const merge = (...objects) => ({...objects});

console.log(merge(obj,...obj2));*/

class Rectangle {

    constructor(height,width) {
        this.height = (height === undefined ? 0 : height);
        this.width = (width === undefined ? 0: width);
    }
    get area() {return this.calcArea();}
    calcArea() {return this.width*this.height;}
}

let r = new Rectangle;
let r2 = new Rectangle(10,10);

//console.log(r.calcArea());

class Point {
constructor(x,y) {
this.x = x;
this.y = y;
}

static distance(a,b)
{
    dx = b.x - a.x;
    dy = b.y - a.y;
    return Math.sqrt(dx*dx + dy*dy);
}
}

A = new Point(1,1);
B = new Point(4,5);

console.log(Point.distance(p1,p2));

console.log

