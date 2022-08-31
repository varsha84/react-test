import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './DetailsSection.css'

const DetailsSection = ({ className, name }) => (
  <section className={classNames('DetailsSection', className)}>
    <div className="DetailsSection__name">
      {name}
    </div>
    <div className="DetailsSection__content">
    </div>
  </section>
)

DetailsSection.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default DetailsSection