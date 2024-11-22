function searchFAQ() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    const noResultsMessage = document.getElementById('no-results-message');

    let hasResults = false;

    faqItems.forEach(item => {
        const question = item.querySelector('h3').textContent.toLowerCase();
        const answer = item.querySelector('p').textContent.toLowerCase();

        if (question.includes(searchInput) || answer.includes(searchInput)) {
            item.style.display = 'block';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    noResultsMessage.style.display = hasResults ? 'none' : 'block';
}
