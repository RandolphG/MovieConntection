import React, { useEffect, useState } from "react";
import { Header, Movies, Search } from "./components/_index";
import { movie, MoviesProps } from "./components/movies/Movies";

const API_KEY = "db530aea";
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${API_KEY}`;

/**
 * APPLICATION
 * @description A Movie application
 * @constructor
 */
function App() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  /* fetching movies from the api*/
  useEffect(() => {
    getMovies().then((result) => console.log(result));
    console.log(movies);
  }, []);

  /**
   * getMovies
   * @description API call
   * @return Promise<void>
   */
  const getMovies = async (): Promise<void> => {
    const movieResult = fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("RESULTS", movieResult);
  };

  const Loading = () => <div>LOADING...</div>;

  return (
    <div>
      <div>MOVIES</div>
      <Header />
      {isLoading ? <Loading /> : <Movies movies={movies} />}
      <Search />
    </div>
  );
}

export default App;
