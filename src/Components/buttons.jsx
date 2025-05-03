import { useState } from "react";
import '../Styling/cal.scss';
import useless from '../yoshi-tongue.mp3';

const Calculator = function (){
    let [input1, setInput1] = useState('');
    const clickSound = new Audio(useless);

    const handleButtonClick = (number) => {
        if(input1[input1.length -1] === ')' && !isNaN(number)){
            let num = input1;
            num = num + 'x' + number;
            setInput1(num); 
        }else if(input1.length !== 0 && isNaN(input1[input1.length - 1]) && input1[input1.length -1] !== '(' && input1[input1.length -1] !== ')' && isNaN(number) && input1[number] !== '(' && input1[number] !== ')'){
            let num = input1;
            num = num.slice(0,-1);
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
  
        //const elements = input1.match(/\d+(\.\d+)?|\+|\-|\x|\/|\(|\)/g);
        let elements = []
        for (var i =0; i< input1.length; i++){
            if(input1[i] === '-' && i === 0){
              let var1 = input1[0] + input1[1];
              i++;
              while(!isNaN(input1[i+1]) || input1[i+1] === '.'){
                var1 = var1 + input1[i+1];
                i++;
              }
              elements.push(var1);
            }else if(input1[i] === '-' && input1[i-1] === '('){
              let var1 = input1[i] + input1[i+1];
              i++;
              while(!isNaN(input1[i+1]) || input1[i+1] === '.'){
                var1 = var1 + input1[i+1];
                i++;
              }
              elements.push(var1);
            }else if(!isNaN(input1[i])){
              let var1 = '';
              while(!isNaN(input1[i]) || input1[i] === '.'){
                var1 = var1 + input1[i];
                i++;
              }
              i--;
              elements.push(var1);
            }else{
              elements.push(input1[i]);
            }
          }
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
        if(result === Infinity || result === ('-'+Infinity)) result = 'Cannot divide by 0';
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

    const handleBackspace = (input1) => {
        setInput1(input1.slice(0,-1));
    }

    const handleClear = () => {
        setInput1('');
    }

    const uselessButton = () => {
        clickSound.currentTime = 0; // rewind to start
        clickSound.play();
    }

    return(
        <div className="calculator">
            <div>
                <input className='display' type="text" value={input1} disabled></input>
            </div>
            <div className="buttonColumn">
                <button onClick={() => handleClear(input1)} className="button_c">C</button>
                <button onClick={() => handleBracket()} className="button_b">( )</button>
                <button onClick={() => handleBackspace(input1)} className="button_b">&lt;-</button>
                <button onClick={() => handleButtonClick('/')} className="button_op">/</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(7)} className="button">7</button>
                <button onClick={() => handleButtonClick(8)} className="button">8</button>
                <button onClick={() => handleButtonClick(9)} className="button">9</button>
                <button onClick={() => handleButtonClick('x')} className="button_op">x</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(4)} className="button">4</button>
                <button onClick={() => handleButtonClick(5)} className="button">5</button>
                <button onClick={() => handleButtonClick(6)} className="button">6</button>
                <button onClick={() => handleButtonClick('-')} className="button_op">-</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(1)} className="button">1</button>
                <button onClick={() => handleButtonClick(2)} className="button">2</button>
                <button onClick={() => handleButtonClick(3)} className="button">3</button>
                <button onClick={() => handleButtonClick('+')} className="button_op">+</button>
            </div>
            <div>
                <button className="button" onClick={() => uselessButton()}>😛</button>
                <button onClick={() => handleButtonClick(0)} className="button">0</button>
                <button onClick={() => handleDotClick('.')} className="button">.</button>
                <button onClick={() => handleCalculate(input1)} className="button_eq">=</button>
            </div>
        </div>
    )
}

export default Calculator