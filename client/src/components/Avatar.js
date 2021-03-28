import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatarr from '@material-ui/core/Avatar';
import { Modal, Button } from 'react-bootstrap'
import { useEffect } from 'react';
import { history, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Avatar = (props) => {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [userdet, setUserdet] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSearch] = useState('')
    const [img, setImg] = useState([])


    useEffect(() => {
        setImg(props.result.board.members)
    }, [img])


    //------------------------fetch user-----------------

    const fetchUsers = (query) => {


        setSearch(query)
        fetch('/search-user', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(result => {
                setUserdet(result.user)
            })
    }


    const adduser = (userdid) => {


        fetch(`/add/${userdid}/${props.result.board._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.members)
                setImg(result.members)
                console.log(img)
                M.toast({ html: "User added successfully", classes: "#43a047 green darken-1" })

            })


    }






    //---------------------------add user--------------------







    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));

    const classes = useStyles();



    return (

        <div >

            <h1>{props.result.boardtitle}</h1>
            <div className={classes.root}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {
                        img.map(item => {
                            return (
                                <div>

                                    <Avatarr style={{ padding: '5px' }} alt={item.name} src={item.pic} />
                                </div>
                            )

                        })
                    }
                    <button class="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
                        onClick={handleShow}
                    >Add User</button>
                </div>



                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <input
                            type="text"
                            value={search}
                            placeholder="Search"
                            onChange={(e) => fetchUsers(e.target.value)}

                        />
                        <ul className="collection">
                            {userdet.map(item => {
                                return <li className="collection-item" >
                                    <div>
                                        <div>
                                            {item.email}
                                        </div>
                                        <div>
                                            <Button onClick={() => adduser(item._id)} onClick={handleClose} >Add</Button>
                                        </div>
                                    </div>
                                </li>
                            })}

                        </ul>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                    </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}
export default Avatar




