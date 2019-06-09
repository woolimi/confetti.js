# confetti.js

The simplest confetti animation overlay for your website (no libraries required) :)

Just add ```<script src="//feelingunlucky.today/js/confetti.js"></script>``` to your website and call `confetti.start(1200)`!

![confetti demo](https://i.imgur.com/Tjc8NvJ.png)

You can call any of the following available functions:

	confetti.start();			//call to start confetti animation (keeps going until stopped manually)
	confetti.start(timeout);	//call to start confetti animation with confetti timeout in milliseconds (if timeout is 0, it will keep going until stopped manually)
	confetti.start(timeout, amount);	//like confetti.start(timeout), but also specifies the number of confetti particles to throw (50 would be a good example)
	confetti.start(timeout, min, max);	//like confetti.start(timeout), but also the specifies the number of confetti particles randomly between the specified minimum and maximum amount
	confetti.stop();			//call to stop adding confetti
	confetti.toggle();			//call to start or stop the confetti animation depending on whether it's already running
	confetti.pause();			//call to freeze confetti animation
	confetti.resume();			//call to unfreeze confetti animation
	confetti.togglePause();		//call to toggle whether the confetti animation is paused
	confetti.remove();			//call to stop the confetti animation and remove all confetti immediately
	confetti.isPaused();		//call and returns true or false depending on whether the confetti animation is paused
	confetti.isRunning();		//call and returns true or false depending on whether the animation is running

You can also configure these parameters:

	confetti.maxCount = 150;		//set max confetti count
	confetti.speed = 2;				//set the particle animation speed
	confetti.frameInterval = 20;	//the confetti animation frame interval in milliseconds
	confetti.alpha = 1.0;			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	confetti.gradient = false;		//whether to use gradients for the confetti particles

For a live demo, [click here](https://feelingunlucky.today) and search something, anything :)

The demo uses this function:

	confetti.start(1200, 50, 150);

which throws a random number of confetti particles between 50 and 150 for 1200 milliseconds (1.2 seconds).

Enjoy!
