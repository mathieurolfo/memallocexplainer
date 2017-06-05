"use strict";




bestfitinitializeParameters();
$(bestfitinit);


function bestfitinitializeParameters() {
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
    var finalCargoPlacements = [null, 3, 4, 2];
    window.bestfitinitialGame = {
        cargo: cargo,
        cars: cars,
        numCars: numCars,
        totalSpace: totalSpace,
        finalCargoPlacements: finalCargoPlacements
    };
    window.bestfitcurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };
    window.distanceToTrain = 135;
    window.cargoHeight = 25;
}

function bestfitinit() {

    //bestfitinitTrainCarGraphic();
    bestfitinitWholeTrainGraphic();

    bestfitrefresh();
}

// function bestfitinitTrainCarGraphic() {
//     window.bestfitcarcanvas = new fabric.StaticCanvas('best-fit-current-train');
//     window.bestfitcarcanvas.setWidth(300);
//     window.bestfitcarcanvas.setHeight(150);

//     // fabric.loadSVGFromURL('http://rol.fo/files/train2.svg', function(objects, options) {
//     //     var obj = fabric.util.groupSVGElements(objects, options);
//     //     // obj.set({
//     //     //     left:0,
//     //     //     top: 20,
//     //     // })
//     //     window.bestfitcarcanvas.add(obj);
//     // });

//     window.bestfittraincar = new fabric.Rect({top: 100, left: 80, width: 10, height: 10, fill: 'gray',stroke: 'black', strokeWidth: 2});
//     window.bestfitwheel1 = new fabric.Circle({top: 105, left: 80, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2})
//     window.bestfitwheel2 = new fabric.Circle({top: 105, left: 80, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2})
//     window.bestfitcargo = new fabric.Rect({top:75, left: 130, width: 0, height: 25, fill: 'white'});

//     window.bestfitcarcanvas.add(window.bestfittraincar, window.bestfitwheel1, window.bestfitwheel2, window.bestfitcargo);

// }

function bestfitinitWholeTrainGraphic() {
    window.bestfittraincanvas = new fabric.StaticCanvas('best-fit-train-display');
    window.bestfittraincanvas.setWidth(750);
    window.bestfittraincanvas.setHeight(90);
    fabric.loadSVGFromURL('https://ccrma.stanford.edu/~kittyshi/memallocexplainer/figures/train-head.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left:0,
            top: 20,
        })
        obj.scaleToHeight(40);
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
        window[wheel1] = new fabric.Circle({
            top: 55, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        //window.bestfittraincanvas.add(window[car],window[wheel1], window[wheel2]);
        var leftOffset = currLeft, wheelRadius = 5, wheelOffset = 3, yOffset = 54, cartHeight = 10;
        var numWheels = window.bestfitinitialGame.cars[j] / 4;
        window.bestfittraincanvas.add(window[car]);//,window[wheel1], window[wheel2]);
          for(var i = 0; i < numWheels; i++){
            var lw = new fabric.Circle({top: yOffset, left: leftOffset + wheelOffset + wheelRadius*2*i, radius: wheelRadius, fill: 'gray', stroke: 'black', strokeWidth: 2});
            window.bestfittraincanvas.add(lw);
            var rw = new fabric.Circle({top: yOffset, left: leftOffset+carWidth-cartHeight- wheelOffset-wheelRadius*2*i, radius: wheelRadius, fill: 'gray',stroke: 'black', strokeWidth: 2});
            window.bestfittraincanvas.add(rw);
          }

        // console.log(j);
        // fabric.loadSVGFromURL('http://rol.fo/files/train2.svg', function(objects, options) {
        //     var obj = fabric.util.groupSVGElements(objects, options);
        //     obj.set({
        //         left:currLeft,
        //         top: 20,
        //     })
        //     obj.setWidth(700);
        //     console.log("adding object")
        //     window.bestfittraincanvas.add(obj);
        //     currLeft += 10;
        // });


        var cargoWidth = (window.bestfitinitialGame.cars[j]-window.bestfitcurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'white'});
        window.bestfittraincanvas.add(window[loadedCargo]);

        currLeft += carWidth + 10;

    }


}

function bestfitupdateWholeTrainCargo() {
    var currLeft = window.bestfitleftOffset;
    for (var j = 1; j<window.bestfitinitialGame.cars.length; j++) {
        var loadedCargo = "cargo" + j;
        var carWidth = window.bestfitinitialGame.cars[j]*25
        var cargoWidth = (window.bestfitinitialGame.cars[j]-window.bestfitcurrentState.remainingCapacity[j])*25;

        if (cargoWidth > 0) {
             window[loadedCargo] = new fabric.Rect({
                top: 25, left: currLeft, width: cargoWidth, height: 25, fill: 'white',
                stroke: 'black', strokeWidth: 3
            });

        } else {
            window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 30, fill: 'white'});
        }



        window.bestfittraincanvas.add(window[loadedCargo]);
        currLeft += carWidth + 10;
    }
}

function bestfitrefresh() {
    var capacity = window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar];
    var maxCapacity = window.bestfitinitialGame.cars[window.bestfitcurrentState.currentCar];
    $('#best-fit-car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);

    $('#best-fit-cargo-display-header').html("Cargo loads remaining: " + window.bestfitcurrentState.cargoLeft);
    $('#best-fit-current-cargo-size').html("Current cargo:"); //" size: " + window.initialGame.cargo[window.currentState.currentCargoIndex]);

    // $('#best-fit-car-display-header').html("Current Car: "
    //     + window.bestfitcurrentState.currentCar + " of " + window.bestfitinitialGame.numCars);

    $('#best-fit-clicks').html(window.bestfitcurrentState.clicks);
    $('#best-fit-utilization').html(window.bestfitcurrentState.utilization + " out of " + window.bestfitinitialGame.totalSpace)

    if (window.bestfitcurrentState.currentCar === window.bestfitinitialGame.numCars) {
        window.bestfitcurrentState.checkedLastCar = true;
        console.log("at end of train");
    }
    //bestfitupdateTrainCar();

    bestfitupdateButtonStates(capacity, maxCapacity);
    bestfitupdateCargoBox();
    bestfitupdateWholeTrainCargo();

    //should be done with promises: just notifies users after graphics rerendered if sim done
    if (bestfitstageCompleted()) {
    //TODO: clear up the display
        $('#best-fit-game-container').css("opacity", "0.25");
        $('#best-fit-current-cargo-box').css("visibility", "hidden");
        $('#best-fit-cargo-outline').css("visibility", "hidden");
        $('#best-fit-arrow').css("visibility", "hidden");

        setTimeout(function() {
            alert("Congrats! You've successfully loaded all of the cargo. Scroll down for a comparison of the two strategies.");
        }, 300);
        $('#best-fit-end-text').css("visibility", "visible");

    }

    

}

function bestfitupdateTrainCar() {
    var trainSize = window.bestfitinitialGame.cars[window.bestfitcurrentState.currentCar];
    var remainingSpace = window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar];
    var filledSpace = trainSize - remainingSpace

    window.bestfittraincar.set({width: trainSize*25});
    // window.bestfittraincar.centerH();

    var cargoPosition = window.bestfittraincar.left;
    if (filledSpace>0) {
        window.bestfitcargo.set({width: filledSpace*25, left: cargoPosition, stroke: 'black', strokeWidth: 2});
    } else {
        window.bestfitcargo.set({width: filledSpace*25, left: cargoPosition, strokeWidth: 0});
    }


    var wheel1Position = window.bestfittraincar.left +3;
    var wheel2Position = window.bestfittraincar.left -3 + window.bestfittraincar.width - 2*window.bestfitwheel2.radius;
    window.bestfitwheel1.set({left: wheel1Position});
    window.bestfitwheel2.set({left: wheel2Position});
    window.bestfitcarcanvas.renderAll();

}

function bestfitupdateCargoBox() {
    var cargoSize = window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
    cargoSize *= 25
    $('#best-fit-current-cargo-box').css("width", cargoSize);

    $('#best-fit-current-cargo-box').html(window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]);

    $('#best-fit-current-cargo-box').css("bottom", "0px");

    // var right = window.bestfitwheel2.left + window.bestfittraincar.left;//cargoSize - 70
    // // right += "px"
    // console.log("cargo", window.bestfitcargo.left)
    // console.log("car", window.bestfittraincar.left)
    // console.log("wheel", window.bestfitwheel2.left)
    // console.log($('#best-fit-current-cargo-box').css("left"));
    var car = "bestfitcar" + (window.bestfitcurrentState.currentCar);
    var wheel2 = "bestfitwheel2car" + (window.bestfitcurrentState.currentCar);
    var wheel1 = "bestfitwheel1car" + (window.bestfitcurrentState.currentCar);
    console.log("current wheel - ", window[wheel2].left);
    var fixedOffset = 20;
    var cargoWidth = (window.bestfitinitialGame.cars[window.bestfitcurrentState.currentCar]-window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar])*25;


    var leftOffset =  fixedOffset + window[car].left
    var cargoPosition = leftOffset + cargoWidth;
    $('#best-fit-current-cargo-box').css("left", cargoPosition+"px");
    $('#best-fit-current-cargo-box').css("top", "0px");

    //draw dotted cargo box
    if (bestfitcargoFits()) {
        $('#best-fit-cargo-outline').css("color", "green");
    } else {
        $('#best-fit-cargo-outline').css("color", "red");
    }

    $('#best-fit-cargo-outline').css("width", cargoSize);
    $('#best-fit-cargo-outline').css("left", cargoPosition+"px");
    $('#best-fit-cargo-outline').css("top", 110);

    var arrowPosition = -325 + leftOffset + (window[wheel2].left-window[wheel1].left)/2;
    $('#best-fit-arrow').css("left", arrowPosition+"px");
    $('#best-fit-arrow').css("top", "40px");
    $('#best-fit-arrow').stop();
    bestfitbounceArrow();
    // console.log(window.bestfitwheel2, right)
}

function bestfitbounceArrow() {

    $('#best-fit-arrow').animate({"top": "+=8"}, 400, function() {
        $('#best-fit-arrow').animate({"top": "-=8"}, 400, bestfitbounceArrow);
    });
}

function bestfitcargoFits() {
    var capacity = window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar];
    return capacity >= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
}

function bestfitupdateButtonStates(capacity, maxCapacity) {
    if (!window.bestfitcurrentState.checkedLastCar) {
        $('#best-fit-no-button').html("No - Next Car");
    } else {
        $('#best-fit-no-button').html("No - Prev Car");
    }
    //PROPERLY TOGGLE BUTTONS AND STATES!
    console.log("updating text in button")

}

function bestfitstageCompleted() {
    if (window.bestfitcurrentState.cargoLeft == 0) {
        return true;
    }
    return false;
}

// function bestfitleftClicked() {
//     $('#best-fit-message-box').html("");

//     if (window.bestfitcurrentState.currentCar > 1) {
//         window.bestfitcurrentState.currentCar -= 1;
//         //window.bestfitcurrentState.clicks += 1; // NOT penalizing going backwards
//         bestfitrefresh();
//     } else {
//         $('#best-fit-message-box').html("You're already at the first car!");
//     }

// }

function bestfitNoClicked() {

    // should be placing cargo
    if (bestfitShouldLoadCargo()) {
        $('#best-fit-message-box').html("The cargo fits best in this car!");
        $('#best-fit-message-box').fadeIn("400", function() {
            setTimeout(function() {
                $('#best-fit-message-box').fadeOut("400",function() {
                });
            }, 1200);

        });
    } else if (!window.bestfitcurrentState.checkedLastCar) { //moving forward
        window.bestfitcurrentState.currentCar += 1;
        if((window.bestfitcurrentState.currentCargoIndex != 2) && (window.bestfitcurrentState.currentCar == window.bestfitinitialGame.numCars)) {
            $('#best-fit-message-box').html("Now that we've seen every car, we will backtrack to place the cargo!")
            $('#best-fit-message-box').fadeIn("400", function() {
                setTimeout(function() {
                    $('#best-fit-message-box').fadeOut("400",function() {
                    });
                }, 1200);
            });
        }
        window.bestfitcurrentState.clicks += 1;

    } else { //moving backwards
        window.bestfitcurrentState.currentCar -= 1;
        window.bestfitcurrentState.clicks += 1;
    }

    // //LET USER KNOW WE're GOING BACKWARDS
    // if (!bestfitShouldLoadCargo() && (window.bestfitcurrentState.currentCar == window.bestfitinitialGame.numCars)) {

    // }
    
    bestfitrefresh();
}

function bestfitShouldLoadCargo() {
    var currentCar = window.bestfitcurrentState.currentCar;
    var i = window.bestfitcurrentState.currentCargoIndex
    var cargoPlacement = window.bestfitinitialGame.finalCargoPlacements[i];

    return ((currentCar === cargoPlacement) && window.bestfitcurrentState.checkedLastCar);
}

function bestfitYesClicked() {

    var currentCar = window.bestfitcurrentState.currentCar;
    var i = window.bestfitcurrentState.currentCargoIndex
    var cargoPlacement = window.bestfitinitialGame.finalCargoPlacements[i];

    // //visited last car
    // if (currentCar === window.bestfitinitialGame.numCars) {
    //     window.bestfitcurrentState.checkedLastCar = true;
    //     console.log("at end of train");
    // }

    //ready to place cargo
    if (bestfitShouldLoadCargo()) {
        $('#best-fit-no-button').html("No - Prev Car");
        $('#best-fit-current-cargo-box').animate({"top": window.distanceToTrain},700,function() {

            window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar] -= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
            window.bestfitcurrentState.utilization += window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
            window.bestfitcurrentState.currentCargoIndex += 1
            window.bestfitcurrentState.cargoLeft -= 1
            window.bestfitcurrentState.currentCar = 1;
            window.bestfitcurrentState.clicks += 1;
            window.bestfitcurrentState.checkedLastCar = false;
            $('#best-fit-message-box').html("Cargo successfully loaded!")
            setTimeout(bestfitrefresh, 500);

        });
    } else if (!bestfitcargoFits()) { // too big
        $('#best-fit-current-cargo-box').animate({"top": window.distanceToTrain},700,function() {
            $('#best-fit-current-cargo-box').animate({"top": "0"}, 700);
        });

        $('#best-fit-message-box').html("That cargo doesn't fit in this car!");
        $('#best-fit-message-box').fadeIn("400", function() {
            setTimeout(function() {
                $('#best-fit-message-box').fadeOut("400",function() {
                    console.log("animation complete");
                });
            }, 700);
        });

    } else { //haven't checked every car
        $('#best-fit-current-cargo-box').animate({"top": window.distanceToTrain},700,function() {
            $('#best-fit-current-cargo-box').animate({"top": "0"}, 700);
        });
        $('#best-fit-message-box').html("You don't know if this is the best fit yet! First check every car!")
        $('#best-fit-message-box').fadeIn("400", function() {
            setTimeout(function() {
                $('#best-fit-message-box').fadeOut("400",function() {
                    console.log("animation complete");
                });
            }, 1200);
        });
    }
}


function bestfitresetSimulation() {
    // window.bestfitcarcanvas.clear();
    $('#best-fit-message-box').html("");
    bestfitinitializeParameters();
    bestfitinit();
}

function startbestfit() {
    $('#best-fit-game-container').css('visibility', 'visible');
    $('#best-fit-start-button').css('display', 'none');
}


// function bestfitupdateButtonStates(capacity, maxCapacity) {

//     var currentCar = window.bestfitcurrentState.currentCar;
//     var cargoPlacement = window.bestfitinitialGame.finalCargoPlacements[window.bestfitcurrentState.currentCargoIndex];
//     console.log(currentCar, cargoPlacement);

//     //visited last car
//     if(currentCar === window.bestfitinitialGame.numCars) {
//         window.bestfitcurrentState.checkedLastCar = true;
//         console.log("at end of train");
//     }

//     //ready to place cargo
//     if (currentCar === cargoPlacement && window.bestfitcurrentState.checkedLastCar) {
//         $('#best-fit-no-button').attr("disabled", true);
//         $('#best-fit-yes-button').attr("disabled", false);

//         $('#best-fit-no-button').removeClass("button-action");
//         $('#best-fit-yes-button').addClass("button-action");

//         $('#best-fit-no-button').html("No - Prev Car");
//         console.log("placing")
//     } else if (!window.bestfitcurrentState.checkedLastCar) { //still checking forward cars
//         $('#best-fit-no-button').addClass("button-action");
//         $('#best-fit-yes-button').removeClass("button-action");
//         $('#best-fit-no-button').attr("disabled", false);
//         $('#best-fit-yes-button').attr("disabled", true);
//         $('#best-fit-no-button').html("No - Next Car");
//         console.log("fwd pass");
//     } else if (window.bestfitcurrentState.checkedLastCar) { //checking backward cars
//         $('#best-fit-no-button').html("No - Prev Car");
//         console.log("bkwd pass");
//     }


//     // if (capacity >= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]) {
//     //     $('#best-fit-no-button').attr("disabled", true);
//     //     $('#best-fit-yes-button').attr("disabled", false);

//     //     $('#best-fit-no-button').removeClass("button-action");
//     //     $('#best-fit-yes-button').addClass("button-action");
//     // } else {
//     //     $('#best-fit-no-button').addClass("button-action");
//     //     $('#best-fit-yes-button').removeClass("button-action");
//     //     $('#best-fit-no-button').attr("disabled", false);
//     //     $('#best-fit-yes-button').attr("disabled", true);
//     // }


//     // if (window.bestfitcurrentState.currentCar === window.bestfitinitialGame.numCars) {
//     //     $('#best-fit-yes-button').addClass("disabled");
//     // } else {
//     //     $('#best-fit-right-button').removeClass("disabled");
//     // }
// }

// function bestfitstageCompleted() {
//     if (window.bestfitcurrentState.clicks === 16) {return true;}
//     return false;
// }

// // function bestfitleftClicked() {
// //     $('#best-fit-message-box').html("");

// //     if (window.bestfitcurrentState.currentCar > 1) {
// //         window.bestfitcurrentState.currentCar -= 1;
// //         //window.bestfitcurrentState.clicks += 1; // NOT penalizing going backwards
// //         bestfitrefresh();
// //     } else {
// //         $('#best-fit-message-box').html("You're already at the first car!");
// //     }

// // }

// function bestfitNoClicked() {
//     $('#best-fit-message-box').html("");
//     bestfitrefresh();
//     console.log("bestfitNo", window.bestfitcurrentState.currentCar, window.bestfitinitialGame.numCars)
//     if ((window.bestfitcurrentState.currentCar < window.bestfitinitialGame.numCars) ) {
//         if (window.bestfitcurrentState.checkedLastCar) {
//             window.bestfitcurrentState.currentCar -= 1;
//         } else {
//             console.log("going forward")
//             window.bestfitcurrentState.currentCar += 1;
//         }


//     } else {
//         window.bestfitcurrentState.currentCar -= 1;
//         console.log("going backward");
//     }
//     window.bestfitcurrentState.clicks += 1;
//     bestfitrefresh();
// }

// function bestfitYesClicked() {
//     if (window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex] <= window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar]) {
//         //load the cargo

//         var cargoWidth = 30*window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
//         console.log(cargoWidth)
//         var left = 265 + window.bestfitwheel2.left - window.bestfittraincar.left - cargoWidth
//         $('#best-fit-current-cargo-box').animate({"top": "100", "left": left},700,function() {



//             window.bestfitcurrentState.remainingCapacity[window.bestfitcurrentState.currentCar] -= window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
//             window.bestfitcurrentState.utilization += window.bestfitinitialGame.cargo[window.bestfitcurrentState.currentCargoIndex]
//             window.bestfitcurrentState.currentCargoIndex += 1
//             window.bestfitcurrentState.cargoLeft -= 1
//             window.bestfitcurrentState.currentCar = 1;
//             window.bestfitcurrentState.clicks += 1;
//             window.bestfitcurrentState.checkedLastCar = false;
//             $('#best-fit-message-box').html("Cargo successfully loaded!")

//             setTimeout(bestfitrefresh, 500);
//             ;
//         });


//     } else {
//         $('#best-fit-message-box').html("That cargo doesn't fit in this car.")
//     }
// }

