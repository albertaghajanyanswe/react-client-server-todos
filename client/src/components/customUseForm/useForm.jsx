import {useState} from 'react';
import M from 'messages';

const useForm = (submitCallback, initialValues = {}, initialErrors = {}, inputs, validateOnlyOnSubmit = true) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        inputs.forEach(i => {
            validateInput(i.name, values[i.name], i);
        })
        submitCallback();
    }

    const handleChange = (e, input) => {
        e.persist();
        const {name, value} = e.target;
        setValues((values) => ({...values, [name]: value}));
        if (validateOnlyOnSubmit) {
            setErrors(initialErrors);
        } else {
            validateInput(name, value, input);
        }
    }

    const validateInput = (name, value, input) => {
        if (input.validate && value.length > 0) {
            const error = input.validate(value);
            setErrors((errors) => ({...errors, ...error}));
        } else if (value.trim() === '' && input.required) {
            setErrors((errors) => ({
                ...errors,
                [name]: `${M.get('validation.required').replace('{name}', capitalize(name))}.`
            }));
        } else {
            setErrors({...errors, [name]: ''});
        }
    }

    const handleChangeSelect = (option, input) => {
        setValues((values) => ({...values, [input.name]: option.value}));
        if (input.validate && Object.keys(option).length > 0) {
            const error = input.validate(option);
            setErrors((errors) => ({...errors, ...error}));
        } else if (Object.keys(option).length === 0 && input.required) {
            setErrors((errors) => ({
                ...errors,
                [input.name]: `${capitalize(input.name)} is required`
            }));
        } else {
            setErrors({...errors, [input.name]: ''});
        }
    }

    return { values, handleChange, handleSubmit, errors };
}

export default useForm;
