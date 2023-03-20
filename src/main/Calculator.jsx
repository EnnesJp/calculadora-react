import  React, {Component} from 'react';
import '../assets/css/Calculator.css'

import Display from '../components/Display';
import Button from '../components/Button';

const initialData = {
    displayValue: '0',
    clearDisplay: false,
    operator: null,
    values: [0, 0],
    current: 0
}

class Calculator extends Component {

    state = { ...initialData }

    clearMemory() {
        this.setState({ ...initialData })
    }

    setOperation(operator) {
        if (this.state.current === 0) {
            this.setState({ 
                operator,
                current: 1,
                clearDisplay: true 
            })
        } else {
            const equals = operator === '='
            const currentOperator = this.state.operator
            const values = [...this.state.values]

            switch (currentOperator) {
                case '+':
                    values[0] = values[0] + values[1]
                    break;
            
                case '-':
                    values[0] = values[0] - values[1]
                    break;
            
                case 'x':
                    values[0] = values[0] * values[1]
                    break;
            
                case '%':
                    values[0] = values[0] / values[1]
                    break;
            
                default:
                    break;
            }

            values[1] = 0
            this.setState({ 
                displayValue: values[0],
                clearDisplay: true,
                operator,
                values,
                current: equals ? 0 : 1 
            })
        }
    }

    addDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.'))
            return

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit

        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }
    
    render() {
        const addDigit = num => this.addDigit(num)
        const setOperation = op => this.setOperation(op)

        return (
            <div className='calculator'>
                <Display 
                    value={this.state.displayValue}/>
                <Button 
                    triple
                    click={() => this.clearMemory()}
                    label="AC"/>
                <Button 
                    operation
                    click={setOperation}
                    label="%"/>
                <Button 
                    click={addDigit}
                    label="7"/>
                <Button 
                    click={addDigit}
                    label="8"/>
                <Button 
                    click={addDigit}
                    label="9"/>
                <Button 
                    operation
                    click={setOperation}
                    label="x"/>
                <Button 
                    click={addDigit}
                    label="4"/>
                <Button 
                    click={addDigit}
                    label="5"/>
                <Button 
                    click={addDigit}
                    label="6"/>
                <Button    
                    operation 
                    click={setOperation}
                    label="-"/>
                <Button 
                    click={addDigit}
                    label="1"/>
                <Button 
                    click={addDigit}
                    label="2"/>
                <Button 
                    click={addDigit}
                    label="3"/>
                <Button 
                    operation
                    click={setOperation}
                    label="+"/>
                <Button
                    double
                    click={addDigit}
                    label="0"/>
                <Button
                    click={addDigit}
                    label="."/>
                <Button
                    operation
                    click={setOperation}
                    label="="/>
            </div>
        )
    }
}

export default Calculator