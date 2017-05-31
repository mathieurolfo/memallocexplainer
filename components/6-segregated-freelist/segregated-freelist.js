"use strict";


function dragMoveListener (event) {
    var target = event.target;

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
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


TrainVisualization.prototype.draw = function(domId) {
  var container = document.getElementById(domId);
  var cargoVisualization = document.createElement("div");
  cargoVisualization.setAttribute("id", "train-cargo-1");
  cargoVisualization.setAttribute("class", "train-cargo drag-drop");
  cargoVisualization.setAttribute("data-capacity", "2");

  interact(cargoVisualization)
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      onstart: function(event) {
        event.target.classList.add('dragging');
      },
      onend: function(event) {
        event.target.classList.remove('dragging');
      }
    });

  container.appendChild(cargoVisualization);

  this.carts.forEach(function(cart, index){

    // create a dom element for the current cart
    var cartVisualization = document.createElement("div");
    cartVisualization.setAttribute("id", "train-cart-" + index);
    cartVisualization.setAttribute("class", "train-cart");
    // size it
    cartVisualization.style.width = (cart.capacity * 100) + "px";
    // make it a dropzone
    interact(cartVisualization)
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.train-cargo',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,
        ondropactivate: function (event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;
          var cargoSize = draggableElement.getAttribute("data-capacity");

          // feedback the possibility of a drop
          dropzoneElement.classList.add('drop-target');
          if (cargoSize <= cart.capacity) {
            draggableElement.classList.add('can-drop');
          } else {
            draggableElement.classList.add('no-drop');
          }
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.classList.remove('no-drop');
        // event.relatedTarget.textContent = 'Drag-me'
        // event.draggable.snap({
        //   anchors: [startPos]
        // })
        // event.relatedTarget.textContent = 'Dragged out';
      },
      ondrop: function (event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;

          draggableElement.classList.remove('dragging');

          if (draggableElement.classList.contains('no-drop')){
            // TODO: see if interact.js does this smarter somehow

            draggableElement.style.webkitTransform =
            draggableElement.style.transform =
              'translate(' + 0 + 'px, ' + 0 + 'px)';
            draggableElement.setAttribute('data-x', 0);
            draggableElement.setAttribute('data-y', 0);
            // event.relatedTarget.textContent = "Can't load";
          } else {
            draggableElement.style.webkitTransform =
            draggableElement.style.transform =
              'translate(' + dropzoneElement.offsetLeft + 'px, ' + 0 + 'px)';
            draggableElement.setAttribute('data-x', dropzoneElement.offsetLeft);
            draggableElement.setAttribute('data-y', 0);
            interact(draggableElement).draggable(false);
          }
          event.relatedTarget.classList.remove('can-drop');
          event.relatedTarget.classList.remove('no-drop');
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      }
    }


}
var carts = [{capacity: 2}, {capacity: 1}];
var train = new TrainVisualization(carts);
train.draw('seg-free-example');
