import { RichText } from "@atproto/api";
import { agent } from "@/app/lib/bskyApi";
import { micromark } from "micromark";

export default function BlueskyPostText({ text }) {
  const parsedText = parseBlueskyPostText(text);

  return (
    <div
      className="prose prose-stone dark:prose-invert leading-snug text-sm text-stone-900 dark:text-stone-200"
      dangerouslySetInnerHTML={{ __html: parsedText }}
    ></div>
  );
}

function parseBlueskyPostText(text) {
  const rt = new RichText({ text: text });

  rt.detectFacets(agent);

  const markdown = renderAsMarkdown(rt);

  const parsedMarkdown = micromark(markdown);

  return parsedMarkdown;
}

function renderAsMarkdown(richText) {
  let markdown = "";
  for (const segment of richText.segments()) {
    if (segment.isLink()) {
      markdown += `[${segment.text}](${segment.link?.uri})`;
    } else if (segment.isMention()) {
      markdown += `[${segment.text}](https://bsky.app/profile/${segment.mention?.did})`;
    } else if (segment.isTag()) {
      markdown += `[${segment.text}](https://bsky.app/hashtag/${segment.tag?.tag})`;
    } else {
      markdown += segment.text;
    }
  }

  return markdown;
}
