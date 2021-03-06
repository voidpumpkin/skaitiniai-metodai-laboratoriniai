import approximationCalculator from './approximation-calculator/approximation-calculator.js';
import numericalIntegrationCalculator from './numerical-integration-calculator/numerical-integration-calculator.js';
import laboratorinis_1 from './laboratorinis_1/laboratorinis_1.js';
import laboratorinis_2 from './laboratorinis_2/laboratorinis_2.js';
import laboratorinis_3 from './laboratorinis_3/laboratorinis_3.js';
window.onload = () => {
    loadNumericalIntegrationCalculator();

    document.getElementById('approximation-calculator-button').onclick = () => {
        loadApproximationCalculator();
    };
    document.getElementById('numerical-integration-calculator-button').onclick = () => {
        loadNumericalIntegrationCalculator();
    };
    document.getElementById('lab1-button').onclick = () => {
        loadLab1();
    };
    document.getElementById('lab2-button').onclick = () => {
        loadLab2();
    };
    document.getElementById('lab3-button').onclick = () => {
        loadLab3();
    };
};

function loadApproximationCalculator() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'approximation-calculator/approximation-calculator.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.getElementById('content').innerHTML = this.responseText;
        approximationCalculator.onload();
    };
    xhr.send();
}

function loadNumericalIntegrationCalculator() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'numerical-integration-calculator/numerical-integration-calculator.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.getElementById('content').innerHTML = this.responseText;
        numericalIntegrationCalculator.onload();
    };
    xhr.send();
}

function loadLab1() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'laboratorinis_1/laboratorinis_1.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.getElementById('content').innerHTML = this.responseText;
        laboratorinis_1.onload();
    };
    xhr.send();
}

function loadLab2() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'laboratorinis_2/laboratorinis_2.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.getElementById('content').innerHTML = this.responseText;
        laboratorinis_2.onload();
    };
    xhr.send();
}

function loadLab3() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'laboratorinis_3/laboratorinis_3.html', true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return;
        document.getElementById('content').innerHTML = this.responseText;
        laboratorinis_3.onload();
    };
    xhr.send();
}