import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import AdminHeader from "./components/AdminHeader";

const App = () => {

    const { userInfo } = useSelector((state) => state.auth)

    return (
        <>
            { userInfo ? <Header/> : <AdminHeader />}
            <ToastContainer autoClose={2000}/>
            <Container className='my-2'>
            <Outlet />
            </Container>
      </>
    );
};

export default App;
