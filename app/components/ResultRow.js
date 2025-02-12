import BlueskyPost from "@/app/components/BlueskyPosts/BlueskyPost";
import BlueskyProfile from "@/app/components/BlueskyProfile";
import {
  JsonView,
  allExpanded,
  defaultStyles,
  darkStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import Image from "next/image";

/**
 *
 * @param type The type of data to render.
 * @param data The data to be used in the rendering.
 *
 * @returns UI rendering and raw JSON data rendering of a single result.
 *
 * TODO
 * - Make this component generic, not linked just to showing a row as a single post.
 */
export default function ResultRow({ type, data }) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data));
  };

  const content = {
    post: <BlueskyPost postData={data} />,
    profile: <BlueskyProfile profileData={data} />,
  };

  // const id = {
  //   post: data.post.cid,
  //   profile: data.did,
  // };

  return (
    <div className="rounded-md border border-black dark:border-white p-2 grid grid-cols-1 md:grid-cols-2 md:space-x-2 space-y-1 md:space-y-0">
      {content[type]}
      <div className="h-72 overflow-auto font-mono">
        <div className="sticky z-10 pb-1 top-0 grid grid-cols-[1fr_40px] bg-white dark:bg-black">
          <span className="mr-1 overflow-x-auto self-center text-nowrap">
            <span className="text-neutral-500 dark:text-neutral-300 text-sm">
              ID:{" "}
            </span>
            {/* <span>{id[type]}</span> */}
          </span>
          <button
            className="border w-10 h-10 content-center border-black dark:border-white
            transition hover:opacity-80 active:opacity-60"
            onClick={copyToClipboard}
          >
            <Image
              className="mx-auto dark:invert"
              src="/copy-svgrepo-com.svg"
              width={20}
              height={20}
              alt={`Clipboard copy icon`}
            />
          </button>
        </div>
        <div className="text-sm">
          <JsonView
            data={JSON.parse(JSON.stringify(data))}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        </div>
      </div>
    </div>
  );
}
