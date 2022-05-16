import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import PrivateRoute from './components/shared/PrivateRoute';
import AddPost from './pages/AddPost';
import Post from './pages/Post';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
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
            <Route path='/:postId' element={<Post />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer theme='dark' />
    </>
  );
}

export default App;
