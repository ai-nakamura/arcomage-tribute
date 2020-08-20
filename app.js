var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bg = new Image;

// onload is older 'load' handler. It can only hold one event so it's not used as often anymore.
// bg.onload = function() { ctx.drawImage(bg, 0, 0); };
bg.addEventListener('load', function() {
	ctx.drawImage(bg, 0, 0);
});
bg.src = 'Original game assets/Layout.bmp';

