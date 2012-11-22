/**
 * RunHanler for a generated LSystem
 * @require lsystem.LSystem.js
 * @author Kalyan Chakravarthy
 */
if ( typeof lSystem == 'undefined' || typeof lSystem.LSystem == 'undefined' )
	throw "ERROR: lSystem.LSystem.js library is required";

/**
 * Object clonner. All the other ones out there are dumb.
 */
lSystem.util = {
	oClone : function(obj) {
		Clonner = function() {};
		Clonner.prototype = obj;
		var nObj = new Clonner();
		for( eachVar in nObj ) {
			if( typeof nObj[eachVar] == 'object' )
				nObj[eachVar] = lSystem.util.oClone(obj[eachVar]);
		}
		return nObj;
	}
}

/**
 * LSystem handler.
 * Essentially its a queue of functions. Functions are registered per state variable
 * Each state variable currently supports only one function handler
 *
 * @why? Because it makes it easier to write lsystem demos
 *
 * @args [Object] -> initializes the handler namespace
 */
lSystem.LRunHandler = function() {
	this.tokenHandles = {};
	this.currState = {};
	this.stateFuncs = {};
	this.stateVars = {};
	if( typeof arguments[0] == 'object' )
		this.stateVars = lSystem.util.oClone(arguments[0]);
}

lSystem.LRunHandler.prototype = {
	on : function( stateVar, handler ) {
		if( typeof handler == 'function' )
			this.stateFuncs[stateVar] = handler;
	},
	exec : function(stateVar) {
		oldState = lSystem.util.oClone(this.stateVars);
		currStateFunc = this.stateFuncs[stateVar];
		/**
		 * Applying in this.stateVars context will let the programmer use
		 * this.a, this.x, etc in the handler instead of this.stateVars.x, etc.
		 * 
		 * 3 optional parameters are also passed, like the state before the function execution,
		 * current state and a reference to the current handler
		 */
		if( typeof currStateFunc == 'function' )
			currStateFunc.apply( this.stateVars, [ this.stateVars, oldState, this ] );
	},
}

/**
 * var hFrac = new lSystem.LRunHandler()
 * hFrac.on( 'A', { 'x' : '+25', run : drawFoo } )
 * hFrac.on( '+', { 'a' : '+25' } )
 * hFrac.on( '+', function() { this.a+=25 } );
 * hFrac.on( '[', function() { this.state.push( cloneObj(this.state) ) } )
 * hFrac.on( ']', function() { this.state = stateArr.pop() } );
 * hFrac.on( '-', { 'a' : '-25' } )
 * hFrac.run( LSystem.ExampleFactory.newPlantInstance(), 10 )
 */

