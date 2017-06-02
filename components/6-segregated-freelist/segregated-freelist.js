
CARGO_UNIT_LENGTH = 25

console.log("first fit loaded");
seglistinitializeParameters();
$(seglistinit);

function seglistinitializeParameters() {
    var cargo = [null, 4, 2, 6, "none!"];
    var cars = [null, 1, 8, 5, 2, 2, 1, 8];
    var totalSpace = 0;
    for (var x=1; x<cars.length; x++) {
        totalSpace += cars[x];
    }
    var remainingCapacity = cars.slice(0); //copy the unloaded car array
    var cargoLeft = cargo.length - 2; //adjust for 1 indexing and end message
    var currentCargoIndex = 1;
    var numCars = cars.length - 1;
    var currentCar = 1;
    window.seglistinitialGame = {
        cargo: cargo,
        cars: cars,
        numCars: numCars,
        totalSpace: totalSpace
    };

    window.seglistcurrentState = {
        cargoLeft: cargoLeft,
        currentCar: currentCar,
        remainingCapacity: remainingCapacity,
        currentCargoIndex: currentCargoIndex,
        clicks: 1,
        utilization: 0
    };


}
function seglistresetSimulation() {
  window.seglistcarcanvas.clear();
  $('#first-fit-message-box').html("");
  seglistinitializeParameters();
  seglistinit();
}
function seglistinit() {

    seglistinitTrainCarGraphic();
    seglistinitWholeTrainGraphic();
    // add buttons
    seglistinitButtons();
    // draw seglist
    seglistinitSegList();

}
function seglistinitTrainCarGraphic() {
    window.seglistcarcanvas = new fabric.StaticCanvas('seglist-train');
    window.seglistcarcanvas.setWidth(300);
    window.seglistcarcanvas.setHeight(150);

    window.seglisttraincar = new fabric.Rect({top: 100, left: 30, width: 10, height: 10, fill: 'black'});
    window.seglistwheel1 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.seglistwheel2 = new fabric.Circle({top: 108, left: 30, radius:5, fill: 'black'})
    window.seglistcargo = new fabric.Rect({top:60, left: 30, width: 10, height: 40, fill: 'red'});

    window.seglistcarcanvas.add(window.seglisttraincar, window.seglistwheel1, window.seglistwheel2, window.seglistcargo);

}

function drawCarWithCargo(canvas, id, carWidth, cargoWidth, leftOffset) {
  var wheel1 = id + "Wheel1";
  var wheel2 = id + "Wheel2";
  var car = id + "Car";
  var loadedCargo = id + "Cargo";
  console.log(id)
  window[wheel1] = new fabric.Circle({
      top: 55, left: leftOffset+3, radius:5, fill: 'gray',
      stroke: 'black', strokeWidth: 2
  });
  window[wheel2] = new fabric.Circle({top: 55, left: leftOffset+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
  window[car] = new fabric.Rect({top: 50, left: leftOffset, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
  canvas.add(window[car],window[wheel1], window[wheel2]);

  window[loadedCargo] = new fabric.Rect({top: 30, left: leftOffset, width: cargoWidth, height: 20, fill: 'red'});
  canvas.add(window[loadedCargo]);
}

function seglistinitWholeTrainGraphic() {
    window.seglisttraincanvas = new fabric.StaticCanvas('seglist-train');
    window.seglisttraincanvas.setWidth(750);
    window.seglisttraincanvas.setHeight(90);
    fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left:0,
            top: 20,
        })
        window.seglisttraincanvas.add(obj);
    });
    window.seglistleftOffset = 60;
    var currLeft = window.seglistleftOffset;
    for (var j = 1; j<window.seglistinitialGame.cars.length; j++) {
        var carWidth = window.seglistinitialGame.cars[j]*CARGO_UNIT_LENGTH;
        var cargoWidth = (window.seglistinitialGame.cars[j] - window.seglistcurrentState.remainingCapacity[j])*CARGO_UNIT_LENGTH;

        drawCarWithCargo(window.seglisttraincanvas, "segList"+j.toString(), carWidth, cargoWidth, currLeft)
        currLeft += carWidth + 10;
    }
}

function Canvas(id) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = id;
    document.getElementById("seglist-all").appendChild(this.canvas);
    return this.canvas;
}
function createNewCanvas(id) {
  var tt = Canvas(id);
  return new fabric.Canvas(id)
}

function hideCar(idx) {
  var carCapacity = window.seglistinitialGame.cars[idx]
  var canvasName = "sl-cap-" + carCapacity.toString() + "-" + idx.toString();
  document.getElementById(canvasName).style.visibility='hidden';
}

function showCar(idx) {
  var carCapacity = window.seglistinitialGame.cars[idx]
  var canvasName = "sl-cap-" + carCapacity.toString() + "-" + idx.toString();
  document.getElementById(canvasName).style.visibility='';
}

function seglistinitSegList() {
  var capacity = [1,2,5,8]; // this is the unique of car capacity, i.e. uniq(cars)
  for (var i = 0; i<capacity.length; i++) {
    // canvasName = "sl-cap-1-1" : capacity=1, id=1
    var thisRowCapacity = capacity[i] * CARGO_UNIT_LENGTH;
    var canvasName = "sl-cap-" + capacity[i].toString()
    var t = new createNewCanvas(canvasName);
    t.setWidth(50);
    t.setHeight(90);
    // fabric.loadSVGFromURL('http://rol.fo/files/train.svg', function(objects, options) {
    //     var obj = fabric.util.groupSVGElements(objects, options);
    //     obj.set({
    //         left:0,
    //         top: 20,
    //     })
    //     t.add(obj);
    // });

    window.seglistleftOffset = 60;
    var currLeft = window.seglistleftOffset;
    for (var j = 1; j<window.seglistinitialGame.cars.length; j++) {
        var carWidth = window.seglistinitialGame.cars[j]*CARGO_UNIT_LENGTH;
        var cargoWidth = (window.seglistinitialGame.cars[j] - window.seglistcurrentState.remainingCapacity[j])*CARGO_UNIT_LENGTH;

        var canvasName = "sl-cap-" + capacity[i].toString() + "-" + j.toString();
        var t = new createNewCanvas(canvasName);
        document.getElementById(canvasName).parentElement.style.position = 'absolute';
        document.getElementById(canvasName).parentElement.style.left = currLeft.toString()+"px";
        t.setWidth(carWidth);
        t.setHeight(90);
        if (thisRowCapacity == carWidth) {
          drawCarWithCargo(t, canvasName, carWidth, cargoWidth, 0);
          hideCar(j);
        }
        currLeft += carWidth + 10;
    }
  }
}

function seglistinitButtons() {
  for (var j = 1; j<window.seglistinitialGame.cars.length; j++) {
    this.button = document.createElement('button');
    var bname = 'seglist-button' + j.toString();
    this.button.id = bname;
    this.button.innerHTML = j.toString();
    document.getElementById("seglist-buttons").appendChild(this.button);
    document.getElementById(bname).setAttribute("onclick", "showCar(" + j.toString() + ");");
  }

}


