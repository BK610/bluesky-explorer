import "./globals.css";

export const metadata = {
  title: "Bluesky Explorer",
  description: "View the data behind Bluesky posts, profiles, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-sky-100 dark:bg-slate-800 flex flex-col min-h-svh`}
      >
        <main className="flex-1">{children}</main>
        <footer className="text-sm w-full text-center py-4 h-fit">
          Made by{" "}
          <a
            href="https://www.baileykane.co/?ref=blueskyexplorer"
            target="_blank"
            className="underline hover:decoration-2"
          >
            Bailey Kane
          </a>
          , with curiosity.
        </footer>
      </body>
    </html>
  );
}
