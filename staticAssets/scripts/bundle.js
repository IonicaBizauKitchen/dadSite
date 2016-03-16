(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var model = require('./model');

var controller = {
	init: function(){
		var view = require('./view');
		view.init(20);
	},
	prepareInfiniteScroll: function(y){
		var slider = document.getElementById('fences');

		for(var x = 0; x<=y; x++){
			createImage(x);
		};

		function createImage(x){
			var img = document.createElement('div');
			img.setAttribute('class', 'image');
			img.classList.add('original');
			var uniqueClass = getImageClass(x);
			img.classList.add(uniqueClass);
			img.innerHTML = x;
			slider.appendChild(img);
		};

		function getImageClass(x){
			if(x===10){
				return model.countries[0];
			}else if(x===11){
				return model.countries[1];
			}else if(x===12){
				return model.countries[2];
			}else{
				return x;
			}
		};

		this.appendClones();

		var startImage = document.getElementsByClassName('0')[0];
		this.scrollTo('init', startImage);
	},
	appendClones: function(){
		var slider = document.getElementById('fences');
		var images = document.getElementsByClassName('image');
		var imageSize = images[0].clientWidth;
		var numImagesPerPage = Math.round(slider.offsetWidth/imageSize)+1;
		var lastOriginalImageIndex = document.getElementsByClassName('original').length-1;
		var lastCloneIndex = lastOriginalImageIndex-numImagesPerPage;
		var clones = document.getElementsByClassName('clone');
		var originals = document.getElementsByClassName('original');

		function createClone(x){
			var clone = originals[x].cloneNode(true);
			clone.classList.remove('original');
			clone.classList.add('clone');
			return clone;
		}

		while (clones.length !== 0) {
			clones[0].parentNode.removeChild(clones[0]);
		}

		for(var x = lastOriginalImageIndex; x>lastCloneIndex; x--){
			slider.insertBefore(createClone(x), slider.childNodes[0]);
		}
	},
	userScrolling: function(){
		var slider = document.getElementById('fences');
		var clones = document.getElementsByClassName('clone');
		var originals = document.getElementsByClassName('original');
		var end = Math.round(slider.scrollWidth-slider.offsetWidth);

		this.clearSelection();

		if(slider.scrollLeft === 0){
			var cloneClass = clones[0].classList[1];
			var targetImage = document.getElementsByClassName(cloneClass)[1];
			this.scrollTo('scroll', targetImage);
		}else if(slider.scrollLeft === end){
			var targetImage = clones[clones.length-1];
			this.scrollTo('scroll', targetImage);
		}
	},
	changeImageSize: function(change){
		var images = document.getElementsByClassName('image');
		var imageWidth = images[0].clientWidth;
		var imageHeight = images[0].clientHeight;
		var largest = document.getElementById('container').clientHeight;
		var smallest = 60;
		var ratio;
		var targetHeight;
		var targetWidth;

		if(change==='add'){
			ratio = 1.5;
			targetHeight = imageHeight*ratio;
			if (targetHeight>largest){
				targetHeight=largest;
				ratio = targetHeight/imageHeight;
			}
		}else if(change==='substract'){
			ratio = 0.75;
			targetHeight = imageHeight*ratio;
			if(targetHeight<smallest){
				targetHeight=smallest;
				ratio = targetHeight/imageHeight;
			}
		}

		targetWidth = imageWidth*ratio;

		for(var x=0; x<images.length; x++){
			images[x].style.width = targetWidth+'px';
			images[x].style.height = targetHeight+'px';
		}

		this.appendClones();

		var selectedImage = document.getElementsByClassName('selected');

		if(selectedImage.length === 1){
			this.scrollTo('resize', selectedImage[0]);
		}
	},
	findSearchedCountry: function(e, v){
		this.clearSelection();

		if(e.keyCode === 13){
		 	document.getElementsByTagName('input')[0].value = '';
		 	var images = document.getElementsByClassName('image');
		 	var selectedCountry = document.getElementsByClassName(v.toLowerCase())[0];
		 	this.focussing(selectedCountry);
		}
		//else fuzzy search
	},
	focussing: function(x){
		var images = document.getElementsByClassName('image');
		var indexOfSelectedImage = Array.prototype.indexOf.call(images, x);
		x.classList.add('selected');
		this.scrollTo('focussing', x);
		var link = model.sources[indexOfSelectedImage];
		console.log(link);
	},
	scrollTo: function(trigger, image){
		var images = document.getElementsByClassName('image');
		var indexOfImage = Array.prototype.indexOf.call(images, image);
		var slider = document.getElementById('fences');
		var imageClass = image.classList[2];
		var position;

		function clonesCenteringAdjustmentNeeded(){
			var middleClone = document.getElementsByClassName('clone').length/2;
			if(indexOfImage<=middleClone&&indexOfImage!==-1){
				//check why that -1 is needed
				return true;
			}else{
				return false;
			}
		};

		function centeredPosition(x){
			var windowMiddle = (slider.offsetWidth)/2;
			var imageHalfWidth = (x.clientWidth)/2;
			var position = (x.offsetLeft)-windowMiddle+imageHalfWidth;
			return position;
		};

		switch(trigger){
			case 'focussing':
				if(clonesCenteringAdjustmentNeeded()){
					image = document.getElementsByClassName(imageClass)[1];
				}

				image.classList.toggle('ignoreScrollMarker');
				position = centeredPosition(image);
				slider.scrollLeft = position;
				image.classList.toggle('ignoreScrollMarker');
				break;
			case 'resize':
				image.classList.toggle('ignoreScrollMarker');
				position = centeredPosition(image);
				slider.scrollLeft = position;
				image.classList.toggle('ignoreScrollMarker');
				break;
			case 'init':
				position = image.offsetLeft;
				slider.scrollLeft = position;
				break;
			case 'scroll':
				var end = Math.round(slider.scrollWidth-slider.offsetWidth);
				var ignore = document.getElementsByClassName('ignoreScrollMarker');

				if(slider.scrollLeft === 0 && ignore.length===0){
					position = image.offsetLeft;
				}else if(slider.scrollLeft === end && ignore.length===0){
					var imageSize = image.clientWidth;
					position = (image.offsetLeft)-(slider.offsetWidth-imageSize);
				}
				slider.scrollLeft = position;
				break;
		};

	},
	clearSelection: function(){
		var ignore = document.getElementsByClassName('ignoreScrollMarker');
		var selectedImage = document.getElementsByClassName('selected');
		if(ignore.length===0 && selectedImage.length!==0){
			console.log('clearing');
			selectedImage[0].classList.remove('selected');
		}
	},
	windowResize: function(){
		this.appendClones();
	}
}

module.exports = controller	;
controller.init();
},{"./model":2,"./view":3}],2:[function(require,module,exports){
var model = {
	countries: [
		'canada',
		'ukraine',
		'u.s.a'
	],
	sources: [
		'https://www.google.ca/maps/search/google+maps/@45.4579956,-73.6406172,3a,75y,30.74h,87.2t/data=!3m7!1e1!3m5!1stJRoAYkry6Jzc_I72Mfzkg!2e0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3DtJRoAYkry6Jzc_I72Mfzkg%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D97.5%26pitch%3D-18.999996!7i13312!8i6656',
		'https://www.google.ca/maps/search/google+maps/@45.4793767,-73.4695146,3a,75y,315.01h,87.11t/data=!3m7!1e1!3m5!1sgFyj-_XPD89XuwaDeCFhkg!2e0!6s%2F%2Fgeo0.ggpht.com%2Fcbk%3Fpanoid%3DgFyj-_XPD89XuwaDeCFhkg%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D349.5%26pitch%3D-3!7i13312!8i6656',
		'https://www.google.ca/maps/search/google+maps/@45.5664567,-73.5684767,3a,75y,239.6h,82.47t/data=!3m8!1e1!3m6!1s-p2jtABzslyA%2FUu2vNyo8LaI%2FAAAAAAAKULo%2FPHYUtqb-pCE!2e4!3e11!6s%2F%2Flh6.googleusercontent.com%2F-p2jtABzslyA%2FUu2vNyo8LaI%2FAAAAAAAKULo%2FPHYUtqb-pCE%2Fw203-h101-n-k-no%2F!7i10000!8i5000'
	]

}

module.exports = model;
},{}],3:[function(require,module,exports){
var controller = require('./controller');

var view = {
	init: function(y){

		controller.prepareInfiniteScroll(y);

		document.getElementById('fences').addEventListener('scroll', function(){
			controller.userScrolling();
		});

		document.getElementsByTagName('input')[0].addEventListener('keydown', function(e){
			controller.findSearchedCountry(e, this.value);
		}, false);


		document.getElementById('add').addEventListener('click', function(){
			controller.changeImageSize('add');
		});

		document.getElementById('substract').addEventListener('click', function(){
			controller.changeImageSize('substract');
		});

		window.addEventListener('resize', function(){
			controller.windowResize();
		});

		var images = document.getElementsByClassName('image');
		for(var x = 0; x<images.length; x++){
			images[x].addEventListener('click', function(){
				controller.focussing(this);
			});
		}
	}
}

module.exports = view;
},{"./controller":1}]},{},[1]);
