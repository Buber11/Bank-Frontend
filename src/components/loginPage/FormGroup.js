import React from 'react';

const FormGroup = ({ label, type, id, name }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={name} required />
    </div>
);

export default FormGroup;
