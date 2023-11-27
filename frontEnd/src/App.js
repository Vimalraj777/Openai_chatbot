import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './Pages/Chat';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<Chat/>} path='/chat'/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
