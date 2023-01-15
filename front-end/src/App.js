//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<h1>product listing component</h1>} />
        <Route path='/add' element={<h1>add product here</h1>} />
        <Route path='/update' element={<h1>update info</h1>} />
        <Route path='/logout' element={<h1>logout page</h1>} />
        <Route path='/profile' element={<h1>profile page</h1>} />
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
      
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
