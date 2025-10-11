import React, { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/spinner";
import Moviecard from "./components/moviecard";
import { useDebounce } from "react-use";
import Trending from './components/Trending'


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

      if (query && data.results.length > 0) {
        const trendingData =
          JSON.parse(localStorage.getItem("searchTrends")) || {};
        const movie = data.results[0];

        // increment count if exists, otherwise add
        if (trendingData[movie.id]) {
          trendingData[movie.id].count += 1;
        } else {
          trendingData[movie.id] = { ...movie, count: 1 };
        }

        localStorage.setItem("searchTrends", JSON.stringify(trendingData));
      }
    } catch (error) {
      seterrormessage("Failed to fetch movies. Please try again later.");
    } finally {
      setisloading(false);
    }
  };

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

        <Trending />

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isloading ? (
            <p>
              <Spinner />
            </p>
          ) : errormessage ? (
            <p className="text-red-500">{errormessage}</p>
          ) : (
            <ul>
              {movielist.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
