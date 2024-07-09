import React, { useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = async () => {
        const response = await fetch('/api/calculator/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input }),
        });
        const data = await response.json();
        setResult(data.result);
    };

    return (
        <div>
            <h2>Calculator</h2>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <button onClick={handleCalculate}>Calculate</button>
            {result && <p>Result: {result}</p>}
        </div>
    );
};

export default Calculator;
