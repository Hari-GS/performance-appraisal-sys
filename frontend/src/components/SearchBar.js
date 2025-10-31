import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importing search icon from React Icons

const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center bg-orange-100 p-2 rounded-3xl w-[400px] max-w-md mt-6" style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1)" }}>
      <FaSearch className="ml-2 text-gray-500" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="bg-transparent outline-none px-2 flex-1 text-gray-700"
      />
    </div>
  );
};


export default SearchBar;
