import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import AdminHeader from "./components/AdminHeader";

const App = () => {


    const renderHeader = () => {
        if (window.location.pathname.includes("/admin")) {
            return <AdminHeader />;
        } else {
            return <Header />;
        }
    };

    return (
        <>
            {renderHeader ()}
            <ToastContainer autoClose={2000}/>
            <Container className='my-2'>
            <Outlet />
            </Container>
      </>
    );
};

export default App;
