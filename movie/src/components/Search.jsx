import React from 'react'

function Search({searchterm,setsearchterm}) {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input type="text"
            placeholder='Search through thousand of movies' 
            value={searchterm}
            onChange={(event)=>{
                setsearchterm(event.target.value)
            }}
            />
        </div>
    </div>
  )
}

export default Search