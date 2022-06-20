import React from 'react'
import { Col, Card } from 'react-bootstrap'
import Ronald from '../../assets/img/Ronald.jpg'
import Auth from '../../utils/auth'

// import { useQuery } from '@apollo/client';

function Cards({setCurrentTab}) {
  
    function handleSaveTutor() {
        //mutation to add tutor to user
       setCurrentTab("tutor")
    }
    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant='top' src={Ronald} />
                <Card.Body>
                    <Card.Title>
                        Alex Contreras
                    </Card.Title>
                    <Card.Text>Subjects Offered: </Card.Text>
                </Card.Body>
                <div className="list-group">
                    <li className="list-group-item list-group-item">HTML</li>
                    <li className="list-group-item list-group-item-disabled">CSS</li>
                    <li className="list-group-item list-group-item-disabled">Javascript</li>
                </div>
                     {Auth.loggedIn() ? <button onClick={(e) => { e.preventDefault(); handleSaveTutor() }}>Save</button> : null}
            </Card>
        </Col>
    )
};


export default Cards