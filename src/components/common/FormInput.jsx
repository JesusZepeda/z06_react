import './FormInput.css';

const FormInput = ( {ref, label, name, value, onChange, ...props} ) => {
    return (
        <>
            <label className="form-label" htmlFor={name}>{label}</label>
            <input
                ref={ref}  // assign ref here
                className="form-input"
                type="text" 
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            />
        </>
    );
};

export default FormInput;