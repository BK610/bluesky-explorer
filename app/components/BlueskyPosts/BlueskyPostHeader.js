export default function BlueskyPostHeader({ author, record }) {
  const dateObj = new Date(record.createdAt);
  const timeElapsed = getTimeElapsed(dateObj);

  return (
    <div className="pb-1 text-sm text-stone-700 dark:text-stone-400 border-b border-stone-600 dark:border-stone-500 mb-2">
      <a
        className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        href={"https://bsky.app/profile/" + author.handle}
        target="_blank"
      >
        {author.displayName} @{author.handle}
      </a>{" "}
      {timeElapsed} ago
    </div>
  );
}

function getTimeElapsed(date) {
  const currentTime = new Date();

  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
  const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

  const secondsElapsed = (currentTime.getTime() - date.getTime()) / 1000;

  if (secondsElapsed < SECONDS_IN_HOUR) {
    return Math.round(secondsElapsed / SECONDS_IN_MINUTE).toString() + "m";
  }
  if (secondsElapsed < SECONDS_IN_DAY) {
    return Math.round(secondsElapsed / SECONDS_IN_HOUR).toString() + "h";
  }
  if (secondsElapsed < SECONDS_IN_YEAR) {
    return Math.round(secondsElapsed / SECONDS_IN_DAY).toString() + "d";
  }
  return Math.round(secondsElapsed / SECONDS_IN_YEAR).toString() + "y";
}
