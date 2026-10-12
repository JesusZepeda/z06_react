import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

import MovieList from './components/movies/MovieList';
import MovieForm from './components/movies/MovieForm';
import './App.css';

// app name to display in the header and footer
const appName = 'My Movies';

const App = () => {
    // use custom hook to manage local storage for movies
    const [movies, setMovies] = useLocalStorage('movies', []); 

    // state variable for selected movie (null if no selection))
    const [selectedMovie, setSelectedMovie] = useState(null);   

    /* event handlers for movie operations */

    // reorder movies after drag and drop
    const handleReorder = (fromMovie, toMovie) => {
        // don't do anything if no movies or same movie
        if (!fromMovie || !toMovie || fromMovie.id === toMovie.id) return;
        
        // update the movies state
        setMovies(prev => {
            // get the indexes of the movies
            const fromIndex = prev.findIndex(m => m.id === fromMovie.id);
            const toIndex = prev.findIndex(m => m.id === toMovie.id);

            // if neither index is found, return previous state
            if (fromIndex === -1 || toIndex === -1) return prev;

            // copy previous state 
            const updated = [...prev];  

            // reorder by removing the from movie
            // and inserting it at the to index
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;
        });
    };

    // add a new movie
    const handleAdd = (newMovie) => {
        setMovies(prev => [...prev, newMovie]);
    };

    // select a movie (add mode to movie)
    const handleSelect = (movie, mode) => {
        setSelectedMovie({...movie, mode});
    };

    // delete a movie
    const handleDelete = (id) => {
        setMovies((prev) => 
            prev.filter((movie) => 
                movie.id !== id
            )
        );
        // clear selected movie
        setSelectedMovie(null);
    };

    // edit a movie
    const handleEdit = (updatedMovie) => {
        setMovies((prev) =>
            prev.map((movie) =>
                movie.id === updatedMovie.id ? updatedMovie : movie
            )
        );
        // clear selected movie
        setSelectedMovie(null);
    };

    // Cancel edit or delete
    const handleCancel = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="container">
            <Header text={appName} />
            <Main>
                <MovieList 
                    movies={movies} 
                    onSelect={handleSelect}
                    onReorder={handleReorder}  
                />
            </Main>
            <Sidebar>
                <MovieForm 
                    selectedMovie={selectedMovie}
                    onAdd={handleAdd} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                />
            </Sidebar>
            <Footer text={appName} />
        </div>
    )
}

export default App;