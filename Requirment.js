/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class point {
  //this constructor is used to construct the point class
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in case of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width; //// w is the width
    this.height = height; //// h is the height
  }

  // ***************
  // METHODS
  // ***************

  area() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }

   getPerimeter() {
     return 2 * this.w + 2 * this.h;
   }

  updateMyHeight(height) {
   
    if (height && height > 0) {
      if (this.height === this.width){
        this.width= height
      }
      this.height = height;
    }
    //TODO: handle case of updating the height of square(Done)
  }

  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in cas of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  fetchHeight() {
    return this.height;
  }

  //function that print the endpoints
  endPoints() {
    const topRight = this.startingPoint.coordX + this.width; 
    const bottomLeft = this.startingPoint.coordY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.width;
  }
}

function buildObject(Width, x, Height, y) {
  const mainPoint = new point(x, y);
  const rect = new Rectangle(mainPoint, Width, Height);
  return rect;
}

function constructSquare(cordX, CordY, SquareHeight) {
  let square;
  if (!SquareHeight || SquareHeight <= 0) {
    throw Error("invalid Height");
  }
  square = buildObject(SquareHeight, cordX, SquareHeight, CordY);
  const squareArea = square.area();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", squareArea);
  console.log("square Perimeter ", squarePerimeter);
  return square;
}

const myRect = buildObject(2, 3, 5, 4);
const square = constructSquare(2,3,5);

console.log(square.calculatePerimeter());
square.endPoints();

myRect.updateMyHeight(3);
