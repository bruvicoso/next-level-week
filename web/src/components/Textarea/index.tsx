import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    title: string;
}

const Textarea: React.FC<TextareaProps> = ({id , title, ...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={id}>{title}</label>
            <textarea id={id} {...rest}/>
        </div>
    );
}

export default Textarea;