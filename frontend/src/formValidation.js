import { toast } from "react-toastify";

const validateForm = (name, email, password, confirmPassword) => {
    let error = '';

    if (name.trim().length === 0) {
        error = 'Username cannot be empty';
    } else if (name.trim().length > 7) {
        error = 'Username length cannot be greater than 7';
    } else if (email.trim().length === 0) {
        error = 'Email cannot be empty';
    }
    else if (password.trim().length < 5 || password.trim().length > 10) {
        error = 'Password length must be between 5 and 10 characters';
    } else if (confirmPassword !== password) {
        error = 'Passwords do not match';
    }

    if (error) {
        toast.error(error);
        return false;
    }
    
    return true;
};


export default validateForm