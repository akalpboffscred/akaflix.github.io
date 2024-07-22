document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche l'envoi normal du formulaire

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const correctEmail = 'aka.vip@gmail.com';
        const correctPassword = 'aka';

        if (email === correctEmail && password === correctPassword) {
            notification.style.display = 'none'; // Masquer la notification
            window.location.href = 'profil.html';
        } else {
            notification.className = 'notification error';
            notification.textContent = 'Email ou mot de passe incorrect.';
            notification.style.display = 'block'; // Afficher la notification
        }
    });
});
