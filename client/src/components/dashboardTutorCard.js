import React from "react"
import {Card, Col } from "react-bootstrap";
import Auth from "../utils/auth"
function TutorCard(props){
    console.log("props",props);
    const renderSaveButton=()=>{
        try {
            if(Auth.loggedIn()){            
                if(props.userQuery.data.GetCurrentUser.selectedTutor==null||props.userQuery.data.GetCurrentUser.selectedTutor._id!==props.element._id){
                    return <button onClick={(e) => {
                        e.preventDefault(); 
                        const updatedUser=props.enrollStudentFunction(props.element._id)
                    }}>Save</button>
                }else{
                    return <button onClick={(e) => {
                        e.preventDefault(); 
                        const updatedUser=props.unenrollStudentFunction(props.element._id)
                    }}>Unenroll</button>
                }
            }
        } catch (error) {
            console.log("ERROR:",error);
        }
    }
    
    return(
        <Col lg={3} sm={`12`} >
          <Card style={{ width: "18rem" }} border='dark' className='mx-auto  mt-2' data-tutorId={props.element._id}>
            <Card.Img variant="top" src={props.element.image} />
            <Card.Body>
              <Card.Title>{props.element.firstName} {props.element.lastName}</Card.Title>
              <Card.Text>Subjects offered:</Card.Text>
            </Card.Body>
            <div className="list-group">
                {props.element.subjectsOffered.map(element=>(<li className="list-group-item list-group-item-disabled">{element}</li>))}
            </div>
            {renderSaveButton()}
          </Card>
        </Col>
    )
}
export default TutorCard