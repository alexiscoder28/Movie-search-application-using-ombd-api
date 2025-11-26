import { useState, useEffect, } from 'react';
import './App.css';
import Search from './assets/components/Search';
import Spinner from "./assets/components/Spinner";
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'use-debounce';

const API_BASE_URL = "https://api.tvmaze.com/search/shows";

function App() {
  const [searchTerm, setSearchTerm] = useState('breaking bad');
  const [movies, setMovies] = useState([]); // ✅ Store fetched movies
  const [errorMessage, setErrorMessage] = useState('');
  const[isLoading, setIsLoading] =useState (false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchMovies = async (query = '') => {
    if (!query || query.trim() === '') {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}?q=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint);

      if (!response.ok) throw new Error('Failed to fetch shows');

      const data = await response.json();
      console.log(data);

      if (data && data.length > 0) {
        // Transform TVMaze format to match our MovieCard component
        const transformedData = data.map(item => ({
          imdbID: item.show.id.toString(),
          Title: item.show.name,
          Year: item.show.premiered ? item.show.premiered.split('-')[0] : 'N/A',
          Poster: item.show.image?.medium || item.show.image?.original || 'N/A'
        }));
        setMovies(transformedData);
        setErrorMessage('');
      } else {
        setErrorMessage('No shows found');
        setMovies([]);
      }
    } catch (error) {
      console.error(`Error fetching shows: ${error}`);
      setErrorMessage('Error fetching shows. Please try again later :)');
    }
    finally{
      setIsLoading(false);
    }
  };
 useEffect(() => {
  fetchMovies(debouncedSearchTerm);
}, [debouncedSearchTerm]);


  return (
    <main>
      <div className="bg-[url('/BG.svg')] bg-cover bg-center bg-no-repeat min-h-screen">
        <div className='pattern' /> 
        <div className='wrapper'>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <header>
            <img src="./hero-img.png" alt="Hero Poster" />
            <h1>Watch your favorite <span className='text-gradient'>MOVIES</span></h1>
          </header>
          <section className='all movies mt-40'>
            
            {isLoading ? (
              <Spinner />
            ):errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ): (
              <div className='movies-grid grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 justify-items-center mt-8'>
                {movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie}/>
      
    
  ))}

</div>

 )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;

