LsystemParser = function() {};

LsystemParser.parseInput = function() {
	var inputInitial = $("#initialString").val();
	var inputRules = $("#rules").val();
	var inputGenerations = $("#generations").val();
	
	if (inputRules == "" || inputInitial == "" || inputGenerations == "") {
		alert("Invalid input");
		return;
	}
	
	var rules = JSON.parse(inputRules);
	var lsystemObj = new lSystem.LSystem(inputInitial, rules);
	var outputString = lsystemObj.parse(parseInt(inputGenerations));
	$("#result").val(outputString);
};

LsystemParser.newHandler = function(lsystem) {
	return function() {
		$("#initialString").val(lsystem.initialState);
		$("#rules").val(JSON.stringify(lsystem.rules));
		$("#generations").val(3); // default generations
		return false;
	};
};

LsystemParser.configureExamples = function() {
	var factory = lSystem.ExampleFactory;

	$("#algae").click(LsystemParser.newHandler(factory.newAlgaeInstance()));
	$("#fib").click(LsystemParser.newHandler(factory.newFibonacciInstance()));
	$("#koch").click(LsystemParser.newHandler(factory.newKochCurveInstance()));
	$("#sierpinski").click(LsystemParser.newHandler(factory.newSierpinskiInstance()));
	$("#dragon").click(LsystemParser.newHandler(factory.newDragonCurveInstance()));
	$("#plant").click(LsystemParser.newHandler(factory.newPlantInstance()));
};

$(document).ready(function() {
	LsystemParser.configureExamples();
	$("#parse").click(LsystemParser.parseInput);
});