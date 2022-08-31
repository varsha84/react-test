import React from 'react'
import { StaticRouter } from 'react-router-dom'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'

import { flushRequestsAndUpdate } from '../testUtils'
import ProposalList from '../proposals/ProposalList'
import ProposalListPage from '../proposals/ProposalListPage'
import Loading from '../Loading'

const renderProposalListPage = () => mount(
  <StaticRouter context={{}}>
    <ProposalListPage/>
  </StaticRouter>
)

const firstProposalRowIn = tree =>
  tree.find('.ProposalList__item').first().find('.ProposalRow')

describe('<ProposalListPage>', () => {

  let httpMock

  beforeEach(() => {
    httpMock = new AxiosMockAdapter(axios)
    httpMock.onGet('/talks').reply(200, [
      {
        id: 'any-id',
        title: 'Any Title',
        speaker: 'Any Speaker',
        category: 'any category',
      },
    ])
    httpMock.onGet('/callForPapers').reply(200, {
      byTalkId: {
        'any-id': { status: 'pending' },
      },
    })
    httpMock.onPut(/^\/callForPapers\/.+/).reply(204)
  })

  test('renders <ProposalList> after receiving response from API', async () => {
    // given
    httpMock.onGet('/talks').reply(200, [
      { id: 'id-1', title: 'any', speaker: 'any', category: 'any' },
    ])
    httpMock.onGet('/callForPapers').reply(200, {
      byTalkId: {
        'id-1': { status: 'pending' },
      },
    })

    // when
    const tree = renderProposalListPage()
    await flushRequestsAndUpdate(tree)

    // then
    expect(tree.find(ProposalList)).toExist()
  })

  test('updates changed proposal status to accepted', async () => {
    // given
    httpMock.onGet('/talks').reply(200, [
      { id: 'id-1', title: 'any', speaker: 'any', category: 'any' },
    ])
    httpMock.onGet('/callForPapers').reply(200, {
      byTalkId: {
        'id-1': { status: 'pending' },
      },
    })
    const tree = renderProposalListPage()
    await flushRequestsAndUpdate(tree)

    // then
    expect(firstProposalRowIn(tree)).not.toHaveClassName('ProposalRow--accepted')

    // and when
    firstProposalRowIn(tree)
      .find('.ProposalsRow__accept_button')
      .simulate('click')

    // then
    expect(firstProposalRowIn(tree)).toHaveClassName('ProposalRow--accepted')
  })

  test('updates changed proposal status to rejected', async () => {
    // given
    httpMock.onGet('/talks').reply(200, [
      { id: 'id-1', title: 'any', speaker: 'any', category: 'any' },
    ])
    httpMock.onGet('/callForPapers').reply(200, {
      byTalkId: {
        'id-1': { status: 'pending' },
      },
    })
    const tree = renderProposalListPage()
    await flushRequestsAndUpdate(tree)

    // then
    expect(firstProposalRowIn(tree)).not.toHaveClassName('ProposalRow--rejected')

    // and when
    firstProposalRowIn(tree)
      .find('.ProposalsRow__reject_button')
      .simulate('click')

    // then
    expect(firstProposalRowIn(tree)).toHaveClassName('ProposalRow--rejected')
  })
})
