import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Hero from '../components/Hero'
import Layout from '../components/Layout'
import LeftText from '../components/LeftText'
import Membership from '../components/Membership'
import RightText from '../components/RightText'
import Story from '../components/Story'
import TextWithImage from '../components/TextWithImage'

export const AboutPageTemplate = ({ hero, leftText, membership, rightText, story, textWithImage }) => {
  return (
    <React.Fragment>
      <Hero hero={ hero } />
      <RightText rightText={ rightText } />
      <Story story={ story } />
      <TextWithImage textWithImage={ textWithImage } />
      <LeftText leftText={ leftText } />
      <Membership membership={ membership } />
    </React.Fragment>
  )
}

AboutPageTemplate.propTypes = {
  hero: PropTypes.object,
  leftText: PropTypes.object,
  membership: PropTypes.object,
  rightText: PropTypes.object,
  story: PropTypes.object,
  textWithImage: PropTypes.object
}

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout lang={frontmatter.lang}>
      <AboutPageTemplate
        hero={frontmatter.hero}
        leftText={frontmatter.leftText}
        membership={frontmatter.membership}
        rightText={frontmatter.rightText}
        story={frontmatter.story}
        textWithImage={frontmatter.textWithImage}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        lang
        hero {
          height
          image {
            childImageSharp {
              fluid(maxWidth: 4096, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          subtitle
          title
          top
          link {
            title
            page
          }
        }
        leftText {
          body
          isBig
          link {
            title
            page
          }
          title
        }
        membership {
          height
          image {
            childImageSharp {
              fluid(maxWidth: 4096, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link {
            page
            title
          }
          subtitle
          title
        }
        rightText {
          body
          title
        }
        story {
          cards {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          title
        }
        textWithImage {
          body
          image {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
