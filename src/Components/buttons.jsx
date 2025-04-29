import { useState } from "react"

const Calculator = function (){
    let [input1, setInput1] = useState('');

    const handleButtonClick = (number) => {
        let num = input1;
        num = num + number;
        setInput1(num);
    };

    const handleDotClick = (dot) => {
        let flag = false;
        for(var i=0; i < input1.length; i++ ){
            if(input1[i] === '.')
                flag = true;
            if(input1[i] === '+')
                flag = false;
        }
        if(!flag){
            let num = input1;
            num = num + dot;
            setInput1(num);
        }
    }

    const handleCalculate = (input1) => {
        let result = eval(input1);
        console.log(result)
        setInput1(result);
    }

    return(
        <div>
            <div>
                <input type="text" value={input1} disabled></input>
            </div>
            <div>
                <button>C</button>
                <button>()</button>
                <button>%</button>
                <button>B</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(7)}>7</button>
                <button onClick={() => handleButtonClick(8)}>8</button>
                <button onClick={() => handleButtonClick(9)}>9</button>
                <button>x</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(4)}>4</button>
                <button onClick={() => handleButtonClick(5)}>5</button>
                <button onClick={() => handleButtonClick(6)}>6</button>
                <button>-</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(1)}>1</button>
                <button onClick={() => handleButtonClick(2)}>2</button>
                <button onClick={() => handleButtonClick(3)}>3</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
            </div>
            <div>
                <button onClick={() => handleDotClick('.')}>.</button>
                <button onClick={() => handleButtonClick(0)}>0</button>
                <button>/</button>
                <button onClick={() => handleCalculate(input1)}>=</button>
            </div>
        </div>
    )
}

export default Calculator