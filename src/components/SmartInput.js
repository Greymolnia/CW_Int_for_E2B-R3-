import React from 'react';

const SmartInput = ({ label, name, value, onChange, type = 'text', required = false, isDate = false, step, placeholder }) => {
    const inputType = isDate ? 'date' : type;
    const inputId = name; 

    return (
        <div className="form-group">
            <label htmlFor={inputId}>
                {label}
                {required && <span className="req-dot">*</span>}
            </label>
            <input
                id={inputId}
                name={name}
                type={inputType}
                value={value || ''}
                onChange={onChange}
                step={step}
                placeholder={placeholder}
                className={!value && required ? 'error-border' : ''}
            />
        </div>
    );
};

export default SmartInput;