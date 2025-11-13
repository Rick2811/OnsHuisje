export function initGame() {
    const app = document.getElementById('rosansterApp');
    app.innerHTML = `
    <h1 style="color:lime; font-size:2rem; margin-bottom:1rem;">🎵 Welkom bij Hitster Remix</h1>
    <p style="margin-bottom:2rem;">Scan een QR-code om een nummer af te spelen en raad het jaartal!</p>
    <button id="login" style="padding:.6rem 1.2rem; background:#1db954; border:none; color:white; border-radius:8px; cursor:pointer;">🔐 Login met Spotify</button>
    <div id="player-controls" style="margin-top:2rem; display:none;">
      <p id="now-playing">⏳ QR-code gescand. Het nummer wordt afgespeeld...</p>
      <div id="reader" style="width:300px; margin-top:1rem;"></div>
    </div>
    <button onclick="location.reload()" style="margin-top:2rem; padding:.6rem 1.2rem; background:#1b4332; border:none; color:white; border-radius:8px; cursor:pointer;">⬅ Terug naar kookboek</button>
  `;

    const clientId = '8f06a0ec8e3148f79959a20e62ed2da1'; // jouw echte Spotify client ID
    const redirectUri = window.location.origin + window.location.pathname;
    const scopes = 'streaming user-read-email user-read-private user-modify-playback-state';

    const loginButton = document.getElementById('login');
    const playerControls = document.getElementById('player-controls');
    const nowPlaying = document.getElementById('now-playing');

    function getTokenFromUrl() {
        const hash = window.location.hash;
        if (!hash) return null;
        const params = new URLSearchParams(hash.substring(1));
        return params.get('access_token');
    }

    function redirectToSpotifyLogin() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}&response_type=token&show_dialog=true`;
        window.location.href = authUrl;
    }

    function playTrack(trackUri, token) {
        fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const activeDevice = data.devices.find(d => d.is_active);
                if (!activeDevice) {
                    nowPlaying.textContent = '❌ Geen actief Spotify-apparaat gevonden. Open de Spotify-app op je telefoon of desktop.';
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
                        nowPlaying.textContent = '▶️ Nummer wordt afgespeeld op jouw Spotify-apparaat.';
                    })
                    .catch(err => {
                        nowPlaying.textContent = '❌ Fout bij afspelen op apparaat.';
                    });
            });
    }

    function initQrScanner(token) {
        const reader = new Html5Qrcode("reader");
        reader.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (message) => {
                if (message.includes("open.spotify.com/track/")) {
                    const trackId = message.split("track/")[1].split("?")[0];
                    const trackUri = `spotify:track:${trackId}`;
                    playTrack(trackUri, token);
                } else {
                    nowPlaying.textContent = '❌ Geen geldige Spotify-track QR';
                }
            },
            (err) => {}
        );
    }

    loginButton.addEventListener('click', () => {
        redirectToSpotifyLogin();
    });

    const token = getTokenFromUrl();
    if (token) {
        loginButton.style.display = 'none';
        playerControls.style.display = 'block';
        initQrScanner(token);
    }

    // QR-code script toevoegen
    const qrScript = document.createElement('script');
    qrScript.src = 'https://unpkg.com/html5-qrcode';
    document.head.appendChild(qrScript);
}
