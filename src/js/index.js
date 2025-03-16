// Define the base URL for the Open Library search API
const baseURL = "https://openlibrary.org/search.json";

// Function to search for books
function searchBooks(title) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`;

    return fetch(url)
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            console.log('Total books found:', data.num_found);
            console.log('First result:', data.docs[0]);

            // Return the books data
            return data.docs;
        })
        .catch(error => {
            console.error('Error:', error);
            return [];  // Return empty array if error occurs
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
document.getElementById('searchButton').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchInput').value;
    if (searchQuery.trim() === '') {
        alert('Please enter a search query');
        return;
    }

    // Call searchBooks with the query and then display results
    searchBooks(searchQuery)
        .then(books => displayBooks(books))
        .catch(error => console.error(error));
});
