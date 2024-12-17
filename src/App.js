import { Routes, Route } from 'react-router-dom';
import './App.css';
import '../src/styles.css'
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import Login from './routes/login';
import Register from './routes/Register';
import MechStatus from './Components/MechStatus';
import MechView from './Components/MechView';
import DriverStatus from './Components/DriverStatus';
import AccessControl from './Components/AccessControl';
import AdminRegister from './Components/AdminRegister';
import AdminTaskList from './Components/AdminTaskList';

function App() {

  return (
    <div className="App">
<Routes>
  <Route path="/" element={ <Home/> }/>
  <Route path="/about" element={ <About/> }/>
  <Route path="/service" element={ <Service/> }/>
  <Route path="/contact" element={ <Contact/> }/>
  <Route path="/register" element={ <Register/>}/>
  <Route path="/login" element={ <Login/>}/>
  <Route path="/mech-status" element= { <MechStatus />}/>
  <Route path="/mechview" element= { <MechView />}/>
  <Route path="/driverstatus" element= { <DriverStatus/>}/>
  <Route path="/admin/login" element={<AccessControl/>}/>
  <Route path="/admin/register" element={<AdminRegister/>}/>
  <Route path= "/admin/tasklist" element={<AdminTaskList/>}/>
</Routes>

    </div>
  );
}

export default App;
