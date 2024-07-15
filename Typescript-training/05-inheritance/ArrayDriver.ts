import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

let myShape = new Shape(10, 15);
let myCircle = new Circle(5, 10 , 20);

let myRectangle = new Rectangle(0, 0, 3, 7);
 
let theShapes: Shape[] = [];
theShapes.push(myCircle);
theShapes.push(myRectangle);
theShapes.push(myShape);

for (let tempShape of theShapes) {
    console.log(tempShape.getInfo());
}