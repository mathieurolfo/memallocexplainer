"use strict";

console.log("seg free loaded");
initializeParametersSeg();
$(initSeg);

window.onload = function() {

}

function initializeParametersSeg() {
	var cars = [null, 4, 8, 16, 10, 12, 4, 2, 8, 4, 6];
  	var cargo = [null, 8, 2, 4, 10, 7, 6, 15, "none!"];
    var car1 = {size: 4, index: 1, used: false};
    var car2 = {size: 8, index: 2, used: false};
    var car3 = {size: 16, index: 3, used: false};
    var car4 = {size: 10, index: 4, used: false};
    var car5 = {size: 12, index: 5, used: false};
    var car6 = {size: 4, index: 6, used: false};
    var car7 = {size: 2, index: 7, used: false};
    var car8 = {size: 8, index: 8, used: false};
    var car9 = {size: 4, index: 9, used: false};
    var car10 = {size: 6, index: 10, used: false};
    var carIndexMap = {4: [null, 1, 6, 7, 9], 8: [null, 2, 8, 10], 12: [null, 4, 5], 16: [null, 3]};
    var carObjectMap = {4: [null, car1, car6, car7, car9], 8: [null, car2, car8, car10], 12: [null, car4, car5], 16: [null, car3]};
    var totalSpace = 0;
    for (var x=1; x<cars.length; x++) {
        totalSpace += cars[x];
    }
    var remainingCapacity = cars.slice(0); //copy the unloaded car array
    var cargoLeft = cargo.length - 2; //adjust for 1 indexing and end message
    var currentCargoIndex = 1;
    var numCars = cars.length - 1;
    var currentCarIndex = 0;
    var currentCar = null;
    var currentBucket = 0;
    var noIndex = 1;
    window.segfreeInitialGame = {
        cargo: cargo,
        cars: cars,
        carIndexMap: carIndexMap,
        numCars: numCars,
        totalSpace: totalSpace
    };

    window.segfreeCurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        currentCarIndex: currentCarIndex,
        carObjectMap: carObjectMap,
        currentCars: null,
        currentBucket: currentBucket,
        noIndex: noIndex,
        bucketSelected: false,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };
}

function initSeg() {
	initBucket();
	showCargoBoxSeg();
	initFullTrain();
	displayStats();
}

function initBucket() {
	initBucket4();
	initBucket8();
	initBucket12();
	initBucket16();
}

function initSelectBucket() {
	if (window.segfreeCurrentState.currentBucket == 4) {
		initBucket4();
	} else if (window.segfreeCurrentState.currentBucket == 8) {
		initBucket8();
	} else if (window.segfreeCurrentState.currentBucket == 12) {
		initBucket12();
	} else if (window.segfreeCurrentState.currentBucket == 16) {
		initBucket16();
	}
}


window.heightAdj = -16

function drawCar(thisCanvas, leftOffset, carSize, carWidth, wheelColor, yOffset) {
    var wheelRadius = 5, wheelOffset = 3, cartHeight = 10;//, yOffset = 55;
    var numWheels = carSize / 4;

    var car = new fabric.Rect({top: yOffset - wheelRadius+window.heightAdj, left: leftOffset, width: carWidth, height: 10, fill: wheelColor, stroke: 'black', strokeWidth: 2});
    thisCanvas.add(car);

    for(var i = 0; i < numWheels; i++){
        var lw = new fabric.Circle({top: yOffset+window.heightAdj, left: leftOffset + wheelOffset + wheelRadius*2*i, radius: wheelRadius, fill: wheelColor, stroke: 'black', strokeWidth: 2});
        thisCanvas.add(lw);
        var rw = new fabric.Circle({top: yOffset+window.heightAdj, left: leftOffset+carWidth-cartHeight- wheelOffset-wheelRadius*2*i, radius: wheelRadius, fill: wheelColor,stroke: 'black', strokeWidth: 2});
        thisCanvas.add(rw);
    }
}


function initBucket4() {
	window.segfreebucket4canvas = new fabric.StaticCanvas('seg-free-bucket4-display');
    window.segfreebucket4canvas.setWidth(750);
    window.segfreebucket4canvas.setHeight(80+window.heightAdj);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[4];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo4" + j;
        var carWidth = currCar["size"]*25;
     //    if (currCar["used"]) {
     //    	window[wheel1] = new fabric.Circle({
	    //         top: 55, left: currLeft+3, radius:5, fill: 'white',
	    //         stroke: 'black', strokeWidth: 2
	    //     });
	    //     window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'white',stroke: 'black', strokeWidth: 2});
	    //     window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'white', stroke: 'black', strokeWidth: 2});
    	// } else
        var wheelColor = 'gray'
    	if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {

    		// window[wheel1] = new fabric.Circle({
	     //        top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'red',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});

            wheelColor = 'red'
    		// window[wheel1] = new fabric.Circle({
	     //        top: 55, left: currLeft+3, radius:5, fill: 'red',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});
            var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]*25
            if (cargoFits()) {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'green', strokeWidth: 3, strokeDashArray: [3,3]});
            } else {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'red', strokeWidth: 3, strokeDashArray: [3,3]});
            }
            window.segfreebucket4canvas.add(window[loadedCargo]);
        } else {
    		// window[wheel1] = new fabric.Circle({
	     //        top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'gray',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
    	


    		// window[wheel1] = new fabric.Circle({
	     //        top: 55, left: currLeft+3, radius:5, fill: 'gray',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	        // window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});

        }
        // window.segfreebucket4canvas.add(window[car],window[wheel1], window[wheel2], );
        drawCar(window.segfreebucket4canvas, currLeft, currCar["size"], carWidth, wheelColor, 55)
        currLeft += carWidth + 10;
    }
}

function initBucket8() {
	window.segfreebucket8canvas = new fabric.StaticCanvas('seg-free-bucket8-display');
    window.segfreebucket8canvas.setWidth(750);
    window.segfreebucket8canvas.setHeight(80+window.heightAdj);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[8];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo8" + j;
        var carWidth = currCar["size"]*25;
     //    if (currCar["used"]) {
     //    	window[wheel1] = new fabric.Circle({
	    //         top: 55, left: currLeft+3, radius:5, fill: 'white',
	    //         stroke: 'black', strokeWidth: 2
	    //     });
	    //     window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'white',stroke: 'black', strokeWidth: 2});
	    //     window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'white', stroke: 'black', strokeWidth: 2});
    	// } else
        var wheelColor = 'gray'
    	if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {

    		// window[wheel1] = new fabric.Circle({
	     //        top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'red',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});

            wheelColor = 'red'
    		// window[wheel1] = new fabric.Circle({
	     //        top: 55, left: currLeft+3, radius:5, fill: 'red',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});

    	    var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]*25
            if (cargoFits()) {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'green', strokeWidth: 3, strokeDashArray: [3,3]});
            } else {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'red', strokeWidth: 3, strokeDashArray: [3,3]});
            }
            window.segfreebucket8canvas.add(window[loadedCargo]);

        } else {

    		// window[wheel1] = new fabric.Circle({
	     //        top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'gray',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});

    		// // window[wheel1] = new fabric.Circle({
	     //        top: 55, left: currLeft+3, radius:5, fill: 'gray',
	     //        stroke: 'black', strokeWidth: 2
	     //    });
	     //    window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	     //    window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});

    	}
        // window.segfreebucket8canvas.add(window[car],window[wheel1], window[wheel2]);
        drawCar(window.segfreebucket8canvas, currLeft, currCar["size"], carWidth, wheelColor, 55)
        currLeft += carWidth + 10;
    }
}

function initBucket12() {
	window.segfreebucket12canvas = new fabric.StaticCanvas('seg-free-bucket12-display');
    window.segfreebucket12canvas.setWidth(750);
    window.segfreebucket12canvas.setHeight(80+window.heightAdj);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[12];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo8" + j;
        var carWidth = currCar["size"]*25;

        // window[wheel1] = new fabric.Circle({
        //     top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'gray',
        //     stroke: 'black', strokeWidth: 2
        // });

        // window[wheel1] = new fabric.Circle({
        //     top: 55, left: currLeft+3, radius:5, fill: 'gray',
        //     stroke: 'black', strokeWidth: 2
        // });


        if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {
            var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]*25
            if (cargoFits()) {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'green', strokeWidth: 3, strokeDashArray: [3,3]});
            } else {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'red', strokeWidth: 3, strokeDashArray: [3,3]});
            }


            window.segfreebucket12canvas.add(window[loadedCargo]);

        }

        // window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        // window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        // window.segfreebucket12canvas.add(window[car],window[wheel1], window[wheel2]);

        // window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        // window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        // window.segfreebucket12canvas.add(window[car],window[wheel1], window[wheel2]);
        var wheelColor = 'gray'
        drawCar(window.segfreebucket12canvas, currLeft, currCar["size"], carWidth, wheelColor, 55)


        currLeft += carWidth + 10;

    }
}

function initBucket16() {
	window.segfreebucket16canvas = new fabric.StaticCanvas('seg-free-bucket16-display');
    window.segfreebucket16canvas.setWidth(750);
    window.segfreebucket16canvas.setHeight(80+window.heightAdj);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[16];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo16" + j;
        var carWidth = currCar["size"]*25;

        // window[wheel1] = new fabric.Circle({
        //     top: 55+window.heightAdj, left: currLeft+3, radius:5, fill: 'gray',
        //     stroke: 'black', strokeWidth: 2
        // });

        // window[wheel1] = new fabric.Circle({
        //     top: 55, left: currLeft+3, radius:5, fill: 'gray',
        //     stroke: 'black', strokeWidth: 2
        // });


        if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {
            var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]*25
            if (cargoFits()) {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'green', strokeWidth: 3, strokeDashArray: [3,3]});
            } else {
                window[loadedCargo] = new fabric.Rect({top: 25+window.heightAdj, left: currLeft, width: cargoSize, height: 25, fill: 'lightblue', stroke: 'red', strokeWidth: 3, strokeDashArray: [3,3]});
            }


            window.segfreebucket16canvas.add(window[loadedCargo]);

        }


        // window[wheel2] = new fabric.Circle({top: 55+window.heightAdj, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        // window[car] = new fabric.Rect({top: 50+window.heightAdj, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        // window.segfreebucket16canvas.add(window[car],window[wheel1], window[wheel2]);

        // window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        // window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        // window.segfreebucket16canvas.add(window[car],window[wheel1], window[wheel2]);
        var wheelColor = 'gray'
        drawCar(window.segfreebucket16canvas, currLeft, currCar["size"], carWidth, wheelColor, 55)


        currLeft += carWidth + 10;


    }
}


function showCargoBoxSeg() {
    var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
    cargoSize *= 24
    $('#seg-free-current-cargo-box').css("width", cargoSize);
    $('#seg-free-current-cargo-box-static').css("width", cargoSize);

    $('#seg-free-cargo-outline').css("width", cargoSize);
    $('#seg-free-current-cargo-box').html(window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]);
    $('#seg-free-current-cargo-box').css("display", "none");
    $('#seg-free-current-cargo-box-static').html(window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]);
    //$('#seg-free-current-cargo-box-static').css("display", "block");
}

function initFullTrain() {
	window.segfreetraincanvas = new fabric.StaticCanvas('seg-free-train-display');
    window.segfreetraincanvas.setWidth(1150);
    window.segfreetraincanvas.setHeight(190);
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
    var circletop = 55;
    var rectop = 50;
    var cargotop = 30;
    for (var j = 1; j<window.segfreeInitialGame.cars.length; j++) {
        var wheel1 = "segfreewheel1train" + j;
        var wheel2 = "segfreewheel2train" + j;
        var car = "segfreetrain" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = window.segfreeInitialGame.cars[j]*25;
        if (currLeft + carWidth > 1200) {
        	currLeft = 10;
        	circletop += 90;
        	rectop += 90;
        	cargotop += 90;
        }
        window[wheel1] = new fabric.Circle({
            top: circletop, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: circletop, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: rectop, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        window.segfreetraincanvas.add(window[car],window[wheel1], window[wheel2]);

       // var wheelColor = 'gray'
        //drawCar(window.segfreetraincanvas, currLeft, currCar["size"], carWidth, wheelColor, circletop)


        var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: cargotop, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.segfreetraincanvas.add(window[loadedCargo]);

        currLeft += carWidth + 10;
    }

    resetCargo();

}

window.cargoLeftOffset = 80;
window.adjust = 20
window.cargoCurrLeft = 80;


function resetCargo() {
    console.log("placing cargo");
    $('#seg-free-current-cargo-box').css("left", window.cargoLeftOffset+"px");
    $('#seg-free-current-cargo-box').css("top", "0px");
    $('#seg-free-cargo-outline').css("top", "0px");
    //$('#seg-free-cargo-outline').css("left", window.cargoLeftOffset+"px");
    $('#seg-free-cargo-outline').css("visibility", "hidden");
    console.log(window.segfreeCurrentState.currentCargoIndex);
}

function moveCargo() {
   $('#seg-free-cargo-outline').css("visibility", "visible");
   console.log("car index", window.segfreeCurrentState.currentCarIndex);
   var carName = "segfreetrain" + window.segfreeCurrentState.currentCarIndex
   console.log(window[carName].top)
   $('#seg-free-current-cargo-box').css("left", window.adjust+window[carName].left+"px");
   $('#seg-free-current-cargo-box').css("top", -window.adjust+window[carName].top+"px");
   // $('#seg-free-current-cargo-box').css("left", window.cargoLeftOffset+"px");
   $('#seg-free-cargo-outline').css("left", window.adjust+window[carName].left+"px");
   $('#seg-free-cargo-outline').css("top", window[carName].top+"px");

   if (cargoFits()) {
        $('#seg-free-cargo-outline').css("color", "green");
   } else {
        $('#seg-free-cargo-outline').css("color", "red");
   }
}

function drawHoverTrain(bucketNum) {
	if (!window.segfreeCurrentState.bucketSelected) {
		window.segfreetraincanvas = new fabric.StaticCanvas('seg-free-train-display');
	    window.segfreetraincanvas.setWidth(1150);
	    window.segfreetraincanvas.setHeight(300);
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
	    var circletop = 55;
	    var rectop = 50;
	    var cargotop = 30;

	    var bucketCarIndices = window.segfreeInitialGame.carIndexMap[bucketNum];
	    for (var j = 1; j<window.segfreeInitialGame.cars.length; j++) {
	        var wheel1 = "segfreewheel1train" + j;
	        var wheel2 = "segfreewheel2train" + j;
	        var car = "segfreetrain" + j;
	        var loadedCargo = "segfreecargo" + j;
	        var carWidth = window.segfreeInitialGame.cars[j]*25;
	        if (currLeft + carWidth > 1200) {
	        	currLeft = 10;
	        	circletop += 70;
	        	rectop += 70;
	        	cargotop += 70;
	        }
	        if (bucketCarIndices.indexOf(j) > 0) {
	        	window[wheel1] = new fabric.Circle({
		            top: circletop, left: currLeft+3, radius:5, fill: 'red',
		            stroke: 'black', strokeWidth: 2
		        });
		        window[wheel2] = new fabric.Circle({top: circletop, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
		        window[car] = new fabric.Rect({top: rectop, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});
	        } else {
	        	window[wheel1] = new fabric.Circle({
		            top: circletop, left: currLeft+3, radius:5, fill: 'gray',
		            stroke: 'black', strokeWidth: 2
		        });
		        window[wheel2] = new fabric.Circle({top: circletop, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
		        window[car] = new fabric.Rect({top: rectop, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
	        }

	        window.segfreetraincanvas.add(window[car],window[wheel1], window[wheel2]);

	        var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
	        window[loadedCargo] = new fabric.Rect({top: cargotop, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});

            window.segfreetraincanvas.add(window[loadedCargo]);

	        currLeft += carWidth + 10;
	    }
	}
}


function displayStats() {
	$('#seg-free-clicks').html(window.segfreeCurrentState.clicks);
    $('#seg-free-utilization').html(window.segfreeCurrentState.utilization + " out of " + window.segfreeInitialGame.totalSpace);
}

// $(document).ready(function(){
//     $("#bucket4").hover(function(){
//     	drawHoverTrain(4);
//     });
// });

// $(document).ready(function(){
//     $("#bucket8").hover(function(){
//     	drawHoverTrain(8);
//     });
// });



function selectBucketHelper(bucketNum) {
	if (bucketNum == 0) {
		for (var i = 4 ; i < 17; i+=4) {
			document.getElementById("bucket"+i).classList.remove("highlight");
			document.getElementById("button"+i).disabled = false;
			document.getElementById("bucket"+i).classList.remove("fade");
		}
	} else {
		for (var i = 4 ; i < 17; i+=4) {
			if (i == bucketNum) {
				document.getElementById("bucket"+i).classList.add("highlight");
			} else {
				document.getElementById("bucket"+i).classList.remove("highlight");
				document.getElementById("bucket"+i).classList.add("fade");
				document.getElementById("button"+i).disabled = true;
		}
	}
	}
}

function selectBucket(bucketNum) {
	var diff = bucketNum - window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex];
	if (diff > 3 || diff < 0) {
		$('#seg-free-message-box').html("That cargo doesn't fit in this bucket.");
		$('#seg-free-message-box').fadeIn("400", function() {
            setTimeout(function() {
                $('#seg-free-message-box').fadeOut("400",function() {
                    console.log("animation complete");
                });
            }, 700);
        });
		return;
	}
	if (document.getElementById("seg-free-load-button").disabled) {
		document.getElementById("seg-free-load-button").disabled = false;
	}
	if (document.getElementById("seg-free-no-button").disabled) {
		document.getElementById("seg-free-no-button").disabled = false;
	}
	selectBucketHelper(bucketNum);

	window.segfreeCurrentState.bucketSelected = true;
	window.segfreeCurrentState.currentBucket = bucketNum;
	window.segfreeCurrentState.currentCars = window.segfreeCurrentState.carObjectMap[bucketNum];
	window.segfreeCurrentState.noIndex = 1;
	for (var i = 1 ; i < window.segfreeCurrentState.currentCars.length ; i++) {
		if (!window.segfreeCurrentState.currentCars[i]["used"]) {
			window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[i];
			break;
		}
	}
	if (window.segfreeCurrentState.currentCar == null) {
		console.log("bucket is full");
	} else {
		window.segfreeCurrentState.currentCarIndex = window.segfreeCurrentState.currentCar["index"];
	}

	initBucket();
	initFullTrain();
    moveCargo();
}

function noloadCargoSeg() {
	if (window.segfreeCurrentState.noIndex >= window.segfreeCurrentState.currentCars.length - 1) {
		// window.segfreeCurrentState.currentBucket = 0;
		// window.segfreeCurrentState.currentCars = null;
		// window.segfreeCurrentState.currentCar = null;
		// window.segfreeCurrentState.currentCarIndex = 0;
		window.segfreeCurrentState.noIndex = 1;
		window.segfreeCurrentState.bucketSelected = false;
		// selectBucketHelper(window.segfreeCurrentState.currentBucket);
		selectBucket(window.segfreeCurrentState.currentBucket);
		initBucket();
		// document.getElementById("seg-free-load-button").disabled = true;
		// document.getElementById("seg-free-no-button").disabled = true;
	} else {
		window.segfreeCurrentState.noIndex = window.segfreeCurrentState.noIndex + 1;
		window.segfreeCurrentState.currentCarIndex = window.segfreeCurrentState.currentCars[window.segfreeCurrentState.noIndex]["index"];
		window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[window.segfreeCurrentState.noIndex];
		window.segfreeCurrentState.clicks += 1;
		initSelectBucket();
		displayStats();
	}

    moveCargo();
}

function cargoFits() {
    return !window.segfreeCurrentState.currentCar["used"] && window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex] <= window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCarIndex];
}

function yesloadCargoSeg() {
	if (!window.segfreeCurrentState.currentCar["used"] && window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex] <= window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCarIndex]) {
        window.segfreeCurrentState.carObjectMap[window.segfreeCurrentState.currentBucket][window.segfreeCurrentState.noIndex]["used"] = true;
        window.segfreeCurrentState.carObjectMap[window.segfreeCurrentState.currentBucket].splice(window.segfreeCurrentState.noIndex, 1);
        window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCarIndex] -= window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
        window.segfreeCurrentState.utilization += window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
        window.segfreeCurrentState.currentCargoIndex += 1
        window.segfreeCurrentState.cargoLeft -= 1
        window.segfreeCurrentState.currentCars = null;
        window.segfreeCurrentState.currentCar = null;
        window.segfreeCurrentState.currentCarIndex = 0;
		window.segfreeCurrentState.noIndex = 1;
		window.segfreeCurrentState.currentBucket = 0;
        window.segfreeCurrentState.bucketSelected = false;
		document.getElementById("seg-free-load-button").disabled = true;
		document.getElementById("seg-free-no-button").disabled = true;
		selectBucketHelper(0);
        $('#seg-free-message-box').html("Cargo successfully loaded!")
        initFullTrain();
        initBucket();
        showCargoBoxSeg();
        if (segfreestageCompleted()) {
        	console.log("END");
        	$('#seg-free-end-text').css("visibility", "visible");
        }
    } else {
        $('#seg-free-message-box').html("That cargo doesn't fit in this car.")
    }
    displayStats();
}

function segfreestageCompleted() {
    if (window.segfreeCurrentState.utilization === 52) {return true;}
    return false;
}


// function resetSimulationSeg() {
//   window.segfreecarcanvas.clear();
//   $('#seg-free-message-box').html("");
//   initializeParametersSeg();
//   init();
// }

// $(document).ready(function(){
//     $("#bucket4").hover(function(){
//      drawHoverTrain(4);
//     });
// });

// $(document).ready(function(){
//     $("#bucket8").hover(function(){
//      drawHoverTrain(8);
//     });
// });

// $(document).ready(function(){
//     $("#bucket12").hover(function(){
//      drawHoverTrain(12);
//     });
// });

// $(document).ready(function(){
//     $("#bucket16").hover(function(){
//      drawHoverTrain(16);
//     });
// });

function resetSimulationSeg() {
  $('#seg-free-message-box').html("");
  initializeParametersSeg();
  initSeg();
}
