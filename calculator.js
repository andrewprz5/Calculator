let result; 

function add(x, y) {
    result = x + y;
    result.toFixed(10);
    return result;
};

function subtract(x, y) {
    result = x - y;
    result.toFixed(10);
    return result;
};

function multiply(x, y) {
    result = x * y;
    result.toFixed(10);
    return result;
};

function divide(x, y) {
    result = x / y;
    result.toFixed(10);
    return result;
};

function operate(oper, a, b) {
    oper(a,b);
};

const num_btns = document.getElementsByClassName("number-btn");
const text = document.getElementById("text");
const dml_btn = document.getElementById(".");
const zero = document.querySelector("#zero");
let displayValue;

function containsDec() {
    if (text.value.includes(".")) {
        removeDecEL();
    }
};

function shortenDigits() {
    if (text.value.length > 10) {
        text.value = text.value.substring(0,10);
    }
};

function checkZero() {
    if (text.value == "0") {
        text.value = text.value.substring(0,0);
    };
}

for (const num_btn of num_btns) {
    num_btn.addEventListener('click', function() {
        dml_btn.addEventListener('click', decimalInput);
        if (pairValues.pair1 && pairValues.pair2) {
            text.value += '' + this.innerHTML;
            displayValue = text.value;
            pairValues.pair1 = result;
            delete pairValues.pair2;
        } else if (!(pairValues.pair1) && !(pairValues.pair2)){
            text.value += '' + this.innerHTML;
            displayValue = text.value;
        } else if (pairValues.pair1 && !(pairValues.pair2)) {
            text.value += '' + this.innerHTML;
            displayValue = text.value;
        }
        containsDec();
        shortenDigits();
        checkZero();
    })
};

const oper_btns = document.getElementsByClassName("operator-btn");
const displayBox = document.querySelector(".display-box");
let pairValues = {};

for (const oper_btn of oper_btns) {
    oper_btn.addEventListener('click', function(event) {
        if (text.value == "" || pairValues.pair1 && text.value == "") {
            event.preventDefault();
        }
        if (pairValues.pair1 && !(pairValues.pair2) && !(text.value == "")) {
            pairValues.pair2 = displayValue; 
            let calcPair1 = Number(pairValues.pair1);
            let calcPair2 = Number(pairValues.pair2);
            if (pairValues.operator === "+") {
                operate(add, calcPair1, calcPair2);
            } else if (pairValues.operator === "-") {
                operate(subtract, calcPair1, calcPair2);
            } else if (pairValues.operator === "*") {
                operate(multiply, calcPair1, calcPair2); 
            } else if (pairValues.operator === "/") {
                operate(divide, calcPair1, calcPair2);
            }
            text.value = "";
            displayBox.innerHTML = "" + result + " " + oper_btn.id;
            pairValues.operator = oper_btn.id; 
        } else if (!(pairValues.pair1) && !(pairValues.pair2) && !(text.value == "")){
            pairValues.pair1 = displayValue;
            displayBox.innerHTML = "" + displayValue + " " + oper_btn.id;
            text.value = "";
            pairValues.operator = oper_btn.id;
        }
    })
};

const eq_btn = document.querySelector(".equal-btn");

eq_btn.addEventListener('click', function() {
    if (pairValues.pair1 && !(pairValues.pair2)) {
        pairValues.pair2 = displayValue;
        if (!(pairValues.pair2)) {
            text.placeholder = "ERROR";
            displayBox.innerHTML = "";
        } else {
            let calcPair1 = Number(pairValues.pair1);
            let calcPair2 = Number(pairValues.pair2);
            if (pairValues.operator === "+") {
                operate(add, calcPair1, calcPair2);
            } else if (pairValues.operator === "-") {
                operate(subtract, calcPair1, calcPair2);
            } else if (pairValues.operator === "*") {
                operate(multiply, calcPair1, calcPair2); 
            } else if (pairValues.operator === "/") {
                operate(divide, calcPair1, calcPair2);
            }
            if (calcPair2 === 0) {
                text.value = "EXCUSE ME?";
            } else {
                text.value = "" + result;
            }
            displayBox.innerHTML += " " + displayValue;
        }
    } 
});

const clr_btn = document.querySelector(".clear-btn");

clr_btn.addEventListener('click', function() {
    displayBox.innerHTML = "";
    text.value = "";
    pairValues = {};
});

function decimalInput() {
    text.value += ".";
    removeDecEL();
};

function removeDecEL() {
    dml_btn.removeEventListener('click', decimalInput);
};

const bckspc_btn = document.querySelector(".backspace-btn");

bckspc_btn.addEventListener('click', function() {
    text.value = text.value.substring(0, text.value.length - 1);
    displayValue = text.value;
});
