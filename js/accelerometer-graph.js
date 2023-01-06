let accelerometer = null;
var error_card = document.getElementById("error_acc");
var error_message = document.getElementById("error_acc_msg");
error_card.style.display = "none";

function init_acc(element) {
    //Toggle Button
    if(element.classList.contains("pressed")) {
        //STOP recording of Data
        if(accelerometer) {
            accelerometer.stop();
        } else {
            console.log("No sensor was found.")
        }
        element.innerHTML='Start <i class="fas fa-play"></i>';
        element.classList.replace("btn-danger","btn-success");
        error_card.style.display = "none";
    } else {
        //Start recording of Data
        element.innerHTML='Stop <i class="fas fa-stop"></i>'
        element.classList.replace("btn-success","btn-danger");
    
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
            error_message.innerHTML = "Sensor API wird vom Browser nicht unterstüzt.";
        } else {
            throw error;
        }
    };
    accelerometer.addEventListener("reading", () => {
        var ax = accelerometer.x
        var ay = accelerometer.y
        var az = accelerometer.z
    
        document.querySelector("#x_acc").innerHTML = ax;
        document.querySelector("#x_acc_progress").style = "width: "+ ax*10 +"%";
        document.querySelector("#x_acc_progress").ariaValueNow = ax*10;

        document.querySelector("#y_acc").innerHTML = ay;
        document.querySelector("#y_acc_progress").style = "width: "+ ay*10 +"%";
        document.querySelector("#y_acc_progress").ariaValueNow = ay*10;

        document.querySelector("#z_acc").innerHTML = az;
        document.querySelector("#z_acc_progress").style = "width: "+ az*10 +"%";
        document.querySelector("#z_acc_progress").ariaValueNow = az*10;
    });
    accelerometer.start();
    }
    element.classList.toggle("pressed");
}
