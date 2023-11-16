import './App.css';
import Login from './components/Login.js';
import './components/Home.js';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import Home from './components/Home.js';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} path='/' />
            <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
