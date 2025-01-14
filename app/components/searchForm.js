import { useState } from "react";

const SearchForm = ({ onSearch, loading, searchError }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="m-4 px-2 pt-1 pb-1 border border-gray-600 rounded-md w-full sm:w-2/3 mx-auto sticky z-20 top-4 bg-gray-100 dark:bg-gray-800 ">
      <form onSubmit={handleSearch}>
        <div
          className={`${
            loading || "invisible"
          } mt-1 mx-auto text-sm text-gray-700 dark:text-gray-300`}
        >
          {loading ? "Loading..." : "Loaded"}
        </div>
        <div className="w-full flex">
          <input
            className="rounded-l-lg w-full px-2 py-2 text-sm text-black font-mono border border-r-0 dark:border-white border-black"
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
        <div
          className={`${
            searchError || "invisible"
          } mt-1 mx-auto text-sm text-red-600 font-semibold`}
        >
          {searchError || "No error"}
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
