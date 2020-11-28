import React, { useEffect, useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const InDevelopmentLists = (props) => {

    const [data, setData] = useState([])




    useEffect(() => {

        fetch(`/indevcard/${props.result.board._id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
            })

    }, [])
















    return (
        <div>
            <Jumbotron className="center " style={{ padding: "2.5%", minWidth: '200px' }}>
                <h4>On-It</h4>
                {
                    data.map(item => {
                        return (
                            <div>


                                <div class="card blue-grey darken-1" style={{ margin: "6px", marginBottom: "4px" }}>
                                    <div class="card-content white-text" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                                        <div>
                                            <h6 className="center">{item.title}</h6>
                                            <Link to={'/card/' + props.result.board._id + "/" + item._id}><span className="card-title" >{item.title}</span></Link>

                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>




                            </div>

                        )
                    })}
            </Jumbotron>
        </div>
    )
}



export default InDevelopmentLists