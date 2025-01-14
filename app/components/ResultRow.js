import BlueskyPost from "@/app/components/BlueskyPosts/BlueskyPost";

/**
 *
 * @param param0
 * @returns UI rendering and raw JSON data rendering of a single result.
 *
 * TODO
 * - Make this component generic, not linked just to showing a row as a single post.
 */
const ResultRow = ({ post }) => {
  console.log(post);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
      <BlueskyPost post_data={post} />
      {/* <JsonEditor data={post.post} /> */}
      <div>{JSON.stringify(post.post, null, 2)}</div>
    </div>
  );
};

export default ResultRow;
