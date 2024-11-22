function searchFAQ() {
    // Get the search input value, trim whitespace, and convert it to lowercase for case-insensitive matching
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();

    // Select all FAQ items (div elements with the class 'faq-item')
    const faqItems = document.querySelectorAll('.faq-item');

    // Select the "No Results" message element
    const noResultsMessage = document.getElementById('no-results-message');

    // Initialize a flag to track whether any matches are found
    let hasResults = false;

    // Loop through each FAQ item
    faqItems.forEach(item => {
        // Get the text content of the question (h3) and the answer (p), convert to lowercase for case-insensitive matching
        const question = item.querySelector('h3').textContent.toLowerCase();
        const answer = item.querySelector('p').textContent.toLowerCase();

        // Check if the search input matches either the question or the answer
        if (question.includes(searchInput) || answer.includes(searchInput)) {
            item.style.display = 'block'; // Show the matching FAQ item
            hasResults = true; // Set the flag to true since a match is found
        } else {
            item.style.display = 'none'; // Hide the FAQ item if it doesn't match
        }
    });

    // Show the "No Results" message if no matches are found; otherwise, hide it
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
}
