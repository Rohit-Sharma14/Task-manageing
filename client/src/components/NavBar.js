import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const NavBar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [

                <li key="3"> <button className="btn waves-effectwaves-light #9575cd red lighten-1" style={{ paddingRight: '20px' }}
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        history.push('/signin')
                    }}
                >Log out</button></li>
            ]
        } else {
            return [
                <li key="4"><Link to="/signin">Signin</Link></li>,
                <li key="5"><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper #9575cd deep-purple lighten-1 ">
                <Link to={state ? "/dashboard" : "/signin"} className="brand-logo left ">Trello</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
