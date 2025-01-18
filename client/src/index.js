import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import Home from './components/Home';
import Protected from './components/Protected';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

const routes = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        {
            path: '/',
            element: [<Protected children={<Home />} />],
        },
        {
            path: '/login',
            element: [<Login />]
        },
        {
            path: '/register',
            element: [<Register />]
        }
    ]
}]);

root.render(<RouterProvider router={routes} />);