import { useState } from "react"

const Calculator = function (){
    let [input1, setInput1] = useState('');

    const handleButtonClick = (number) => {
        if(input1[input1.length -1] === ')' && !isNaN(number)){
            let num = input1;
            num = num + 'x' + number;
            setInput1(num); 
        }else if(input1.length !== 0 && isNaN(input1[input1.length - 1]) && input1[input1.length -1] !== '(' && input1[input1.length -1] !== ')' && isNaN(number) && input1[number] !== '(' && input1[number] !== ')'){
            let num = input1;
            num = num.slice(0,-1);
            console.log(num);
            num = num + number;
            setInput1(num);
        }else if(input1.length === 0 && isNaN(number) && number !== '(' && number !== ')'){
            alert('Invalid input');
        }
        else{
            let num = input1;
            num = num + number;
            setInput1(num);
        }
    };

    const handleDotClick = (dot) => {
        let flag = false;
        for(var i=0; i < input1.length; i++ ){
            if(input1[i] === '.')
                flag = true;
            if(input1[i] === '+' || input1[i] === '-' || input1[i] === '*' || input1[i] === '/')
                flag = false;
        }
        if(!flag){
            let num = input1;
            num = num + dot;
            setInput1(num);
        }
    }

    const infixToPostfix = (input1) => {
        const output = [];
        const ops = [];
        const precedence = { '+': 1, '-': 1, 'x': 2, '/': 2 };
        let pflag = 0;
  
        const elements = input1.match(/\d+(\.\d+)?|\+|\-|\x|\/|\(|\)/g);
        if (!elements) return [];
  
        for(const element of elements){
            if(!isNaN(element)){
                output.push(element)
            }else if (element === '('){
                ops.push(element)
                pflag += 1;
            }else if(element === ')'){
                pflag -= 1;
                while(ops.length && ops[ops.length - 1] !== '('){
                    output.push(ops.pop());
                }
                ops.pop();
            }else{
                while(ops.lenght && precedence[element] <= precedence[ops[ops.length - 1]]){
                    output.push(ops.pop());
                }
                ops.push(element);
            }
        }
        while(ops.length){
            output.push(ops.pop());
        }
        if(output && pflag === 0)
            return output;
        else if (pflag !== 0)
            return "Error: Missing Parenthesis"
      }

    const solvePostfix = (postFix) => {
        const output = [];

        for(const element of postFix){
            if(!isNaN(element)){
                output.push(element);
            }else{
                const var1 = Number(output.pop());
                const var2 = Number(output.pop());
                switch(element){
                    case '+' : output.push(var2 + var1); break;
                    case '-' : output.push(var2 - var1); break;
                    case 'x' : output.push(var2 * var1); break;
                    case '/' : output.push(var2 / var1); break;
                }
            }
        }
        return output[0];
    }

    const output = (input1) => {
        try{
            const postFix = infixToPostfix(input1);
            if(postFix.length === 0) return 'Error';
            else if (postFix === 'Error: Missing Parenthesis') return 'Error: Missing Parenthesis';
            else return solvePostfix(postFix);
        } catch (e){
            return 'Error';
        }   
    }

    const handleCalculate = (input1) => {
        let result = output(input1);
        if(result === Infinity) result = 'Cannot divide by 0';
        else if(result === NaN) result = 'Error';
        setInput1(result);
    }

    const handleBracket = () => {
        let flag1 = 0; 
        for (var i = 0; i < input1.length; i++){
            if(input1[i] === '('){
                flag1 += 1;
            }
            if(input1[i] === ')'){
                flag1 -= 1;
            }
        } 
        if(!flag1 && input1.length === 0){
            let num = input1;
            num = num + '(';
            setInput1(num);
        }else if (isNaN(input1[input1.length - 1]) && input1[input1.length - 1] !== '(' && input1[input1.length -1] !== ')'){
            let num = input1;
            num = num + '(';
            setInput1(num);
            console.log(flag1);
        }else if ((!isNaN(input1[input1.length - 1]) || input1[input1.length - 1] === ')') && flag1 === 0){
            let num = input1;
            num = num + 'x(';
            setInput1(num);
        }else if (flag1 !== 0){
            let num = input1;
            num = num + ')';
            setInput1(num); 
        }
    }

    return(
        <div>
            <div>
                <input type="text" value={input1} disabled></input>
            </div>
            <div>
                <button>C</button>
                <button onClick={() => handleBracket()}>()</button>
                <button>B</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(7)}>7</button>
                <button onClick={() => handleButtonClick(8)}>8</button>
                <button onClick={() => handleButtonClick(9)}>9</button>
                <button onClick={() => handleButtonClick('x')}>x</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(4)}>4</button>
                <button onClick={() => handleButtonClick(5)}>5</button>
                <button onClick={() => handleButtonClick(6)}>6</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(1)}>1</button>
                <button onClick={() => handleButtonClick(2)}>2</button>
                <button onClick={() => handleButtonClick(3)}>3</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
            </div>
            <div>
                <button >😛</button>
                <button onClick={() => handleButtonClick(0)}>0</button>
                <button onClick={() => handleDotClick('.')}>.</button>
                <button onClick={() => handleCalculate(input1)}>=</button>
            </div>
        </div>
    )
}

export default Calculator