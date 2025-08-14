// Assignment #1 - Create a Circle class

class Circle {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }

    area() {
        const area = this.radius * this.radius * Math.PI;
        return area;
    }

    circumference() {
        const circumference = 2 * this.radius * Math.PI;
        return circumference;
    }

    paint() {
        console.log(`Painting with color ${this.color}`);
    }

}

const circle = new Circle(10, "red")
const area = circle.area();
console.log(`The area of circle of radius ${circle.radius} is ${area}`);
console.log(`The circumference of the circle is ${circle.circumference()}`);