[🔗 Check it out](https://bluesky-explorer-sepia.vercel.app/)

# Why I did this

After `console.log(post)`ing ad nauseum while building a UI component to render Bluesky posts using the [Bluesky API](https://docs.bsky.app/), I decided to build an explorer tool to make it easier for myself. A day later, Bluesky Explorer was born. Lookup Bluesky posts, and show the underlying JSON data structure for each.

For now, searching by Bluesky handles, profile URIs, and DIDs are supported, and all posts from an account are displayed. In the future I'll add better support for threads, and possibly for searching by individual posts, feeds, and other data structures.
## Usage

1. Search with one of the following into the search bar:
    - A Bluesky URI (e.g. https://bsky.app/profile/baileykane.co)
    - A Bluesky handle (e.g. baileykane.co)
    - A Bluesky DID (e.g. did:plc:4zwo7e6xbmv3clz7bj5wsxxu)
2. Retrieved posts and information from the Bluesky API will be displayed, alongside the corresponding JSON for each item

## Built with

- [Bluesky API](https://docs.bsky.app/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
