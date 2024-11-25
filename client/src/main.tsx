import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/signUpPage';

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
        path: "signUpPage",
        element: <SignUp />
      }
    ]
  }
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
