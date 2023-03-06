import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewUserForm from './components/NewUserForm';
import Login from './components/Login';
import Form from './components/Form';
import NavbarLayout from './views/NavbarLayout';
import Home from './views/Home';
import Catalog from './views/Catalog';
import UserPost from './views/UserPost';
import LastArticle from './views/LastArticle';
import Show from './components/Show';

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path= '/register' element={<NewUserForm/>} />
          <Route path= '/login' element={<Login/>} />
          <Route path= '/' element={<Login/>} />
          <Route element ={<NavbarLayout/>}>
            <Route path= '/home' element={<Home/>} />
            <Route path='/article/new' element ={<Form />} />
            <Route path='/myarticles' element ={<UserPost />} />
            <Route path='/articles' element ={<LastArticle />} />
            <Route path='/articles/:category' element ={<Catalog />} />
            <Route path='/article/:id' element ={<Show />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
