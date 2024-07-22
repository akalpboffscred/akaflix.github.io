document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const notification = document.getElementById('notification');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche l'envoi normal du formulaire

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simule la création du compte
        console.log(`Nom: ${name}, Email: ${email}, Mot de passe: ${password}`);

        // Redirection vers profil.html après l'inscription
        notification.className = 'notification success';
        notification.textContent = 'Inscription réussie, redirection en cours...';
        notification.style.display = 'block'; // Afficher la notification

        setTimeout(() => {
            window.location.href = 'profil.html';
        }, 2000); // Redirection après 2 secondes pour montrer la notification
    });
});
