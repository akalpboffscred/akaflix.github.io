document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar input');
    const categorySelect = document.getElementById('categorySelect');
    const filmItems = document.querySelectorAll('.movie-card');

    searchBar.addEventListener('input', function() {
        const searchValue = searchBar.value.toLowerCase();
        filterFilms(searchValue, categorySelect.value);
    });

    categorySelect.addEventListener('change', function() {
        const searchValue = searchBar.value.toLowerCase();
        filterFilms(searchValue, categorySelect.value);
    });

    function filterFilms(searchValue, categoryValue) {
        filmItems.forEach(function(filmItem) {
            const filmTitle = filmItem.querySelector('.movie-name').textContent.toLowerCase();
            const filmCategory = filmItem.getAttribute('data-category');

            const matchesSearch = filmTitle.includes(searchValue);
            const matchesCategory = categoryValue === 'all' || filmCategory === categoryValue;

            if (matchesSearch && matchesCategory) {
                filmItem.style.display = 'block';
            } else {
                filmItem.style.display = 'none';
            }
        });
    }
});
