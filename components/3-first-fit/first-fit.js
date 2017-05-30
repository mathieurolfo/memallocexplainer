"use strict";

// window.addEventListener("load", function() {
//   var button1 = document.getElementById("button-1");

//   var button1WasClicked = false;

//   button1.addEventListener("click", function() {
//     button1WasClicked = !button1WasClicked
//     if (button1WasClicked) {
//       button1.setAttribute("class", "btn btn-warning");
//     } else {
//       button1.setAttribute("class", "btn btn-danger");
//     }
//   });
// });

console.log("first fit loaded");
firstfitinitializeParameters();
$(firstfitinit);

// window.onload = function() {

// }

function firstfitinitializeParameters() {
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
    window.firstfitinitialGame = {
        cargo: cargo,
        cars: cars,
        numCars: numCars,
        totalSpace: totalSpace

    };

    window.firstfitcurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };


}

function firstfitinit() {
    window.firstfitcarcanvas = new fabric.StaticCanvas('first-fit-current-train');
    window.firstfitcarcanvas.setWidth(300);
    window.firstfitcarcanvas.setHeight(150);
    window.firstfittraincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
    window.firstfitwheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.firstfitwheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.firstfitcargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

    window.firstfitcarcanvas.add(window.firstfittraincar, window.firstfitwheel1, window.firstfitwheel2, window.firstfitcargo);

    firstfitinitWholeTrainGraphic();

    firstfitrefresh();
}

function firstfitinitWholeTrainGraphic() {
    window.firstfittraincanvas = new fabric.StaticCanvas('first-fit-train-display');
    window.firstfittraincanvas.setWidth(750);
    window.firstfittraincanvas.setHeight(90);
    fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left:0,
            top: 20,
        })
        window.firstfittraincanvas.add(obj);
    });
    window.firstfitleftOffset = 60;
    var currLeft = window.firstfitleftOffset;
    for (var j = 1; j<window.firstfitinitialGame.cars.length; j++) {
        var wheel1 = "firstfitwheel1car" + j;
        var wheel2 = "firstfitwheel2car" + j;
        var car = "firstfitcar" + j;
        var loadedCargo = "firstfitcargo" + j;
        var carWidth = window.firstfitinitialGame.cars[j]*25;
        window[wheel1] = new fabric.Circle({top: 60, left: currLeft, radius:5, fill: 'black'});
        window[wheel2] = new fabric.Circle({top: 60, left: currLeft+carWidth-10, radius:5, fill: 'black'});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'black'});
        window.firstfittraincanvas.add(window[wheel1], window[wheel2], window[car]);

        var cargoWidth = (window.firstfitinitialGame.cars[j]-window.firstfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.firstfittraincanvas.add(window[loadedCargo]);

        currLeft += carWidth + 10;

    }


}

function firstfitredrawCargo() {
    var currLeft = window.firstfitleftOffset;
    for (var j = 1; j<window.firstfitinitialGame.cars.length; j++) {
        var loadedCargo = "cargo" + j;
        var carWidth = window.firstfitinitialGame.cars[j]*25
        var cargoWidth = (window.firstfitinitialGame.cars[j]-window.firstfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.firstfittraincanvas.add(window[loadedCargo]);
        currLeft += carWidth + 10;
    }
}

function firstfitrefresh() {


    var capacity = window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar];
    var maxCapacity = window.firstfitinitialGame.cars[window.firstfitcurrentState.currentCar];
    $('#first-fit-car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);

    $('#first-fit-cargo-display-header').html("Cargo loads remaining: " + window.firstfitcurrentState.cargoLeft);
    $('#first-fit-current-cargo-size').html("Current cargo:"); //" size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);

    $('#first-fit-car-display-header').html("Current Car: "
        + window.firstfitcurrentState.currentCar + " of " + window.firstfitinitialGame.numCars);

    $('#first-fit-clicks').html(window.firstfitcurrentState.clicks);
    $('#first-fit-utilization').html(window.firstfitcurrentState.utilization + " out of " + window.firstfitinitialGame.totalSpace)

    if (capacity >= window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]) {
    	$('#first-fit-left-button').attr("disabled", true);
    	$('#first-fit-right-button').attr("disabled", true);
    	$('#first-fit-message-box').html("The cargo fits! Place it here!");
    } else {
    	$('#first-fit-left-button').attr("disabled", false);
    	$('#first-fit-right-button').attr("disabled", false);
    }

    firstfitupdateCargoBox();
    firstfitupdateTrainCar();
    firstfitredrawCargo();

    //should be done with promises: just notifies users after graphics rerendered if sim done
    setTimeout(function() {
        if (firstfitstageCompleted()) {
        //TODO: clear up the display
            alert("Oh no! It seems that there isn't anywhere for you to put the last cargo on the train.\
It would have fit on the first car, but we filled that with smaller cargos. Scroll down for more explanation.");
        }
    }, 300);

}

function firstfitupdateCargoBox() {
    var cargoSize = window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
    cargoSize *= 30
    $('#first-fit-current-cargo-box').css("width", cargoSize);
    console.log(cargoSize);
    $('#first-fit-current-cargo-box').html(window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]);
    
    if (window.firstfitcurrentState.cargoLeft === 3) {
		$('#first-fit-cargo2').css("display", "block");
    	$('#first-fit-cargo3').css("display", "block");
    } else if (window.firstfitcurrentState.cargoLeft === 2) {
    	$('#first-fit-cargo3').css("display", "none");
    } else if (window.firstfitcurrentState.cargoLeft === 1) {
    	$('#first-fit-cargo2').css("display", "none");
    	$('#first-fit-cargo3').css("display", "none");
    }
}

function firstfitupdateTrainCar() {
    var trainSize = window.firstfitinitialGame.cars[window.firstfitcurrentState.currentCar];
    var remainingSpace = window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar];
    var filledSpace = trainSize - remainingSpace

    window.firstfittraincar.set({width: trainSize*25});
    window.firstfittraincar.centerH();

    var cargoPosition = window.firstfittraincar.left;
    window.firstfitcargo.set({width: filledSpace*25, left: cargoPosition});

    var wheel1Position = window.firstfittraincar.left;
    var wheel2Position = window.firstfittraincar.left + window.firstfittraincar.width - 2*window.firstfitwheel2.radius;
    window.firstfitwheel1.set({left: wheel1Position});
    window.firstfitwheel2.set({left: wheel2Position});
    window.firstfitcarcanvas.renderAll();

    if (window.firstfitcurrentState.currentCar === window.firstfitinitialGame.numCars) {
    	$('#first-fit-right-button').addClass("disabled");
    } else if (window.firstfitcurrentState.currentCar === 1){
    	$('#first-fit-left-button').addClass("disabled");
    } else {
    	$('#first-fit-left-button').removeClass("disabled");
    	$('#first-fit-right-button').removeClass("disabled");
    }

}

function firstfitstageCompleted() {
    if (window.firstfitcurrentState.clicks === 5) {return true;}

}

function firstfitleftClicked() {
    $('#first-fit-message-box').html("");

    if (window.firstfitcurrentState.currentCar > 1) {
        window.firstfitcurrentState.currentCar -= 1;
        //window.firstfitcurrentState.clicks += 1; // NOT penalizing going backwards
        firstfitrefresh();
    } else {
        $('#first-fit-message-box').html("You're already at the first car!");
    }

}

function firstfitrightClicked() {
    $('#first-fit-message-box').html("");

    if (window.firstfitcurrentState.currentCar < window.firstfitinitialGame.numCars) {
        window.firstfitcurrentState.currentCar += 1;
        window.firstfitcurrentState.clicks += 1;
        firstfitrefresh();
    } else {
        $('#first-fit-message-box').html("You're already at the last car!");
    }
}

function firstfitloadClicked() {
    if (window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex] <= window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar]) {
        //load the cargo
        window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar] -= window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
        window.firstfitcurrentState.utilization += window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
        window.firstfitcurrentState.currentCargoIndex += 1
        window.firstfitcurrentState.cargoLeft -= 1
        window.firstfitcurrentState.currentCar = 1;
        window.firstfitcurrentState.clicks += 1;
        $('#first-fit-message-box').html("Cargo successfully loaded!")
        firstfitrefresh();
    } else {
        $('#first-fit-message-box').html("That cargo doesn't fit in this car.")
    }
}

function firstfitresetSimulation() {
	window.firstfitcarcanvas.clear();
	$('#first-fit-message-box').html("");
	firstfitinitializeParameters();
	firstfitinit();
}
