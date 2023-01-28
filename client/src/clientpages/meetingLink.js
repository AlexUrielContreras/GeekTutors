import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Card } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <Card className="scheduler my-5">

      <Container>
        <h2 className='semi-bold-text'>Schedule a session with tutor</h2>

        <hr />

        <Form ref={form} onSubmit={sendEmail}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='semi-bold-text'>Select Date</Form.Label>
            <DatePicker
              className='schedule-date'
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
            <Form.Label className='semi-bold-text'>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='semi-bold-text'>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='semi-bold-text'>Message</Form.Label>
            <div className='schedule-message'>
              <textarea className="scheduler-textarea" type="text-area" rows="5" placeholder="Enter message" name="message"/>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          
        </Form>
      </Container>
    </Card>
  );
};
