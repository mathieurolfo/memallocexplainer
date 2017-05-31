function dragMoveListener(event) {
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

// this is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener;

function TrainVisualization (draggableCargos, carts) {
  this.carts = carts;
  this.draggableCargos = draggableCargos
}

TrainVisualization.prototype.draw = function(domId) {
  var container = document.getElementById(domId);

  this.draggableCargos.forEach(function(cargo, index){
    var draggableCargo = document.createElement("div");
    draggableCargo.setAttribute("id", "train-cargo-" + index);
    draggableCargo.setAttribute("class", "train-cargo drag-drop");
    draggableCargo.setAttribute("capacity", cargo.capacity);
    draggableCargo.style.width = "100px"
    draggableCargo.textContent = cargo.capacity

    interact(draggableCargo)
      .draggable({
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
    container.appendChild(draggableCargo);
  });


  this.carts.forEach(function(cart, index){

    // create a dom element for the current cart
    var cartVisualization = document.createElement("div");
    cartVisualization.setAttribute("id", "train-cart-" + index);
    cartVisualization.setAttribute("class", "train-cart");
    // size it
    cartVisualization.style.width = "500px";
    cartVisualization.setAttribute("maxCapacity", cart.maxCapacity);
    cartVisualization.setAttribute("numCarts", 0);
    cartVisualization.textContent = (parseInt(cart.maxCapacity)-3).toString() + "~" + cart.maxCapacity
    // make it a dropzone
    interact(cartVisualization)
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.train-cargo',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.95,
        ondropactivate: function (event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;
          var cargoSize = draggableElement.getAttribute("capacity");
          var cartMaxCapacity = dropzoneElement.getAttribute("maxCapacity");

          // feedback the possibility of a drop
          dropzoneElement.classList.add('drop-target');
          if (parseInt(cargoSize) <= parseInt(cartMaxCapacity) && parseInt(cargoSize) > parseInt(cartMaxCapacity)-4) {
            draggableElement.classList.add('can-drop');
          } else {
            console.log("cargoSize: " + cargoSize, "cartMaxCapacity:" + cartMaxCapacity)
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
              event.relatedTarget.classList.remove('no-drop');
            } else if (draggableElement.classList.contains('can-drop')){
              var numCarts = parseInt(dropzoneElement.getAttribute("numCarts", 0));
              console.log("numCarts: " + numCarts)
              console.log(dropzoneElement)
              draggableElement.style.webkitTransform =
              draggableElement.style.transform =
                'translate(' + dropzoneElement.offsetLeft * numCarts + 'px, ' + dropzoneElement.offsetTop-50 + 'px)';
              draggableElement.setAttribute('data-x', dropzoneElement.offsetLeft * numCarts);
              // draggableElement.setAttribute('data-y', 0);
              interact(draggableElement).draggable(false);
              dropzoneElement.setAttribute("numCarts", (numCarts+1).toString())
              event.relatedTarget.classList.remove('can-drop');
            }
        },
        ondropdeactivate: function (event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
        }
      });
    // insert it into train visualization DOM element
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    container.appendChild(cartVisualization);
  });

}

var draggableCargos = [{capacity: 4}, {capacity: 8}, {capacity: 16}, {capacity: 10}, {capacity: 12}, {capacity: 4}];
var carts = [{maxCapacity: 4}, {maxCapacity: 8}, {maxCapacity: 12}, {maxCapacity: 16}];
var train = new TrainVisualization(draggableCargos, carts);
train.draw('train-drag-drop-example');
