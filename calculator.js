let result; 

function add(x, y) {
    result = x + y;
    return result;
};

function subtract(x, y) {
    result = x - y;
    return result;
};

function multiply(x, y) {
    result = x * y;
    return result;
};

function divide(x, y) {
    result = x / y;
    return result;
};

function operate(oper, a, b) {
    oper(a,b);
};

const num_btns = document.getElementsByClassName("number-btn");
const text = document.getElementById("text");
let displayValue;

for (const num_btn of num_btns) {
    num_btn.addEventListener('click', function() {
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
    })
};

const oper_btns = document.getElementsByClassName("operator-btn");
const displayBox = document.querySelector(".display-box");
let pairValues = {};

for (const oper_btn of oper_btns) {
    oper_btn.addEventListener('click', function() {
        if (pairValues.pair1 && !(pairValues.pair2)) {
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
        } else if (!(pairValues.pair1) && !(pairValues.pair2)){
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
            text.value = "" + result;
            displayBox.innerHTML += " " + displayValue;
            console.log(pairValues);
        }
    } 
});

const clr_btn = document.querySelector(".clear-btn");

clr_btn.addEventListener('click', function() {
    displayBox.innerHTML = "";
    text.value = "";
    pairValues = {};
});

const dml_btn = document.getElementById(".");

function decimalInput() {
    text.value += ".";
    removeDecEL();
};

function removeDecEL() {
    dml_btn.removeEventListener('click', decimalInput);
};

function secondPairCheck() {
    if (!(pairValues.pair1) && !(pairValues.pair2)) {
        dml_btn.addEventListener('click', decimalInput);
    } else if (pairValues.pair1 && !(pairValues.pair2)) {
        dml_btn.addEventListener('click', decimalInput);
    }
};


// PROBLEMS:
// How can I add decimal for both pairs when I enabled the event listener to happen only once;
// another way of saying how can I allow EL to happen per number in pairValues obj?

// QUESTIONS:
// Is there any way I can use the operator.id and unstring it so I can set it up as the 
// "operator" parameter for the operate() function? Will make my code shorter if I can figure
// it out

// TO-DO:
// 1. add decimal button & round them so they don't overflow the screen 
// 2. display "error" message if user divides number by 0
// 3. make sure user doesn't input more than one decimal in a number (e.g. 1.24.52)
// 4. add backspace button 
// 5. add keyboard support (give it a shot)
// 6. Make CSS Design cooler