import React from "react"
import { Card } from "react-bootstrap";
import Auth from "../utils/auth";

function DashboardTutorCard({tutor, currentUser, enrollStudent, unenrollStudent}) {

    const { data } = currentUser
  
    const renderSaveButton = () => {
        try {
            if (Auth.loggedIn()) {

                if (data.GetCurrentUser.selectedTutor == null || data.GetCurrentUser.selectedTutor._id !== tutor._id) {
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

        <Card border='dark' className='px-0 mx-4 tutor-cards' data-tutorid={tutor._id}>
            <Card.Img variant="top" src={tutor.image} />

            <Card.Body>
                <Card.Title className='bold-text' >{tutor.firstName} {tutor.lastName}</Card.Title>
                <Card.Text className='semi-bold-text card-subtitle'>Subjects offered:</Card.Text>
            </Card.Body>

            <div className="list-group">
                {tutor.subjectsOffered.map(subjects => (<li className="list-group-item list-group-item-disabled">{subjects}</li>))}
            </div>
            {renderSaveButton()}  
        </Card>

    )
}
export default DashboardTutorCard