import 'react-app-polyfill/ie11'
import React, { useEffect, createContext, useContext, useReducer } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
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
      // history.push('/dashboard')
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/board/:id" component={Board} />
      <Route exact path="/card/:boardid/:id" component={Card} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Routing />
      </Router>
    </UserContext.Provider>


  );
}

export default App;
