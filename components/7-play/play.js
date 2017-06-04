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


console.log("seg free loaded");
initializeParametersSeg();
$(init);

window.onload = function() {
  
}

var car1 = {size: 4, index: 1, used: false};

$("#data tr").click(function() {
    var selected = $(this).hasClass("highlight");
    $("#data tr").removeClass("highlight");
    if(!selected)
        $(this).addClass("highlight");
});

function initializeParametersSeg() {
  	var cargo = [null, 8, 2, 4, 10, 7, 6, 15, "none!"];
  	// var carMap = {4: [(4, 1), (2, 7), (4, 9), (4, 6)], 8: [(6, 10), (8, 2), (8, 8)], 12: [(10, 4), (12, 5)], 16: [(16, 3)]};
    var carMap = {4: [1, 6, 7, 9], 8: [2, 8, 10], 12: [4, 5], 16: [3]};
    var cars = [null, 4, 6, 16, 10, 12, 2, 4, 8, 4, 8];

    var car4 = [1, 6, 7, 9]; //[4, 2, 4, 4] 
    var car8 = [2, 8, 10]; //[6, 8, 8]
    var car12 = [4, 5]; //[10, 12]
    var car16 = [3]; //[16]
    var totalSpace = 0;
    for (var x=1; x<cars.length; x++) {
        totalSpace += cars[x];
    }
    var remainingCapacity = cars.slice(0); //copy the unloaded car array
    var cargoLeft = cargo.length - 2; //adjust for 1 indexing and end message
    var currentCargoIndex = 1;
    var numCars = cars.length - 1;
    var currentCar = 1;
    var currentBucket = 0;
    window.segfreeInitialGame = {
        cargo: cargo,
        cars: cars,
        car4: car4,
        car8: car8,
        car12: car12,
        car16: car16,
        numCars: numCars,
        totalSpace: totalSpace
    };

    window.segfreeCurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        carMap: carMap,
        currentCars: carMap[4],
        currentBucket: currentBucket,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };


}

function init() {
    window.segfreecarcanvas = new fabric.StaticCanvas('seg-free-current-train');
    window.segfreecarcanvas.setWidth(300);
    window.segfreecarcanvas.setHeight(150);
    window.segfreetraincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
    window.segfreewheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.segfreewheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.segfreecargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

    window.segfreecarcanvas.add(window.segfreetraincar, window.segfreewheel1, window.segfreewheel2, window.segfreecargo);

    initWholeTrainGraphicSeg();

    refreshSeg();
}

function initWholeTrainGraphicSeg() {
    window.segfreetraincanvas = new fabric.StaticCanvas('seg-free-train-display');
    window.segfreetraincanvas.setWidth(750);
    window.segfreetraincanvas.setHeight(150);
    fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left:0,
            top: 20,
        })
        window.segfreetraincanvas.add(obj);
    });
    window.segfreeleftOffset = 60;
    var currLeft = window.segfreeleftOffset;
    for (var j = 1; j<window.segfreeInitialGame.cars.length; j++) {
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = window.segfreeInitialGame.cars[j]*25;
        window[wheel1] = new fabric.Circle({top: 60, left: currLeft, radius:5, fill: 'black'});
        window[wheel2] = new fabric.Circle({top: 60, left: currLeft+carWidth-10, radius:5, fill: 'black'});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'black'});
        window.segfreetraincanvas.add(window[wheel1], window[wheel2], window[car]);

        var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.segfreetraincanvas.add(window[loadedCargo]);

        currLeft += carWidth + 10;

    }


}

function redrawCargoSeg() {
    var currLeft = window.segfreeleftOffset;
    for (var j = 1; j<window.segfreeInitialGame.cars.length; j++) {
        var loadedCargo = "cargo" + j;
        var carWidth = window.segfreeInitialGame.cars[j]*25
        var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.segfreetraincanvas.add(window[loadedCargo]);
        currLeft += carWidth + 10;
    }
}

function refreshSeg() {


    var capacity = window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar];
    var maxCapacity = window.segfreeInitialGame.cars[window.segfreeCurrentState.currentCar];
    $('#seg-free-car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);

    $('#seg-free-cargo-display-header').html("Cargo loads remaining: " + window.segfreeCurrentState.cargoLeft);
    $('#seg-free-current-cargo-size').html("Current cargo:"); //" size: " + window.InitialGame.cargo[window.currentState.currentCargoIndex]);

    $('#seg-free-car-display-header').html("Current Car: Car "
        + window.segfreeCurrentState.currentCar);

    $('#seg-free-clicks').html(window.segfreeCurrentState.clicks);
    $('#seg-free-utilization').html(window.segfreeCurrentState.utilization + " out of " + window.segfreeInitialGame.totalSpace)

    // if (capacity >= window.segfreeInitialGame.cargo[window.segfreecurrentState.currentCargoIndex]) {
    //   $('#seg-free-left-button').attr("disabled", true);
    //   $('#seg-free-right-button').attr("disabled", true);
    //   $('#seg-free-message-box').html("The cargo fits! Place it here!");
    // } else {
    //   $('#seg-free-left-button').attr("disabled", false);
    //   $('#seg-free-right-button').attr("disabled", false);
    // }

    updateCargoBoxSeg();
    updateTrainCarSeg();
    redrawCargoSeg();

    //should be done with promises: just notifies users after graphics rerendered if sim done
    setTimeout(function() {
        if (stageCompletedSeg()) {
        //TODO: clear up the display
            alert("Oh no! It seems that there isn't anywhere for you to put the last cargo on the train.\
It would have fit on the first car, but we filled that with smaller cargos. Scroll down for more explanation.");
        }
    }, 300);

}

function updateCargoBoxSeg() {
    var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
    cargoSize *= 30
    $('#seg-free-current-cargo-box').css("width", cargoSize);
    console.log(cargoSize);
    $('#seg-free-current-cargo-box').html(window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]);
    
    if (window.segfreeCurrentState.cargoLeft === 3) {
    $('#seg-free-cargo2').css("display", "block");
      $('#seg-free-cargo3').css("display", "block");
    } else if (window.segfreeCurrentState.cargoLeft === 2) {
      $('#seg-free-cargo3').css("display", "none");
    } else if (window.segfreeCurrentState.cargoLeft === 1) {
      $('#seg-free-cargo2').css("display", "none");
      $('#seg-free-cargo3').css("display", "none");
    }
}

function updateTrainCarSeg() {
    var trainSize = window.segfreeInitialGame.cars[window.segfreeCurrentState.currentCar];
    var remainingSpace = window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar];
    var filledSpace = trainSize - remainingSpace

    window.segfreetraincar.set({width: trainSize*25});
    window.segfreetraincar.centerH();

    var cargoPosition = window.segfreetraincar.left;
    window.segfreecargo.set({width: filledSpace*25, left: cargoPosition});

    var wheel1Position = window.segfreetraincar.left;
    var wheel2Position = window.segfreetraincar.left + window.segfreetraincar.width - 2*window.segfreewheel2.radius;
    window.segfreewheel1.set({left: wheel1Position});
    window.segfreewheel2.set({left: wheel2Position});
    window.segfreecarcanvas.renderAll();

    if (window.segfreeCurrentState.currentCar === window.segfreeInitialGame.numCars) {
      $('#seg-free-right-button').addClass("disabled");
    } else if (window.segfreeCurrentState.currentCar === 1){
      $('#seg-free-left-button').addClass("disabled");
    } else {
      $('#seg-free-left-button').removeClass("disabled");
      $('#seg-free-right-button').removeClass("disabled");
    }

}

function stageCompletedSeg() {
    // if (window.segfreecurrentState.clicks === 5) {return true;}

}

function bucketClicked(bucketNum) {
	window.segfreeCurrentState.currentBucket = bucketNum;
	window.segfreeCurrentState.currentCars = window.segfreeCurrentState.carMap[bucketNum];
	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[0];
	refreshSeg();
}

function leftClickedSeg() {
    $('#seg-free-message-box').html("");
    var indexfound = (window.segfreeCurrentState.currentCars).indexOf(window.segfreeCurrentState.currentCar);
    if (indexfound > 0) {
    	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[indexfound-1];
    	window.segfreeCurrentState.clicks += 1;
    	refreshSeg();
    // if (window.segfreeCurrentState.currentCar > 1) {
    //     window.segfreeCurrentState.currentCar -= 1;
    //     //window.segfreecurrentState.clicks += 1; // NOT penalizing going backwards
    //     refreshSeg();
    } else {
        $('#seg-free-message-box').html("You're already at the first car!");
    }

}

function rightClickedSeg() {
    $('#seg-free-message-box').html("");
    var indexfound = (window.segfreeCurrentState.currentCars).indexOf(window.segfreeCurrentState.currentCar);
    if (indexfound < window.segfreeCurrentState.currentCars.length - 1) {
    	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[indexfound+1];
    	window.segfreeCurrentState.clicks += 1;
    	refreshSeg();
    } else {
    	$('#seg-free-message-box').html("You're already at the last car!");
    }
    // if (window.segfreeCurrentState.currentCar < window.segfreeInitialGame.numCars) {
    //     window.segfreeCurrentState.currentCar += 1;
    //     window.segfreeCurrentState.clicks += 1;
    //     refreshSeg();
    // } else {
    //     $('#seg-free-message-box').html("You're already at the last car!");
    // }
}

function loadClickedSeg() {
    if (window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex] <= window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar]) {
        //load the cargo
        window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar] -= window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
        var curBucket = window.segfreeCurrentState.carMap[window.segfreeCurrentState.currentBucket];
        carBucket.indexOf(window.segfreeCurrentState.currentCar);
        window.segfreeCurrentState.utilization += window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
        window.segfreeCurrentState.currentCargoIndex += 1
        window.segfreeCurrentState.cargoLeft -= 1
        window.segfreeCurrentState.currentCar = 1;
        window.segfreeCurrentState.clicks += 1;
        $('#seg-free-message-box').html("Cargo successfully loaded!")
        refreshSeg();
    } else {
        $('#seg-free-message-box').html("That cargo doesn't fit in this car.")
    }
}

function resetSimulationSeg() {
  window.segfreecarcanvas.clear();
  $('#seg-free-message-box').html("");
  initializeParametersSeg();
  init();
}
