import 'react-app-polyfill/ie11'
import React, { useEffect, createContext, useContext, useReducer } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Board from './Pages/Board'
import Card from './Pages/Card'
// import Switch from 'react-bootstrap/esm/Switch'
import { reducer, initialstate } from './Reducer/userReducre'

export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      history.push('/dashboard')
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/dashboard" >
        <Dashboard />
      </Route>
      <Route path="/signin" >
        <Signin />
      </Route>
      <Route path="/signup" >
        <Signup />
      </Route>
      <Route path="/board/:id" >
        <Board />
      </Route>
      <Route path="/card/:boardid/:id" >
        <Card />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>


  );
}

export default App;
