import React from 'react'
import RenderBoard from '../components/RenderBoard'
import User from '../components/User'
import { Jumbotron } from 'react-bootstrap'


const Dashboard = () => {
    return (
        <div className="main" style={{ display: 'flex', flexDirection: 'row' }}>

            <div style={{ width: '65%', borderRadius: '2.5%', margin: '20px' }}>
                <Jumbotron >
                    <div className='top'><h3>Boards</h3></div>

                    <RenderBoard />

                </Jumbotron>
            </div>

            <div  style={{ width: '30%', borderRadius: '2.5%',minWidth:'300px', margin: '20px', }}>
                <User />
            </div>




        </div>
    )
}

export default Dashboard