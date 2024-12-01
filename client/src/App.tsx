
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/signUpPage';
import Navbar from './components/Navbar';
import Home from './pages/home';
import MyCollection from './pages/myCollection';
import AlbumDetails from './pages/albumDetails';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import SearchAlbum from './pages/albumSearch';
import auth from './utils/auth';

const Layout = () => (
  <div className="container">
    <Navbar /> {/* Navbar stays on all pages */}
    <Outlet /> {/* Renders the matched child route's element */}
  </div>
);

function App() {
  const navigate = useNavigate();

  // Redirect to /home if logged in
  useEffect(() => {
    if (auth.loggedIn()) {
      navigate('/home'); // Redirect to /home
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        {/* Shared layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} /> {/* Default page */}
          <Route path="signUpPage" element={<SignUp />} />
          <Route path="ErrorPage" element={<ErrorPage />} />
          <Route path="my-collection" element={<MyCollection />} />
          <Route path="album-details/:albumId" element={<AlbumDetails />} />
          <Route path="search-album" element={<SearchAlbum />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
