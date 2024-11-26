import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/signUpPage';
import Navbar from './components/Navbar';
import Home from './pages/home';
import MyCollection from './pages/myCollection';
import AlbumDetails from './pages/albumDetails';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="container">
    <Navbar /> {/* Navbar stays on all pages */}
    <Outlet /> {/* Renders the matched child route's element */}
  </div>
);

function App() {
  return (
    <div>
    <Routes>
      {/* Shared layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} /> {/* Default page */}
        <Route path="signUpPage" element={<SignUp />} />
        <Route path="ErrorPage" element={<ErrorPage />} />
        <Route path="home" element={<Home />} />
        <Route path="myCollection" element={<MyCollection />} />
        <Route path="albumDetails" element={<AlbumDetails />} />
      </Route>
    </Routes>
    <Footer />
    </div>
  );
}



export default App;

