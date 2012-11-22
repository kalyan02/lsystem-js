/*!
 * L-System Rules processor v0.2
 * http://flareup.org/~cmdr2/l-systems/
 *
 * By: @cmdr2, @kalyan02
 * Date: 1:49 AM 12/13/2010 +0530
 */

/*
 * Read up about L-Systems at http://en.wikipedia.org/wiki/L_Systems
 *
 * Known limitations:
 * - The LHS in the rules can have only one alphabet symbol
 *
 * To Do:
 *  - Unit tests
 */

if (typeof lSystem == "undefined")
	lSystem = function() {};

/**
 * Declares an LSystem object, encapsulating the initialState and rules.
 * @arg initialState contains the string with the initial tokens, e.g.: AB
 * @arg rules an array containing objects that define the rules with lhs 
 * 	and rhs, e.g: {A : "AB", B : "A"}
 */
lSystem.LSystem = function(initialState, rules) {
	this.initialState = initialState;
	this.currentState = initialState;
	this.rules = rules;
};

/**
 * Parse the LSystem for the given number of generations
 * @arg generationCount the number of generations to run the simulation for, e.g.: 6
 * @return returns the value of the LSystem string after the given no. of generations
 */
lSystem.LSystem.prototype.generate = function(generationCount) {
	// Generate regex
	var currentString = this.currentState;
	regStr = [];
	for( eachVar in this.rules )
		regStr.push( eachVar );
	regExp = new RegExp( regStr.join('|'), 'g' );
	self = this;
	// Apply rules for given generation count untill the end of civilization
	for( i=0; i<generationCount; i++ ) {
		currentString = currentString.replace( regExp, function(stateVar) {
			return self.rules[stateVar];
		});
	}

	this.currentState = currentString;
	return currentString;
}
/**
 * To not to break the current demo
 */
lSystem.LSystem.prototype.parse = function(generationCount) {
	return this.generate(generationCount);
}
/**
 * Run. Run. Run.
 * the entire length,
 * apply the handles 
 * For all the states
 * to decide curve's fate
 */
lSystem.LSystem.prototype.run = function( handle ) {
	for( i=0; i<this.currentState.length; i++ ) {
		if( typeof handle == 'object' && typeof handle.exec == 'function' ) {
			//console.log( this.currentState[i] );
			handle.exec.apply( handle, [ this.currentState[i] ] );
		}
		else
		if( typeof handle == 'function' )
			handle.apply( handle, [ this.currentState[i], i ] );
	}
}
