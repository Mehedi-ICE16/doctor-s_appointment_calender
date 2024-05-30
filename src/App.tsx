import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calender } from './components/calender';
import { AppointmentDetails } from './components/appointmentDetails';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = {<Calender/>}></Route>
          <Route path = '/appointment-details/:id' element = {<AppointmentDetails/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
