(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.controller = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function start(){

	var slider = document.getElementById('fences');
	var windowMiddle = (slider.offsetWidth)/2;
	var end, originals, imageSize, numImagesPerPage, clones, images, selected;

	function preload(){
		var start = new Date().getTime();
		var loader = document.createElement('img');
		loader.setAttribute('id', 'loader');
		loader.src = 'images/loader.gif';
		fences.appendChild(loader);

		function preloadImage(x){
			var picture = loadImage(x);

			if(x===20){
				picture.onload = function(){
					fences.removeChild(loader);
					var end = new Date().getTime();
					console.log('finished', (end-start)/1000);
					setTimeout(function(){sliderStart()}, 2);
				};
			}
		};

		for(var x = 1; x<=20; x++){
			preloadImage(x);
		};
	};

	function loadImage(x){
		var picture = document.createElement('img');
		picture.src = '/images/'+x+'.jpeg';
		return picture;
	};

	function sliderStart(){
		prepareInfiniteScroll();

		slider.addEventListener('scroll', function(){
			clearSelection();
			scrolling();
		});

		document.getElementsByTagName('input')[0].addEventListener('keydown', function(e){
			findSearchedCountry(e, this.value);
		}, false);


		document.getElementById('add').addEventListener('click', function(){
			changeImageSize('add');
		});

		document.getElementById('substract').addEventListener('click', function(){
			changeImageSize('substract');
		});

		window.addEventListener('resize', function(){
			windowResize();
		});

		for(var x = 0; x<document.images.length; x++){
			document.images[x].addEventListener('click', function(){
				focussing(this);
			});
		};
	};

	function prepareInfiniteScroll(){
		function createImage(x){
			var picture = loadImage(x);
			picture.classList.add('original');
			var uniqueClass = getImageClass(x);
			picture.classList.add(uniqueClass);
			slider.appendChild(picture);
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
			};
		};

		for(var x = 1; x<=20; x++){
			createImage(x);
		};

		originals = document.getElementsByClassName('original');
		imageSize = document.images[0].clientWidth;
		numImagesPerPage = Math.round(slider.offsetWidth/imageSize)+1;
		clones = document.getElementsByClassName('clone');

		appendClones();

		var position = originals[0].offsetLeft;
		scrolling(position);
	};

	function appendClones(selectedImage){
		var lastOriginalImageIndex = originals.length-1;
		var lastCloneIndex = lastOriginalImageIndex-numImagesPerPage;

		function createClone(x){
			var imageClass = originals[x].classList[1];
			var clone = originals[x].cloneNode(true);
			clone.removeAttribute('class');
			clone.setAttribute('class', 'clone '+imageClass);

			if(selectedImage!==undefined&&selectedImage.classList.contains('clone')){
				clone.classList.add('selected');
			}

			return clone;
		};

		while (clones.length !== 0) {
			clones[0].parentNode.removeChild(clones[0]);
		};

		for(var x = lastOriginalImageIndex; x>lastCloneIndex; x--){
			slider.insertBefore(createClone(x), slider.childNodes[0]);
		};

		images = document.images;
		end = Math.round(slider.scrollWidth-slider.offsetWidth);
	};

	function changeImageSize(change){
		var largest = document.getElementById('container').clientHeight*0.6;
		var smallest = document.getElementById('container').clientHeight*0.1;
		var ratio, targetHeight, targetWidth, imageHeight, imageWidth;
		var selectedImage = [];

		if(images[0].classList.contains('selected')){
			imageHeight = images[1].clientHeight;
			imageWidth = images[1].clientWidth;
		}else{
			imageHeight = images[0].clientHeight;
			imageWidth = images[0].clientWidth;
		};

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
		};

		targetWidth = imageWidth*ratio;

		for(var x=0; x<images.length; x++){
			images[x].style.width = targetWidth+'px';
			images[x].style.height = targetHeight+'px';
			if(images[x].classList.contains('selected')){
				selectedImage.push(images[x]);
			};
		};

		appendClones(selectedImage[0]);

		if(document.getElementsByClassName('selected').length){
			position = centeredPosition(document.getElementsByClassName('selected')[0]);
			scrolling(position);
		};
	};

	function findSearchedCountry(e, v){
		clearSelection();

		if(e.keyCode === 13){
		 	document.getElementsByTagName('input')[0].value = '';
		 	var selectedCountry = document.getElementsByClassName(v.toLowerCase())[0];
		 	focussing(selectedCountry);
		};
		//else fuzzy search
	};

	function focussing(x){
		clearSelection();
		var imageClass= x.classList[1];
		var indexOfSelectedImageInFullArray = Array.prototype.indexOf.call(images, x);
		var indexOfSelectedImageInOriginalsArray;
		var position;
		var image;

		function clonesCenteringAdjustmentNeeded(img){
			var index = Array.prototype.indexOf.call(images, img);
			var middleClone = clones.length/2;
			if(index<=middleClone){
				return true;
			}else{
				return false;
			}
		};

		if(x.classList.contains('clone')){
			var originalImage = document.getElementsByClassName(imageClass)[1];
			var index = Array.prototype.indexOf.call(originals, originalImage);
			indexOfSelectedImageInOriginalsArray = index;

			if(clonesCenteringAdjustmentNeeded(x)){
				image = document.getElementsByClassName(imageClass)[1];
			}else{
				image = x;
			}
		}else{
			image = x;
			var index = Array.prototype.indexOf.call(originals, image);
			indexOfSelectedImageInOriginalsArray = index;
		}

		position = centeredPosition(image);
		scrolling(position);

		var link = model.sources[indexOfSelectedImageInOriginalsArray];
		console.log(link);
	};

	function scrolling(position){
		console.log(end, slider.scrollLeft);
		function userScroll(){
			if(slider.scrollLeft === 0){
				var cloneClass = clones[0].classList[1];
				var targetImage = document.getElementsByClassName(cloneClass)[1];
				position = targetImage.offsetLeft;
				slider.scrollLeft = position;
			}else if(slider.scrollLeft === end){
				var targetImage = clones[clones.length-1];
				var imageSize = targetImage.clientWidth;
				position = (targetImage.offsetLeft)-(slider.offsetWidth-imageSize);
				slider.scrollLeft = position;
			}
			requestAnimationFrame(userScroll);
		};

		function appScroll(){
			slider.scrollLeft = position;
		};

		if(position !== undefined){
			appScroll();
		}else{
			userScroll();
		};
	};

	function centeredPosition(x){
		x.classList.add('selected');
		x.classList.add('ignoreScroll');
		selected = document.getElementsByClassName('selected');
		var imageHalfWidth = (x.clientWidth)/2;
		var position = (x.offsetLeft)-windowMiddle+imageHalfWidth;
		return position;
	};

	function clearSelection(){
		if(!document.getElementsByClassName('ignoreScroll').length){
			var selected = document.getElementsByClassName('selected');
			if(selected.length){
				selected[0].classList.remove('selected');
			};
		}else{
			document.getElementsByClassName('ignoreScroll')[0].classList.remove('ignoreScroll');
		}
	};

	function windowResize(){
		appendClones();
	};

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
	};

	preload();

};

start();
},{}]},{},[1])(1)
});