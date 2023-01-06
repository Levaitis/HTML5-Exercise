let accelerometer = null;
var error_card = document.getElementById("error_acc");
var error_message = document.getElementById("error_acc_msg");
error_card.style.display = "none";
try {
    accelerometer = new Accelerometer({ referenceFrame: 'device' });
    accelerometer.addEventListener('error', (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
            // Branch to code for requesting permission.
        } else if (event.error.name === 'NotReadableError' ) {
            console.log('Cannot connect to the sensor.');
            error_card.style.display = "block";
            error_message.innerHTML = "Keine Verbindung zum Sensor möglich.";
        }
    });
    accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
    accelerometer.start();
} catch (error) {
    error_card.style.display = "block";
    // Handle construction errors.
    if (error.name === 'SecurityError') {
        // See the note above about permissions policy.
        console.log('Sensor construction was blocked by a permissions policy.');
    } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
        error_message.innerHTML = "Sensor wird vom Browser nicht unterstüzt.";
    } else {
        throw error;
    }
  };
  accelerometer.addEventListener("reading", () => reloadOnShake(accelerometer));
  accelerometer.start();
  
  window.ondevicemotion = function(event) { 
    var ax = accelerometer.x
    var ay = accelerometer.y
    var az = accelerometer.z
  
    document.querySelector("#x_acc").innerHTML = "X = " + ax;
    document.querySelector("#y_acc").innerHTML = "Y = " + ay;
    document.querySelector("#z_acc").innerHTML = "Z = " + az;
}
