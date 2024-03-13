import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider, // to provide both routing and state management capabilites to out appln
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import HomeScreen from "./screens/userSceens/HomeScreen.jsx";
import LoginScreen from "./screens/userSceens/LoginScreen.jsx";
import RegisterScreen from "./screens/userSceens/RegisterScreen.jsx";
import ProfileScreen from "./screens/userSceens/ProfileScreen.jsx";
import AdminScreen from "./screens/adminScreens/AdminScreen.jsx";
import AdminLogin from "./screens/adminScreens/AdminLogin.jsx";
import Dashboard from "./screens/adminScreens/Dashboard.jsx";
import EditScreen from "./screens/adminScreens/EditUser.jsx";
import { AdminPrivateRoute, PrivateRoute } from "./components/PrivateRoute.jsx";

const router = createBrowserRouter( //creates browser router instance
    createRoutesFromElements(
        <>
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Private Routes  */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
            </Route>
        </Route>

        <Route path="/admin" element={<App />}>
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/deleteUser/:id" element={<Dashboard />} />

            <Route path="" element={<AdminPrivateRoute />}>
            <Route path="/admin/editUser/:id" element={<EditScreen />} />
            </Route>
            

        </Route>
        </>

        
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} /> 
        </React.StrictMode>
    </Provider>
);
