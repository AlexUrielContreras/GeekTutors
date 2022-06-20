import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../index.css";

export const MeetingLink = () => {
  const [startDate, setStartDate] = useState(new Date());

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_awoerg5",
        "template_zjzlzja",
        form.current,
        "YR18whxD3H2toOE-U"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Card className="scheduler">
      <Container>
        <h5>Schedule a session with tutor</h5>
        <Form ref={form} onSubmit={sendEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              name="date"
              showTimeSelect
              timeIntervals={120}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Message</Form.Label>
            <textarea className="schedulertextarea" type="text-area" rows="5" placeholder="Enter message" name="message"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Card>
  );
};
