import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calender } from './components/calender';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path = '/' element = {<Calender/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
