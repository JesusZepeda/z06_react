import { useState } from "react";
import { useDialog } from "../hooks/useDialog";
import './Playlist.css';

const Playlist = ({ songs, onDelete }) => {
    // state to hold the song to delete
    const [song, setSong] = useState(null);
    
    // get the ref and handlers for a dialog
    const {dialogRef, openDialog, closeDialog} = useDialog();

    // event handler for delete button
    const handleDelete = (song) => {
        setSong(song);                   // store the song to delete
        openDialog();                    // open the dialog
    };

    // event handler for confirm button
    const handleConfirm = () => {
        if (song) onDelete(song.id);     // delete the song
        closeDialog();                   // close the dialog
    };

    // event handler for cancel button
    const handleCancel = () => {
        setSong(null);                   // clear song state
        closeDialog();                   // close the dialog
    }

    return (   
        <>
            <ul className="song-list">
                {songs.map((song) => (
                    <li key={song.id} className="song">
                        <span className="list-text">
                            {song.title} by {song.artist} ({song.year})
                            {song.fave && <span>&#9733;</span>}
                        </span>
                        <button className="list-button"
                            type="button"
                            onClick={() => handleDelete(song)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <dialog ref={dialogRef}>
                <p>{song && `Delete ${song.title} by ${song.artist}?`}</p>
                <menu>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={handleConfirm}>Confirm</button>
                </menu>
            </dialog>
        </>
    );
};

export default Playlist;