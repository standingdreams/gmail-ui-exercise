import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import SEO from "../components/seo"
import "./../scss/styles.scss"

const Layout = props => {
  const children = props.children
  const { title } = props
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO title={ title } />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer className="c-footer">
          <div className="l-container">
            <div>
              5.78 GB (34%) of 17 GB used
              <a href="#">Manage</a>
            </div>
            <div className="c-footer__nav">
              <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" className="l9">Terms</a> · <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" className="l9">Privacy</a> · <a href="https://www.google.com/gmail/about/policy/" target="_blank" className="l9">Program Policies</a>
            </div>
            <div className="c-footer__activity">
              Last account activity: 21 minutes ago
              <a href="#">Details</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
