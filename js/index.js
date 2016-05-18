$(document).ready(function() {
	$(".name").fitText();
	$('#fullpage').fullpage({
		anchors: ['firstPage', 'secondPage', 'thirdPage']
	});

	window.addEventListener("load", draw);
	window.addEventListener("resize", draw);

	function draw() {
		var canvas = document.querySelector('canvas.contentBackground');
		var canvasContainer = document.querySelector('.contactCard');
		var oneEm = Math.floor(Number(getComputedStyle(canvasContainer, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]));
		canvas.width = Math.floor(canvasContainer.clientWidth);
		canvas.height = Math.floor(canvasContainer.clientHeight);
		var canvasPadding = 0.5 * oneEm;

		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');

			var gradient = ctx.createLinearGradient(0, 0, 170, 0);
			gradient.addColorStop("0", "#408FEE");
			gradient.addColorStop("1", "#0375EE");

			ctx.shadowBlur = 0.5 * oneEm;
			ctx.shadowColor = "#038AFF";

			ctx.fillStyle = "#000";
			ctx.strokeStyle = gradient;
			ctx.lineWidth = 0.1 * oneEm;

			ctx.moveTo(0 + canvasPadding, oneEm + canvasPadding);
			ctx.lineTo(oneEm + canvasPadding, 0 + canvasPadding);
			ctx.lineTo(canvas.width - oneEm - canvasPadding, 0 + canvasPadding);
			ctx.lineTo(canvas.width - canvasPadding, oneEm + canvasPadding);
			ctx.lineTo(canvas.width - canvasPadding, canvas.height - oneEm - canvasPadding);
			ctx.lineTo(canvas.width - oneEm - canvasPadding, canvas.height - canvasPadding);
			ctx.lineTo(oneEm + canvasPadding, canvas.height - canvasPadding);
			ctx.lineTo(0 + canvasPadding, canvas.height - oneEm - canvasPadding);
			ctx.lineTo(0 + canvasPadding, oneEm + canvasPadding);

			ctx.fill();
			ctx.stroke();
		}
	}

	var starClassArray = ["O", "B", "A", "F", "F", "F", "G", "G", "G", "G", "G", "G", "G", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "K", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M"];

	function generateStarfield(starCount, containerSelector, avgFreq) {
		for (i = 0; i < starCount; i++) {
			x = Math.random() * 100;
			y = Math.random() * 100;
			magnitude = Math.random();
			starClass = starClassArray[Math.floor(Math.random() * starClassArray.length)];
			new Star(x, y, magnitude, starClass, i, containerSelector);
		}
		twinkleEvent(avgFreq, starCount);
	}

	function twinkleEvent(avgFreq, elementCount) {
		if (!document.querySelector("body.scrolling")) {
			// -> removing the class
			var element = document.querySelector("#no" + Math.floor(Math.random() * elementCount));
			element.classList.remove("twinkle");

			// -> triggering reflow /* The actual magic */
			// without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
			element.offsetWidth = element.offsetWidth;

			// -> and re-adding the class
			element.classList.add("twinkle");
		}
		setTimeout(function() {
			twinkleEvent(avgFreq, elementCount);
		}, Math.random() * 1000 + 1000 / avgFreq);
	}

	function Star(x, y, magnitude, classString, number, containerSelector) {
		var starObject = document.createElement("div");
		var container = document.querySelector(containerSelector);
		starObject.className = "star " + classString;
		starObject.id = "no" + number;
		starObject.style.left = x + "%";
		starObject.style.top = y + "%";

		starObject.style.opacity = magnitude;

		starObject.style.position = "absolute";
		container.appendChild(starObject);
	}

	(function init() {
		generateStarfield(300, '.starfield', 500000);
	})();

	function debounce(fn, delay) {
		var timer = null;
		return function() {
			var context = this,
				args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		};
	}

	var scrollAnimationDelay;

	$(window).on('scroll', debounce(function(event) {
		clearTimeout(scrollAnimationDelay);
		scrollAnimationDelay = setTimeout(function() {
			$("body").removeClass("scrolling");
		}, 505);
	}, 500));

	$(window).scroll(function() {
		$("body").addClass("scrolling");
	});
});