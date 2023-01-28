import React from "react";
import { useQuery } from "@apollo/client"
import { Card, Container, Row, Col } from "react-bootstrap"
import { MeetingLink } from "./meetingLink";
import { GET_CURRENT_USER } from "../utils/queries"
import Auth from "../utils/auth";

function Tutor(props) {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, { variables: { token: Auth.getToken() } })
  if (loading) return "LOADING..."
  if (error) return `ERROR: ${error}`
  if (!data.GetCurrentUser.selectedTutor) refetch();

  return (
    <Container className='mt-4'>
      <Row lg={2} className='justify-content-around align-items-center'>

        <Card style={{ width: "20rem" }} className='selected-tutor-card'>
          <Card.Img variant="top" src={data.GetCurrentUser.selectedTutor.image} />
          
          <Card.Body>
            <Card.Title as='h2' className='bold-text'>{data.GetCurrentUser.selectedTutor.firstName} {data.GetCurrentUser.selectedTutor.lastName}</Card.Title>

            <Card.Title as='h3' className='semi-bold-text tutor-card-headings'>Bio</Card.Title>
            <Card.Text>{data.GetCurrentUser.selectedTutor.description}</Card.Text>

            <Card.Title as='h3' className='semi-bold-text tutor-card-headings'>Articals</Card.Title>
            <div>
              {data.GetCurrentUser.selectedTutor.articles.map(element => (
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    props.setCurrentArticle(element._id)
                    props.setCurrentTab("article")
                  }}
                  className="list-group-item list-group-item-action">
                  {element.name}
                </a>
              ))}
            </div>
          </Card.Body>
        </Card>
      
        <MeetingLink />
      
      </Row>
    </Container>
  );
}



export default Tutor;
