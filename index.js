window.onload = function() {

	window.initialGame = {
		blocks: [2, 3, 4],
		cars: [2, 4, 3]
	}

	window.numClicks = 0;

	$(init);


}

function init() {
	$('#currentCarRegion').draggable();
	console.log("now draggable")
}

function buttonClicked() {
	window.numClicks += 1;
	document.getElementById("counter").innerHTML = window.numClicks;

}




