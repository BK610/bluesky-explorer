import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="mt-4 w-full sm:w-2/3 mx-auto">
      <form onSubmit={handleSearch}>
        <div className="w-full flex">
          <input
            className="rounded-l-lg w-full px-2 py-2 text-black border border-r-0 dark:border-white border-black"
            type="search"
            placeholder="baileykane.co"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="px-2 py-2 font-semibold border dark:border-white border-black rounded-r-lg"
            type="submit"
          >
            Explore
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
