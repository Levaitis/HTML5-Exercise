window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#x_acc").innerHTML = "X = " + ax;
	document.querySelector("#y_acc").innerHTML = "Y = " + ay;
	document.querySelector("#z_acc").innerHTML = "Z = " + az;
}