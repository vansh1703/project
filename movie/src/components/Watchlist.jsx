import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import Moviecard from "./moviecard";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(list);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter((m) => m.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">🎞️ My Watchlist</h1>

        {/* 🔙 Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all duration-200"
        >
          ⬅️ Back to All Movies
        </button>
      </div>

      {watchlist.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mt-10">
          Your watchlist is empty! 😢
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative">
              <Moviecard movie={movie} onClick={() => {}} showfortrend />
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs text-white px-2 py-1 rounded transition-all duration-200"
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
