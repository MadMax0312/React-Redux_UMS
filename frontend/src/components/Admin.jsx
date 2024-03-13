import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux"

const Admin = () => {

    const { adminInfo } = useSelector((state) => state.adminAuth)

    return (
        <div className=" py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                {/* <h1 className="text-center mb-4">ADMIN</h1> */}
                    <h1 className="text-center mb-4">Welcome {adminInfo && adminInfo.name}</h1>
                    { adminInfo ? 
                    <div>
                        <h3 className="text-center mb-4">Good to Have you back!!</h3>
                        <LinkContainer to="/admin/dashboard">
                        <Button variant="primary" className="me-3">
                                Go to Dashboard
                                </Button>
                        </LinkContainer>
                    </div>
                    
                         : 
                    
                    <div className="d-flex">
                        <h4>Please login to Continue</h4>
                        <LinkContainer to="/admin/login">
                            <Button variant="primary" className="me-3">
                                Sign In
                            </Button>
                        </LinkContainer>
                    </div>
                    }
                </Card>
            </Container>
        </div>
    );
};

export default Admin;
