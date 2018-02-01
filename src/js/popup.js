import '../scss/base.scss'
import React from 'react'
import ReactDOM from 'react-dom'

const header = React.createElement(
  'h1',
  'null',
  'Hello, world'
)

ReactDOM.render(
  header,
  document.getElementById('popup')
)
