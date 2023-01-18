//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUp';
import Privatecomp from './components/privatecomponents';
import Login from './components/Login';//first letter of login must be capital
import Addproduct from './components/Addproduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

      <Route element={<Privatecomp />}>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<Addproduct />} />
        <Route path='/update' element={<h1>update info</h1>} />
        <Route path='/logout' element={<h1>logout page</h1>} />
        <Route path='/profile' element={<h1>profile page</h1>} />
        
        </Route>
        
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
