import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Auth from '../utils/auth'



import { GET_ALL_TUTORS, GET_CURRENT_USER } from "../utils/queries"
import { ENROLL_STUDENT, UNENROLL_STUDENT } from "../utils/mutations";

import dashboardTutorCard from "../components/dashboardTutorCard"
function Dashboard(props) {

  const [enrollStudent, error1] = useMutation(ENROLL_STUDENT)
  const [unenrollStudent, error] = useMutation(UNENROLL_STUDENT)

  const enrollStudentFunction = async (tutorId) => {
    try {
      const token = Auth.getToken()
      const updatedUser = await enrollStudent({
        variables: { token, tutorId }
      })
      props.setCurrentTab("tutor")
    } catch (error) {
      console.log(error);
    }
  }

  const unenrollStudentFunction = async (tutorId) => {
    try {
      const token = Auth.getToken()
      const updatedUser = await unenrollStudent({
        variables: { token, tutorId }
      })
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  const userQuery = useQuery(GET_CURRENT_USER,{variables:{token:Auth.getToken()||"GUEST"}})
  const tutorQuery=useQuery(GET_ALL_TUTORS)
  if (userQuery.loading||tutorQuery.loading) return "LOADING"
  if (userQuery.error) console.log(JSON.stringify(userQuery.error));
  if (tutorQuery.error) console.log(tutorQuery.error);
  return (
    <Container className='mt-4'>
      {Auth.loggedIn() ? (
        <h1 className="text-center">Available Tutors</h1>
      ) : (
        <h1 className='text-center'>Create an Account to Schedule a Session</h1>
      )}
      {/* <Row className='mt-4'> */}
     {/* </Container>   {tutorQuery.data.GetAllTutors.map(element=>(dashboardTutorCard({element,props,userQuery,enrollStudentFunction,unenrollStudentFunction})))} */}
      {/* </Row> */}
      <Row className='mt-4'>
        {tutorQuery.data.GetAllTutors.map(element => (dashboardTutorCard({ element, props, userQuery, enrollStudentFunction, unenrollStudentFunction })))}
      </Row>
    </Container>

  );
}

export default Dashboard;
