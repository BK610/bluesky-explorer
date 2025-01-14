import BlueskyPost from "@/app/components/BlueskyPosts/BlueskyPost";
import {
  JsonView,
  allExpanded,
  defaultStyles,
  darkStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

/**
 *
 * @param param0
 * @returns UI rendering and raw JSON data rendering of a single result.
 *
 * TODO
 * - Make this component generic, not linked just to showing a row as a single post.
 */
const ResultRow = ({ post }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(post));
  };

  return (
    <div className="border border-black dark:border-white p-1 grid grid-cols-1 md:grid-cols-2 md:space-x-2 space-y-1 md:space-y-0">
      <BlueskyPost post_data={post} />
      <div className="h-72 overflow-auto font-mono">
        <div className="sticky z-10 pb-1 top-0 grid grid-cols-[1fr_40px] bg-white dark:bg-black">
          <span className="mr-1 overflow-x-auto self-center text-nowrap">
            <span className="text-gray-500 dark:text-gray-300 text-sm">
              Post CID:{" "}
            </span>
            <span>{post.post.cid}</span>
          </span>
          <button
            className="border w-10 h-10 content-center border-black dark:border-white
            transition hover:animate-pulse"
            onClick={copyToClipboard}
          >
            <img
              className="mx-auto dark:invert"
              src="/copy-svgrepo-com.svg"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="text-sm">
          <JsonView
            data={JSON.parse(JSON.stringify(post))}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultRow;
