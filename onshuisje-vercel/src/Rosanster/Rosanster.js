export function initGame() {
    const app = document.getElementById('rosansterApp');
    app.innerHTML = `
    <h1 style="color:lime; font-size:2rem; margin-bottom:1rem;">🎵 Welkom bij Hitster Remix</h1>
    <p style="margin-bottom:2rem;">Scan een QR-code om een nummer af te spelen en raad het jaartal!</p>
    <button onclick="location.reload()" style="padding:.6rem 1.2rem; background:#1b4332; border:none; color:white; border-radius:8px; cursor:pointer;">⬅ Terug naar kookboek</button>
  `;

    // Hier kun je jouw spel-functionaliteit toevoegen, bv. QR-code scanner
    // importeer eventueel html5-qrcode hier of andere logica
}
