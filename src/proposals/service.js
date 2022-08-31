import * as api from '../api'

export const getProposalList = () =>
  api
    .getTalks()
    .then(response => response.data)
    .then(talksData =>
      talksData.map(talk => ({
        ...talk,
        status: 'rejected',
      })))

export const getProposalDetails = proposalId =>
  api
    .getTalk({ talkId: proposalId })
    .then(response => response.data)
    .catch(ignoredError => null)

export const setProposalStatus = (proposalId, status) =>
  api
    .putCallForPapersEntry({
      talkId: proposalId,
      status: status
    })
