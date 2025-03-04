// This file contains artist-specific functionality and data
// It's separated from main.js to improve organization and maintainability

// Artist data is now in a single place, following DRY principles
if (typeof window.artistsData === 'undefined') {
  window.artistsData = [
    {
      id: 1,
      name: "Elena Mikhailov",
      bio: "Master Painter",
      specialty: "Painter",
      description: "Known for impressionist style and vibrant use of colors.",
      image: "assets/images/artists/2.jpg",
      profileLink: "#",
      artworksCount: 48,
      rating: 4.9,
      followers: 1250,
      badge: true,
      badgeType: "Featured",
      location: "Paris, France"
    },
    {
      id: 2,
      name: "Alex Chen",
      bio: "Digital Artist",
      specialty: "Digital Artist",
      description: "Creating surreal digital landscapes and futuristic concepts.",
      image: "assets/images/auction/painting20.jpg",
      profileLink: "#",
      artworksCount: 36,
      rating: 4.7,
      followers: 890,
      badge: true,
      badgeType: "Trending",
      location: "Tokyo, Japan"
    },
    {
      id: 3,
      name: "Marco Visconti",
      bio: "Sculptor",
      specialty: "Sculptor",
      description: "Contemporary sculptor working with mixed materials.",
      image: "assets/images/artists/5.jpg",
      profileLink: "#",
      artworksCount: 24,
      rating: 4.8,
      followers: 760,
      badge: false,
      location: "Rome, Italy"
    },
    {
      id: 4,
      name: "Samantha Wu",
      bio: "Digital Artist",
      specialty: "Digital Artist",
      description: "Specializes in cosmic and spiritually inspired digital art.",
      image: "assets/images/artists/6.jpg",
      profileLink: "#",
      artworksCount: 42,
      rating: 4.6,
      followers: 1050,
      badge: true,
      badgeType: "Popular",
      location: "San Francisco, USA"
    },
    {
      id: 5,
      name: "Thomas Greene",
      bio: "Painter",
      specialty: "Painter",
      description: "Traditional oil painter specializing in landscapes and still life.",
      image: "assets/images/auction/painting12.jpg",
      profileLink: "#",
      artworksCount: 31,
      rating: 4.5,
      followers: 680,
      badge: false,
      location: "Edinburgh, Scotland"
    },
    {
      id: 6,
      name: "Isabella Fontana",
      bio: "Sculptor",
      specialty: "Sculptor",
      description: "Modern sculptor exploring forms and negative space.",
      image: "assets/images/artists/digiart7.jpg",
      profileLink: "#",
      artworksCount: 19,
      rating: 4.7,
      followers: 740,
      badge: false,
      location: "Barcelona, Spain"
    },
    {
      id: 7,
      name: "Jordan Mays",
      bio: "Photographer",
      specialty: "Photographer",
      description: "Documentary and fine art photographer focusing on social themes.",
      image: "assets/images/artists/1.jpg",
      profileLink: "#",
      artworksCount: 56,
      rating: 4.8,
      followers: 920,
      badge: true,
      badgeType: "Featured",
      location: "Cape Town, South Africa"
    },
    {
      id: 8,
      name: "Jaya Patel",
      bio: "Painter",
      specialty: "Painter",
      description: "Contemporary painter exploring themes of identity and culture.",
      image: "assets/images/gallery/sclupture12.jpg",
      profileLink: "#",
      artworksCount: 37,
      rating: 4.6,
      followers: 810,
      badge: false,
      location: "Mumbai, India"
    }
  ];
}

class ArtistManager {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.init();
  }

  init() {
    // Check which grid we're working with
    this.artistGrid = document.getElementById('featuredArtists') || document.getElementById('artistsGrid');
    if (!this.artistGrid) return;
    
    // Remove loading placeholder if it exists
    const fallback = document.getElementById('artists-fallback');
    if (fallback) {
      fallback.remove();
    }

    // Setup filter buttons if on artist page
    this.setupFilterButtons();
    
    // Setup search functionality
    this.setupSearch();
    
    // Render artists
    this.renderArtists();
  }

  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.artist-filter-button');
    if (filterButtons && filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-600', 'text-white'));
          // Add active class to clicked button
          button.classList.add('active', 'bg-purple-600', 'text-white');
          
          // Get filter specialty
          this.currentFilter = button.dataset.specialty || 'all';
          
          // Re-render artists with animation
          this.renderArtistsWithAnimation();
        });
      });
    }
  }

  setupSearch() {
    const searchInput = document.getElementById('artistSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderArtistsWithAnimation();
      });
    }
  }

  renderArtistsWithAnimation() {
    // Fade out current items
    const currentItems = this.artistGrid.children;
    Array.from(currentItems).forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    // Render new items after fade out
    setTimeout(() => this.renderArtists(), 300);
  }

  getFilteredArtists() {
    return window.artistsData.filter(artist => {
      // Search query filter
      const matchesSearch =
        artist.name.toLowerCase().includes(this.searchQuery) ||
        artist.bio.toLowerCase().includes(this.searchQuery) ||
        artist.description.toLowerCase().includes(this.searchQuery);
        
      // Specialty filter
      let matchesSpecialty = true;
      if (this.currentFilter !== 'all') {
        matchesSpecialty = artist.specialty === this.currentFilter;
      }
      
      return matchesSearch && matchesSpecialty;
    });
  }

  createArtistCard(artist) {
    // Determine correct paths based on current page
    const isArtistPage = window.location.pathname.includes('/pages/artist.html');
    const imagePath = isArtistPage ? `../${artist.image}` : artist.image;
    const badgeColor = artist.badgeType === 'Featured' ? 'bg-blue-600' : 
                      artist.badgeType === 'Trending' ? 'bg-green-600' : 
                      artist.badgeType === 'Popular' ? 'bg-purple-600' : 'bg-blue-600';

    const artistId = artist.id || Math.floor(Math.random() * 1000);

    return `
      <div class="art-card fade-in bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <div class="relative">
          <img src="${imagePath}" alt="${artist.name}'s Artwork" class="w-full h-48 object-cover">
          ${artist.badge || artist.badgeType ? `
            <div class="artist-badge absolute top-3 left-3 px-2 py-1 rounded-full text-white text-xs font-bold ${badgeColor} flex items-center">
              <span class="mr-1">★</span> ${artist.badgeType || 'Featured'}
            </div>
          ` : ''}
        </div>
        <div class="p-6">
          <div class="flex items-start mb-4">
            <img src="${imagePath}" alt="${artist.name}"
              class="w-14 h-14 rounded-full border-2 border-blue-600 flex-shrink-0 hover:scale-110 transition-transform object-cover">
            <div class="ml-3">
              <h3 class="font-bold text-xl">${artist.name}</h3>
              <p class="text-gray-600">${artist.bio}</p>
              <p class="text-gray-500 text-sm"><i class="fas fa-map-marker-alt mr-1"></i> ${artist.location || 'Global'}</p>
            </div>
          </div>
          <p class="text-gray-700 mb-4">${artist.description}</p>
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="block font-bold text-2xl">${artist.artworksCount}</span>
              <span class="text-sm text-gray-500">Artworks</span>
            </div>
            <div>
              <span class="block font-bold text-2xl">${artist.rating}</span>
              <span class="text-sm text-gray-500">Rating</span>
            </div>
            <div>
              <span class="block font-bold text-2xl">${artist.followers || 0}</span>
              <span class="text-sm text-gray-500">Followers</span>
            </div>
          </div>
          <button
            onclick="openArtistModal(${artistId})"
            class="block w-full bg-blue-600 text-white text-center py-3 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105">
            View Profile
          </button>
        </div>
      </div>
    `;
  }

  renderArtists() {
    if (!this.artistGrid) return;
    
    // Get filtered artists or just the first few for home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const artists = isHomePage ? window.artistsData.slice(0, 4) : this.getFilteredArtists();

    this.artistGrid.innerHTML = artists.map(artist => this.createArtistCard(artist)).join('');

    // Initialize scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('loaded');
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe all artist cards for animation
    const cards = this.artistGrid.querySelectorAll('.art-card');
    cards.forEach((card) => {
      observer.observe(card);
    });
  }
}

// Initialize artist cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Avoid duplicate initialization
  if (typeof window.artistManager === 'undefined') {
    window.artistManager = new ArtistManager();
  }

  // Add intersection observer for artist card animations
  const artistsContainer = document.getElementById('featuredArtists');
  if (!artistsContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('loaded');
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Observe all artist cards for animations
  const artistCards = artistsContainer.querySelectorAll('.art-card');
  artistCards.forEach(card => {
    observer.observe(card);
  });

  // Initialize artist modal
  //const artistModal = new ModalManager('artistModal'); //This line was causing an error, as ModalManager is not defined. Commented out.

  // Function to dynamically arrange artist cards
  function arrangeArtistCards() {
    const artistGrid = document.getElementById('featuredArtists');
    const artistCards = artistGrid?.querySelectorAll('.art-card');

    // Determine the number of columns based on screen size
    let columns = 1;
    if (window.innerWidth >= 576) {
      columns = 1;
    }
    if (window.innerWidth >= 768) {
      columns = 2;
    }
    if (window.innerWidth >= 1024) {
      columns = 3;
    }
    if (window.innerWidth >= 1280) {
      columns = 4;
    }

    // Set grid template columns
    if (artistGrid) {
      artistGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    // Add fade-in animation to artist cards
    artistCards?.forEach((item) => {
      item.classList.add('fade-in');
    });
  }

  // Call arrangement function on load and resize
  arrangeArtistCards();
  window.addEventListener('resize', arrangeArtistCards);
});

// Modal utilities for artist cards
window.getModalType = function(type) {
  switch(type) {
    case 'artist':
      return 'artistModal';
    case 'auction':
      return 'auctionModal';
    case 'topic':
      return 'topicModal';
    default:
      return null;
  }
}

// Function to open modal with specific data
function openArtistModal(artistId) {
  const artist = window.artistsData.find(a => a.id === artistId);
  if (!artist || !document.getElementById('artistModal')) return;
  
  // Set modal content
  document.getElementById('artistModalImage').src = artist.image;
  document.getElementById('artistModalName').textContent = artist.name;
  document.getElementById('artistModalSpecialty').textContent = artist.specialty;
  document.getElementById('artistModalArtworks').textContent = artist.artworksCount;
  document.getElementById('artistModalRating').textContent = artist.rating;
  document.getElementById('artistModalSales').textContent = artist.followers || 0;
  document.getElementById('artistModalBio').textContent = artist.description;
  
  // Show the modal
  document.getElementById('artistModal').style.display = 'flex';
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Close modals when clicking on close button
document.addEventListener('DOMContentLoaded', function() {
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });
});
