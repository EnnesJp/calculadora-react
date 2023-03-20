import React from "react";
import '../assets/css/Button.css'

// eslint-disable-next-line
export default props =>
    <button 
        className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
        onClick={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>