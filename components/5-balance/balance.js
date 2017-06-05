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
  imgObj.setAttribute("height", "145px");
  imageDiv.appendChild(imgObj);
  imageDiv.appendChild(textNode('Cost: 8'));
  imageDiv.appendChild(document.createElement('br'));
  imageDiv.appendChild(textNode('First Fit'));
  imageDiv.appendChild(document.createElement('br'));

  imgObj = document.createElement("img");
  imgObj.setAttribute("src", "figures/compare-bestfit.png");
  imgObj.setAttribute("height", "145px");
  imageDiv.appendChild(imgObj);
  imageDiv.appendChild(textNode('Cost: 12'));
  imageDiv.appendChild(document.createElement('br'));
  imageDiv.appendChild(textNode(' Best Fit'));
  imageDiv.appendChild(document.createElement('br'));

  // text
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'balance-text')
  textDiv.innerHTML = "In first fit, we have low cost but more wasted space.<br>"
  textDiv.innerHTML += "In best fit, we have high cost but less wasted space.<br>"
  textDiv.innerHTML += "Because for the first fit, we are able to place a piece of cargo more quickly, but we’re not careful about where we place it."
  textDiv.innerHTML += "On the other hand, for the best fit, we spend more time place each place of cargo, but leaves more room for place more future pieces of cargo."
  textDiv.innerHTML += "However, neither strategy is ideal."

  imageDiv.appendChild(textDiv)
  container.appendChild(imageDiv);

}