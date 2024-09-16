

export const getAuth0Token = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_AUTH0_DOMAIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
                client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                grant_type: 'client_credentials',
            })
        })

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch Auth0 token');
        }

        return result.data.access_token;
    } catch (error) {
        console.error('Error fetching Auth0 token', error);
        throw new Error('Failed to fetch Auth0 token');
    }
};
