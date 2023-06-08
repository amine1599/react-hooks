import React, { useState, useContext } from 'react';

// MovieCard component
const MovieCard = ({ movie }) => {
  const { title, description, posterURL, rating } = movie;

  return (
    <div className="movie-card">
      <img src={posterURL} alt={title} className="movie-card__poster" />
      <h2 className="movie-card__title">{title}</h2>
      <p className="movie-card__description">{description}</p>
      <p className="movie-card__rating">Rating: {rating}</p>
    </div>
  );
};

// MovieList component
const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

// Filter component
const Filter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleFilter = () => {
    onFilter({ title, rating });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="number"
        placeholder="Filter by rating"
        value={rating}
        onChange={handleRatingChange}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

// MovieContext
const MovieContext = React.createContext([]);

// App component
const App = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Movie 1',
      description: 'Description of Movie 1',
      posterURL: 'https://picsum.photos/200',
      rating: 4.5,
    },
    {
      title: 'Movie 2',
      description: 'Description of Movie 2',
      posterURL: 'https://picsum.photos/200',
      rating: 3.8,
    },
    
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilter = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(title.toLowerCase());
      const matchesRating = movie.rating >= Number(rating);
      return matchesTitle && matchesRating;
    });

    setFilteredMovies(filtered);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      <Filter onFilter={handleFilter} />
      <MovieContext.Provider value={{ movies: filteredMovies }}>
        <MovieList />
      </MovieContext.Provider>
    </div>
  );
};

export default App;
