import "./globals.css";

export const metadata = {
  title: "Bluesky Explorer",
  description: "View the data behind Bluesky posts, profiles, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
