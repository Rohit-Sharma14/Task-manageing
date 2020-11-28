import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'


export const Signin = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postFileds = () => {
        fetch('/signin', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })

        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    console.log(data.error)
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: data.message, classes: "#43a047 green darken-1", message: "Successfully Signed in" })
                    history.push('/dashboard')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="mycard" style={{ marginTop: '30px' }}>
                <div className="card auth-card " style={{ padding: '25px', maxWidth: '400px', margin: '10px auto' }}>
                    <div className="card-content black-text center">
                        <span className="card-title">SignIn</span>
                    </div>


                    <input
                        type="text"
                        value={email}
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
                        onClick={() => postFileds()}
                    >Signin</button>

                    <h5 className="black-text center">
                        <Link to="/signup">Do not have an account</Link>
                    </h5>

                </div>
            </div>
        </div>
    )
}
export default Signin