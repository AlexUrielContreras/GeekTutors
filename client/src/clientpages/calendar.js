import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';

function GeekCalendar() {
  const [value, onChange] = useState(new Date());


  return (
    
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
    
  );
}



export default GeekCalendar;