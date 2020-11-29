import React, { useState } from 'react'
import { useEffect } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import M from 'materialize-css'

const Card = () => {
    const { id } = useParams()
    console.log(id)
    const [status, setStatus] = useState('')
    const [comment, setComment] = useState([])
    const [data, setData] = useState('')

    useEffect(() => {
        fetch(`/card/${id}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
            .then(result => {
                setData(result)
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    const makecomment = (text) => {
        fetch(`/comment/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setComment(result.comments)
            }).catch(err => {
                console.log(err)
            })


    }

    const updatestatus = () => {
        console.log(status, id)
        fetch(`/status/${id}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                status
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                M.toast({ html: 'Status updated', classes: "#43a047 green darken-1" })
            })
    }

    const render = () => {
        if (data) {
            return (
                <div>
                    <Jumbotron style={{ display: 'flex', flexDirection: 'row', minWidth: '900px', margin: '20px auto', marginRight: '35px', justifyContent: 'space-around' }} >
                        <div class="card blue-grey darken-1" style={{ borderRadius: "2%", width: '60%' }}>
                            <div class="card-content white-text">
                                <span class="card-title">{data.card.title}</span><br></br>
                                <p>{data.card.description}</p>  <br></br>
                                <span class="card-title">Status</span>
                                <select style={{ display: 'block' }} value={status} onChange={(e) => setStatus(e.target.value)} >
                                    <option >Update Status</option>
                                    <option value="todo">To Do</option>
                                    <option value="indevelopment">In Development</option>
                                    <option value="inreview">In Review</option>
                                    <option value="finished">Finished</option>
                                </select>
                                <div>
                                    <button className="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
                                        onClick={() => updatestatus()}
                                    >update</button>
                                </div>
                            </div>
                        </div>


                        <div>
                            <div class="card blue-grey darken-1" style={{ borderRadius: "2%", width: '30%', minWidth: '300px' }}>
                                <div class="card-content white-text">
                                    <span class="card-title">Discussion</span><br></br>
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        makecomment(e.target[0].value)
                                    }}>
                                        <input type="text" placeholder="Add comment with your name" />
                                    </form>
                                    {
                                        comment.map(item => {
                                            return (
                                                <li className="collection-item" >
                                                    <div>
                                                        <div>
                                                            {item}
                                                        </div>

                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Jumbotron>

                </div>

            )
        } else {
            return (
                <div>
                    <Loader
                        type="Bars"
                        color="#9575cd"
                        height={250}
                        width={250}
                        timeout={3000} //3 secs
                        className="center "
                        style={{ paddingTop: "35px" }}
                    />
                </div>
            )
        }

    }


    return (
        <div>
            { render()}

        </div>

    )
}
export default Card 