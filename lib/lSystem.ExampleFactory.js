/*!
 * L-System Rules processor v0.1
 * http://flareup.org/~cmdr2/l-systems/
 *
 * By: cmdr2
 * Date: 1:49 AM 12/13/2010 +0530
 */

if (typeof lSystem == "undefined")
	lSystem = function() {};

/**
 * The factory class that can generate a <code>lsystem.LSystem</code> instance for
 * each example
 */
lSystem.ExampleFactory = function() {};

/**
 * Algae: http://en.wikipedia.org/wiki/L_Systems#Example_1:_Algae
 */
lSystem.ExampleFactory.newAlgaeInstance = function() {
	return new lSystem.LSystem("A", {A: "AB", B: "A"});
}

/**
 * Fibonacci: http://en.wikipedia.org/wiki/L_Systems#Example_2:_Fibonacci_numbers
 */
lSystem.ExampleFactory.newFibonacciInstance = function() {
	return new lSystem.LSystem("A", {A: "B", B: "AB"});
}

/**
 * Koch Curve: http://en.wikipedia.org/wiki/L_Systems#Example_4:_Koch_curve
 */
lSystem.ExampleFactory.newKochCurveInstance = function() {
	return new lSystem.LSystem("F", {F: "F+F-F-F+F"});
}

/**
 * Sierpinski: http://en.wikipedia.org/wiki/L_Systems#Example_6:_Sierpinski_triangle
 */
lSystem.ExampleFactory.newSierpinskiInstance = function() {
	return new lSystem.LSystem("A", {A: "B-A-B", B: "A+B+A"});
}

/**
 * Dragon curve: http://en.wikipedia.org/wiki/L_Systems#Example_7:_Dragon_curve
 */
lSystem.ExampleFactory.newDragonCurveInstance = function() {
	return new lSystem.LSystem("FX", {X: "X+YF", Y: "FX-Y"});
}

/**
 * Fractal Plant: http://en.wikipedia.org/wiki/L_Systems#Example_8:_Fractal_plant
 */
lSystem.ExampleFactory.newPlantInstance = function() {
	return new lSystem.LSystem("X", {X: "F-[[X]+X]+F[+FX]-X", F: "FF"});
}