document.addEventListener('DOMContentLoaded', () => {
    const createProfileButton = document.getElementById('createProfileButton');
    const createProfileModal = document.getElementById('createProfileModal');
    const closeModal = document.querySelectorAll('.close');
    const profileForm = document.getElementById('profileForm');
    const profileImageSelect = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    const deleteProfileModal = document.getElementById('deleteProfileModal');
    const deleteProfileButton = document.getElementById('deleteProfileButton');
    const deleteProfileForm = document.getElementById('deleteProfileForm');
    const deleteProfilePassword = document.getElementById('deleteProfilePassword');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');

    // Load profiles from localStorage and display them
    function loadProfiles() {
        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        const profileList = document.querySelector('.profile-list');
        profileList.innerHTML = '';

        profiles.forEach((profile, index) => {
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profile-card');
            profileDiv.innerHTML = `
                <img src="${profile.image}" alt="${profile.name}" class="profile-image">
                <div class="profile-name">${profile.name}</div>
                <button class="delete-button" data-index="${index}">
                    <img src="prof/delete-icon.png" alt="Supprimer">
                </button>
            `;
            profileDiv.onclick = () => {
                const password = prompt('Entrez le mot de passe pour accéder à ce profil:');
                if (password === profile.password) {
                    window.location.href = 'home.html';
                } else {
                    alert('Mot de passe incorrect.');
                }
            };
            profileList.appendChild(profileDiv);
        });

        // Add event listeners to delete profile buttons
        document.querySelectorAll('.delete-button').forEach(button => {
            button.onclick = (e) => {
                e.stopPropagation(); // Prevent triggering profile click event
                const index = button.getAttribute('data-index');
                deleteProfileModal.style.display = 'flex';

                // Handle delete profile confirmation
                deleteProfileForm.onsubmit = (event) => {
                    event.preventDefault();
                    const code = deleteProfilePassword.value;
                    if (code === 'aka') {
                        // Remove the profile
                        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
                        profiles.splice(index, 1);
                        localStorage.setItem('profiles', JSON.stringify(profiles));
                        loadProfiles();
                        deleteProfileModal.style.display = 'none';
                    } else {
                        document.getElementById('deleteNotification').textContent = 'Code de confirmation incorrect.';
                    }
                };

                cancelDeleteButton.onclick = () => {
                    deleteProfileModal.style.display = 'none';
                };
            };
        });
    }

    // Show the create profile modal
    createProfileButton.addEventListener('click', () => {
        createProfileModal.style.display = 'flex';
    });

    // Close the modals
    closeModal.forEach(button => {
        button.addEventListener('click', () => {
            createProfileModal.style.display = 'none';
            deleteProfileModal.style.display = 'none';
        });
    });

    // Preview selected profile image
    profileImageSelect.addEventListener('change', () => {
        const selectedImage = profileImageSelect.value;
        imagePreview.innerHTML = `<img src="${selectedImage}" alt="Aperçu de l'image">`;
    });

    // Handle profile form submission
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const profileName = document.getElementById('profileName').value;
        const profileImage = document.getElementById('profileImage').value;
        const profilePassword = document.getElementById('profilePassword').value;

        if (profilePassword.length !== 4 || isNaN(profilePassword)) {
            alert('Le mot de passe doit être composé de 4 chiffres.');
            return;
        }

        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        profiles.push({
            name: profileName,
            image: profileImage,
            password: profilePassword
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
        loadProfiles();
        createProfileModal.style.display = 'none';
    });

    // Load profiles on page load
    loadProfiles();
});
