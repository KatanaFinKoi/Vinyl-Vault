import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate('/home');
    } catch (err: any) {
      setErrorMessage(err || 'Username or password is incorrect');
      console.error('Failed to login', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate('/signUpPage');
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className='error-message' style={{ color: 'red'}}>{errorMessage}</p>}
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit' disabled={isLoading}>{isLoading? 'Logging in...': 'Submit'}</button>
      </form>

      <div style={{ marginTop: '20px'}}>
        <p>Don't have an account?</p>
        <button
         onClick={handleCreateAccount}
         style={{
           backgroundColor: 'transparent',
           padding: '10px 20px',
           border: 'none',
            cursor: 'pointer',
            color: 'blue',
            borderRadius: '5px'
         }}
         >
            Create Account
         </button>
      </div>
    </div>
    
  )
};

export default Login;
