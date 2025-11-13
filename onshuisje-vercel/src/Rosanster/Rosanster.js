export function initGame() {
    const app = document.getElementById('rosansterApp');
    app.innerHTML = `
    <h1 style="color:lime; font-size:2rem; margin-bottom:1rem;">🎵 Welkom bij Hitster Remix</h1>
    <p style="margin-bottom:2rem;">Scan een QR-code om een nummer af te spelen en raad het jaartal!</p>
    <button id="login" style="padding:.6rem 1.2rem; background:#1db954; border:none; color:white; border-radius:8px; cursor:pointer;">🔐 Login met Spotify</button>
    <div id="player-controls" style="margin-top:2rem; display:none;">
      <p id="now-playing">⏳ Wacht op QR-scan...</p>
      <div id="reader" style="width:300px; margin-top:1rem;"></div>
    </div>
    <button onclick="location.reload()" style="margin-top:2rem; padding:.6rem 1.2rem; background:#1b4332; border:none; color:white; border-radius:8px; cursor:pointer;">⬅ Terug naar kookboek</button>
  `;

    const clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // 👈 VERANDER DIT
    const redirectUri = window.location.origin + window.location.pathname;
    const scopes = 'streaming user-read-email user-read-private';

    const loginButton = document.getElementById('login');
    const playerControls = document.getElementById('player-controls');
    const nowPlaying = document.getElementById('now-playing');
    let player, deviceId;

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

    function setupPlayer(token) {
        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new Spotify.Player({
                name: 'Hitster Remix Player',
                getOAuthToken: cb => cb(token),
                volume: 0.8
            });

            player.addListener('ready', ({ device_id }) => {
                deviceId = device_id;
                console.log('Ready with Device ID', device_id);
                playerControls.style.display = 'block';
                initQrScanner(token);
            });

            player.connect();
        };
    }

    function playTrack(trackUri, token) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [trackUri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            nowPlaying.textContent = '▶️ Afspelen: ' + trackUri;
        }).catch(err => {
            nowPlaying.textContent = '❌ Fout bij afspelen';
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
        setupPlayer(token);
    }

    // Spotify SDK script toevoegen
    const sdk = document.createElement('script');
    sdk.src = 'https://sdk.scdn.co/spotify-player.js';
    document.head.appendChild(sdk);

    // QR-code script toevoegen
    const qrScript = document.createElement('script');
    qrScript.src = 'https://unpkg.com/html5-qrcode';
    document.head.appendChild(qrScript);
}
