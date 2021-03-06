import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <AboutPageTemplate
        hero={data.hero || {}}
        leftText={data.leftText || {}}
        membership={data.membership || {}}
        rightText={data.rightText || {}}
        story={data.story || {}}
        textWithImage={data.textWithImage || {}}
      />
    )
  }
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default AboutPagePreview
