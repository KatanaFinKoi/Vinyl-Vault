import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || 'Username or password is incorrect';
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Username or password is incorrect');
  }
}



export { login };
