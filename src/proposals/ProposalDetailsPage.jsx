import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Loading from '../Loading'
import NotFound from '../NotFound'
import Page from '../Page'
import ProposalDetails from './ProposalDetails'
import './ProposalDetailsPage.css'
import { getProposalDetails } from './service'

class ProposalDetailsPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
    isLoading: true,
    isNotFound: false,
    proposal: {},
  }

  componentDidMount () {
    const { id } = this.props
    getProposalDetails(id).then(proposal => {
      if (proposal) {
        this.setState({
          isLoading: false,
          proposal: proposal
        })
      }
      else{
        this.setState({
          isNotFound: true,
          isLoading: false
        })
      }
    })
  }

  render () {
    const { isNotFound, isLoading, proposal } = this.state
    if (isNotFound) return <NotFound/>
    return (
      <Page
        className="ProposalDetailsPage"
        title={isLoading ? '…' : proposal.title}
      
      >
        <div className="ProposalDetailsPage__content">
          <div>
            <Link
              className="ProposalDetailsPage__back"
              to={`/proposals/${proposal.id}`}
              
            >
              back to Call for Papers
            </Link>
          </div>
            { isLoading ?  <Loading/> : <ProposalDetails proposal={proposal}/> }
          </div>
      </Page>
    )
  }
}

export default ProposalDetailsPage
