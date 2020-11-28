import React, { useContext, useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import CreateBoard from './CreateBoard'
import { UserContext } from '../App'
import { useEffect } from 'react'

const User = () => {
    const { state, dispatch } = useContext(UserContext)
    const [img, setImg] = useState('')
    console.log(state)

    useEffect(() => {
        if (img) {
            const data = new FormData()
            data.append("file", img)
            data.append("upload_preset", "hackathon")
            data.append("cloud_name", "mauuu")
            fetch("https://api.cloudinary.com/v1_1/mauuu/image/upload", {
                method: 'post',
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    fetch('/uploadpic', {
                        method: 'put',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [img])

    const updatepic = (file) => {
        setImg(file)
    }


    return (
        <div>
            <Jumbotron >
                <div style={{ display: 'flex', alignContent: 'space-between', justifyContent: 'space-between' }}>

                    <div style={{ width: "60%", display: "flex", flexDirection: 'column' }}>
                        <div>
                            <h4>{state ? state.name : 'Loading'}</h4>
                        </div>
                        <div>
                            <h6>{state ? state.email : 'Loading'}</h6>
                        </div>
                        <div>


                        </div>
                    </div>

                    <div style={{ width: "40%" }}>
                        <img style={{ height: '140px', width: 'auto', maxWidth: "100%", height: 'auto' }} src={state ? state.pic : "loading"}></img>
                        <div class="file-field input-field">
                            <div className="btn #9575cd deep-purple lighten-1" style={{ width: 'auto' }}>
                                <span>Image</span>
                                <input type="file" onChange={(e) => updatepic(e.target.files[0])} />
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <CreateBoard />
                </div>


            </Jumbotron>

        </div>
    )
}


export default User