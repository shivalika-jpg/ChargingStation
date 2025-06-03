const form = document.getElementById('login-form');
const messageP = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('https://chargingstation-8nhx.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html';
    } else {
      messageP.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    messageP.textContent = 'Network error';
  }
});
