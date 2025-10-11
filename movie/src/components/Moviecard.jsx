import React from "react";

function Moviecard({ movie, showfortrend = false, onClick }) {
  // Handle adding movie to watchlist
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
    <div
      className="movie-card cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick(movie)}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `/No-movie.png`
        }
        alt={movie.title}
        className="rounded-lg shadow-lg"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>

        {!showfortrend && (
          <div className="content flex items-center gap-2 text-sm text-gray-400 mt-2">
            <div className="rating flex items-center gap-1">
              <img src="star.svg" alt="stars" className="w-4 h-4" />
              <p>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang uppercase">{movie.original_language}</p>
            <span>•</span>
            <p className="year">
              {movie.release_date ? movie.release_date : "N/A"}
            </p>
            <span>•</span>

            {/* 🟢 Watchlist Button */}
            <div
              className="rating relative group cursor-pointer"
              onClick={handleAddToWatchlist}
            >
              <img
                className="bg-blue-200 rounded-full p-1 hover:bg-blue-300 transition"
                src="watchlist.png"
                alt="Watchlist"
                width={20}
              />

              <span
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                   opacity-0 group-hover:opacity-100
                   transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded
                   whitespace-nowrap z-10"
              >
                Add to Watchlist
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Moviecard;
