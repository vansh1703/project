import React, { useEffect, useState } from 'react'
import Moviecard from './moviecard'

function Trending({ refresh }) {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('searchTrends')) || {}
    console.log("Trending data:", data)

    const sorted = Object.entries(data)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([_, movie]) => movie)

    setTrending(sorted)
  }, [refresh])

  if (trending.length === 0) return null

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">🔥 Trending Searches</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {trending.map((movie) => (
          <Moviecard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default Trending
