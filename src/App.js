import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import DressTheme from './themes/DressTheme';
import Admin from './admin/Admin';
import Login from './components/Login';
import Register from './components/Register';
import { WrapperData } from './services/GlobalService';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <WrapperData>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/DressTheme" element={<DressTheme />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
        </WrapperData>
      </BrowserRouter>
    </div>
  );
}

export default App;
