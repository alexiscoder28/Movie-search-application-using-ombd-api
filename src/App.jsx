import { useState, useEffect, } from 'react';
import './App.css';
import Search from './assets/components/Search';
import Spinner from "./assets/components/Spinner";
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'use-debounce';

const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('batman');
  const [movies, setMovies] = useState([]); // ✅ Store fetched movies
  const [errorMessage, setErrorMessage] = useState('');
  const[isLoading, setIsLoading] =useState (false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState ('');


  useDebounce (fn =() => setDebouncedSearchTerm(searchTerm), ms ="500",      
  deps = [searchTerm]   )

  const fetchMovies = async (query = '') => {
   setIsLoading(true);
   setErrorMessage('');


    try {
      const endpoint = query

         ?`${API_BASE_URL}?apikey=${API_KEY}&s=${query}`
         :`${API_BASE_URL}/search/movie?query =${encodeURIComponent(query)}`
          const response = await fetch(endpoint);

      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();
      console.log(data);

      if (data.Response === 'True') {
        setMovies(data.Search); // ✅ Store results in state
        setErrorMessage('');
      } else {
        setErrorMessage(data.Error || 'No movies found');
        setMovies([]); // clear previous data
        return;
      }

      setMovies(data.Search || []);
    } catch (error) {
      console.error(`Error fetching Movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later :)');
    }
    finally{
      setIsLoading(false);
    }
  };
 useEffect(() => {
  fetchMovies(searchTerm);
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
             
             
              <div className='movies-grid grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-6 justify-items-center mt-8
'>
  {movies.map((movie) => (
    < MovieCard key ={movie.imdbID} movie= {movie}/>
      
    
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

