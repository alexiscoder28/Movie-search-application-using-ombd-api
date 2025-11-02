// src/components/MovieCard.jsx
import React from "react";

const MovieCard = ({ movie }) => {
  const { Title, Poster, Year } = movie;
  const posterSrc = Poster && Poster !== "N/A" ? Poster : "/no-image.png";

  return (
    <div className="movie-card bg-[#1c1c1c] p-4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 text-center w-56">
      <img
        src={posterSrc}
        alt={Title}
        className="w-full h-72 object-cover rounded-lg mb-3 border border-gray-700"
      />

      <h3 className="text-white font-semibold text-lg truncate">{Title}</h3>

      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-gray-400 text-sm">{Year}</span>
        {/* simple star emoji for rating placeholder */}
        <div className="flex items-center gap-1 text-yellow-400">
          <span style={{fontSize: 16}}>⭐</span>
          <span className="text-sm">N/A</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
