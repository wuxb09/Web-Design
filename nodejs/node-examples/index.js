var rect = require('./rectangle');
var tmp = require('./test_require.js'); //test if require has cache effect

function callback(err, rectangle) {
    if (err) {
        console.log("ERROR: ", err.message);
    }
    else {
        console.log("Testing callback scope " + xxx + "!!!!!!!!"); //scope error!
        console.log("The area of the rectangle of dimensions l = "
            + l + " and b = " + b + " is " + rectangle.area());
        console.log("The perimeter of the rectangle of dimensions l = "
            + l + " and b = " + b + " is " + rectangle.perimeter());
    }
}

function solveRect(l,b) {
    console.log("Solving for rectangle with l = "
                + l + " and b = " + b);
    var xxx = "hello";
    //js callback look more likes a jump point. 
    //When the subroutine reaches the callback, it simply jumps back to this point with new parameter and continue executing
    //once over, and back to the subroutine and continue there
    rect.calc(l,b, (err,rectangle) => {
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            console.log("Testing callback scope " + xxx + "!!!!!!!!");//scope success!
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    //rect.calc(l,b, callback);
    console.log("This statement after the call to rect() " + rect.message);
};

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);