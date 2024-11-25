import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/signUpPage';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="container">
    <Navbar /> {/* Navbar stays on all pages */}
    <Outlet /> {/* Renders the matched child route's element */}
  </div>
);

function App() {
  return (
    <Routes>
      {/* Shared layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} /> {/* Default page */}
        <Route path="signUpPage" element={<SignUp />} />
        <Route path="ErrorPage" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;

