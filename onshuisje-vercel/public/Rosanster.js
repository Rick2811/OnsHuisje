/* global Html5Qrcode */

export function initGame() {
    const app = document.getElementById('rosansterApp');
    app.innerHTML = `
    <h1 style="color:lime; font-size:2rem; margin-bottom:1rem;">🎵 Welkom bij Hitster Remix</h1>
    <p style="margin-bottom:2rem;">Klik op “Volgend nummer” en scan een QR‑code!</p>
    <button id="login" style="padding:.6rem 1.2rem; background:#1db954; border:none; color:white; border-radius:8px; cursor:pointer;">🔐 Login met Spotify</button>

    <div id="player-controls" style="margin-top:2rem; display:none;">
      <p id="now-playing">🎯 Klaar voor QR‑scan</p>
      <button id="next-track" style="padding:.6rem 1.2rem; background:#0a9396; border:none; color:white; border-radius:8px; cursor:pointer;">Volgend nummer</button>
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
        // … zoals je had …
    }

    function startQrScan(token) {
        nowPlaying.textContent = '📷 Scanner gestart...';
        const reader = new Html5Qrcode("reader");
        reader.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            message => {
                if (message.includes("open.spotify.com/track/")) {
                    const trackId = message.split("track/")[1].split("?")[0];
                    const trackUri = `spotify:track:${trackId}`;
                    reader.stop();
                    nowPlaying.textContent = '⏳ Nummer laden...';
                    playTrack(trackUri, token);
                } else {
                    nowPlaying.textContent = '❌ Geen geldige Spotify-track QR';
                }
            },
            err => {
                // eventueel error log
                console.warn(err);
            }
        );
    }

    const qrScript = document.createElement('script');
    qrScript.src = 'https://unpkg.com/html5-qrcode';
    qrScript.onload = () => {
        loginButton.addEventListener('click', redirectToSpotifyLogin);

        const code = getCodeFromUrl();
        if (code) {
            loginButton.style.display = 'none';
            playerControls.style.display = 'block';
            exchangeCodeForToken(code).then(token => {
                const nextButton = document.getElementById('next-track');
                nextButton.addEventListener('click', () => startQrScan(token));
            });
        }
    };
    document.head.appendChild(qrScript);
}
