import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/candidates')
        .then(response => setEvents(response.data.content))
        .catch(error => console.error(error));
  }, []);

  return (
      <div>
        <center><h3>Lista kandydatów</h3></center>
        <ul>
          {events.map(candidate => (
              <li key={candidate.id}>
                {candidate.id} - {candidate.name} {candidate.surname}
              </li>
          ))}
        </ul>
      </div>
  );
}


export default App;
