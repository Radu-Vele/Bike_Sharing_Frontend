import { useState } from 'react';
import registerUser from './api/RegisterUser';

export default function Form() {
    
    const handleRegistration = async() => {
        const response = await registerUser(userName, legalName, email, password)
        if(response) {
            console.log(response)
        }
        else {
            setError(true)
            setSubmitted(false)
        }
    }
 
    // States for registration
    const [userName, setUserName] = useState('');
    const [legalName, setLegalName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    
    // Handling the userName change
    const handleUserName = (e) => {
        setUserName(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (userName === '' || email === '' || password === '') {
            setError(true);
        } else {
            handleRegistration();
            setSubmitted(true);
            setError(false);
        }
    };
    
    // Showing success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <p>User {userName} successfully registered!!</p>
        </div>
        );
    };
    
    // Showing error message if error is true
    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <p>Error from backend / make sure to Input all fields</p>
        </div>
        );
    };
    
    return (
        <div className="form">
        <div>
            <h1>User Registration</h1>
        </div>
    
        {/* Calling to the methods */}
        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>
    
        <form>
            {/* Labels and inputs for form data */}
            <label className="label">userName</label>
            <input onChange={handleUserName} className="input"
            value={userName} type="text" />
    
            <label className="label">Email</label>
            <input onChange={handleEmail} className="input"
            value={email} type="email" />
    
            <label className="label">Password</label>
            <input onChange={handlePassword} className="input"
            value={password} type="password" />
    
            <button onClick={handleSubmit} className="btn" type="submit">
            Submit
            </button>
        </form>
        </div>
    );
}