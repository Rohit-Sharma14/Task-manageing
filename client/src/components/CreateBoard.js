import React, { useState } from 'react'
import M, { toast } from 'materialize-css'
import { useHistory } from 'react-router-dom'
const CreateBoard = () => {
    const history = useHistory()
    const [title, setTitle] = useState('')

    const postFields = () => {
        fetch('/createboard', {
            "method": "post",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.Toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: "Board created successfully", classes: "#43a047 green darken-1" })
                    history.push('/dashboard')
                }
            }).catch(err => {
                console.log(err)
            })
    }


    //---------------------------------------------front end-------------------------------------------------------//
    return (


        <div>
            <div className="mycard" style={{ marginTop: '30px' }}>
                <div className="card auth-card " style={{ padding: '25px', maxWidth: '400px', margin: '10px auto' }}>
                    <div className="card-content black-text center">
                        <span className="card-title">Create Board</span>
                    </div>


                    <input
                        type="text"
                        value={title}
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    <button className="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
                        onClick={() => postFields()}
                    >Create</button>



                </div>
            </div>
        </div>


    )
}

export default CreateBoard 