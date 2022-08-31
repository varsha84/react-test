import React from 'react'
import { StaticRouter } from 'react-router-dom'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { mount } from 'enzyme'

import Loading from '../Loading'
import { flushRequestsAndUpdate } from '../testUtils'
import ProposalDetails from '../proposals/ProposalDetails'
import ProposalDetailsPage from '../proposals/ProposalDetailsPage'
import NotFound from '../NotFound'

const renderProposalDetailsPage = props => mount(
  <StaticRouter context={{}}>
    <ProposalDetailsPage
      id="any-id"
      {...props}
    />
  </StaticRouter>
)

describe('<ProposalDetailsPage>', () => {

  const httpMock = new AxiosMockAdapter(axios)

  test('renders <Loading> before receiving response from API', async () => {
    // given
    httpMock.onGet('/talks/id-1').reply(200, {
      id: 'id-1', title: 'any', speaker: 'any', category: 'any', description: 'any',
    })

    // when
    const tree = renderProposalDetailsPage({ id: 'id-1' })
    // and no requests are flushed

    // then
    expect(tree.find(Loading)).toExist()
  })

  test('does not render <Loading> after receiving response from API', async () => {
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
    const tree = renderProposalDetailsPage({ id: 'id-1' })
    await flushRequestsAndUpdate(tree)

    // then
    expect(tree.find(Loading)).not.toExist()
  })

  test('does not render <ProposalDetails> before receiving response from API', async () => {
    // given
    httpMock.onGet('/talks/id-1').reply(200, {
      id: 'id-1', title: 'any', speaker: 'any', category: 'any', description: 'any',
    })

    // when
    const tree = renderProposalDetailsPage({ id: 'id-1' })
    // and no requests are flushed

    // then
    expect(tree.find(ProposalDetails)).not.toExist()
  })

  test('uses proposal title as header', async () => {
    // given
    httpMock.onGet('/talks/id-1').reply(200, {
      id: 'id-1',
      title: 'Best Title Ever',
      speaker: 'any',
      category: 'any',
      description: 'any',
    })

    // when
    const tree = renderProposalDetailsPage({ id: 'id-1' })
    await flushRequestsAndUpdate(tree)

    // then
    expect(tree.find('.Page__title')).toHaveText('Best Title Ever')
  })

  test('uses /talks/:talkId API response to render proposal: category', async () => {
    // given
    httpMock.onGet('/talks/id-1').reply(200, {
      id: 'id-1',
      title: 'any',
      speaker: 'any',
      category: 'testing',
      description: 'any',
    })

    // when
    const tree = renderProposalDetailsPage({ id: 'id-1' })
    await flushRequestsAndUpdate(tree)

    // then
    const proposal = tree.find(ProposalDetails)
    expect(proposal.find('.ProposalDetails__category__value'))
      .toHaveText('testing')
  })

  describe('not found', () => {

    test('renders <NotFound> if proposal does not exist', async () => {
      // given
      httpMock.onGet('/talks/id-1').reply(404)

      // when
      const tree = renderProposalDetailsPage({ id: 'id-1' })
      await flushRequestsAndUpdate(tree)

      // then
      expect(tree.find(NotFound)).toExist()
    })

    test('does not render <ProposalDetails> if proposal does not exist', async () => {
      // given
      httpMock.onGet('/talks/id-1').reply(404)

      // when
      const tree = renderProposalDetailsPage({ id: 'id-1' })
      await flushRequestsAndUpdate(tree)

      // then
      expect(tree.find(ProposalDetails)).not.toExist()
    })

    test('does not render <NotFound> if proposal exists', async () => {
      // given
      httpMock.onGet('/talks/id-1').reply(200, {
        id: 'id-1', title: 'any', speaker: 'any', category: 'any', description: 'any',
      })

      // when
      const tree = renderProposalDetailsPage({ id: 'id-1' })
      await flushRequestsAndUpdate(tree)

      // then
      expect(tree.find(NotFound)).not.toExist()
    })

    test('renders <ProposalDetails> if proposal exists', async () => {
      // given
      httpMock.onGet('/talks/id-1').reply(200, {
        id: 'id-1', title: 'any', speaker: 'any', category: 'any', description: 'any',
      })

      // when
      const tree = renderProposalDetailsPage({ id: 'id-1' })
      await flushRequestsAndUpdate(tree)

      // then
      expect(tree.find(ProposalDetails)).toExist()
    })
  })
})
