let accelerometer = null;
var error_card = document.getElementById("error_acc");
var error_message = document.getElementById("error_acc_msg");
error_card.style.display = "none";

function init_acc(element) {
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
        // accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
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

        var scaling = 5;
       
        document.querySelector("#x_acc").innerHTML = +ax.toFixed(2);
        var x_prog = document.querySelector("#x_acc_progress");
        x_prog.style = "width: "+ Math.abs(ax*scaling) +"%";
        x_prog.ariaValueNow = ax*scaling;
        if( ax >= 0) {
            x_prog.classList.replace("bg-danger","bg-success");
        } else {
            x_prog.classList.replace("bg-success","bg-danger");
        }

        document.querySelector("#y_acc").innerHTML = +ay.toFixed(2);;
        var y_prog = document.querySelector("#y_acc_progress");
        y_prog.style = "width: "+ Math.abs(ay*scaling) +"%";
        y_prog.ariaValueNow = ay*scaling;
        if( ay >= 0) {
            y_prog.classList.replace("bg-danger","bg-success");
        } else {
            y_prog.classList.replace("bg-success","bg-danger");
        }
        

        document.querySelector("#z_acc").innerHTML = +az.toFixed(2);;
        var z_prog = document.querySelector("#z_acc_progress");
        z_prog.style = "width: "+ Math.abs(az*scaling) +"%";
        z_prog.ariaValueNow = az*scaling;
        if( az >= 0) {
            z_prog.classList.replace("bg-danger","bg-success");
        } else {
            z_prog.classList.replace("bg-success","bg-danger");
        }

    });
    accelerometer.start();
    }
    
    //Toggle Button
    element.classList.toggle("pressed");
}
