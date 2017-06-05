"use strict";

var clicked = false;

function demoLoadClicked1() {
	if (!clicked) {
		$('#malloc-cargo-box-1').animate({"bottom": "-=100"});
		$('#malloc-demo-2').css("visibility", "visible");
		$('#demo-load-button-1').addClass("disabled");
		clicked = true;
	}
	
}

function demoLoadClicked2() {
	$('#malloc-cargo-box-2').animate({"bottom": "-=100"});
	$('#malloc-cargo-box-2').animate({"bottom": "+=100"});
	$('#malloc-section-end').css("visibility", "visible");
}

function loadMallocText() {
	console.log("called")
	$('#malloc-description-text').html("This is malloc");
}
