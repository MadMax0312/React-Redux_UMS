import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux"

const Hero = () => {

    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    return (
        <div className=" py-5">
            <Container className="d-flex justify-content-center">
                <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
                    <h1 className="text-center mb-4">Welcome {userInfo && userInfo.name}</h1>
                    <h3 className="text-center mb-4">
                        {userInfo ? 'Good to Have you back!!' : "Please login to Continue"}
                    </h3>
                    <div className="d-flex">
                        <LinkContainer to="/login">
                            <Button variant="primary" className="me-3">
                                Sign In
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Button variant="secondary">Register</Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero;
