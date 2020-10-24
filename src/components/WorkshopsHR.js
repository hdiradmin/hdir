import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Feed from './Feed'

export default () => (
  <StaticQuery
    query={graphql`
      query WorkshopsHRQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "activity-post" } activity: { eq: "workshops" } lang: { eq: "hr" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date
                description
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 180, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Feed data={data} count={count} lang="hr" />}
  />
)