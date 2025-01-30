import BlueskyPostHeader from "./BlueskyPostHeader";
import BlueskyPostText from "./BlueskyPostText";
import BlueskyPostFooter from "./BlueskyPostFooter";

export default function BlueskyPost({ postData }) {
  const { author, record, uri } = postData.post;
  const { reason } = postData;

  const blueskyUri = getBlueskyUri(author.handle, uri);
  const isRepost =
    typeof reason !== "undefined" &&
    reason.$type === "app.bsky.feed.defs#reasonRepost";

  // function setThemeColor() {
  //   const colorVariants = {
  //     stone:
  //   }
  // }

  // Helper function to generate color variations
  // const generateColorVariants = (baseColor) => {
  //   const variants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  //   return variants.reduce((acc, variant) => {
  //     // Use color-mix to create variations
  //     const mixPercentage = (() => {
  //       switch (true) {
  //         case variant < 500: // Lighter variants
  //           return 100 - variant / 5;
  //         case variant > 500: // Darker variants
  //           return (variant - 500) / 5;
  //         default: // 500 is the base color
  //           return 0;
  //       }
  //     })();

  //     const mixDirection = variant < 500 ? "white" : "black";

  //     acc[`--theme-color-${variant}`] =
  //       variant === 500
  //         ? baseColor
  //         : `color-mix(in srgb, ${baseColor}, ${mixDirection} ${mixPercentage}%)`;

  //     return acc;
  //   }, {});
  // };

  // const style = generateColorVariants(themeColor);

  return (
    /** Things to add:
     * - "Replied to..."
     * - Showing threads
     * - Showing images
     * - Showing link previews
     */
    <div>
      <a href={blueskyUri} target="_blank">
        <div
          className={`p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg
        border border-neutral-300 dark:border-neutral-400 border-b-neutral-900 dark:border-b-neutral-200 hover:border-neutral-900 hover:dark:border-neutral-200`}
        >
          <div className="flex flex-col w-full">
            {isRepost && (
              <div
                className={`ml-16 -mt-2 pb-2 text-xs text-neutral-700 dark:text-neutral-400`}
              >
                🔁 Reposted by @{reason.by.handle}
              </div>
            )}
            <div className="flex w-full items-start">
              <img
                className={`mr-4 border border-neutral-900 dark:border-neutral-500 rounded-full`}
                src={author.avatar}
                height={"50px"}
                width={"50px"}
                alt={`Avatar photo of user ${author.displayName}`}
              />
              <div className="w-full">
                <BlueskyPostHeader author={author} record={record} />
                <BlueskyPostText text={record.text} />
                <BlueskyPostFooter post={postData.post} />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
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
