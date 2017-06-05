"use strict";


balanceInit();

function textNode(input) {
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'inline-text')
  
  textDiv.textContent = input
  return textDiv
}

function balanceInit() {
  var container = document.getElementById('balance-sheet')

  var imageDiv = document.createElement("div");
  var imgObj = document.createElement("img");
  imgObj.setAttribute("src", "figures/compare-firstfit.png");
  imgObj.setAttribute("height", "120px");
  imageDiv.appendChild(imgObj);
  imageDiv.appendChild(textNode('Cars Checked: 8'));
  imageDiv.appendChild(document.createElement('br'));
  imageDiv.appendChild(textNode('Train Loaded by First Fit'));
  imageDiv.appendChild(document.createElement('br'));

  imgObj = document.createElement("img");
  imgObj.setAttribute("src", "figures/compare-bestfit.png");
  imgObj.setAttribute("height", "120px");
  imageDiv.appendChild(imgObj);
  imageDiv.appendChild(textNode('Cars Checked: 16'));
  imageDiv.appendChild(document.createElement('br'));
  imageDiv.appendChild(textNode('Train Loaded by Best Fit'));
  imageDiv.appendChild(document.createElement('br'));

  // text
  var textDiv = document.createElement('p');
  textDiv.setAttribute('class', 'text')
  textDiv.setAttribute('id', 'balance-text-div');
  textDiv.innerHTML = "In first fit, we have <b>more wasted space</b> but <b>low time cost</b>.<br>"
  textDiv.innerHTML += "In best fit, we have <b>less wasted space</b> but <b>high time cost</b>.<br><br>"
  textDiv.innerHTML += "With first fit, we are able to place a piece of cargo more quickly, but we’re not careful about where we place it in the train."
  textDiv.innerHTML += " On the other hand, with best fit, we spend more time placing each place of cargo, but makes it easier to place future pieces of cargo."
  textDiv.innerHTML += "However, neither strategy is perfect: each has its tradeoffs for time and space efficiency.<br>";
  textDiv.innerHTML += "In fact, balancing these two is necessary for memory allocation as well!";

  imageDiv.appendChild(textDiv)
  container.appendChild(imageDiv);

}