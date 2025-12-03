import { createBrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import HomePage from "../pages/Home";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    );
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);
