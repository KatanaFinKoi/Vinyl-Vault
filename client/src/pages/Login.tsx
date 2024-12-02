import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import "../styles/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate("/home");
    } catch (err: any) {
      setErrorMessage(err || "Username or password is incorrect");
      console.error("Failed to login", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Declare handleCreateAccount function
  const handleCreateAccount = () => {
    navigate("/signUpPage");
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Log In</h1>
          <p className="form-subtitle">Welcome back! Please enter your details.</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <a href="/forgot-password" className="forgot-password-link">
            Forgot password?
          </a>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="create-account-section">
          <p className="no-acc">
            Don't have an account?{" "}
            <a href="/signUpPage" className="sign-up-link" onClick={handleCreateAccount}>
              Sign up
            </a>
          </p>
        </div>
      </div>

      <div className="image-section">
        <img
          className="login-image"
        />
      </div>
    </div>
  );
};

export default Login;