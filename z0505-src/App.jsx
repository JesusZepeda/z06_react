// import the custom hooks for the app
import { useDialog } from './hooks/useDialog';
import { useLocalStorage}  from './hooks/useLocalStorage';

// import the components for the app
import Header from './components/Header';
import Playlist from './components/Playlist';
import SongForm from './components/SongForm';
import Footer from './components/Footer';

// import the CSS for the App component
import './App.css';

// app name to display in the header and footer
const appName = 'My Playlist';

// array of songs to display in the playlist
const initialSongs = [
    { id: 1, title: "Espresso", artist: "Sabrina Carpenter", year: 2024 },
    { id: 2, title: "Electric Feel", artist: "MGMT", year: 2007 },
    { id: 3, title: "Come As You Are", artist: "Nirvana", year: 1991 },
    { id: 4, title: "Dancing Queen", artist: "ABBA", year: 1976, fave: true },
];

const App = () => {
    // track the playlist 
    const [playlist, setPlaylist] = useLocalStorage("songs", initialSongs);

    // get the ref and handlers for a dialog
    const { dialogRef, openDialog, closeDialog } = useDialog();

    // event handler to add a new song to the playlist
    const handleAddSong = (newSong) => {
        setPlaylist((prev) => {
            const maxId = prev.reduce((max, song) => (song.id > max ? song.id : max), 0);
            return [...prev, { ...newSong, id: maxId + 1 }];
        });
        closeDialog();    // close the dialog after adding
    };

    // event handler to delete a song from the playlist
    const handleDeleteSong = (id) => {
        setPlaylist((prev) => prev.filter((song) => song.id !== id));
    };

    // JSX for the App component
    return (
        <div className="container">
            <Header appName={appName}>
                <p>Favorite songs marked with a star</p>
            </Header>
            <main className="main-content">
                <Playlist 
                    songs={playlist} 
                    onDelete={handleDeleteSong} 
                />
                <dialog ref={dialogRef}>
                    <SongForm 
                        onAdd={handleAddSong} 
                        onCancel={closeDialog} 
                    />
                </dialog>
                <button type="button" onClick={openDialog}>Add Song</button>
            </main>   
            <Footer appName={appName} />
        </div>
    );
};

export default App;