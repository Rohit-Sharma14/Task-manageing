import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

 const Signup = () => {
  const history = useHistory()
  const [name,setName] = useState('')    
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  //---------------------------------connection request----------------------------------------------//

  const uploadFields = () =>{
    fetch('/signup',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error ,classes:"#c62828 red darken-3"})
      }
      else{
        M.toast({html:data.message,classes:"#43a047 green darken-1"})
        history.push('/signin')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //---------------------------------frontend-------------------------------------------------------//
    return (
      <div className="mycard" style={{marginTop:'30px'}}>
      <div className="card auth-card " style={{padding:'25px' ,maxWidth:'400px' , margin :'10px auto' }}>
            <div className="card-content black-text center">
            <span className="card-title">SignUp</span>         
            </div>

            <input          
             type="text"
             value={name}
             placeholder="name"
             onChange={(e)=>setName(e.target.value)}
            />
            <input
             type="text"
             value={email}
             placeholder="email"
             onChange={(e)=>setEmail(e.target.value)}
            />
            <input
             type="password"
             value={password}
             placeholder="password"
             onChange={(e)=>setPassword(e.target.value)}
            />

            <button class="btn waves-effectwaves-light #9575cd deep-purple lighten-1"
            onClick={()=>uploadFields()}
            >SignUp</button>

            <h5 className="black-text center">
                <Link to="/signin">Already have an account</Link>
            </h5>
            
      </div>
      </div> 
    )
}
export default Signup