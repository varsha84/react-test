import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import './Page.css'

const Page = ({ className, title, children }) => (
  <section className={classNames('Page', className)}>
    <h1 className="Page__title">{title}</h1>
    {children}
  </section>
)

Page.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Page
