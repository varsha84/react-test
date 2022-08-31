import axios from 'axios'

export const getTalks = () =>
  axios.get('/talks')

export const getTalk = ({ talkId }) =>
  axios.get(`/talks/${talkId}`)

export const getCallForPapers = () =>
  axios.get('/callForPapers')

export const putCallForPapersEntry = ({ talkId, status }) =>
  axios.put(`/callForPapers/${talkId}`, { status })
