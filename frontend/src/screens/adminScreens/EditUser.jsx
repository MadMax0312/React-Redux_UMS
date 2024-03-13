import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Form, Button } from 'react-bootstrap'
import Loader from "../../components/Loader";
import { useEditUsersQuery, useUpdateUsersMutation } from "../../slices/adminApiSlice"
import { toast } from "react-toastify";
import FormContainer from "../../components/FrontContainer";

const EditScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const { id } = useParams();
    const { data: userInfo, isLoading, refetch } = useEditUsersQuery(id);
    const [updateProfile] = useUpdateUsersMutation();
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            refetch()
        }
    }, [userInfo]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (name.trim().length === 0) {
            toast.error('Username cannot be empty');
        } else if (name.trim().length > 7) {
            toast.error('Username length cannot be greater than 7');
        } else if (userInfo.name === name.trim()) {
            toast.info('No changes made');
        } else {
            try {
                await updateProfile({
                    _id:userInfo._id,
                    name
                }).unwrap();
                navigate('/admin/dashboard')
                toast.success("Profile Updated");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };    

    return (
        <FormContainer>
            <h1>Update User Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                readOnly
                >
                </Form.Control>
            </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Update Profile
                </Button>
            </Form>
        </FormContainer>
    )
}

export default EditScreen;
