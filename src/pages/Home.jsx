import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExperienceCard from "../components/ExperienceCard";

const Home = () => {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");

  const fetchExperiences = async (query = "") => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/experiences?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // ✅ Prevent full page reload
    fetchExperiences(search.trim());
  };

  return (
    <div className="px-10 py-6">
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="text-2xl font-semibold">Explore Experiences</h1> */}
        <div className="flex items-center gap-2 ml-20">
            <img
              src="/logo.png"
              alt="Highway Delite Logo"
              className="h-12 w-35 "
            />
            {/* <span className="font-semibold text-lg">highway delite</span> */}
          </div>

        <div className="flex items-center space-x-4">
          {/* ✅ Search form */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search experiences"
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-64 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 rounded-r-lg px-4 py-2"
            >
              Search
            </button>
          </form>

          {/* ✅ Add Experience button */}
          <Link
            to="/add-experience"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
          >
            + Add Experience
          </Link>
        </div>
      </div>

      {/* ✅ Experience grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.length > 0 ? (
          experiences.map((exp) => <ExperienceCard key={exp._id} exp={exp} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No experiences found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
