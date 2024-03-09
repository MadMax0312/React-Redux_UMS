import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button } from 'react-bootstrap'
import { useUpdateUserMutation } from "../../slices/usersApiSlice"
import FormContainer  from '../../components/FrontContainer'
import { setCredentials } from "../../slices/authSlice"
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        if (name.trim().length === 0 ) {
            toast.error('Username cannot be empty')
        } else if(name.trim().length > 7){
            toast.error('Username length cannot be greater than 7')
        }else if(userInfo.name === name.trim()) {
            toast.info('No changes made')
        }
        else{
            try {
                const res = await updateProfile({
                    _id:userInfo._id,
                    name
                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Profile Updated");
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>

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
                readOnly
                onChange={ (e) => setEmail(e.target.value) }
                >
                </Form.Control>
            </Form.Group>
            <br />

            { isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">
                Update Profile
            </Button>

        </Form>
    </FormContainer>
  )
}

export default ProfileScreen