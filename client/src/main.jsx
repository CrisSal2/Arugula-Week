import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx'
import About from './containers/About';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard.jsx';
import MyWeek from './containers/MyWeek';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
// import ErrorPage from './containers/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/signin',
        element: <SignIn />
      }, {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/myweek',
        element: <MyWeek />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/signout',
        element: <SignOut />
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)