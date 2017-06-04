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

function TrainVisualization (draggableCarts, carts) {
  this.carts = carts;
  this.draggableCarts = draggableCarts
}

var CARGO_SIZE = 20
var CARGO_SPACING_Y = 80
var BUCKET_OFFSET_Y = 350
var CARGO_HEIGHT = 20 // sync with 'height' in .draggable-cart

TrainVisualization.prototype.draw = function(domId) {
  var container = document.getElementById(domId);

  this.draggableCarts.forEach(function(cargo, index){
    var draggableCart = document.createElement("div");
    draggableCart.setAttribute("id", "draggable-cart-" + index);
    draggableCart.setAttribute("class", "draggable-cart drag-drop");
    draggableCart.setAttribute("capacity", cargo.capacity);
    draggableCart.setAttribute("nextCart", "draggable-cart-" + (1+index));
    draggableCart.style.width = getCartWidthInPixel(cargo.capacity) + "px"
    draggableCart.style.height = CARGO_HEIGHT + "px"
    draggableCart.textContent = "cart #" + (1+index)//cargo.capacity
    draggableCart.style.visibility = "";

    interact(draggableCart)
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
    container.appendChild(draggableCart);

    var canvasName = "canvas-" + index;
    var t = new createNewCanvas(canvasName, draggableCart);
    var carWidth = cargo.capacity * CARGO_SIZE;
    var cargoWidth = 0;
    t.setWidth(carWidth+15);
    t.setHeight(20);
    document.getElementById(canvasName).parentElement.style.position = 'static';
    drawCarWithCargo(t, canvasName, carWidth, cargoWidth, 0);
  });

  var tmp = 0;
  container.appendChild(document.createElement('br'));
  this.carts.forEach(function(cart, index){
    // create a dom element for the current cart
    var bucket = document.createElement("div");
    bucket.setAttribute("id", "bucket-" + index);
    bucket.setAttribute("class", "bucket");
    // size it
    bucket.style.width = (getCartWidthInPixel(cart.maxCapacity)).toString() + "px";
    bucket.setAttribute("maxCapacity", cart.maxCapacity);
    bucket.setAttribute("cartLength", 0);
    bucket.setAttribute("numCarts", 0);
    bucket.setAttribute("xOffset", tmp);
    tmp += getCartWidthInPixel(cart.maxCapacity) + 5;
    bucket.textContent = (parseInt(cart.maxCapacity)-3).toString() + "~" + cart.maxCapacity
    // make it a dropzone
    interact(bucket)
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.draggable-cart',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.4,
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
            //console.log("cargoSize: " + cargoSize, "cartMaxCapacity:" + cartMaxCapacity)
            draggableElement.classList.add('no-drop');
          }
        },
        ondragleave: function (event) {
          // remove the drop feedback style
          event.target.classList.remove('drop-target');
          event.relatedTarget.classList.remove('can-drop');
          event.relatedTarget.classList.remove('no-drop');
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
              var cartLength = parseInt(dropzoneElement.getAttribute("cartLength", 0));
              var numCarts = parseInt(dropzoneElement.getAttribute("numCarts", 0));
              var cargoCapacity = parseInt(draggableElement.getAttribute("capacity", 0));

              // var x = cartLength * CARGO_SIZE - draggableElement.offsetLeft;
              // var y = dropzoneElement.offsetTop - draggableElement.offsetTop;
              var y = BUCKET_OFFSET_Y + (numCarts) * CARGO_SPACING_Y - draggableElement.offsetTop;
              var x = parseInt(dropzoneElement.getAttribute("xOffset"))- draggableElement.offsetLeft ;
              draggableElement.style.webkitTransform =
              draggableElement.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
              draggableElement.setAttribute('data-x', x);
              draggableElement.setAttribute('data-y', y);
              // no more draggable
              interact(draggableElement).draggable(false);
              event.relatedTarget.classList.add('drop-done');

              dropzoneElement.setAttribute("cartLength", (cargoCapacity+cartLength).toString())
              dropzoneElement.setAttribute("numCarts", (1+numCarts).toString())
              event.relatedTarget.classList.remove('can-drop');

              // make the next cart visible
              if (document.getElementById(draggableElement.getAttribute("nextCart")) != null) {
                document.getElementById(draggableElement.getAttribute("nextCart")).style.visibility = "";
              }

            }
        },
        ondropdeactivate: function (event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
        }
      });
    // insert it into train visualization DOM element
    container.appendChild(bucket);
  });

}


function getCartWidthInPixel(numCart) {
  return numCart * CARGO_SIZE + 15;
}
function createNewCanvas(id, parentNode) {
  this.canvas = document.createElement('canvas');
  this.canvas.id = id;
  parentNode.appendChild(this.canvas);
  return new fabric.StaticCanvas(id)
}
function drawCarWithCargo(canvas, id, carWidth, cargoWidth, leftOffset) {
  var wheel1 = id + "Wheel1";
  var wheel2 = id + "Wheel2";
  var car = id + "Car";
  var loadedCargo = id + "Cargo";
  var yOffset = 5;
  window[wheel1] = new fabric.Circle({
      top: yOffset, left: leftOffset+3, radius:5, fill: 'gray',
      stroke: 'black', strokeWidth: 2
  });
  window[wheel2] = new fabric.Circle({top: yOffset, left: leftOffset+carWidth-10-3, radius:5, fill: 'gray',stroke: 'black', strokeWidth: 2});
  window[car] = new fabric.Rect({top: yOffset-5, left: leftOffset, width: carWidth, height: 10, fill: 'gray', stroke: 'black', strokeWidth: 2});
  canvas.add(window[car],window[wheel1], window[wheel2]);

  window[loadedCargo] = new fabric.Rect({top: yOffset-25, left: leftOffset, width: cargoWidth, height: 20, fill: 'red'});
  canvas.add(window[loadedCargo]);
}



var draggableCarts = [
  {capacity: 4}, {capacity: 8}, {capacity: 16},
  {capacity: 10}, {capacity: 12}, {capacity: 4},
  {capacity: 2}, {capacity: 8}, {capacity: 4},  {capacity: 6}];
var carts = [{maxCapacity: 4}, {maxCapacity: 8}, {maxCapacity: 12}, {maxCapacity: 16}];
var train = new TrainVisualization(draggableCarts, carts);
train.draw('train-drag-drop-example');
document.getElementById("draggable-cart-0").style.visibility = "";
