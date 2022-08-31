import React from 'react'
import { Link, StaticRouter } from 'react-router-dom'
import { mount } from 'enzyme'

import ProposalList from '../proposals/ProposalList/ProposalList'

const proposalFixture = overrides => ({
  id: 'any-id',
  title: 'Any Title',
  speaker: 'Any Speaker',
  category: 'any category',
  status: 'any-status',
  ...overrides,
})

const renderProposalList = props => mount(
  <StaticRouter context={{}}>
    <ProposalList
      proposals={[]}
      onProposalStatusUpdate={() => {}}
      {...props}
    />
  </StaticRouter>
)

const listItemsIn = tree => tree.find('.ProposalList__item')

describe('<ProposalList>', () => {

  test('renders speaker', () => {
    // given
    const proposalsData = [
      proposalFixture({
        id: 'id-1',
        title: 'any',
        speaker: 'Someone Known',
        category: 'any',
      }),
      proposalFixture({
        id: 'id-2',
        title: 'any',
        speaker: 'John Smith',
        category: 'any',
      }),
    ]

    // when
    const tree = renderProposalList({ proposals: proposalsData })

    // then
    const proposals = listItemsIn(tree)
    expect(proposals.at(0).find('.ProposalsRow__speaker')).toHaveText('Someone Known')
    expect(proposals.at(1).find('.ProposalsRow__speaker')).toHaveText('John Smith')
  })

  test('renders links to details pages of proposals', () => {
    // given
    const proposalsData = [
      proposalFixture({ id: 'id-123' }),
    ]

    // when
    const tree = renderProposalList({ proposals: proposalsData })

    // then
    const proposal = listItemsIn(tree).at(0)
    expect(proposal.find(Link)).toHaveProp('to', '/proposals/id-123')
  })

  test('uses proper CSS class for accepted proposal', () => {
    // given
    const proposalsData = [
      proposalFixture({ id: 'id-1', status: 'accepted' }),
    ]

    // when
    const tree = renderProposalList({ proposals: proposalsData })

    // then
    const row = listItemsIn(tree).first().find('.ProposalRow')
    expect(row).toHaveClassName('ProposalRow--accepted')
  })

  test('uses proper CSS class for rejected proposal', () => {
    // given
    const proposalsData = [
      proposalFixture({ id: 'id-1', status: 'rejected' }),
    ]

    // when
    const tree = renderProposalList({ proposals: proposalsData })

    // then
    const row = listItemsIn(tree).first().find('.ProposalRow')
    expect(row).toHaveClassName('ProposalRow--rejected')
  })

  test('calls rejects proposal callback', () => {
    // given
    const proposalsData = [
      proposalFixture({ id: 'id-1', status: 'pending' }),
    ]
    const onProposalStatusUpdate = jest.fn()
    const tree = renderProposalList({
      proposals: proposalsData,
      onProposalStatusUpdate: onProposalStatusUpdate,
    })

    // when
    tree
      .find('.ProposalList__item')
      .first()
      .find('.ProposalsRow__reject_button')
      .simulate('click')

    // then
    expect(onProposalStatusUpdate.mock.calls).toHaveLength(1)
  })

  test('calls accept proposal callback', () => {
    // given
    const proposalsData = [
      proposalFixture({ id: 'id-1', status: 'pending' }),
    ]
    const onProposalStatusUpdate = jest.fn()
    const tree = renderProposalList({
      proposals: proposalsData,
      onProposalStatusUpdate: onProposalStatusUpdate,
    })

    // when
    tree
      .find('.ProposalList__item')
      .first()
      .find('.ProposalsRow__accept_button')
      .simulate('click')

    // then
    expect(onProposalStatusUpdate.mock.calls).toHaveLength(1)
  })

})
