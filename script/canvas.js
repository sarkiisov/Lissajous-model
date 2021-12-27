let t1, t2;
let A, B, a, b, ps, maxX, maxY, xOffset, yOffset;

A = 1.5;
B = 1.5;
a = 5;
b = 2;
ps = Math.PI / 2;
maxX = 10;
maxY = 10;
xOffset = maxX / 2;
yOffset = maxY / 2;

t1 = 1;
t2 = 50;

let modalOpened = false;

window.onload = () => {
    function getLissajousCoords(t) {
        let x = A * Math.sin(a * t + ps) + xOffset;
        let y = B * Math.sin(b * t) + yOffset;
        return { x, y };
    }

    function getLissajousDataset(){
        let pointArr = [];
        let curT = t1;
        while(curT < t2){
            pointArr.push(getLissajousCoords(curT));
            curT += 0.05;
        }
        return pointArr;
    }

    xyValues = getLissajousDataset();

    const data = {
        datasets: [{
            data: xyValues
        }]
    };

    const config = {
        type: 'scatter',
        data: data,
        options: {
            animation: {
                duration: 1000,
                easing: 'easeInOutElastic',
                xAxis: true,
                yAxis: true,
            },
            responsive: true,
            maintainAspectRatio: false,
            tension: 0,
            showLine: true,
            borderColor: 'grey',
            pointRadius: 0,
            plugins: {
                tooltip: {
                    enabled: false
                },
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    max: maxX,
                    min: 0,
                    ticks: {
                        font: {
                            size: 16,

                        }
                    }
                },
                y: {
                    max: maxY,
                    min: 0,
                    ticks: {
                        font: {
                            size: 16,
                        }
                    }
                }
            },
            hover: {
                mode: null
            },
        }
    };

    const canvasR = document.getElementById('lissajous');
    canvasR.parentNode.style.height = '800px';
    canvasR.parentNode.style.width = '800px';

    function updateData(chart, newData){
        config.data.datasets[0].data = newData;
        config.options.scales.x.max = maxX;
        config.options.scales.y.max = maxY;
        chart.update();
    }

    const AInput = document.querySelector('#A-scale');
    AInput.addEventListener('input', (e) => {
        A = e.target.value;
    });
    const BInput = document.querySelector('#B-scale');
    BInput.addEventListener('input', (e) => {
        B = e.target.value;
    });

    const aInput = document.querySelector('#a-scale');
    aInput.addEventListener('input', (e) => {
        a = e.target.value;
    });
    const bInput = document.querySelector('#b-scale');
    bInput.addEventListener('input', (e) => {
        b = e.target.value;
    });

    const offsetX = document.querySelector('#offset-x');
    const offsetY = document.querySelector('#offset-y');

    const maxXInput = document.querySelector('#max-x');
    maxXInput.addEventListener('input', (e) => {
        maxX = parseInt(e.target.value);
        xOffset = maxX / 2;
        offsetX.value = maxX / 2;
    });
    const maxYInput = document.querySelector('#max-y');
    maxYInput.addEventListener('input', (e) => {
        maxY = parseInt(e.target.value);
        yOffset = maxY / 2;
        offsetY.value = maxY / 2;
    });


    const t1Input = document.querySelector('#t1-scale');
    t1Input.addEventListener('input', (e) => {
        t1 = parseInt(e.target.value);
    });
    const t2Input = document.querySelector('#t2-scale');
    t2Input.addEventListener('input', (e) => {
        t2 = parseInt(e.target.value);
    });

    const psInput = document.querySelector('#phase-shift-scale');
    psInput.addEventListener('input', (e) => {
        let textInput = e.target.value;
        ps = evalPhaseShift(textInput);
    });

    const renderChartButton = document.querySelector('#render-chart');
    renderChartButton.addEventListener('click', (e) => {
        newValues = getLissajousDataset();
        updateData(myChart, newValues);
    });

    function evalPhaseShift(value){
        let textInput = value.replace('pi', 'Math.PI');
        let numericResult = eval(textInput);
        return numericResult;
    }

    function initInputData() {
        A = parseFloat(AInput.value);
        B = parseFloat(BInput.value);
        a = parseFloat(aInput.value);
        b = parseFloat(bInput.value);
        maxX = parseInt(maxXInput.value);
        maxY = parseInt(maxYInput.value);
        offsetX.value = maxX / 2;
        offsetY.value = maxY / 2;
        xOffset = maxX / 2;
        yOffset = maxY / 2;
        t1 = parseInt(t1Input.value);
        t2 = parseInt(t2Input.value);
        ps = evalPhaseShift(psInput.value);
    }
    initInputData();

    const myChart = new Chart(
        document.getElementById('lissajous'),
        config
    );

    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal-window');
    window.addEventListener('keydown', (e) => {
        if(e.code == 'KeyQ') {
            if(modalOpened) {
                console.log(1);
                modal.style.display = 'none';
                overlay.style.display = 'none';
                modalOpened = false;
            } else {
                modal.style.display = 'block';
                overlay.style.display = 'block';
                modalOpened = true;
            }
        }
    });
};