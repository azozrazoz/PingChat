import React from 'react'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/HomePage'
import Registerpage from './views/RegisterPage'
import Loginpage from './views/LoginPage'
import Navbar from './views/Navbar'
import Message from './views/Message'
import MessageDetail from './views/MessageDetail'
import SearchUsers from './views/SearchUsers'
import ProfilePage from './views/ProfilePage'



function App() {
  return (
    <Router>
      <AuthProvider>
        < Navbar/>
        <Switch>
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={Homepage} path="/" exact />
          <Route component={Message} path="/inbox" exact />
          <Route component={MessageDetail} path="/inbox/:id" exact />
          <Route component={SearchUsers} path="/search/:username" exact />
          <Route component={ProfilePage} path="/profile/:id" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App