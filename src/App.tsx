import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Success from './components/Success';

export interface IState {
  event : {
    title: string,
    description: string,
    category_id?: number,
    paid_event: boolean,
    event_fee?: number,
    reward?: number,
    date: string, // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
    duration?: number, // in seconds
    coordinator: {
      email?: string,
      id: string,
    },
  }[],
  formFilled : boolean
}

function App() {

  const [event, setEvent] = useState<IState['event']>([
    {
      title: 'Dinner',
      description: 'Inviting to dinner',
      category_id: 1,
      paid_event: true,
      event_fee: 200,
      reward: 2,
      date: '2018-01-19T15:15', // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
      duration: 60, // in seconds
      coordinator: {
      email: 'davronbek',
      id: '5',
    }, 
    }
  ]);
 
  const [formFilled, setFormFilled] = useState(false);

  console.log(event);
  return (
    <div className="App">
        <div className='navbar'>
          <p>New event</p>
        </div>
        {
          !formFilled ? <Form event = {event} setEvent = {setEvent} setFormFilled = {setFormFilled}/> : <Success/>
        }
    </div>
  );
}

export default App;
