import BlueskyPostHeader from "./BlueskyPostHeader";
import BlueskyPostText from "./BlueskyPostText";
import BlueskyPostFooter from "./BlueskyPostFooter";
import Image from "next/image";

export default function BlueskyPost({ post_data }) {
  const { author, record, uri } = post_data.post;
  const { reason } = post_data;

  const blueskyUri = getBlueskyUri(author.handle, uri);
  const isRepost =
    typeof reason !== "undefined" &&
    reason.$type === "app.bsky.feed.defs#reasonRepost";

  return (
    /** Things to add:
     * - "Replied to..."
     * - Showing threads
     * - Showing images
     * - Showing link previews
     */
    <a href={blueskyUri} target="_blank">
      <div
        className="p-4 mb-4 bg-stone-200 dark:bg-stone-800 rounded-lg
      border border-stone-300 dark:border-stone-500 border-b-stone-900 dark:border-b-stone-200 hover:border-stone-900 hover:dark:border-stone-200 "
      >
        <div className="flex flex-col w-full">
          {isRepost && (
            <div className="ml-16 -mt-2 pb-2 text-xs text-stone-700 dark:text-stone-400">
              🔁 Reposted by @{reason.by.handle}
            </div>
          )}
          <div className="flex w-full items-start">
            <img
              className="mr-4 border border-stone-900 dark:border-stone-500 rounded-full"
              src={author.avatar}
              height={"50px"}
              width={"50px"}
              alt={`Avatar photo of user ${author.displayName}`}
            />
            <div className="w-full">
              <BlueskyPostHeader author={author} record={record} />
              <BlueskyPostText text={record.text} />
              <BlueskyPostFooter post={post_data.post} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function getBlueskyUri(handle, atProtoUri) {
  var blueskyUri = "https://bsky.app/profile/<handle>/post/<postId>";

  const postId = atProtoUri.substring(atProtoUri.lastIndexOf("/") + 1);

  blueskyUri = blueskyUri
    .replace("<handle>", handle)
    .replace("<postId>", postId);

  return blueskyUri;
}
