import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

// if we don't give props to these then they will take these default props, the way of defining default props has been changed
// But if we wan't to make our website SEO friendly then we have to pass these keywords
function Layout({
  title = "Ecommerce App - shop now",
  description = "mern stack project",
  keywords = "mern, react, node, mongdb",
  author = "PiyushSharma",
  children,
}) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title> {title} </title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
        {/* This will allow to show the children between the layout in the App.js */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
