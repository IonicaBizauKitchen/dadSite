(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.controller = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var folders = {
	models: 21,
	drawings: 31,
	etchings: 10,
	monotypes: 13,
	paintings: 16,
	photography: 15
};

for(var prop in folders){
	for(var y = 1; y<=folders[prop]; y++){
		var picture = document.createElement('img');
		picture.src = '/images/'+prop+'/'+y+'.jpg';
	}
}

document.getElementById('menu').addEventListener("click", function(e) {
	var folder = e.target.innerHTML.toLowerCase();

	if(folder === '3d models'){
		folder = 'models';
	}
	console.log(folder);
	update(folder);
});

function update(folder){
	var container = document.getElementById('image');
	while(document.images.length){
		container.removeChild(document.images[0]);
	}
	for(var y = 1; y<=folders[folder]; y++){
		var picture = document.createElement('img');
		picture.src = '/images/'+folder+'/'+y+'.jpg';
		container.appendChild(picture);
	}
}
},{}]},{},[1])(1)
});