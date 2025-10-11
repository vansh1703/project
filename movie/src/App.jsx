import React, { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/spinner";
import Moviecard from "./components/moviecard";
import { useDebounce } from "react-use";
import Trending from "./components/Trending";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default function App() {
  const [searchterm, setsearchterm] = useState("");
  const [errormessage, seterrormessage] = useState("");
  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [debounced, setdebounced] = useState("");
  const [refresh, setRefresh] = useState(false);

  useDebounce(() => setdebounced(searchterm), 500, [searchterm]);

  const fetchMovies = async (query = "") => {
    setisloading(true);
    seterrormessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw Error("Failed to fetch movies");
      const data = await response.json();

      if (data.Response === "False") {
        seterrormessage(
          data.Error || "Failed to fetch movies. Please try again later."
        );
        setmovielist([]);
        return;
      }
      setmovielist(data.results);

      // if (query && data.results.length > 0) {
      //   const trendingData =
      //     JSON.parse(localStorage.getItem("searchTrends")) || {};
      //   const movie = data.results[0];

      //   // increment count if exists, otherwise add
      //   if (trendingData[movie.id]) {
      //     trendingData[movie.id].count += 1;
      //   } else {
      //     trendingData[movie.id] = { ...movie, count: 1 };
      //   }

      //   localStorage.setItem("searchTrends", JSON.stringify(trendingData));
      //   setRefresh((prev) => !prev);
      // }
    } catch (error) {
      seterrormessage("Failed to fetch movies. Please try again later.");
    } finally {
      setisloading(false);
    }
  };

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    const trendingData = JSON.parse(localStorage.getItem("searchTrends")) || {};

    if (trendingData[movie.id]) {
      trendingData[movie.id].count += 1;
    } else {
      trendingData[movie.id] = { ...movie, count: 1 };
    }

    localStorage.setItem("searchTrends", JSON.stringify(trendingData));
    setRefresh((prev) => !prev);

    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  // In your movie list
  {
    movielist.map((movie) => (
      <Moviecard key={movie.id} movie={movie} onClick={handleMovieClick} />
    ));
  }

  useEffect(() => {
    fetchMovies(debounced);
  }, [debounced]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchterm={searchterm} setsearchterm={setsearchterm} />
        </header>

        <Trending refresh={refresh} />
        {localStorage.getItem("searchTrends") ? (
          <button
            onClick={() => {
              localStorage.removeItem("searchTrends");
              setRefresh((prev) => !prev);
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Most Searches
          </button>
        ) : null}

        <section className="all-movies mt-10 px-4 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              🎬 All Movies
            </h2>

            <Link
              to="/watchlist"
              className="text-yellow-400 hover:text-yellow-100 font-semibold
                 border border-yellow-400 px-4 py-2 rounded-lg
                 transition-all duration-200 hover:bg-yellow-400 hover:text-gray-900"
            >
              ⭐ View Watchlist
            </Link>
          </div>

          {isloading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner />
            </div>
          ) : errormessage ? (
            <p className="text-red-500 text-center mt-4">{errormessage}</p>
          ) : (
            <ul className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {movielist.map((movie) => (
                <Moviecard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
