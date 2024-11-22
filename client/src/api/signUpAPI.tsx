

const signup = async (signUpData: { username: string; password: string; }) => {
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || 'Failed to create account';
            throw new Error(errorMessage);
        }
    } catch (err: any) {
        console.error('Error from user signup: ', err);
        return Promise.reject('Failed to create account');
    }
}

export { signup };