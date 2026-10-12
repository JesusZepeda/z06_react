import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import FormInput from '../common/FormInput';
import FormButtons from '../common/FormButtons';
import './MovieForm.css';

const MovieForm = ({ selectedMovie, onAdd, onEdit, onDelete, onCancel }) => {
    // state variables
    const [name, setName] = useState(''); 
    const [year, setYear] = useState(''); 

    // useRef to manage focus on name field
    const nameRef = useRef(null);

    // run side effects on mount and when selectedMovie changes
    useEffect(() => {
        // prefill the form if editing or deleting, 
        // clear the form if no movie is selected
        if (selectedMovie) {
            setName(selectedMovie.name);
            setYear(selectedMovie.year.toString()); // convert year to string
        } else {
            setName('');
            setYear('');
        } 

        // set focus on name field 
        nameRef.current?.focus(); 
    }, [selectedMovie]);

    // determine whether movie is being added, edited, or deleted
    const isEditing = selectedMovie?.mode === 'edit';
    const isDeleting = selectedMovie?.mode === 'delete';
    const isAdding = !selectedMovie;
  
    // event handler to submit form
    const handleSubmit = (e) => {
        // prevent default form submission behavior
        e.preventDefault();

        // add, edit, or delete movie
        if (isAdding) {
            onAdd({ id: uuid(), name, year: +year }); // convert year to number
        } else if (isEditing) {
            onEdit({ ...selectedMovie, name, year: +year }); // convert year to number
        } else if (isDeleting) { 
            onDelete(selectedMovie.id);
        }

        // set focus on name field after form submission
        nameRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="movie">
                <h2>
                    {isAdding && "Add Movie"}
                    {isEditing && "Edit Movie"}
                    {isDeleting && "Confirm Delete"}
                </h2>
                <FormInput
                    label="Name"
                    name="name"
                    value={name}                              
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name"
                    disabled={isDeleting}  // make read-only if deleting
                    required
                    ref={nameRef}          // assign this element to nameRef 
                />
                <FormInput
                    label="Year"
                    type="number"
                    name="year"
                    value={year}                              
                    onChange={(e) => setYear(e.target.value)} 
                    placeholder="Year"
                    disabled={isDeleting}  // make read-only if deleting
                    required
                />
            </div>
            <FormButtons
                isEditing={isEditing}  
                isDeleting={isDeleting}
                onCancel={onCancel} 
            />
        </form>
    )
}

export default MovieForm;