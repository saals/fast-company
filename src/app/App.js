import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import NavBar from './components/ui/nawBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import ProfessionProvider from './hooks/useProfession'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <ProfessionProvider>
          <Route path="/login/:type?" component={Login} />
          <Route path="/users/:userId?/:edit?" component={Users} />
        </ProfessionProvider>
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </>
  )
}

export default App
