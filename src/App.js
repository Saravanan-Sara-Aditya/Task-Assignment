import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home'
import "./App.css"
const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/"><Home/></Route>
      </Switch>
    </div>
  )
}

export default App
