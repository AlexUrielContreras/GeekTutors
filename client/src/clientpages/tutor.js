import React from "react";
import {useQuery} from "@apollo/client"
import { Card, Container, Row, Col } from "react-bootstrap"
import { MeetingLink } from "./meetingLink";
import {GET_CURRENT_USER} from "../utils/queries"
import Auth from "../utils/auth";
function Tutor(props) {
  const {loading, error, data, refetch} =useQuery(GET_CURRENT_USER,{variables:{token:Auth.getToken()}})
  if (loading) return "LOADING..."
  if (error) return `ERROR: ${error}`
  if (!data.GetCurrentUser.selectedTutor) refetch()
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className="tutorcard" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={data.GetCurrentUser.selectedTutor.image} />
            <Card.Body>
              <Card.Title>{data.GetCurrentUser.selectedTutor.firstName} {data.GetCurrentUser.selectedTutor.lastName}</Card.Title>
              <Card.Text>Articles by {data.GetCurrentUser.selectedTutor.firstName}</Card.Text>
            </Card.Body>
            <div className="list-group">
              {data.GetCurrentUser.selectedTutor.articles.map(element=>(
                  <a
                  onClick={(e)=>{
                    e.preventDefault()
                    props.setCurrentArticle(element._id)
                    props.setCurrentTab("article")
                  }}
                className="list-group-item list-group-item-action">
                    {element.name}
                  </a>
                ))
              }
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="tutorbio" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={data.GetCurrentUser.selectedTutor.image} />
            <Card.Body>
              <Card.Title>{data.GetCurrentUser.selectedTutor.firstName} {data.GetCurrentUser.selectedTutor.lastName}</Card.Title>
              <Card.Text>Bio</Card.Text>
              <Card.Text>{data.GetCurrentUser.selectedTutor.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
       
        <Col>
          <MeetingLink />
        </Col>
      </Row>
    </Container>
  );
}



export default Tutor;
