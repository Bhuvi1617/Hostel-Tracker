import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </Router>
  );
}

export default App;
