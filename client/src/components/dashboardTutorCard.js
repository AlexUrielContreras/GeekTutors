import React from "react"
import { Card, Col } from "react-bootstrap";
import Auth from "../utils/auth";

function DashboardTutorCard({tutor, currentUser, enrollStudent, unenrollStudent}) {
    console.log(tutor);
    console.log(currentUser)
    console.log(enrollStudent)
    console.log(unenrollStudent)

    const renderSaveButton = () => {
        try {

            if (Auth.loggedIn()) {

                if (currentUser.GetCurrentUser.selectedTutor == null || currentUser.GetCurrentUser.selectedTutor._id !== tutor._id) {
                    return <button onClick={(e) => {
                        e.preventDefault();
                        enrollStudent(tutor._id)
                    }}>Save</button>

                } else {

                    return <button onClick={(e) => {
                        e.preventDefault();
                        unenrollStudent(tutor._id)
                    }}> Unenroll </button>
                    
                }
            }

        } catch (error) {
            console.log("ERROR:", error);
        }
    }

    return (
        <Col lg={3} sm={`12`} mb={2}>
            <Card border='dark' className='mx-auto tutor-cards' data-tutorid={tutor._id}>
                <Card.Img variant="top" src={tutor.image} />

                <Card.Body>
                    <Card.Title className='bold-text' >{tutor.firstName} {tutor.lastName}</Card.Title>
                    <Card.Text className='semi-bold-text card-subtitle'>Subjects offered:</Card.Text>
                </Card.Body>

                <div className="list-group">
                    {tutor.subjectsOffered.map(element => (<li className="list-group-item list-group-item-disabled">{element}</li>))}
                </div>

                
            </Card>
        </Col>
    )
}
export default DashboardTutorCard