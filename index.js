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
	window.canvas = new fabric.StaticCanvas('current-train');
	window.rect = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
	window.wheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
	window.wheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
	window.cargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

	window.canvas.add(window.rect, window.wheel1, window.wheel2, window.cargo);
	refresh();
}

function refresh() {
	if (stageCompleted()) {
		//TODO: clear up the display
		alert("You've finished this exercise! Continue scrolling to learn more.");
	}

	var capacity = window.currentState.remainingCapacity[window.currentState.currentCar];
	var maxCapacity = window.initialGame.cars[window.currentState.currentCar];
	$('#car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);
	
	$('#cargo-display-header').html("Cargo loads remaining: " + window.currentState.cargoLeft);
	$('#cargo-current-size').html("Current cargo:"); //" size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);
	
	$('#car-display-header').html("Current Car: " 
		+ window.currentState.currentCar + " of " + window.initialGame.numCars);

	updateCargoBox();
	updateTrainCar();
}

function updateCargoBox() {
	var cargoSize = window.initialGame.cargo[window.currentState.currentCargoIndex]
	cargoSize *= 30
	$('#cargo-box').css("width", cargoSize);
	console.log(cargoSize);
	$('#cargo-box').html(window.initialGame.cargo[window.currentState.currentCargoIndex]);

}

function updateTrainCar() {
	var trainSize = window.initialGame.cars[window.currentState.currentCar];
	var remainingSpace = window.currentState.remainingCapacity[window.currentState.currentCar];
	var filledSpace = trainSize - remainingSpace
	console.log(trainSize, remainingSpace, filledSpace)


	window.rect.set({width: trainSize*25});
	window.rect.centerH();

	var cargoPosition = window.rect.left;
	window.cargo.set({width: filledSpace*25, left: cargoPosition});

	var wheel1Position = window.rect.left;
	var wheel2Position = window.rect.left + window.rect.width - 2*window.wheel2.radius;
	window.wheel1.set({left: wheel1Position});
	window.wheel2.set({left: wheel2Position});
	canvas.renderAll();
	

}

function stageCompleted() {
	if (window.currentState.cargoLeft == 0) return true;

}

function leftClicked() {
	$('#message-box').html("");
	
	if (window.currentState.currentCar > 1) {
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




