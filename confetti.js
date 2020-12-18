(function () {
	var confetti = {
		maxCount: 150, //set max confetti count
		frameInterval: 15, //the confetti animation frame interval in milliseconds
		alpha: 1.0, //the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
		start: null, //call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
		stop: null, //call to stop adding confetti
	};
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	var supportsAnimationFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	var colors = [
		"rgba(30,144,255,",
		"rgba(107,142,35,",
		"rgba(255,215,0,",
		"rgba(255,192,203,",
		"rgba(106,90,205,",
		"rgba(173,216,230,",
		"rgba(238,130,238,",
		"rgba(152,251,152,",
		"rgba(70,130,180,",
		"rgba(244,164,96,",
		"rgba(210,105,30,",
		"rgba(220,20,60,",
	];
	var streamingConfetti = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	startConfetti(2000);
	function resetParticle(particle, width, height) {
		particle.color =
			colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 =
			colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function runAnimation() {
		if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}
	function startConfetti(timeout) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				}
			);
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute(
				"style",
				"display:block;z-index:999999;pointer-events:none;position:fixed;top:0",
			);
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener(
				"resize",
				function () {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
				},
				true,
			);
			context = canvas.getContext("2d");
		} else if (context === null) context = canvas.getContext("2d");
		var count = confetti.maxCount;

		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function drawParticles(context) {
		var particle;
		var x, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;

		if (!streamingConfetti && particles.length < 2) return removeCanvas();

		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15) particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle) - 0.5;
				particle.y +=
					(Math.cos(waveAngle) + particle.diameter + 2) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}

	function removeCanvas() {
		particles.length = 0;
		var canvas = document.getElementById("confetti-canvas");
		if (canvas) canvas.remove();
	}
})();
