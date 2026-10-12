const Input = ({ name, label, ...props}) => (
    <div className="div">
        <label htmlFor={name}>{label}</label>
        <input 
            type="text" 
            id={name} 
            name={name} 
            {...props}
        />
    </div>
);

export default Input;