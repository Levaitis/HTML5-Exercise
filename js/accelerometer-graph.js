let accelerometer = null;
var error_card = document.getElementById("error_acc");
var error_message = document.getElementById("error_acc_msg");
error_card.style.display = "none";

//Values for graph
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
const acg = document.getElementById('acc_graph');
var acc_graph = null;

var arr_x_data = [];
var arr_y_data = [];
var arr_z_data = [];

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

        draw_graph();
    } else {
        //Start recording of Data
        element.innerHTML='Stop <i class="fas fa-stop"></i>'
        element.classList.replace("btn-success","btn-danger");

        init_graph();
    
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
       
        //Handle bars for mementary indication
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

        //Handle data collection for graph
        arr_x_data.push(ax.toFixed(2));
        arr_y_data.push(ay.toFixed(2));
        arr_z_data.push(az.toFixed(2));

    });
    accelerometer.start();
    }

    //Toggle Button
    element.classList.toggle("pressed");
}

function init_graph() {
    console.log("init graph");
    
    //Clear Arrays
    arr_x_data = [];
    arr_y_data = [];
    arr_z_data = [];

}

function draw_graph() {
    //Calculate labels
    if(arr_x_data.length == arr_y_data.length && arr_x_data.length == arr_z_data.length) {
        console.log("GOOD TO GO");
        arr_labels = Array.from(Array(arr_x_data.length).keys());
    } else {
        console.log("ERROR");
        arr_labels = [];
    }
    


    acc_graph = new Chart(acg, {
        type: 'line',
        data: {
            labels: arr_labels,
            datasets: [
                {
                    label: 'X-Wert',
                    data: arr_x_data,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                },
                {
                    label: 'Y-Wert',
                    data: arr_y_data,
                    backgroundColor: "rgba(245, 208, 144, 0.05)",
                    borderColor: "rgba(245, 208, 144, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(245, 208, 144, 1)",
                    pointBorderColor: "rgba(245, 208, 144, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(245, 208, 144, 1)",
                    pointHoverBorderColor: "rgba(245, 208, 144, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                },
                {
                    label: 'Z-Wert',
                    data: arr_z_data,
                    backgroundColor: "rgba(245, 163, 44, 0.05)",
                    borderColor: "rgba(245, 163, 44, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(245, 163, 44, 1)",
                    pointBorderColor: "rgba(245, 163, 44, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(245, 163, 44, 1)",
                    pointHoverBorderColor: "rgba(245, 163, 44, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {

            },
            legend: {

            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                      var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                      return datasetLabel + ': ' + tooltipItem.yLabel + ' m/s²';
                    }
                }
            }
        }
    });

}