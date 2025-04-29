// DOM Elements
const moviesContainer = document.getElementById("moviesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const genreFilter = document.getElementById("genreFilter");
const sortBy = document.getElementById("sortBy");
const resetFiltersBtn = document.getElementById("resetFilters");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");

// State management
let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const moviesPerPage = 8;

// Array of available random images
const movieImages = [
  "./assets/movie-image/image1.jpg",
  "./assets/movie-image/image2.jpg",
  "./assets/movie-image/image3.jpg",
  "./assets/movie-image/image4.jpg",
  "./assets/movie-image/image5.jpg",
  "./assets/movie-image/image6.jpg",
];

// Sample movie descriptions
const sampleDescriptions = [
  "A thrilling adventure that will keep you on the edge of your seat.",
  "An emotional journey through the complexities of human relationships.",
  "A laugh-out-loud comedy perfect for the whole family.",
  "An epic tale of courage and perseverance against impossible odds.",
  "A mind-bending thriller that will leave you questioning reality.",
  "A heartwarming story about finding connection in unexpected places.",
];

// Utility function to get a random image
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * movieImages.length);
  return movieImages[randomIndex];
}

// Utility function to get a random description
function getRandomDescription() {
  const randomIndex = Math.floor(Math.random() * sampleDescriptions.length);
  return sampleDescriptions[randomIndex];
}

// Fetch movies from API
async function fetchMovies() {
  showLoading(true);

  try {
    const res = await fetch(
      "https://movieapp-api-lms1.onrender.com/movies/getMovies",
    );

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const data = await res.json();

    if (Array.isArray(data.movies)) {
      // Add random images and descriptions to each movie
      allMovies = data.movies.map((movie) => ({
        ...movie,
        imageUrl: getRandomImage(),
        description: getRandomDescription(),
      }));

      // Initialize filtered movies with all movies
      filteredMovies = [...allMovies];

      // Populate genre filter with unique genres
      populateGenreFilter();

      // Display initial movies
      renderMovies();
    } else {
      showNoResults(true);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesContainer.innerHTML = `
      <div class="error-message">
        <h3>Error loading movies</h3>
        <p>${error.message || "Please try again later."}</p>
      </div>
    `;
  } finally {
    showLoading(false);
  }
}

// Populate genre filter with unique genres from movies
function populateGenreFilter() {
  const genres = new Set(allMovies.map((movie) => movie.genre));

  // Clear existing options except the first one
  while (genreFilter.options.length > 1) {
    genreFilter.remove(1);
  }

  // Add genres from movies
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

// Filter and sort movies based on user input
function filterAndSortMovies() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreFilter.value;
  const selectedSort = sortBy.value;

  // Filter movies by search term and genre
  filteredMovies = allMovies.filter((movie) => {
    const matchesSearch =
      searchTerm === "" || movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenre === "" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  // Sort filtered movies
  if (selectedSort === "title-asc") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "title-desc") {
    filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (selectedSort === "genre") {
    filteredMovies.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  // Reset to first page when filtering changes
  currentPage = 1;

  // Update UI
  renderMovies();
}

// Render movies with pagination
function renderMovies() {
  // Calculate pagination range
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const moviesToShow = filteredMovies.slice(startIndex, endIndex);

  // Check if we have results
  if (filteredMovies.length === 0) {
    showNoResults(true);
    return;
  } else {
    showNoResults(false);
  }

  // Clear container
  moviesContainer.innerHTML = "";

  // Add movie cards
  moviesToShow.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.imageUrl}" alt="${movie.title}" class="movie-image">
      <div class="movie-details">
        <h3 class="movie-title">${movie.title}</h3>
        <span class="movie-genre">${movie.genre}</span>
        <p class="movie-description">${movie.description}</p>
        <div class="movie-actions">
          <button class="view-details-btn">View Details</button>
        </div>
      </div>
    `;

    moviesContainer.appendChild(card);
  });

  // Update pagination controls
  updatePaginationControls();
}

// Update pagination buttons and current page display
function updatePaginationControls() {
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Update current page display
  currentPageSpan.textContent = `Page ${currentPage} of ${totalPages || 1}`;

  // Enable/disable previous button
  prevPageBtn.disabled = currentPage <= 1;

  // Enable/disable next button
  nextPageBtn.disabled = currentPage >= totalPages;
}

// Handle pagination navigation
function goToPage(newPage) {
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderMovies();

    // Scroll to top of movies section
    document
      .querySelector(".movie-library")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Show/hide loading spinner
function showLoading(show) {
  if (show) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}

// Show/hide no results message
function showNoResults(show) {
  if (show) {
    noResults.classList.remove("hidden");
    moviesContainer.classList.add("hidden");
  } else {
    noResults.classList.add("hidden");
    moviesContainer.classList.remove("hidden");
  }
}

// Reset all filters and sort to default
function resetFilters() {
  searchInput.value = "";
  genreFilter.value = "";
  sortBy.value = "title-asc";

  filteredMovies = [...allMovies];
  currentPage = 1;

  renderMovies();
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Fetch movies when page loads
  fetchMovies();

  // Search button click
  searchBtn.addEventListener("click", filterAndSortMovies);

  // Search input enter key
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      filterAndSortMovies();
    }
  });

  // Genre filter change
  genreFilter.addEventListener("change", filterAndSortMovies);

  // Sort selection change
  sortBy.addEventListener("change", filterAndSortMovies);

  // Reset filters button
  resetFiltersBtn.addEventListener("click", resetFilters);

  // Pagination navigation
  prevPageBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextPageBtn.addEventListener("click", () => goToPage(currentPage + 1));

  // Movie card details button (delegation)
  moviesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details-btn")) {
      const card = e.target.closest(".movie-card");
      const title = card.querySelector(".movie-title").textContent;

      // You could implement a modal or redirect to a details page
      alert(`Details for "${title}" would open here!`);
    }
  });
});
