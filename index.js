window.onload = function() {

	var cargo = [null, 4, 2, 6, "none!"];
	
	
	var cars = [null, 8, 5, 2];
	var totalSpace = 0;
	for (var x=1; x<cars.length; x++) {
		totalSpace += cars[x];
	}
	var remainingCapacity = cars.slice(0); //copy the unloaded car array
	var cargoLeft = cargo.length - 2; //adjust for 1 indexing and end message
	var currentCargoIndex = 1;
	var numCars = cars.length - 1;
	var currentCar = 1;
	window.initialGame = {
		cargo: cargo,
		cars: cars,
		numCars: numCars,
		totalSpace: totalSpace
		
	};

	window.currentState = {
		cargoLeft: cargoLeft,
		currentCar: currentCar,
		remainingCapacity: remainingCapacity,
		currentCargoIndex: currentCargoIndex,
		clicks: 0,
		utilization: 0
	};


	$(init);
}

function init() {
	window.carcanvas = new fabric.StaticCanvas('current-train');
	window.traincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
	window.wheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
	window.wheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
	window.cargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

	window.carcanvas.add(window.traincar, window.wheel1, window.wheel2, window.cargo);

	initWholeTrainGraphic();

	refresh();
}

function initWholeTrainGraphic() {
	window.traincanvas = new fabric.StaticCanvas('train-display');
	window.traincanvas.setWidth(750);
	fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
		var obj = fabric.util.groupSVGElements(objects, options);
		obj.set({
			left:0,
			top: 20,

		})
		window.traincanvas.add(obj);
	});
	window.leftOffset = 60;
	var currLeft = window.leftOffset;
	for (var j = 1; j<window.initialGame.cars.length; j++) {
		console.log(j);
		var wheel1 = "wheel1car" + j;
		var wheel2 = "wheel2car" + j;
		var car = "car" + j;
		var loadedCargo = "cargo" + j;
		var carWidth = window.initialGame.cars[j]*25;
		window[wheel1] = new fabric.Circle({top: 60, left: currLeft, radius:5, fill: 'black'});
		window[wheel2] = new fabric.Circle({top: 60, left: currLeft+carWidth-10, radius:5, fill: 'black'});
		window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'black'});
		window.traincanvas.add(window[wheel1], window[wheel2], window[car]);
		
		var cargoWidth = (window.initialGame.cars[j]-window.currentState.remainingCapacity[j])*25;
		window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
		window.traincanvas.add(window[loadedCargo]);

		currLeft += carWidth + 10;

	}

	


}

function redrawCargo() {
	var currLeft = window.leftOffset;
	for (var j = 1; j<window.initialGame.cars.length; j++) {
		var loadedCargo = "cargo" + j;
		var carWidth = window.initialGame.cars[j]*25
		var cargoWidth = (window.initialGame.cars[j]-window.currentState.remainingCapacity[j])*25;
		window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
		window.traincanvas.add(window[loadedCargo]);
		currLeft += carWidth + 10;
	}
}

function refresh() {
	

	var capacity = window.currentState.remainingCapacity[window.currentState.currentCar];
	var maxCapacity = window.initialGame.cars[window.currentState.currentCar];
	$('#car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);
	
	$('#cargo-display-header').html("Cargo loads remaining: " + window.currentState.cargoLeft);
	$('#cargo-current-size').html("Current cargo:"); //" size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);
	
	$('#car-display-header').html("Current Car: " 
		+ window.currentState.currentCar + " of " + window.initialGame.numCars);

	$('#clicks').html(window.currentState.clicks);
	$('#utilization').html(window.currentState.utilization + " out of " + window.initialGame.totalSpace)

	updateCargoBox();
	updateTrainCar();
	redrawCargo();

	//should be done with promises: just notifies users after graphics rerendered if sim done
	setTimeout(function() {
		if (stageCompleted()) {
		//TODO: clear up the display
			alert("You've finished this exercise! Continue scrolling to learn more.");
		}
	}, 300);
	
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

	window.traincar.set({width: trainSize*25});
	window.traincar.centerH();

	var cargoPosition = window.traincar.left;
	window.cargo.set({width: filledSpace*25, left: cargoPosition});

	var wheel1Position = window.traincar.left;
	var wheel2Position = window.traincar.left + window.traincar.width - 2*window.wheel2.radius;
	window.wheel1.set({left: wheel1Position});
	window.wheel2.set({left: wheel2Position});
	window.carcanvas.renderAll();
	

}

function stageCompleted() {
	if (window.currentState.cargoLeft == 0) return true;

}

function leftClicked() {
	$('#message-box').html("");
	
	if (window.currentState.currentCar > 1) {
		window.currentState.currentCar -= 1;
		window.currentState.clicks += 1;
		refresh();
	} else {
		$('#message-box').html("You're already at the first car!");
	}

	
}

function rightClicked() {
	$('#message-box').html("");

	if (window.currentState.currentCar < window.initialGame.numCars) {
		window.currentState.currentCar += 1;
		window.currentState.clicks += 1;
		refresh();
	} else {
		$('#message-box').html("You're already at the last car!");
	}
}

function loadClicked() {
	if (window.initialGame.cargo[window.currentState.currentCargoIndex] <= window.currentState.remainingCapacity[window.currentState.currentCar]) {
		//load the cargo
		window.currentState.remainingCapacity[window.currentState.currentCar] -= window.initialGame.cargo[window.currentState.currentCargoIndex]
		window.currentState.utilization += window.initialGame.cargo[window.currentState.currentCargoIndex]
		window.currentState.currentCargoIndex += 1
		window.currentState.cargoLeft -= 1

		$('#message-box').html("Cargo successfully loaded!")
		refresh();
	} else {
		$('#message-box').html("That cargo doesn't fit in this car.")
	}
}




