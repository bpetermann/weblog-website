import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/shared/Container';
import Navbar from './components/layout/Navbar';
import NavbarModal from './components/layout/NavbarModal';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import PrivateRoute from './components/shared/PrivateRoute';
import AddPost from './pages/AddPost';
import Post from './pages/Post';

function App() {
  const [modal, setModal] = useState(false);

  const modalToggleHandler = () => {
    setModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [modal]);

  return (
    <>
      <Router basename='/weblog-website'>
        <Navbar toggleModal={modalToggleHandler} />
        {modal && <NavbarModal onClose={modalToggleHandler} />}
        <Container>
          <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/add-post' element={<PrivateRoute />}>
              <Route path='/add-post' element={<AddPost />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts/:postId' element={<Post />} />
            <Route path='/*' element={<Navigate to='/' replace />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer theme='colored' />
    </>
  );
}

export default App;
