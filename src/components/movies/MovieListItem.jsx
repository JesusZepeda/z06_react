import Icon from "../common/Icon";
import "./MovieListItem.css";

const MovieListItem = ({ movie, onSelect, onDragStart, onDragOver,
    onDragEnter, onDragEnd }) => (
    movie? (
        <li 
            className="movie-list-item"
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
        > 
            <Icon className="fa fa-grip-vertical" title="Reorder" />
            {movie.name} ({movie.year})
            <Icon 
                className="icon fa fa-pencil" 
                title="Edit" 
                onClick={() => onSelect(movie, 'edit')} />
            <Icon 
                className="icon fa fa-trash" 
                title="Delete"
                onClick={() => onSelect(movie, 'delete')} />
        </li>
    ) : (
        <li className="movie-list-empty">
            <p>No movies yet. Add your first one!</p>
        </li>
    )
);

export default MovieListItem;