import React, { PropTypes } from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ children }) => {
  let input;
  return (
    <ThemeProvider theme={theme}>
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        console.log("you did it!");
      }}>
      Click here</button>
      </div>
    </ThemeProvider>
  )
}

App.propTypes = {
  children: PropTypes.any,
}

export default App
