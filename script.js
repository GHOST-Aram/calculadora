function add(num1, num2){
    return num1 + num2
}
function clearScreen(){
    document.location.reload()
}
function deleteInputChar(input){
    const char = input.charAt(input.length-1)
    return input.replace(char,'')
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
    const regex = /^[\d]+\.?[\d+]?$/g
    if(regex.test(textbox.value))
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

    const regexL = /^[\d]+\.?[\d+]?/g
    const regexR = /[\d]+\.?[\d+]?$/g
    const regexOp = /[\+|\-|\*|\%]/

    const expression = {
        leftOperand:parseFloat(input.match(regexL)[0]),
        rightOperand:parseFloat(input.match(regexR)[0]),
        operator:input.match(regexOp)[0],
    }

    return expression     
}
function multiply(num1, num2){
    return num1 * num2 
}
function renderOutput(answer, element){
    element.textContent = answer
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
    switch(operator){
        case '+':
            answer = add(num1, num2)
            break
        case '-':
            answer = subtract(num1, num2)
            break
        case '*':
            answer = multiply(num1, num2)
            break
        case '/':
            answer = divide(num1, num2)
            break
        case '%':
            answer = divMod(num1, num2)
            break
        default:
            answer = 0
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
        const regex = /\d+[\+|\/|\-|\*|\%]\d+[\+|\/|\-|\*|\%]/g
        displayInput(btn.value)
        if(regex.test(textbox.value.toString())){
            textbox.value = evalChainedOperators(textbox.value)
        }
    })
})

//Return button / equal sign button
returnBtn.addEventListener('click', findAnswer)

//work with multiple operators from keyboard
textbox.addEventListener('input', (e) =>{
    const regex = /\d+[\+|\/|\-|\*|\%]\d+[\+|\/|\-|\*|\%]/g
        if(regex.test(textbox.value.toString())){
            textbox.value = evalChainedOperators(textbox.value)
        }
})

//Enable display answe on pressing enter or equal sign
document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key ==='=')
        findAnswer()  
})



