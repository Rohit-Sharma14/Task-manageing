import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'



const RenderBoard = () => {
  const [data, setData] = useState([])

  //
  useEffect(() => {
    fetch('/myboards', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setData(result)

      })
  }, [])


  //-----------------to delete board----------------

  // const deleteboard = (id) =>{
  //   console.log(id)
  //   fetch('/deleteboard/'+id,{
  //     method:"delete",
  //     headers:{
  //       Authorization:"Bearer "+localStorage.getItem("jwt")
  //     }
  //   }).then(res=>res.json())
  //   .then(result=>{
  //     console.log(result)
  //   })
  // }



  //------------------frontend----------------------
  const renderdata = () => {

    if (data) {
      return (
        <div>

          {
            data.map(item => {
              return (
                <div>
                  <div className="row">
                    <div className="col s12 m6">
                      <div className="card blue-grey darken-1">
                        <div className="card-content white-text">


                          <Link to={'/board/' + item._id}><span className="card-title" >{item.boardtitle}</span></Link>
                          {/* <i className="material-icons" style={{float:"right"}}
                       onClick={()=>{deleteboard(item._id)}}
                       >delete</i> */}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }


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
            style={{ paddingTop: "25px", display: 'block' }}
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


export default RenderBoard