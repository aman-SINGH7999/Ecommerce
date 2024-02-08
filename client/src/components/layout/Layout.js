import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

export default function Layout({children, title, description, keywords, author}) {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
      </Helmet>
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title : "Ecommerce app",
  description : "mern stack project",
  keywords : "mern,react,node,express,mongodb",
  author : "amansingh"
}