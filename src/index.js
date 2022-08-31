import 'normalize.css/normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'

import fakeHttpApi from './api/fakeHttpApi'
import App from './App'
import './index.css'

fakeHttpApi.setup()

ReactDOM.render(<App/>, document.getElementById('root'))
