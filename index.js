window.onload = function() {

	var cargo = [null, 2, 3, 7, 4, "none!"];
	var cars = [null, 2, 4, 3, 12];
	var remainingCapacity = cars.slice(0); //copy the unloaded car array
	var cargoLeft = cargo.length - 2; //adjust for 1 indexing and end message
	var currentCargoIndex = 1;
	var numCars = cars.length - 1;
	var currentCar = 1;
	window.initialGame = {
		cargo: cargo,
		cars: cars,
		numCars: numCars,
		
	};

	

	

	window.currentState = {
		cargoLeft: cargoLeft,
		currentCar: currentCar,
		remainingCapacity: remainingCapacity,
		currentCargoIndex: currentCargoIndex
	};


	$(init);
}

function init() {
	
	refresh();
}

function refresh() {
	var capacity = window.currentState.remainingCapacity[window.currentState.currentCar];
	var maxCapacity = window.initialGame.cars[window.currentState.currentCar];
	$('#car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);
	
	$('#cargo-display-header').html("Cargo left to load: " + window.currentState.cargoLeft);
	$('#cargo-current-size').html("Current cargo size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);
	
	$('#car-display-header').html("Current Car: " 
		+ window.currentState.currentCar + " of " + window.initialGame.numCars);

}

function leftClicked() {
	$('#message-box').html("");
	
	if (window.currentState.currentCar > 1) {
		console.log("moving back")
		window.currentState.currentCar -= 1;
		refresh();
	} else {
		$('#message-box').html("You're already at the first car!");
	}

	
}

function rightClicked() {
	$('#message-box').html("");

	if (window.currentState.currentCar < window.initialGame.numCars) {
		window.currentState.currentCar += 1;
		window.numClicks += 1;
		document.getElementById("counter").innerHTML = window.numClicks;
		refresh();
	} else {
		$('#message-box').html("You're already at the last car!");
	}
}

function loadClicked() {
	console.log("load clicked");
	if (window.initialGame.cargo[window.currentState.currentCargoIndex] <= window.currentState.remainingCapacity[window.currentState.currentCar]) {
		//load the cargo
		window.currentState.remainingCapacity[window.currentState.currentCar] -= window.initialGame.cargo[window.currentState.currentCargoIndex]
		window.currentState.currentCargoIndex += 1
		window.currentState.cargoLeft -= 1
		$('#message-box').html("Cargo successfully loaded!")
		refresh();
	} else {
		$('#message-box').html("That cargo doesn't fit in this car.")
	}
}




