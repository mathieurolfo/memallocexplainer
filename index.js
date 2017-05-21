window.onload = function() {

	var cargo = [2, 3, 4];
	var cars = [2, 4, 3];
	var cargoLeft = cargo.length;
	var currentCargo = cargo[0];
	var numCars = cars.length;
	var currentCar = 1;
	window.initialGame = {
		cargo: cargo,
		cars: cars,
		numCars: numCars,
		
	};

	

	var remainingCapacity = [2, 4, 3];

	window.currentState = {
		cargoLeft: cargoLeft,
		currentCar: currentCar,
		remainingCapacity: remainingCapacity,
		currentCargo: currentCargo
	};


	$(init);
}

function init() {
	$('#cargo-display-header').html("Cargo left to load: " + window.currentState.cargoLeft);
	$('#cargo-current-size').html("Current cargo size: " + window.currentState.currentCargo);
	$('#car-display-header').html("Current Car: " 
		+ window.currentState.currentCar + " of " + window.initialGame.numCars);

	refresh();
}

function refresh() {
	var capacity = window.currentState.remainingCapacity[window.currentState.currentCar];
	var maxCapacity = window.initialGame.cars[window.currentState.currentCar];
	$('#car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);
}

function leftClicked() {
	console.log("left clicked");
	window.numClicks += 1;
	document.getElementById("counter").innerHTML = window.numClicks;
}

function rightClicked() {
	console.log("right clicked");
}

function loadClicked() {
	console.log("load clicked");
}




