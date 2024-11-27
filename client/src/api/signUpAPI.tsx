

const signup = async (signUpData: { username: string; password: string; }) => {
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        });

        let data;
        
        try {
            data = await response.json();
        } catch (err) {
            throw new Error('Failed to parse response as JSON')
        }

        if (!response.ok) {
            const errorMessage = data.message || 'Failed to successfully create account';
            throw new Error(errorMessage);
        }
        localStorage.setItem('token', data.token)
        return data;
    } catch (err: unknown) {
        console.error('Error from user signup: ', err);
        return Promise.reject('Failed to create account');
    }
}

export { signup };