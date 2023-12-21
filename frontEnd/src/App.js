import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './Pages/Chat';

function App() {
  return (
    <div>
      <Chat/>
    </div>
  //  <BrowserRouter>
  //  <Routes>
  //   <Route element={} path='/'/>
  //  </Routes>
  //  </BrowserRouter>
  );
}

export default App;
