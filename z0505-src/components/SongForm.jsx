// import the hooks
import { useState } from 'react';

// import the Input component
import Input from './Input';

// import the CSS for the form
import './SongForm.css';

const SongForm = ({ onAdd, onCancel }) => {   
    // state for song form fields
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [year, setYear] = useState('');
    const [fave, setFave] = useState(false);

    // helper function to clear the form
    const clearForm = () => {
        setTitle('');
        setArtist('');
        setYear('');
        setFave(false);
    }; 

    // event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();                      // prevent page reload
        onAdd({ title, artist, year, fave });    // pass song data to onAdd
        clearForm();                             // clear the form
    };

    // event handler for cancel button
    const handleCancel = () => {
        onCancel();                              // call the onCancel prop
        clearForm();                             // clear the form
    };

    return (
        <form className="song-form" onSubmit={handleSubmit}>
            <h2>Add Song</h2>
            <Input 
                name="title"
                label="Title:"
                required 
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Input 
                name="artist" 
                label="Artist:"
                required 
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
            />

            <Input 
                type="number"
                name="year" 
                label="Year:"
                required 
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />

            <Input 
                type="checkbox" 
                name="fave" 
                label="Favorite:"
                checked={fave}
                onChange={(e) => setFave(e.target.checked)}
            />

            <div className="song-buttons">
                <button type="submit">Add</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default SongForm;