# confetti.js

A simple confetti animation overlay for your website :)

Just add ```<script src="confetti.js"></script>``` to your website!

![confetti demo](https://i.imgur.com/Tjc8NvJ.png)

Import the file, then call one of the following available functions:

    startConfetti(); //starts the confetti animation
    stopConfetti(); //stops adding confetti
    toggleConfetti(); //starts or stops the confetti animation depending on whether it's already running
    removeConfetti(); //stops the confetti animation and remove all confetti immediately

You can configure these parameters:

    var maxParticleCount = 150; //set max confetti count
    var particleSpeed = 2; //set the particle animation speed

For a live demo, [click here](https://feelingunlucky.today) and click on the arrow at the side of the search bar.

The demo uses this function:

    function throwConfetti() {
        maxParticleCount = Math.random() * 250 + 5;
        startConfetti();
        setInterval(function() {
            stopConfetti();
        }, 1200);
    }

Enjoy!
