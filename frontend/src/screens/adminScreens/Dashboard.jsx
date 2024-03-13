import React, { useState, useEffect } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/adminApiSlice";
import { Table, Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { data: users, isLoading, refetch } = useGetUsersQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteApiCall] = useDeleteUserMutation();

    useEffect(() => {
        refetch();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteApiCall(deleteUserId)
            console.log(`Deleting user with ID: ${deleteUserId}`);
            // Refetch the user list after successful deletion
            await refetch();
            setShowConfirmation(false);
            toast.success('User Deleted')
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            {isLoading && <p>Loading...</p>}
            {users ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <LinkContainer to={`/admin/editUser/${user._id}`}>
                                        <Button variant="primary">Edit</Button>
                                    </LinkContainer>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => {
                                        setDeleteUserId(user._id);
                                        setShowConfirmation(true);
                                    }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No Users Available</p>
            )}
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Cancel
                    </Button>
                    
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
