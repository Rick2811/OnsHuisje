/* global Html5Qrcode */

export function initGame() {
    const app = document.getElementById('rosansterApp');
    app.innerHTML = `
        <h1 style="color:lime; font-size:2rem; margin-bottom:1rem;">🎵 Welkom bij Hitster Remix</h1>
        <p style="margin-bottom:2rem;">Klik op 'Volgend nummer' en scan een QR-code om een track te starten!</p>

        <button id="login" style="padding:.6rem 1.2rem; background:#1db954; border:none; color:white; border-radius:8px; cursor:pointer;">🔐 Login met Spotify</button>

        <div id="player-controls" style="margin-top:2rem; display:none;">
            <p id="now-playing">🎶 Klik op "Volgend nummer" om te scannen</p>
            <button id="next-track" style="margin-top:1rem; padding:.6rem 1.2rem; background:#0a9396; color:white; border:none; border-radius:8px; cursor:pointer;">🎯 Volgend nummer</button>
            <div id="reader" style="width:300px; margin-top:1rem;"></div>
        </div>

        <button onclick="location.reload()" style="margin-top:2rem; padding:.6rem 1.2rem; background:#1b4332; border:none; color:white; border-radius:8px; cursor:pointer;">⬅ Terug naar kookboek</button>
    `;

    const clientId = '8f06a0ec8e3148f79959a20e62ed2da1';
    const redirectUri = window.location.origin + window.location.pathname;
    const scopes = 'user-read-email user-read-private user-modify-playback-state';

    const loginButton = document.getElementById('login');
    const playerControls = document.getElementById('player-controls');
    const nowPlaying = document.getElementById('now-playing');

    function getCodeFromUrl() {
        const url = new URL(window.location.href);
        return url.searchParams.get('code');
    }

    function redirectToSpotifyLogin() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=code&show_dialog=true`;
        window.location.href = authUrl;
    }

    async function exchangeCodeForToken(code) {
        const res = await fetch('/api/spotify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, redirectUri })
        });
        const data = await res.json();
        return data.access_token;
    }

    function playTrack(trackUri, token) {
        fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const activeDevice = data.devices.find(d => d.is_active);
                if (!activeDevice) {
                    nowPlaying.textContent = '❌ Geen actief Spotify-apparaat gevonden.';
                    return;
                }

                fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: [trackUri] }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(() => {
                        nowPlaying.textContent = '▶️ Nummer wordt afgespeeld op je apparaat.';
                    })
                    .catch(() => {
                        nowPlaying.textContent = '❌ Fout bij afspelen op apparaat.';
                    });
            });
    }

    function startQR(token) {
        nowPlaying.textContent = '📷 Scanner gestart...';

        const reader = new Html5Qrcode("reader");
        reader.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            msg => {
                if (msg.includes("open.spotify.com/track/")) {
                    const id = msg.split("track/")[1].split("?")[0];
                    const uri = `spotify:track:${id}`;
                    reader.stop(); // Stop scanner na scannen
                    nowPlaying.textContent = '⏳ Nummer laden...';
                    playTrack(uri, token);
                } else {
                    nowPlaying.textContent = '❌ Geen geldige Spotify QR-code.';
                }
            },
            () => {}
        );
    }

    // QR-script laden en daarna pas opstarten
    const qrScript = document.createElement('script');
    qrScript.src = 'https://unpkg.com/html5-qrcode';
    qrScript.onload = () => {
        console.log('✅ QR library geladen');

        loginButton.addEventListener('click', redirectToSpotifyLogin);

        const code = getCodeFromUrl();
        if (code) {
            loginButton.style.display = 'none';
            playerControls.style.display = 'block';
            exchangeCodeForToken(code).then(token => {
                const nextButton = document.getElementById('next-track');
                nextButton.addEventListener('click', () => startQR(token));
            });
        }
    };
    document.head.appendChild(qrScript);
}
