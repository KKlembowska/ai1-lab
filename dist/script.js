/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var state = {
  currentStyleIndex: 0,
  // Initial style index
  styleDictionary: {
    style1: 'style/style1.css',
    style2: 'style/style2.css',
    style3: ''
  }
};
function switchStyle(x) {
  var styleLink = document.getElementById('style-link');
  var newStyleIndex = x;
  var newStyle = "style".concat(newStyleIndex + 1);
  var newStylePath = state.styleDictionary[newStyle];
  if (styleLink && newStylePath) {
    styleLink.href = newStylePath;
    state.currentStyleIndex = newStyleIndex;
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var styleLink = document.getElementById('style-link');
  var totalStyles = Object.keys(state.styleDictionary).length;
  var styleTable = document.getElementById('link-table');
  var _loop = function _loop(i) {
    var listitem = document.createElement('li');
    listitem.className = "list-item";
    styleTable === null || styleTable === void 0 ? void 0 : styleTable.appendChild(listitem);
    var link = document.createElement('a');
    link.href = '#';
    link.innerHTML = "Styl " + i;
    listitem === null || listitem === void 0 ? void 0 : listitem.appendChild(link);
    if (styleLink && link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        switchStyle(i);
      });
    }
  };
  for (var i = 0; i < totalStyles; i++) {
    _loop(i);
  }
  switchStyle(0);
});
/******/ })()
;