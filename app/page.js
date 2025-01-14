"use client";

import { useState, useEffect } from "react";
import { agent } from "./lib/bskyApi";
import SearchForm from "@/app/components/searchForm";
import ResultRow from "@/app/components/ResultRow";

export default function Home() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const handleSearch = (query) => {
    setCurrentQuery(query);
  };

  const fetchData = async (query) => {
    try {
      const feed = await getAuthorFeed(query);
      if (feed) {
        setHasSearched(true);
        setResults(JSON.parse(JSON.stringify(feed)));
        setSearchError("");
      }
    } catch (error) {
      setSearchError("Error occurred while searching. Try again.");
    }
  };

  useEffect(() => {
    if (currentQuery) {
      fetchData(currentQuery);
    }
  }, [currentQuery]);

  return (
    <div className="container mx-auto px-2">
      <div className="mt-10 w-full sm:w-2/3 mx-auto">
        <h1 className="text-3xl font-bold ">Bluesky Explorer</h1>
        <h2 className="mt-2 textl-xl font-mono font-semibold">
          Enter a Bluesky DID, URI, or handle.
        </h2>
      </div>
      <SearchForm onSearch={handleSearch} />
      <div className="mt-1 w-full sm:w-2/3 mx-auto text-red-600 font-semibold">
        {searchError}
      </div>
      <div className={`${!hasSearched && "hidden"} mt-14 w-full mx-auto`}>
        <h2 className="text-xl">Results</h2>
        <div>
          {results.map((post, key) => (
            <ResultRow post={post} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function getAuthorFeed(query) {
  query = query.toLowerCase();
  let did = null;
  if (query.slice(0, 4) != "did:") {
    did = await resolveHandleToDid(query);
  }

  if (!did) did = query;

  try {
    const posts = await agent.getAuthorFeed({
      actor: did,
    });

    const feed = posts.data.feed;

    console.log(feed);
    console.log(typeof feed);

    return feed;
  } catch (error) {
    console.error(`Error fetching feed for query: ${query}. ${error}`);
    throw error;
  }
}

async function resolveHandleToDid(handle) {
  const did = await fetch(
    `https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`
  )
    .then((res) => res.json())
    .then((json) => json.did);

  return did;
}
