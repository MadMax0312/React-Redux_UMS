import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer  from '../../components/FrontContainer'
import { setCredentials } from "../../slices/authSlice"
import { toast } from "react-toastify";
import Loader from "../../components/Loader"
import validateForm from "../../formValidation"
import { useAddUserMutation } from "../../slices/adminApiSlice"

const AddUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const [register, { isLoading }] = useAddUserMutation()

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (validateForm(name, email, password, confirmPassword)) {
            try {
                await register({ name, email, password }).unwrap();
                navigate('/admin/dashboard');
                toast.success('Successfully Registered');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    
  return (
    <FormContainer>
        <h1>Add User</h1>

        <Form onSubmit={ submitHandler }>

        <Form.Group className='my-2' controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Username'
                value={name}
                onChange={ (e) => setName(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={ (e) => setConfirmPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            { isLoading && <Loader/>}

            <br />

            <Button type='submit' variant='primary' className='mt-3'>
                Add User
            </Button>
 

        </Form>
    </FormContainer>
  )
}

export default AddUser