"use strict";




firstfitinitializeParameters();
$(firstfitinit);


function firstfitinitializeParameters() {
	var cargo = [null, 4, 2, 6, "none!"];
    var cars = [null, 1, 8, 5, 2];
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
    
    firstfitinitTrainCarGraphic();
    firstfitinitWholeTrainGraphic();

    firstfitrefresh();
}

function firstfitinitTrainCarGraphic() {
    window.firstfitcarcanvas = new fabric.StaticCanvas('first-fit-current-train');
    window.firstfitcarcanvas.setWidth(300);
    window.firstfitcarcanvas.setHeight(150);

    // fabric.loadSVGFromURL('http://rol.fo/files/train2.svg', function(objects, options) {
    //     var obj = fabric.util.groupSVGElements(objects, options);
    //     // obj.set({
    //     //     left:0,
    //     //     top: 20,
    //     // })
    //     window.firstfitcarcanvas.add(obj);
    // });

    window.firstfittraincar = new fabric.Rect({top: 100, left: 80, width: 10, height: 10, fill: 'gray',stroke: 'black', strokeWidth: 2});
    window.firstfitwheel1 = new fabric.Circle({top: 105, left: 80, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2})
    window.firstfitwheel2 = new fabric.Circle({top: 105, left: 80, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2})
    window.firstfitcargo = new fabric.Rect({top:75, left: 130, width: 0, height: 25, fill: 'white'});

    window.firstfitcarcanvas.add(window.firstfittraincar, window.firstfitwheel1, window.firstfitwheel2, window.firstfitcargo);

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
        window[wheel1] = new fabric.Circle({
            top: 55, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        window.firstfittraincanvas.add(window[car],window[wheel1], window[wheel2]);
        
        // console.log(j);
        // fabric.loadSVGFromURL('http://rol.fo/files/train2.svg', function(objects, options) {
        //     var obj = fabric.util.groupSVGElements(objects, options);
        //     obj.set({
        //         left:currLeft,
        //         top: 20,
        //     })
        //     obj.setWidth(700);
        //     console.log("adding object")
        //     window.firstfittraincanvas.add(obj);
        //     currLeft += 10;
        // }); 


        var cargoWidth = (window.firstfitinitialGame.cars[j]-window.firstfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'white'});
        window.firstfittraincanvas.add(window[loadedCargo]);
        
        currLeft += carWidth + 10;

    }


}

function firstfitupdateWholeTrainCargo() {
    var currLeft = window.firstfitleftOffset;
    for (var j = 1; j<window.firstfitinitialGame.cars.length; j++) {
        var loadedCargo = "cargo" + j;
        var carWidth = window.firstfitinitialGame.cars[j]*25
        var cargoWidth = (window.firstfitinitialGame.cars[j]-window.firstfitcurrentState.remainingCapacity[j])*25;
        
        if (cargoWidth > 0) {
             window[loadedCargo] = new fabric.Rect({
                top: 25, left: currLeft, width: cargoWidth, height: 25, fill: 'white',
                stroke: 'black', strokeWidth: 2
            });

        } else {
            window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 30, fill: 'white'});
        }
        
        

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


    

    
    firstfitupdateTrainCar();
    firstfitupdateCargoBox();
    firstfitupdateWholeTrainCargo();
    firstfitupdateButtonStates(capacity, maxCapacity);

    //should be done with promises: just notifies users after graphics rerendered if sim done
    setTimeout(function() {
        if (firstfitstageCompleted()) {
        //TODO: clear up the display
            alert("Oh no! It seems that there isn't anywhere for you to put the last cargo on the train.\
It would have fit on the first car, but we filled that with smaller cargos. Scroll down for more explanation.");
        $('#first-fit-game-container').css("opacity", "0.25");
       
        $('#first-fit-end-text').css("visibility", "visible");
        }

    }, 300);

}

function firstfitupdateTrainCar() {
    var trainSize = window.firstfitinitialGame.cars[window.firstfitcurrentState.currentCar];
    var remainingSpace = window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar];
    var filledSpace = trainSize - remainingSpace

    window.firstfittraincar.set({width: trainSize*25});
    // window.firstfittraincar.centerH();

    var cargoPosition = window.firstfittraincar.left;
    if (filledSpace>0) {
        window.firstfitcargo.set({width: filledSpace*25, left: cargoPosition, stroke: 'black', strokeWidth: 2});
    } else {
        window.firstfitcargo.set({width: filledSpace*25, left: cargoPosition, strokeWidth: 0});
    }
    

    var wheel1Position = window.firstfittraincar.left +3;
    var wheel2Position = window.firstfittraincar.left -3 + window.firstfittraincar.width - 2*window.firstfitwheel2.radius;
    window.firstfitwheel1.set({left: wheel1Position});
    window.firstfitwheel2.set({left: wheel2Position});
    window.firstfitcarcanvas.renderAll();

}

function firstfitupdateCargoBox() {
    var cargoSize = window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
    cargoSize *= 25
    $('#first-fit-current-cargo-box').css("width", cargoSize);
   
    $('#first-fit-current-cargo-box').html(window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]);
    
    $('#first-fit-current-cargo-box').css("bottom", "0px");

    // var right = window.firstfitwheel2.left + window.firstfittraincar.left;//cargoSize - 70
    // // right += "px"
    // console.log("cargo", window.firstfitcargo.left)
    // console.log("car", window.firstfittraincar.left)
    // console.log("wheel", window.firstfitwheel2.left)
    // console.log($('#first-fit-current-cargo-box').css("left"));
    var car = "firstfitcar" + (window.firstfitcurrentState.currentCar);
    console.log("current car - ", window[car].left);
    var fixedOffset = 20;
    var cargoWidth = (window.firstfitinitialGame.cars[window.firstfitcurrentState.currentCar]-window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar])*25;
        

    var resetPosition = fixedOffset + window[car].left + cargoWidth +  "px"
    $('#first-fit-current-cargo-box').css("left", resetPosition);

    $('#first-fit-current-cargo-box').css("top", "0px");
    // console.log(window.firstfitwheel2, right)
}

function firstfitupdateButtonStates(capacity, maxCapacity) {
    

    if (capacity >= window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]) {
        $('#first-fit-no-button').attr("disabled", true);
        $('#first-fit-yes-button').attr("disabled", false);

        $('#first-fit-no-button').removeClass("button-action");
        $('#first-fit-yes-button').addClass("button-action");
    } else {
        $('#first-fit-no-button').addClass("button-action");
        $('#first-fit-yes-button').removeClass("button-action");
        $('#first-fit-no-button').attr("disabled", false);
        $('#first-fit-yes-button').attr("disabled", true);
    }


    if (window.firstfitcurrentState.currentCar === window.firstfitinitialGame.numCars) {
        $('#first-fit-yes-button').addClass("disabled");
    } else {
        $('#first-fit-right-button').removeClass("disabled");
    }
}

function firstfitstageCompleted() {
    if (window.firstfitcurrentState.clicks === 8) {return true;}
    return false;
}

// function firstfitleftClicked() {
//     $('#first-fit-message-box').html("");

//     if (window.firstfitcurrentState.currentCar > 1) {
//         window.firstfitcurrentState.currentCar -= 1;
//         //window.firstfitcurrentState.clicks += 1; // NOT penalizing going backwards
//         firstfitrefresh();
//     } else {
//         $('#first-fit-message-box').html("You're already at the first car!");
//     }

// }

function firstfitNoClicked() {
    $('#first-fit-message-box').html("");

    if (window.firstfitcurrentState.currentCar < window.firstfitinitialGame.numCars) {
        window.firstfitcurrentState.currentCar += 1;
        window.firstfitcurrentState.clicks += 1;
        firstfitrefresh();
    } else {
        $('#first-fit-message-box').html("You're already at the last car!");
    }
}

function firstfitYesClicked() {
    if (window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex] <= window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar]) {
        //load the cargo

        var cargoWidth = 25*window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
        console.log(cargoWidth)
        var left = 255 + window.firstfitwheel2.left - window.firstfittraincar.left - cargoWidth 
        $('#first-fit-current-cargo-box').animate({"top": "80"},700,function() {
        


            window.firstfitcurrentState.remainingCapacity[window.firstfitcurrentState.currentCar] -= window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
            window.firstfitcurrentState.utilization += window.firstfitinitialGame.cargo[window.firstfitcurrentState.currentCargoIndex]
            window.firstfitcurrentState.currentCargoIndex += 1
            window.firstfitcurrentState.cargoLeft -= 1
            window.firstfitcurrentState.currentCar = 1;
            window.firstfitcurrentState.clicks += 1;
            $('#first-fit-message-box').html("Cargo successfully loaded!")
            
            setTimeout(firstfitrefresh, 500);
            ;
        });

       
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

function startFirstFit() {
    $('#first-fit-game-container').css('visibility', 'visible');
    $('#first-fit-start-button').css('display', 'none');
}
