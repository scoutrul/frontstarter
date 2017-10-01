import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'components/routes/home/HomePage'
import AboutPage from 'components/routes/about/AboutPage'
import './app.scss'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    </HashRouter>
  )
}
