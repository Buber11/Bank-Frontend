import React from 'react';

const FormGroup = ({ label, type, id, name, value, onChange }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value} 
            onChange={onChange} 
        />
    </div>
);

export default FormGroup;
