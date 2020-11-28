import React, { useState } from 'react'
import M from 'materialize-css'


const CreateCard = (props) => {
   
    const [title,setTitle] = useState('')
    const [status,setStatus] = useState('')
    const [description,setDescription] = useState('')

    const postFields = () =>{
            fetch(`/createcard/${props.boardid}`,{
                method:"post",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    status,
                    description
                })
            }).then(res=> res.json())
            .then(data=>{
                if(data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    console.log(data.error)
                }else {
                    M.toast({ html: "Board created successfully", classes: "#43a047 green darken-1" })
                    // history.push('/')
                }
            }).catch(err =>{
                console.log(err)
            })
    }

    return (
        <div className="mycard" style={{ marginTop: '30px' }}>
            <div className="card auth-card " style={{ padding: '25px', maxWidth: '400px', margin: '10px auto' }}>
                <div className="card-content black-text center">
                    <span className="card-title">Create Task</span>
                </div>
  

                <input
                    type="text"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <input
                    type="text"
                    value={description}
                    placeholder="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <select style={{display:'block'}} value={status} onChange={(e) => setStatus(e.target.value)} >
                <option >Click Me</option>
                <option value="todo">To Do</option>
                <option value="indevelopment">In Development</option>
                <option value="inreview">In Review</option>       
                <option value="finished">Finished</option>
                </select>

              
                                    

                   

                <button className="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
                onClick={() => postFields()}
                >Create</button>



            </div>
         </div>

    )
}

export default CreateCard