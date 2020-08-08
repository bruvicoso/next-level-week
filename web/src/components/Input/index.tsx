import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    title: string;
}

const Input: React.FC<InputProps> = ({id , title, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={id}>{title}</label>
            <input id={id} type='text' {...rest}/>
        </div>
    );
}

export default Input;