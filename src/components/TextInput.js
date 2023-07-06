import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

/**
 * 
 * @param { } props 
 * @returns A text input field
 *          
 */

export default function TextInput(props) {

    const { label, initValue, handleValidation, errorMessage, getValue } = props;

    const [inputValue, setValue] = useState(initValue || '');
    const [hasError, setError] = useState(false);

    const cssClasses = hasError ? 'w-full p-invalid' : 'w-full';

    const validate = () => {
        if (inputValue === '' || inputValue === undefined) {
            setValue('');
        } else {
            // Call the passed function
            const  errorCheck = handleValidation(inputValue.trim());
            setError(errorCheck);
            setValue(inputValue.trim());
            if (!errorCheck) { 
                getValue(inputValue);
            };
        }
    };

    return (
        <>
            <span className="p-float-label my-2">
                <InputText value={inputValue} onChange={(e) => setValue(e.target.value)} onBlur={validate} className={cssClasses} />
                <label htmlFor={label}>{label}</label>
            </span>
            {hasError && (<Message severity="error" text={errorMessage} className='mb-5' />)}
        </>
    );
}

/*

From parent component
-----------------------------------------------------------------

    // validation for text only input field
    const [myTextfieldComponent, setFieldValue] = useState('');

    function handleCheckError (inputValue) {
        return isTextOnly(inputValue) ? false : true;
    }

Usage
-----------------------------------------------------------------

    <p>First Name: {myTextfieldComponent}</p>
    <TextInput label="First Name" initValue={myTextfieldComponent} getValue={setFieldValue} handleValidation={handleCheckError} errorMessage="Invalid name" />
*/