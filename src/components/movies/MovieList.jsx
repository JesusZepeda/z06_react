import { useDragAndDrop } from "../../hooks/useDragAndDrop";

import MovieListItem from "./MovieListItem";  
import "./MovieList.css"; 

const MovieList = ({ movies, onSelect, onReorder }) => {

    // pass onReorder to the useDragAndDrop hook and get the object it returns
    const dnd = useDragAndDrop(onReorder);
    
    return (
        <ul className="movie-list">
            {movies.length === 0 ? (
                <MovieListItem movie={null} />
            ) : (
                movies.map((movie) => 
                    <MovieListItem 
                        key={movie.id} 
                        movie={movie} 
                        onSelect={onSelect}
                        onDragStart={() => dnd.handleDragStart(movie)}  
                        onDragEnter={() => dnd.handleDragEnter(movie)}
                        onDragOver={dnd.handleDragOver}
                        onDragEnd={dnd.handleDragEnd}
                    />
                )
            )}
        </ul>
    );
};

export default MovieList;