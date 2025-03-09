// Define the base URL for the Open Library search API
const baseURL = "https://openlibrary.org/search.json";

// Function to search for books
function searchBooks(title) {
    url = `${baseURL}?title=${encodeURIComponent(title)}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.docs) // Return books from the response
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
}

// Function to display books on the page
function displayBooks(books) {
    const resultsDiv = document.getElementById('bookResults');
    resultsDiv.innerHTML = '';  // Clear previous results

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = book.title || 'No Title Available';
        const authors = book.author_name ? book.author_name.join(', ') : 'No Authors Available';
        const firstPublishYear = book.first_publish_year || 'Unknown Year';
        const subjects = book.subject ? book.subject.join(', ') : 'No Subjects Available';

        bookDiv.innerHTML = `
            <h2>${title}</h2>
            <p><strong>Author(s):</strong> ${authors}</p>
            <p><strong>First Published:</strong> ${firstPublishYear}</p>
            <p><strong>Subjects:</strong> ${subjects}</p>
        `;

        resultsDiv.appendChild(bookDiv);
    });
}

// Handle the search button click
document.getElementById('searchButton').addEventListener('click', function searchBooks() {
    const searchQuery = document.getElementById('searchInput').value;
    if (searchQuery.trim() === '') {
        alert('Please enter a search query');
        return;
    }

    searchBooks(searchQuery)
        .then(books => displayBooks(books))
        .catch(error => console.error(error));
});
