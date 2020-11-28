import React, { useEffect, useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import ToDoLists from '../components/ToDoLists'
import InDevelopmentLists from '../components/InDevelopmentLists'
import InReviewLists from '../components/InReviewLists'
import FinishedLists from '../components/FinishedLists'
import CreateCard from '../components/CreateCard'
import Avatar from '../components/Avatar'
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'


const Board = () => {
    const { id } = useParams()
    const [data, setData] = useState('')


    useEffect(() => {
        fetch(`/board/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                console.log(result.board.boardtitle)
                setData(result)


            })
    }, [])




    const renderdata = () => {
        if (data) {
            return (
                <div>
                    <h1 className='center'>{data.board.boardtitle}</h1>
                    <Jumbotron style={{ padding: '0%', margin: '40px' }}>
                        <div>
                            <Avatar result={data} />

                        </div>
                        <div>

                        </div>
                    </Jumbotron>



                    <div style={{ display: "flex", flexDirection: 'row', }} >

                        <Jumbotron className="#9575cd deep-purple lighten-1 left" style={{ width: "75%", marginTop: "5px", padding: "0%", display: 'flex', flexDirection: 'row', justifyContent: "space-around", minWidth: "950px", marginRight: '10px' }}>

                            <div style={{ width: '20%', borderRadius: '2.5%', margin: '20px' }}>
                                <ToDoLists result={data} />
                            </div>
                            <div style={{ width: '20%', borderRadius: '2.5%', margin: '20px', }}>
                                <InDevelopmentLists result={data} />
                            </div>
                            <div style={{ width: '20%', borderRadius: '2.5%', margin: '20px', }}>
                                <InReviewLists result={data} />
                            </div>
                            <div style={{ width: '20%', borderRadius: '2.5%', margin: '20px', }}>
                                <FinishedLists result={data} />
                            </div>
                        </Jumbotron>
                        <div style={{ width: "28%", marginTop: "5px", marginRight: '10px', minWidth: '250px' }}>
                            <CreateCard boardid={id} />
                        </div>



                    </div>
                </div>
            );
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

            {renderdata()}


        </div>






    )
}

export default Board
