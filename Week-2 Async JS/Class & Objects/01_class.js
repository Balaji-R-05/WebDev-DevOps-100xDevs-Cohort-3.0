class Rectangle {
    constructor (width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area() {
        const area = this.width * this.height;
        return area;
    }

    perimeter() {
        const perimeter = 2 * (this.width + this.height);
        return perimeter;
    }

    paint() {
        console.log(`Painting this rectange in ${this.color} color`);
    }
}

const rect = new Rectangle(10, 5, "red");
const area = rect.area()
const perimeter = rect.perimeter()
console.log(area)
console.log(perimeter);
rect.paint()