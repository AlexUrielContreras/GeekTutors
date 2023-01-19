import { useQuery, useMutation } from "@apollo/client";
import { Container, Row} from "react-bootstrap";
import Auth from '../utils/auth'

import { GET_ALL_TUTORS, GET_CURRENT_USER } from "../utils/queries"
import { ENROLL_STUDENT, UNENROLL_STUDENT } from "../utils/mutations";

import DashboardTutorCard from "../components/dashboardTutorCard";

function Dashboard(props) {

  const [enrollStudent, error1] = useMutation(ENROLL_STUDENT);
  const [unenrollStudent, error] = useMutation(UNENROLL_STUDENT);

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
  };

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
  };

  const userQuery = useQuery(GET_CURRENT_USER,{variables:{token:Auth.getToken()||"GUEST"}});
  const tutorQuery = useQuery(GET_ALL_TUTORS);

  if (userQuery.loading || tutorQuery.loading) return "LOADING";
  if (userQuery.error) console.log(JSON.stringify(userQuery.error));
  if (tutorQuery.error) console.log(tutorQuery.error);
  
  return (
    <Container fluid>
      <h1 className='text-center body-title semi-bold-text'>{Auth.loggedIn() ? ( 'Available Tutors' ): ( 'Create an Account Today and Schedule a Session' )}</h1>
     
      <Row sm={2} md={3} lg={5} className='justify-content-center'>
        {tutorQuery.data?.GetAllTutors.map(tutor => <DashboardTutorCard key={tutor._id} tutor={tutor} currentUser={userQuery} enrollStudent={enrollStudentFunction} unenrollStudent={unenrollStudentFunction} />)}
      </Row>
    </Container>
  );
}

export default Dashboard;
