
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  const ADMIN_EMAIL = "admin@opendoor.local";
  const ADMIN_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; // senha "password"

  if (email === ADMIN_EMAIL && hashHex === ADMIN_HASH) {
    Store.setAuthed(true);
    window.location.href = "./index.html";
  } else {
    alert("Credenciais inválidas!");
  }
});
