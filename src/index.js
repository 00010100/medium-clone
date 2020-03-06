import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from 'routes'
import {TopBar} from 'components/topBar'
import {CurrentUserProvider} from 'contexts/currentUser'
import {CurrentUserChecker} from 'components/currentUserChecked'

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

render(<App />, document.getElementById('root'))
