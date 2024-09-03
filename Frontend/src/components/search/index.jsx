import React from "react";

const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        className="w-full md:w-full lg:w-2/3 xl:w-2/4 p-2 pl-4 text-md text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="ml-2 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none  "
        onClick={handleSearch}
      >
        Search Weather
      </button>
    </div>
  );
};

export default Search;
