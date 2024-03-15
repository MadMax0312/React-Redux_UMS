import React, { useState, useEffect } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/adminApiSlice";
import { Table, Button, Modal, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { data: users, isLoading, refetch } = useGetUsersQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteApiCall] = useDeleteUserMutation();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        refetch();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteApiCall(deleteUserId);
            console.log(`Deleting user with ID: ${deleteUserId}`);
            // Refetch the user list after successful deletion
            await refetch();
            setShowConfirmation(false);
            toast.success('User Deleted');
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const filteredUsers = users?.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>User Dashboard</h1>
            <FormControl
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3"
            />
            {isLoading && <p>Loading...</p>}
            {filteredUsers?.length ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <LinkContainer to={`/admin/editUser/${user._id}`}>
                                        <Button variant="primary">Edit</Button>
                                    </LinkContainer>
                                    &nbsp;&nbsp;
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            setDeleteUserId(user._id);
                                            setShowConfirmation(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <br />
                    <LinkContainer to='/admin/addUser'>
                    <Button>
                        Add new User
                    </Button></LinkContainer>
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
