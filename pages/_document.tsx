import { Html, Head, Main, NextScript } from "next/document";

// This is a custom Next.js Document component
export default function Document() {
  return (
    // Defines the HTML document structure
    <Html lang="en">
      {/* A head tag to contain metadata and links */}
      <Head />
      {/* A body tag to contain the main content */}
      <body>
        {/* The main content of the page */}
        <Main />
        {/* The script for Next.js */}
        <NextScript />
      </body>
    </Html>
  );
}
