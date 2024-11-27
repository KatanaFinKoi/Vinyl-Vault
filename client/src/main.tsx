import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/signUpPage';
import Home from './pages/home';
import MyCollection from './pages/myCollection'
import SearchAlbum from './pages/albumDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Handles errors globally
    children: [
      {
        index: true, // Default page
        element: <Login />
      },
      {
        path: "/signUpPage",
        element: <SignUp />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/my-collection',
        element: <MyCollection />
      },
      {
        path: '/search-album',
        element: <SearchAlbum />
      }

    ]
  }
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
