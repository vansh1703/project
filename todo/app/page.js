"use client"
import React, { useState } from "react"

const Page = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [displaylist, setDisplaylist] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  // Add or update task
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !desc) return alert("Please enter both fields")

    if (editIndex !== null) {
      const updatedList = displaylist.map((item, i) =>
        i === editIndex ? { title, desc } : item
      )
      setDisplaylist(updatedList)
      setEditIndex(null)
    } else {
      setDisplaylist([...displaylist, { title, desc }])
    }

    setTitle("")
    setDesc("")
  }

  // Delete
  const handleDelete = (index) => {
    const updatedList = displaylist.filter((_, i) => i !== index)
    setDisplaylist(updatedList)
  }

  // Edit
  const handleEdit = (index) => {
    const item = displaylist[index]
    setTitle(item.title)
    setDesc(item.desc)
    setEditIndex(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <h1 className="text-white p-6 text-4xl md:text-5xl font-extrabold text-center tracking-tight">
          ✨ My Todo List
        </h1>
      </header>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 mt-10 w-[90%] md:w-[50%] flex flex-col gap-4 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Enter Task Title"
          className="border border-gray-300 rounded-xl p-3 text-lg focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Task Description"
          className="border border-gray-300 rounded-xl p-3 text-lg focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all min-h-[100px]"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full py-3 text-xl font-semibold rounded-xl shadow-md text-white transition-all ${
            editIndex !== null
              ? "bg-yellow-500 hover:bg-yellow-400"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="w-[90%] md:w-[50%] mt-10 space-y-4 mb-20">
        {displaylist.length === 0 ? (
          <p className="text-center text-gray-500 text-lg italic">
            No tasks yet — start by adding one!
          </p>
        ) : (
          displaylist.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all rounded-2xl p-5 flex justify-between items-start"
            >
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 md:gap-2 ml-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm pb-6">
        Built with ❤️ using React + Tailwind
      </footer>
    </div>
  )
}

export default Page
