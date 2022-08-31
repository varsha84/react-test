import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './ProposalRow.css'

const withoutEventDefault = callback => event => {
  event.preventDefault()
  callback()
}

const ProposalRow = ({ proposal, onStatusUpdate }) => {
  const { id, title, speaker, category, status } = proposal
  return (
    <div className={classNames({'ProposalRow': true,  'ProposalRow--accepted': (status == 'accepted'), 'ProposalRow--rejected': (status == 'rejected')})}>
      
      <div className="ProposalsRow__status_indicator"/>
      <div className="ProposalsRow__title">
        {title}
      </div>
      <div className="ProposalsRow__speaker">
        {speaker}
      </div>
      <div className="ProposalsRow__category">
        category: {category}
      </div>
      <div className="ProposalsRow__status">
        status: {status}
      </div>
      <div className="ProposalsRow__accept_button"
        onClick={withoutEventDefault((id, status) => onStatusUpdate(id, status))}
      >
        Accept
      </div>
      <div className="ProposalsRow__reject_button"
        onClick={withoutEventDefault((id, status) => onStatusUpdate(id, status))}
      >
        Reject
      </div>
    </div>
  )
}

ProposalRow.propTypes = {
  proposal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
}

export default ProposalRow
