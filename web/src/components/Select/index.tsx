import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    title: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({id , title, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={id}>{title}</label>
            <select id={id} value="" {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;