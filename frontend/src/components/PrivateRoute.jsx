import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // to get userInfo from state

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
};

const AdminPrivateRoute = () => {
    const { adminInfo } = useSelector((state) => state.adminAuth);
    return adminInfo ? <Outlet /> : <Navigate to='/admin/login' replace />
}

export {
    PrivateRoute,
    AdminPrivateRoute
};
