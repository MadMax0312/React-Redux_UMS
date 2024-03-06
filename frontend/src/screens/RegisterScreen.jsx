import { useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer  from '../components/FrontContainer'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit')
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={ submitHandler }>

        <Form.Group classname='my-2' controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Username'
                value={name}
                onChange={ (e) => setName(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group classname='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group classname='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group classname='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={ (e) => setConfirmPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <br />

            <Button type='submit' variant='primary' classname='mt-3'>
                Sign Up
            </Button>
 
            <Row classname='py-3'>
                <Col>
                Already have an account? <Link to='/login'>Sign In</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default RegisterScreen