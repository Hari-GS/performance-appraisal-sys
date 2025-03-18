import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing search icon from React Icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center bg-orange-100 p-2 rounded-lg w-full max-w-md mt-8">
      <FaSearch className="ml-2 text-gray-500" size={18} />
      <input
        type="text"
        placeholder="Search employees by name"
        value={query}
        onChange={handleSearch}
        className="bg-transparent outline-none px-2 flex-1 text-gray-700"
      />
      <button className="bg-orange-300 px-4 py-1 rounded-lg ml-2 text-gray-700 font-semibold">
        Filter
      </button>
    </div>
  );
};

export default SearchBar;
