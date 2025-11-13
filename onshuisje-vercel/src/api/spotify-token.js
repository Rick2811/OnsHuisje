export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code, redirectUri } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Missing authorization code' });
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
        })
    });

    const data = await tokenRes.json();

    if (data.error) {
        return res.status(400).json({ error: data.error });
    }

    return res.status(200).json({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in
    });
}
