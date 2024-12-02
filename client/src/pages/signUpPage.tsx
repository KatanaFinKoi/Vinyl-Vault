import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after sign-up
import { signup } from "../api/signUpAPI";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigation hook

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        setErrorMessage(''); // Clear previous errors
        try {
            await signup(signUpData);
            // Redirect or show success message on successful sign-up
            navigate('/'); // Navigate to login page after successful sign-up
        } catch (err: any) {
            setErrorMessage(err.message || 'Failed to create account');
            console.error('Failed to create account', err);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={signUpData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>    
    );
};

export default SignUp;
