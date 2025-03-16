/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
// Define the base URL for the Open Library search API
var baseURL = "https://openlibrary.org/search.json";

// Function to search for books
function searchBooks(title) {
  var url = "https://openlibrary.org/search.json?q=".concat(encodeURIComponent(title));
  return fetch(url).then(function (response) {
    return response.json();
  }) // Parse the JSON response
  .then(function (data) {
    console.log('Total books found:', data.num_found);
    console.log('First result:', data.docs[0]);

    // Return the books data
    return data.docs;
  })["catch"](function (error) {
    console.error('Error:', error);
    return []; // Return empty array if error occurs
  });
}

// Function to display books on the page
function displayBooks(books) {
  var resultsDiv = document.getElementById('bookResults');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (books.length === 0) {
    resultsDiv.innerHTML = '<p>No books found.</p>';
    return;
  }
  books.forEach(function (book) {
    var bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    var title = book.title || 'No Title Available';
    var authors = book.author_name ? book.author_name.join(', ') : 'No Authors Available';
    var firstPublishYear = book.first_publish_year || 'Unknown Year';
    var subjects = book.subject ? book.subject.join(', ') : 'No Subjects Available';
    bookDiv.innerHTML = "\n            <h2>".concat(title, "</h2>\n            <p><strong>Author(s):</strong> ").concat(authors, "</p>\n            <p><strong>First Published:</strong> ").concat(firstPublishYear, "</p>\n            <p><strong>Subjects:</strong> ").concat(subjects, "</p>\n        ");
    resultsDiv.appendChild(bookDiv);
  });
}

// Handle the search button click
document.getElementById('searchButton').addEventListener('click', function () {
  var searchQuery = document.getElementById('searchInput').value;
  if (searchQuery.trim() === '') {
    alert('Please enter a search query');
    return;
  }

  // Call searchBooks with the query and then display results
  searchBooks(searchQuery).then(function (books) {
    return displayBooks(books);
  })["catch"](function (error) {
    return console.error(error);
  });
});
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map