var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

loadImages(
    {
        bg: 'Original game assets/Layout.bmp',
        spriteSheet: 'Original game assets/SPRITES.bmp',
    },
    function(results) {
        // Draw results.bg 
        ctx.drawImage(results.bg, 0, 0);

        // Clip from spritesheet
        ctx.rect(30, 30, 40, 50);
        ctx.clip();
        ctx.drawImage(results.spriteSheet, -50, -500);
    }
);

/**
* Load a set of images all at once.
*
* @param {object} images - A dictionary. Key = image name. Value = URL.
* @param {function} onDone - function to be called when loading is done
*                            it will be called with the value of "results"
*/
function loadImages(images, onDone) {
   // Dictionary from image name to Image.
   var results = {};

   var doneLoadCount = 0;
   var totalToLoad = 0;

   for (var name in images) {
       totalToLoad += 1;
   }

   function makeImage(name, src) {
       var img = new Image;

       img.addEventListener('load', function() {
           results[name] = img;

           doneLoadCount += 1;

           if (doneLoadCount === totalToLoad) {
               onDone(results);
           }
       });

       img.addEventListener('error', function(error) {
           console.error('Error loading image', src, error);
       });

       img.src = src;
   }

   for (var name in images) {
       var src = images[name];
       makeImage(name, src);
   }
}

function clipCards(spriteSheet, xClip, yClip) {
    
}
