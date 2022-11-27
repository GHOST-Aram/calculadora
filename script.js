function add(num1, num2){
    return num1 + num2
}
function divide(num1, num2){
    return num1/num2
}
function divMod(num1, num2){
    return num1 % num2
}
function multiply(num1, num2){
    return num1 * num2 
}
function subtract(num1, num2){
    return num1 - num2
}

//Operator method

function operator(num1, num2, operator){
    let answer = 0
    switch(operator){
        case operator === '+':
            answer = add(num1, num2)
            break
        case operator === '-':
            answer = subtract(num1, num2)
            break
        case operator === '*':
            answer = multiply(num1, num2)
            break
        case operator === '/':
            answer = divide(num1, num2)
            break
        case operator === '%':
            answer = divMod(num1, num2)
            break
        default:
            answer = 0
    }
    return answer
}

function displayInput(input){
    const textbox = document.querySelector('input')
    textbox.value += input
}


