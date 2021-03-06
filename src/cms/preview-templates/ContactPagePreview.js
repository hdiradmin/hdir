import React from 'react'
import PropTypes from 'prop-types'
import { ContactPageTemplate } from '../../templates/contact-page'

const ContactPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ContactPageTemplate
        contact={data.contact || {}}
        form={data.form || {}}
        hero={data.hero || {}}
      />
    )
  }
}

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagePreview
