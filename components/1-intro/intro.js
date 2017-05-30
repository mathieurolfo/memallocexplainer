/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */
var startPos = {x:0, y:0};

interact('.draggable')
  .on('dragstart', function (event) {
    var rect = interact.getElementRect(event.target);
    startPos.x = rect.left + rect.width/2;
    startPos.y = rect.top + rect.height/2;
    // event.draggable.snap({
    //   anchors:[startPos]
    // });

  })

interact('.draggable')
  .draggable({
    // snap: {
    //   targets: [
    //     interact.createSnapGrid({ x: 30, y: 30 })
    //   ],
    //   range: Infinity,
    //   relativePoints: [ { x: 0, y: 0 } ],
    //   // endOnly: true,
    // },
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
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

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

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;


// enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    // draggableElement.textContent = 'Dragged in';
    if (parseInt(dropzoneElement.getAttribute("width")) >= parseInt(draggableElement.getAttribute("width"))) {
      draggableElement.classList.add('can-drop');
      draggableElement.textContent = "Drop-me";
    } else {
      draggableElement.classList.add('no-drop');
      draggableElement.textContent = "Can't load";
    }
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
    event.relatedTarget.classList.remove('no-drop');
    event.relatedTarget.textContent = 'Drag-me'
    // event.draggable.snap({
    //   anchors: [startPos]
    // })
    // event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
      var draggableElement = event.relatedTarget;
      if (draggableElement.classList.contains('no-drop')){
        event.relatedTarget.textContent = "Can't load";
      }else{
        event.relatedTarget.textContent = "Loaded";
      }


  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});
