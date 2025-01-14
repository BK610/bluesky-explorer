"use client";

import { useState, useEffect } from "react";
import { agent } from "./lib/bskyApi";
import SearchForm from "@/app/components/searchForm";
import ResultRow from "@/app/components/ResultRow";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState(undefined);

  const handleSearch = (query) => {
    setCurrentQuery(query);
  };

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const feed = await getAuthorFeed(query);
      if (feed) {
        setHasSearched(true);
        setResults(JSON.parse(JSON.stringify(feed)));
        setSearchError(undefined);
      }
    } catch (error) {
      setSearchError("Error occurred. Check the input and try again.");
    } finally {
      setLoading(false);
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
          Enter a Bluesky profile DID, URI, or handle.
        </h2>
      </div>
      <SearchForm
        onSearch={handleSearch}
        loading={loading}
        searchError={searchError}
      />
      <div className={`${!hasSearched && "hidden"} mt-10 w-full mx-auto`}>
        <h2 className="text-2xl font-semibold pb-4">Found data</h2>
        <h3 className="text-xl font-semibold font-mono pb-2 text-gray-600 dark:text-gray-300">
          Profile Metadata
        </h3>
        <div className="pb-4 font-mono text-gray-800 dark:text-gray-200">
          Coming soon...
        </div>
        <h3 className="text-xl font-semibold font-mono pb-2 text-gray-600 dark:text-gray-300">
          Posts
        </h3>
        <p className="pb-2 font-mono text-gray-800 dark:text-gray-200">
          Fetched most recent {results.length} posts.
        </p>
        <div className="space-y-4">
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

  // If it's a profile URL, get the handle
  if (isBskyProfileURI(query)) {
    query = getBskyHandleFromProfileURI(query);
  }
  // If it's not a DID already, get the DID value
  if (query.slice(0, 4) != "did:") {
    did = await resolveHandleToDid(query);
  }

  // If it's not a valid handle or DID, try searching with just the query
  if (!did) did = query;

  try {
    const posts = await agent.getAuthorFeed({
      actor: did,
      limit: 10,
    });

    const feed = posts.data.feed;

    // console.log(feed);
    // console.log(typeof feed);

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

function isBskyProfileURI(query) {
  try {
    const url = new URL(query);
    return url.hostname == "bsky.app" && url.pathname.startsWith("/profile");
  } catch (e) {
    return false;
  }
}

function getBskyHandleFromProfileURI(query) {
  const url = new URL(query);
  return url.pathname.slice(9);
}
