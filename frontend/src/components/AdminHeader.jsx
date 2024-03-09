import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAdminlogoutMutation } from "../slices/adminApiSlice.js";
import { logout } from "../slices/adminSlice.js";

const AdminHeader = () => {

    const { adminInfo } = useSelector((state) => state.adminAuth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useAdminlogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // makes the request that destroys the cookie
            dispatch(logout()); // clears the local Storage
            navigate('/admin')
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/admin">
                        <Navbar.Brand>Admin Mern App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" />
                    <Nav className="ms-auto">
                        { adminInfo ? (
                            <>
                            <NavDropdown title={adminInfo.name} id='username'>
                                {/* <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer> */}
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>

                            </>
                        ) : (
                            <>
                            <LinkContainer to='/admin/login'>
                            <Nav.Link>
                                <FaSignInAlt />
                                Sign In
                            </Nav.Link>
                        </LinkContainer>
                            </>
                        ) }
                        
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export default AdminHeader;
