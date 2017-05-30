"use strict";

window.addEventListener("load", function() {
  var button1 = document.getElementById("button-1");

  var button1WasClicked = false;

  button1.addEventListener("click", function() {
    button1WasClicked = !button1WasClicked
    if (button1WasClicked) {
      button1.setAttribute("class", "btn btn-warning");
    } else {
      button1.setAttribute("class", "btn btn-danger");
    }
  });
});



window.onload = function() {

  initializeParameters();
  $(init);
}

function initializeParameters() {
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
    window.bestfitinitialGame = {
        cargo: cargo,
        cars: cars,
        numCars: numCars,
        totalSpace: totalSpace

    };

    window.bestfitcurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };


}

function init() {
    window.bestfitcarcanvas = new fabric.StaticCanvas('best-fit-current-train');
    window.bestfitcarcanvas.setWidth(300);
    window.bestfitcarcanvas.setHeight(150);
    window.bestfittraincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
    window.bestfitwheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.bestfitwheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.bestfitcargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

    window.bestfitcarcanvas.add(window.bestfittraincar, window.bestfitwheel1, window.bestfitwheel2, window.bestfitcargo);

    initWholeTrainGraphic();

    refresh();
}

function initWholeTrainGraphic() {
    window.bestfittraincanvas = new fabric.StaticCanvas('best-fit-train-display');
    window.bestfittraincanvas.setWidth(750);
    window.bestfittraincanvas.setHeight(90);
    fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left:0,
            top: 20,
        })
        window.bestfittraincanvas.add(obj);
    });
    window.bestfitleftOffset = 60;
    var currLeft = window.bestfitleftOffset;
    for (var j = 1; j<window.bestfitinitialGame.cars.length; j++) {
        var wheel1 = "bestfitwheel1car" + j;
        var wheel2 = "bestfitwheel2car" + j;
        var car = "bestfitcar" + j;
        var loadedCargo = "bestfitcargo" + j;
        var carWidth = window.bestfitinitialGame.cars[j]*25;
        window[wheel1] = new fabric.Circle({top: 60, left: currLeft, radius:5, fill: 'black'});
        window[wheel2] = new fabric.Circle({top: 60, left: currLeft+carWidth-10, radius:5, fill: 'black'});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'black'});
        window.bestfittraincanvas.add(window[wheel1], window[wheel2], window[car]);

        var cargoWidth = (window.bestfitinitialGame.cars[j]-window.bestfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.bestfittraincanvas.add(window[loadedCargo]);

        currLeft += carWidth + 10;

    }


}

function redrawCargo() {
    var currLeft = window.bestfitleftOffset;
    for (var j = 1; j<window.bestfitinitialGame.cars.length; j++) {
        var loadedCargo = "cargo" + j;
        var carWidth = window.bestfitinitialGame.cars[j]*25
        var cargoWidth = (window.bestfitinitialGame.cars[j]-window.bestfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.bestfittraincanvas.add(window[loadedCargo]);
        currLeft += carWidth + 10;
    }
}

function refresh() {


    var capacity = window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar];
    var maxCapacity = window.bestfitinitialGame.cars[window.bestfitcurrentState.currentCar];
    $('#best-fit-car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);

    $('#best-fit-cargo-display-header').html("Cargo loads remaining: " + window.bestfitcurrentState.cargoLeft);
    $('#best-fit-current-cargo-size').html("Current cargo:"); //" size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);

    $('#best-fit-car-display-header').html("Current Car: "
        + window.bestfitcurrentState.currentCar + " of " + window.bestfitinitialGame.numCars);

    $('#best-fit-clicks').html(window.bestfitcurrentState.clicks);
    $('#best-fit-utilization').html(window.bestfitcurrentState.utilization + " out of " + window.bestfitinitialGame.totalSpace)

    if (capacity >= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]) {
      $('#best-fit-left-button').attr("disabled", true);
      $('#best-fit-right-button').attr("disabled", true);
      $('#best-fit-message-box').html("The cargo fits! Place it here!");
    } else {
      $('#best-fit-left-button').attr("disabled", false);
      $('#best-fit-right-button').attr("disabled", false);
    }

    updateCargoBox();
    updateTrainCar();
    redrawCargo();

    //should be done with promises: just notifies users after graphics rerendered if sim done
    setTimeout(function() {
        if (stageCompleted()) {
        //TODO: clear up the display
            alert("Oh no! It seems that there isn't anywhere for you to put the last cargo on the train.\
It would have fit on the first car, but we filled that with smaller cargos. Scroll down for more explanation.");
        }
    }, 300);

}

function updateCargoBox() {
    var cargoSize = window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
    cargoSize *= 30
    $('#best-fit-current-cargo-box').css("width", cargoSize);
    console.log(cargoSize);
    $('#best-fit-current-cargo-box').html(window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]);
    
    if (window.bestfitcurrentState.cargoLeft === 3) {
    $('#best-fit-cargo2').css("display", "block");
      $('#best-fit-cargo3').css("display", "block");
    } else if (window.bestfitcurrentState.cargoLeft === 2) {
      $('#best-fit-cargo3').css("display", "none");
    } else if (window.bestfitcurrentState.cargoLeft === 1) {
      $('#best-fit-cargo2').css("display", "none");
      $('#best-fit-cargo3').css("display", "none");
    }
}

function updateTrainCar() {
    var trainSize = window.bestfitinitialGame.cars[window.bestfitcurrentState.currentCar];
    var remainingSpace = window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar];
    var filledSpace = trainSize - remainingSpace

    window.bestfittraincar.set({width: trainSize*25});
    window.bestfittraincar.centerH();

    var cargoPosition = window.bestfittraincar.left;
    window.bestfitcargo.set({width: filledSpace*25, left: cargoPosition});

    var wheel1Position = window.bestfittraincar.left;
    var wheel2Position = window.bestfittraincar.left + window.bestfittraincar.width - 2*window.bestfitwheel2.radius;
    window.bestfitwheel1.set({left: wheel1Position});
    window.bestfitwheel2.set({left: wheel2Position});
    window.bestfitcarcanvas.renderAll();

    if (window.bestfitcurrentState.currentCar === window.bestfitinitialGame.numCars) {
      $('#best-fit-right-button').addClass("disabled");
    } else if (window.bestfitcurrentState.currentCar === 1){
      $('#best-fit-left-button').addClass("disabled");
    } else {
      $('#best-fit-left-button').removeClass("disabled");
      $('#best-fit-right-button').removeClass("disabled");
    }

}

function stageCompleted() {
    if (window.bestfitcurrentState.clicks === 5) {return true;}

}

function leftClicked() {
    $('#best-fit-message-box').html("");

    if (window.bestfitcurrentState.currentCar > 1) {
        window.bestfitcurrentState.currentCar -= 1;
        //window.bestfitcurrentState.clicks += 1; // NOT penalizing going backwards
        refresh();
    } else {
        $('#best-fit-message-box').html("You're already at the first car!");
    }

}

function rightClicked() {
    $('#best-fit-message-box').html("");

    if (window.bestfitcurrentState.currentCar < window.bestfitinitialGame.numCars) {
        window.bestfitcurrentState.currentCar += 1;
        window.bestfitcurrentState.clicks += 1;
        refresh();
    } else {
        $('#best-fit-message-box').html("You're already at the last car!");
    }
}

function loadClicked() {
    if (window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex] <= window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar]) {
        //load the cargo
        window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar] -= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
        window.bestfitcurrentState.utilization += window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
        window.bestfitcurrentState.currentCargoIndex += 1
        window.bestfitcurrentState.cargoLeft -= 1
        window.bestfitcurrentState.currentCar = 1;
        window.bestfitcurrentState.clicks += 1;
        $('#best-fit-message-box').html("Cargo successfully loaded!")
        refresh();
    } else {
        $('#best-fit-message-box').html("That cargo doesn't fit in this car.")
    }
}

function resetSimulation() {
  window.bestfitcarcanvas.clear();
  $('#best-fit-message-box').html("");
  initializeParameters();
  init();
}
