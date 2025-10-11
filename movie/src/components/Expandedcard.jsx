import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ExpandedCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};

  if (!movie) return <p className="text-center text-red-500 mt-10 text-lg">Movie not found!</p>;

   const handleAddToWatchlist = (e) => {
    e.stopPropagation(); // ✅ Prevent card click event from triggering

    const existingList = JSON.parse(localStorage.getItem("watchlist")) || [];
    const alreadyAdded = existingList.find((m) => m.id === movie.id);

    if (alreadyAdded) {
      alert("🎬 Movie is already in your Watchlist!");
      return;
    }

    const updatedList = [...existingList, movie];
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
    alert("✅ Added to Watchlist!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-10 px-6">
      <div className="max-w-5xl w-full bg-gray-800 bg-opacity-60 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="md:w-1/3 flex justify-center items-center bg-gray-900">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : `/No-movie.png`
              }
              alt={movie.title}
              className="w-full h-full object-cover md:rounded-l-2xl"
            />
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3 text-yellow-400">
                {movie.title}
              </h1>

              <p className="text-gray-300 mb-4 italic">
                {movie.tagline ? `"${movie.tagline}"` : ""}
              </p>

              <p className="text-gray-200 leading-relaxed mb-6">
                {movie.overview || "No description available."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-400">
                <p><span className="font-semibold text-gray-100">⭐ Rating:</span> {movie.vote_average?.toFixed(1) || "N/A"}</p>
                <p><span className="font-semibold text-gray-100">🗓️ Release:</span> {movie.release_date || "Unknown"}</p>
                <p><span className="font-semibold text-gray-100">🌐 Language:</span> {movie.original_language?.toUpperCase()}</p>
                <p><span className="font-semibold text-gray-100">🎥 Popularity:</span> {movie.popularity}</p>
                <p><span className="font-semibold text-gray-100">💰 Votes:</span> {movie.vote_count}</p>
              </div>
            </div>

            {/* Back Button */}
            <div>
              <button
              onClick={() => navigate(-1)}
              className="mt-8 mr-2 self-start bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-200"
            >
              ← Back to Movies
            </button>
            <button onClick={handleAddToWatchlist} className="mt-8 self-start bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg transition-all duration-200">
              Add to Watchlist
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
