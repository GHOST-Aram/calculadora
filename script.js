function add(num1, num2){
    return num1 + num2
}
function clearScreen(){
    document.location.reload()
}
function deleteInputChar(input){
    return input.slice(0, -1)
}
function displayInput(value){
    textbox.value += value
}
function divide(num1, num2){
    return num1/num2
}
function divMod(num1, num2){
    return num1 % num2
}
function evalChainedOperators(input){
    const char = input.charAt(input.length - 1)//12+3+
    input = input.slice(0,-1)//12+3
    let expression = getExpression(input)
    const answer = operate(expression)
    return answer.toString().concat(char)//15+
}
function findAnswer(){
    const regex = /^[0-9]+\.?[0-9]+?$/g
    if(regex.test(textbox.value) && typeof parseFloat(textbox.value) === 'number')
        renderOutput(textbox.value, answerPrgph)
    else{
        try {
            const expression = getExpression(textbox.value)
            answer = operate(expression)
            renderOutput(answer, answerPrgph)
        } catch (error) {
            textbox.value = 'ERROR'
            textbox.style.color = 'red'
            textbox.readOnly = true
            allBtns.forEach(btn =>{
               if(!(btn.id === 'clear'))
                    btn.disabled = true
            })
        }
        
    }
}
function getExpression(input){
    let expression
    const regexL = /^\.?[\d]+\.?[\d+]?/g
    const regexR = /\.?[\d]+\.?[\d+]?$/g
    const regexOp = /[\+|\-|\/|\*|\%]+/
    const negRegex = /^\-\d+[\+|\-|\/|\*|\%]+\d+$/g
    const posRegex = /^\+\d+[\+|\-|\/|\*|\%]+\d+$/g

    let op
    let left 
    let right 
    //expressions starting with -ve numbers -6+3
    if(negRegex.test(input)){
        input = input.substring(1,)
        left = parseFloat(input.match(regexR)[0])
        right = -1 * parseFloat(input.match(regexL)[0])
        op = input.match(regexOp)[0]
    } else if(posRegex.test(input)){ //starting with +ve +6+3
        input = input.substring(1,)
        left = parseFloat(input.match(regexL)[0])
        right =parseFloat(input.match(regexR)[0])
        op = input.match(regexOp)[0]

    }else{//normal expression 6+3
        left = parseFloat(input.match(regexL)[0])
        right = parseFloat(input.match(regexR)[0])
        op = input.match(regexOp)[0]
    }
    expression = {
        leftOperand:left,
        rightOperand:right,
        operator:op,
    }

    return expression     
}
function multiply(num1, num2){
    return num1 * num2 
}
function power(num1, num2){
    return Math.pow(num1, num2)
}
function renderOutput(answer, element){
    element.textContent = answer
}
function solvePartly(){
    textbox.value = evalChainedOperators(textbox.value)
}
function subtract(num1, num2){
    return num1 - num2
}

//Operator method

function operate(expression){
    const num1 = expression.leftOperand
    const num2 = expression.rightOperand
    const operator = expression.operator
    let answer = 0
    if(operator === '++'||operator === '+'||operator ==="--")
        answer = add(num1, num2)
    else if(operator === '+-'||operator === '-'||operator ==="-+")
        answer = subtract(num1, num2)
    else if(operator === '**')
        answer = power(num1, num2)
    else if(operator === '%'||operator === '%+')
        answer = divMod(num1, num2)
    else if(operator === '*' || operator === '*+')
        answer = multiply(num1, num2)
    else if(operator === '/'||operator === '/+')
        answer = divide(num1, num2)
    else 
    switch(operator){
        case '*-':
            answer = -1 * multiply(num1, num2)
            break
        case '/-':
            answer = -1 * divide(num1, num2)
            break
        case '%-':
            answer = -1 * divMod(num1, num2)
            break
        default:
            throw 'Error'
    }
    return answer
}

//Calc input 
const textbox = document.querySelector('input')

const numberBtns = document.querySelectorAll('.number')
const decimalBtn = document.querySelector('#decimal-point')
const operatorBtns = document.querySelectorAll('.operator-btn')
const deleteBtn = document.querySelector('#back-space')
const clearBtn = document.querySelector('#clear')
const returnBtn = document.querySelector('#equal-sign')
const answerPrgph = document.querySelector('#answer')
const allBtns = document.querySelectorAll('button')

//regex for checking chained operator
const regex = /\d+[\+|\/|\-|\*|\%]\d+[\+|\/|\-|\*|\%]/g

//Clear button
clearBtn.addEventListener('click', clearScreen)

decimalBtn.addEventListener('click', (e) =>{
    displayInput(e.target.value)
})



//Delete button
deleteBtn.addEventListener('click', (e) =>{
    textbox.value = deleteInputChar(textbox.value)
})

//Add click event listener to all numbers
numberBtns.forEach(btn => {
    btn.addEventListener('click',(e) =>{
        displayInput(btn.value)
    } )
});

//Operator buttons
operatorBtns.forEach(btn =>{
    btn.addEventListener('click',(e) =>{
        displayInput(btn.value)
        while(regex.test(textbox.value.toString())){
            solvePartly()
        
    }
})
})

//Return button / equal sign button
returnBtn.addEventListener('click', findAnswer)

//work with multiple operators from keyboard
textbox.addEventListener('input', () =>{
    while(regex.test(textbox.value.toString())){
        solvePartly()
    }
})

//Enable display answe on pressing enter or equal sign
document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key ==='=')
        findAnswer()  
})



