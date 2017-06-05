"use strict";

console.log("seg free loaded");
initializeParametersSeg();
$(initSeg);

window.onload = function() {
  
}

// $("#bucket td").click(function() {
//     var tr = $(this).parent();
//     console.log(tr);
//     if(tr.hasClass("selected")) {
//         tr.removeClass("selected");
//     } else {
//     	console.log("highlight");
//         tr.addClass("selected");
//     } 
// });

function initializeParametersSeg() {
	var cars = [null, 4, 6, 16, 10, 12, 2, 4, 8, 4, 8];
  	var cargo = [null, 8, 2, 4, 10, 7, 6, 15, "none!"];
    var car1 = {size: 4, index: 1, used: false};
    var car2 = {size: 6, index: 2, used: false};
    var car3 = {size: 16, index: 3, used: false};
    var car4 = {size: 10, index: 4, used: false};
    var car5 = {size: 12, index: 5, used: false};
    var car6 = {size: 2, index: 6, used: false};
    var car7 = {size: 4, index: 7, used: false};
    var car8 = {size: 8, index: 8, used: false};
    var car9 = {size: 4, index: 9, used: false};
    var car10 = {size: 8, index: 10, used: false};
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
        // carObjectMap: carObjectMap,
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
	initBucket()
	showCargoBoxSeg();
	initFullTrain();
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

function initBucket4() {
	window.segfreebucket4canvas = new fabric.StaticCanvas('seg-free-bucket4-display');
    window.segfreebucket4canvas.setWidth(750);
    window.segfreebucket4canvas.setHeight(90);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[4];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = currCar["size"]*25;
        if (currCar["used"]) {
        	window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'white',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'white',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'white', stroke: 'black', strokeWidth: 2});
    	} else if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {
    		window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'red',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});
    	} else {
    		window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'gray',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
    	}
        window.segfreebucket4canvas.add(window[car],window[wheel1], window[wheel2]);
        currLeft += carWidth + 10;
    }
}

function initBucket8() {
	window.segfreebucket8canvas = new fabric.StaticCanvas('seg-free-bucket8-display');
    window.segfreebucket8canvas.setWidth(750);
    window.segfreebucket8canvas.setHeight(90);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[8];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = currCar["size"]*25;
        if (currCar["used"]) {
        	window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'white',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'white',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'white', stroke: 'black', strokeWidth: 2});
    	} else if (currCar["index"] == window.segfreeCurrentState.currentCarIndex) {
    		window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'red',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'red',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'red', stroke: 'black', strokeWidth: 2});
    	} else {
    		window[wheel1] = new fabric.Circle({
	            top: 55, left: currLeft+3, radius:5, fill: 'gray',
	            stroke: 'black', strokeWidth: 2
	        });
	        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
	        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
    	}
        window.segfreebucket8canvas.add(window[car],window[wheel1], window[wheel2]);
        currLeft += carWidth + 10;
    }
}

function initBucket12() {
	window.segfreebucket12canvas = new fabric.StaticCanvas('seg-free-bucket12-display');
    window.segfreebucket12canvas.setWidth(750);
    window.segfreebucket12canvas.setHeight(90);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[12];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = currCar["size"]*25;
        window[wheel1] = new fabric.Circle({
            top: 55, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        window.segfreebucket12canvas.add(window[car],window[wheel1], window[wheel2]);
        currLeft += carWidth + 10;
    }
}

function initBucket16() {
	window.segfreebucket16canvas = new fabric.StaticCanvas('seg-free-bucket16-display');
    window.segfreebucket16canvas.setWidth(750);
    window.segfreebucket16canvas.setHeight(90);
    window.segfreeleftOffset = 10;
    var currLeft = window.segfreeleftOffset;
    var currCars = window.segfreeCurrentState.carObjectMap[16];
    for (var j = 1; j<currCars.length; j++) {
    	var currCar = currCars[j];
        var wheel1 = "segfreewheel1car" + j;
        var wheel2 = "segfreewheel2car" + j;
        var car = "segfreecar" + j;
        var loadedCargo = "segfreecargo" + j;
        var carWidth = currCar["size"]*25;
        window[wheel1] = new fabric.Circle({
            top: 55, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: 55, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        window.segfreebucket16canvas.add(window[car],window[wheel1], window[wheel2]);
        currLeft += carWidth + 10;
    }
}


function showCargoBoxSeg() {
    var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
    cargoSize *= 24
    $('#seg-free-current-cargo-box').css("width", cargoSize);
    $('#seg-free-current-cargo-box').html(window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]);
    $('#seg-free-current-cargo-box').css("display", "block");
}

function initFullTrain() {
	window.segfreetraincanvas = new fabric.StaticCanvas('seg-free-train-display');
    window.segfreetraincanvas.setWidth(1150);
    window.segfreetraincanvas.setHeight(200);
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
        	circletop += 70;
        	rectop += 70;
        	cargotop += 70;
        }
        window[wheel1] = new fabric.Circle({
            top: circletop, left: currLeft+3, radius:5, fill: 'gray',
            stroke: 'black', strokeWidth: 2
        });
        window[wheel2] = new fabric.Circle({top: circletop, left: currLeft+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
        window[car] = new fabric.Rect({top: rectop, left: currLeft, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
        window.segfreetraincanvas.add(window[car],window[wheel1], window[wheel2]);

        var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
        window[loadedCargo] = new fabric.Rect({top: cargotop, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
        window.segfreetraincanvas.add(window[loadedCargo]);
        
        currLeft += carWidth + 10;
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

// $(document).ready(function(){
//     $("#bucket12").hover(function(){
//     	drawHoverTrain(12);
//     });
// });

// $(document).ready(function(){
//     $("#bucket16").hover(function(){
//     	drawHoverTrain(16);
//     });
// });

function selectBucketHelper(bucketNum) {
	for (var i = 4 ; i < 17; i+=4) {
		if (i == bucketNum) {
			document.getElementById("bucket"+i).classList.add("highlight");
		} else {
			document.getElementById("bucket"+i).classList.remove("highlight");
		}
	}
}

function selectBucket(bucketNum) {
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
}

function grayoutBucket() {

}

function noloadCargoSeg() {
	if (window.segfreeCurrentState.noIndex >= window.segfreeCurrentState.currentCars.length - 1) {
		window.segfreeCurrentState.currentBucket = 0;
		window.segfreeCurrentState.currentCars = null;
		window.segfreeCurrentState.currentCar = null;
		window.segfreeCurrentState.currentCarIndex = 0;
		window.segfreeCurrentState.noIndex = 1;
		grayoutBucket();
		window.segfreeCurrentState.bucketSelected = false;
		initBucket();
		document.getElementById("seg-free-load-button").disabled = true;
		document.getElementById("seg-free-no-button").disabled = true;
	} else {
		window.segfreeCurrentState.noIndex = window.segfreeCurrentState.noIndex + 1;
		window.segfreeCurrentState.currentCarIndex = window.segfreeCurrentState.currentCars[window.segfreeCurrentState.noIndex]["index"];
		window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[window.segfreeCurrentState.noIndex];
		initSelectBucket();
	}
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
        window.segfreeCurrentState.clicks += 1;
        window.segfreeCurrentState.bucketSelected = false;
		document.getElementById("seg-free-load-button").disabled = true;
		document.getElementById("seg-free-no-button").disabled = true;
        $('#seg-free-message-box').html("Cargo successfully loaded!")
        initFullTrain();
        initBucket();
        showCargoBoxSeg();
    } else {
        $('#seg-free-message-box').html("That cargo doesn't fit in this car.")
    }
}

// function init() {
//     window.segfreecarcanvas = new fabric.StaticCanvas('seg-free-current-train');
//     window.segfreecarcanvas.setWidth(300);
//     window.segfreecarcanvas.setHeight(150);
//     window.segfreetraincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
//     window.segfreewheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
//     window.segfreewheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
//     window.segfreecargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

//     window.segfreecarcanvas.add(window.segfreetraincar, window.segfreewheel1, window.segfreewheel2, window.segfreecargo);

//     initBucket4();
//     initWholeTrainGraphicSeg();

//     refreshSeg();
// }

// function initWholeTrainGraphicSeg() { 

//     // window.segfreetraincanvas = new fabric.StaticCanvas('seg-free-train-display');
//     // window.segfreetraincanvas.setWidth(750);
//     // window.segfreetraincanvas.setHeight(150);
//     // // fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
//     // //     var obj = fabric.util.groupSVGElements(objects, options);
//     // //     obj.set({
//     // //         left:0,
//     // //         top: 20,
//     // //     })
//     // //     window.segfreetraincanvas.add(obj);
//     // // });
//     // window.segfreeleftOffset = 60;
//     // var currLeft = window.segfreeleftOffset;
//     // for (var j = 1; j<window.segfreeInitialGame.car4.length; j++) {
//     //     var wheel1 = "segfreewheel1car" + j;
//     //     var wheel2 = "segfreewheel2car" + j;
//     //     var car = "segfreecar" + j;
//     //     var loadedCargo = "segfreecargo" + j;
//     //     var carWidth = window.segfreeInitialGame.car4[j]*25;
//     //     window[wheel1] = new fabric.Circle({top: 60, left: currLeft, radius:5, fill: 'black'});
//     //     window[wheel2] = new fabric.Circle({top: 60, left: currLeft+carWidth-10, radius:5, fill: 'black'});
//     //     window[car] = new fabric.Rect({top: 50, left: currLeft, width: carWidth, height: 10, fill: 'black'});
//     //     window.segfreetraincanvas.add(window[wheel1], window[wheel2], window[car]);

//     //     var cargoWidth = (window.segfreeInitialGame.car4[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
//     //     window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
//     //     window.segfreetraincanvas.add(window[loadedCargo]);

//     //     currLeft += carWidth + 10;

//     // }


// }

// function redrawCargoSeg() {
//     var currLeft = window.segfreeleftOffset;
//     for (var j = 1; j<window.segfreeInitialGame.cars.length; j++) {
//         var loadedCargo = "cargo" + j;
//         var carWidth = window.segfreeInitialGame.cars[j]*25
//         var cargoWidth = (window.segfreeInitialGame.cars[j]-window.segfreeCurrentState.remainingCapacity[j])*25;
//         window[loadedCargo] = new fabric.Rect({top: 30, left: currLeft, width: cargoWidth, height: 20, fill: 'red'});
//         window.segfreetraincanvas.add(window[loadedCargo]);
//         currLeft += carWidth + 10;
//     }
// }

// function refreshSeg() {


//     var capacity = window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar];
//     var maxCapacity = window.segfreeInitialGame.cars[window.segfreeCurrentState.currentCar];
//     $('#seg-free-car-capacity').html("Remaining capacity: " + capacity + " of " + maxCapacity);

//     $('#seg-free-cargo-display-header').html("Cargo loads remaining: " + window.segfreeCurrentState.cargoLeft);
//     $('#seg-free-current-cargo-size').html("Current cargo:"); //" size: " + window.InitialGame.cargo[window.currentState.currentCargoIndex]);

//     $('#seg-free-car-display-header').html("Current Car: Car "
//         + window.segfreeCurrentState.currentCar);

//     $('#seg-free-clicks').html(window.segfreeCurrentState.clicks);
//     $('#seg-free-utilization').html(window.segfreeCurrentState.utilization + " out of " + window.segfreeInitialGame.totalSpace)

//     // if (capacity >= window.segfreeInitialGame.cargo[window.segfreecurrentState.currentCargoIndex]) {
//     //   $('#seg-free-left-button').attr("disabled", true);
//     //   $('#seg-free-right-button').attr("disabled", true);
//     //   $('#seg-free-message-box').html("The cargo fits! Place it here!");
//     // } else {
//     //   $('#seg-free-left-button').attr("disabled", false);
//     //   $('#seg-free-right-button').attr("disabled", false);
//     // }

//     updateCargoBoxSeg();
//     updateTrainCarSeg();
//     redrawCargoSeg();

//     //should be done with promises: just notifies users after graphics rerendered if sim done
//     setTimeout(function() {
//         if (stageCompletedSeg()) {
//         //TODO: clear up the display
//             alert("Oh no! It seems that there isn't anywhere for you to put the last cargo on the train.\
// It would have fit on the first car, but we filled that with smaller cargos. Scroll down for more explanation.");
//         }
//     }, 300);

// }

// function updateCargoBoxSeg() {
//     var cargoSize = window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
//     cargoSize *= 30
//     $('#seg-free-current-cargo-box').css("width", cargoSize);
//     console.log(cargoSize);
//     $('#seg-free-current-cargo-box').html(window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]);
    
//     if (window.segfreeCurrentState.cargoLeft === 3) {
//     $('#seg-free-cargo2').css("display", "block");
//       $('#seg-free-cargo3').css("display", "block");
//     } else if (window.segfreeCurrentState.cargoLeft === 2) {
//       $('#seg-free-cargo3').css("display", "none");
//     } else if (window.segfreeCurrentState.cargoLeft === 1) {
//       $('#seg-free-cargo2').css("display", "none");
//       $('#seg-free-cargo3').css("display", "none");
//     }
// }

// function updateTrainCarSeg() {
//     var trainSize = window.segfreeInitialGame.cars[window.segfreeCurrentState.currentCar];
//     var remainingSpace = window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar];
//     var filledSpace = trainSize - remainingSpace

//     window.segfreetraincar.set({width: trainSize*25});
//     window.segfreetraincar.centerH();

//     var cargoPosition = window.segfreetraincar.left;
//     window.segfreecargo.set({width: filledSpace*25, left: cargoPosition});

//     var wheel1Position = window.segfreetraincar.left;
//     var wheel2Position = window.segfreetraincar.left + window.segfreetraincar.width - 2*window.segfreewheel2.radius;
//     window.segfreewheel1.set({left: wheel1Position});
//     window.segfreewheel2.set({left: wheel2Position});
//     window.segfreecarcanvas.renderAll();

//     if (window.segfreeCurrentState.currentCar === window.segfreeInitialGame.numCars) {
//       $('#seg-free-right-button').addClass("disabled");
//     } else if (window.segfreeCurrentState.currentCar === 1){
//       $('#seg-free-left-button').addClass("disabled");
//     } else {
//       $('#seg-free-left-button').removeClass("disabled");
//       $('#seg-free-right-button').removeClass("disabled");
//     }

// }

// function stageCompletedSeg() {
//     // if (window.segfreecurrentState.clicks === 5) {return true;}

// }

// function bucketClicked(bucketNum) {
// 	window.segfreeCurrentState.currentBucket = bucketNum;
// 	window.segfreeCurrentState.currentCars = window.segfreeCurrentState.carMap[bucketNum];
// 	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[0];
// 	refreshSeg();
// }

// function leftClickedSeg() {
//     $('#seg-free-message-box').html("");
//     var indexfound = (window.segfreeCurrentState.currentCars).indexOf(window.segfreeCurrentState.currentCar);
//     if (indexfound > 0) {
//     	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[indexfound-1];
//     	window.segfreeCurrentState.clicks += 1;
//     	refreshSeg();
//     // if (window.segfreeCurrentState.currentCar > 1) {
//     //     window.segfreeCurrentState.currentCar -= 1;
//     //     //window.segfreecurrentState.clicks += 1; // NOT penalizing going backwards
//     //     refreshSeg();
//     } else {
//         $('#seg-free-message-box').html("You're already at the first car!");
//     }

// }

// function rightClickedSeg() {
//     $('#seg-free-message-box').html("");
//     var indexfound = (window.segfreeCurrentState.currentCars).indexOf(window.segfreeCurrentState.currentCar);
//     if (indexfound < window.segfreeCurrentState.currentCars.length - 1) {
//     	window.segfreeCurrentState.currentCar = window.segfreeCurrentState.currentCars[indexfound+1];
//     	window.segfreeCurrentState.clicks += 1;
//     	refreshSeg();
//     } else {
//     	$('#seg-free-message-box').html("You're already at the last car!");
//     }
//     // if (window.segfreeCurrentState.currentCar < window.segfreeInitialGame.numCars) {
//     //     window.segfreeCurrentState.currentCar += 1;
//     //     window.segfreeCurrentState.clicks += 1;
//     //     refreshSeg();
//     // } else {
//     //     $('#seg-free-message-box').html("You're already at the last car!");
//     // }
// }

// function loadClickedSeg() {
//     if (window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex] <= window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar]) {
//         //load the cargo
//         window.segfreeCurrentState.remainingCapacity[window.segfreeCurrentState.currentCar] -= window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
//         var curBucket = window.segfreeCurrentState.carMap[window.segfreeCurrentState.currentBucket];
//         carBucket.indexOf(window.segfreeCurrentState.currentCar);
//         window.segfreeCurrentState.utilization += window.segfreeInitialGame.cargo[window.segfreeCurrentState.currentCargoIndex]
//         window.segfreeCurrentState.currentCargoIndex += 1
//         window.segfreeCurrentState.cargoLeft -= 1
//         window.segfreeCurrentState.currentCar = 1;
//         window.segfreeCurrentState.clicks += 1;
//         $('#seg-free-message-box').html("Cargo successfully loaded!")
//         refreshSeg();
//     } else {
//         $('#seg-free-message-box').html("That cargo doesn't fit in this car.")
//     }
// }

// function resetSimulationSeg() {
//   window.segfreecarcanvas.clear();
//   $('#seg-free-message-box').html("");
//   initializeParametersSeg();
//   init();
// }
