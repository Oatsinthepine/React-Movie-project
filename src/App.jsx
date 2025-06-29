import React from 'react'
import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {updateSearchCount} from "./appwrite.js";
import {getTrendingMovies} from "./appwrite.js";

//declare the API base url
const API_BASE_URL = "https://api.themoviedb.org/3/";

// declare the API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// declare the API options, as this API_KEY and API_BASE_URL will be used within the fetch api call
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}


function App() {

    // here we will add the useState
    const [searchTerm, setSearchTerm] = useState("");

    // declare a useState for errors if something goes wrong when fetching the data
    const [errorMessage, setErrorMessage] = useState("");

    const [movieList, setMovieList] = useState([]); // This will hold the list of movies fetched from the API

    const [isLoading, setIsLoading] = useState(false); // This will hold the loading state

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    useDebounce(
        () => {
            setDebouncedSearchTerm(searchTerm);
        },
        5000, // Delay in milliseconds
        [searchTerm] // Dependency array
    );

    const [trendingMovies, setTrendingMovies] = useState([]); // This will hold the list of trending movies from appwrite database
    const loadTrendingMovies = async function TrendingMovie(){
        try {
            const top5movies = await getTrendingMovies();
            setTrendingMovies(top5movies);
        } catch (error) {
            console.log(`Error fetching trending movies from appwrite database: ${error}`);
            setTrendingMovies([]);
        }
    }

    // here we add the fetch async function to fetch the data from the API
    // Now we will add the parameter to this getMovies function, so that we can cll API when fetching the data about a specific movie
    const fetchMovies = async function getMovies(query = null) {
        setIsLoading(true); // Set loading state to true before fetching data
        setErrorMessage(""); // Reset error message before fetching data

        try {
            let endpoint = "";
            if (query) {
                endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
            } else {
                endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            }
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // await the response in Json then log the data in console, just for testing purposes
            const data = await response.json();
            console.log(data);

            // check if the response is false, if it is, set the error message and empty the movie list
            if(data.Response === "False") {
                setErrorMessage(data.Error || "Failed to fetch movies.");
                setMovieList([]);
                return;
            } else {
                // if the response is true, store the results in the movieList state
                setMovieList(data.results)

                // implementing the updateSearchCount function to update the search count in the database
                //updateSearchCount();
                if (query && data.results.length > 0) {
                    await updateSearchCount(query, data.results[0])
                }
            }

        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage("Failed to fetch movies. Please try again later.");
        } finally {
            setIsLoading(false); // Set loading state to false after fetching data
        }
    }


    // useEffect to call the fetchMovies function when the component mounts
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
        }, [debouncedSearchTerm]
    )

    // create another useEffect dedicated to fetching the trending movies from the appwrite database
    // This separates the logic of fetching the trending movies from the logic of fetching the movies from the API
    useEffect(() => {
        loadTrendingMovies();
    }, []);


    // put the logic of displaying the content based on the loading state and error message here, so
    // it will display the loading spinner when the data is being fetched, and display the error message if there is an error.
    // if the data is fetched successfully, it will display the list of movies.
    let content;
    if (isLoading) {
        content = (
            <div className='flex flex-col items-center gap-2'>
                <p className="text-white">Loading...</p>
                <Spinner/>
            </div>
        )

    } else if (errorMessage) {
        content = <p className="text-red-500">{errorMessage}</p>
    } else {
        content = <ul>
            {movieList.map((movie) => {
                // return (<p key={movie.id} className="text-white">{movie.title}</p>
                return <MovieCard key= {movie.id} movie= {movie}/>
            })}
        </ul>
    }


    let top5;
    if (trendingMovies.length > 0) {
        top5 = (
            <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                    {trendingMovies.map((movie, index) => {
                        return (<li key={movie.$id}>
                            <p>{index + 1}</p>
                            <img src={movie.poster_url} alt={movie.title} />
                        </li>)
                    })}
                </ul>
            </section>
        )
    } else {
        top5 = (
            // if no trending movies from appwrite database, then show the default trending picture
            <img src = "/content.png" alt = "default trending picture" />
        )
    }

    return (
            <main>
                <div className="pattern"/>
                <div className="wrapper">
                    <header>
                        <img src="/hero.png" alt="Hero Banner"/>
                        <h1>Find <span className="text-gradient">Movies</span> you like!</h1>
                        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
                    </header>
                    {top5}
                   <section className="all-movies">
                        <h2 className="mt-[40px]">All Movies</h2>
                        {/*{errorMessage && <p className="text-red-500">{errorMessage}</p>}, just showing that you can display error message here like this for testing purpose*/}
                        {/*Please note that JSX can't directly take the js if/else if/else conditional checking*/}
                        {content}
                    </section>
                </div>
            </main>
    )
}

export default App // Exporting the App component
