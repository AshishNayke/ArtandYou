// Gallery.js - Complete gallery functionality

class GalleryManager {
  constructor() {
    this.galleryItems = [
      {
        image: 'assets/images/gallery/digiart4.jpg',
        title: 'Flower',
        artist: 'Sarah Chen',
        price: '₹12,000',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/painting9.jpg',
        title: 'Beside lake',
        artist: 'Antonio',
        price: '₹11,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/digiart19.jpg',
        title: 'Swag',
        artist: 'Nidhi',
        price: '₹10,500',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/painting13.jpg',
        title: 'Oranges',
        artist: 'Antonio',
        price: '₹18,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/sclupture2.jpg',
        title: '',
        artist: 'Bella',
        price: '₹18,500',
        category: 'Sculptures'
      },
      {
        image: 'assets/images/gallery/painting7.jpg',
        title: 'Big Eyes',
        artist: 'Antonio',
        price: '₹6,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/painting10.jpg',
        title: 'Big Eyes',
        artist: 'Antonio',
        price: '₹9,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/sclupture4.jpg',
        title: '',
        artist: 'Zyan',
        price: '₹29,500',
        category: 'Sculptures'
      },
      {
        image: 'assets/images/gallery/digiart24.jpg',
        title: 'Tiger',
        artist: 'Dev',
        price: '₹5,500',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/digiart27.jpg',
        title: 'Tiger',
        artist: 'Dev',
        price: '₹9,500',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/painting1.jpg',
        title: 'Dawn',
        artist: 'Jo',
        price: '₹7,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/painting2.jpg',
        title: 'Flower',
        artist: 'Casper',
        price: '₹15,500',
        category: 'Paintings'
      },
      {
        image: 'assets/images/gallery/digiart6.jpg',
        title: 'Her Grace',
        artist: 'Yamini',
        price: '₹4,800',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/sclupture12.jpg',
        title: '',
        artist: 'Sia',
        price: '₹1,500',
        category: 'Sculptures'
      },
      {
        image: 'assets/images/gallery/sclupture17.jpg',
        title: '',
        artist: 'Bella',
        price: '₹6,500',
        category: 'Sculptures'
      },
      {
        image: 'assets/images/gallery/digiart26.jpg',
        title: 'Bipolar',
        artist: 'Sara Chan',
        price: '₹4,500',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/digiart13.jpg',
        title: 'Gajra',
        artist: 'Nidhi',
        price: '₹8,800',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/digiart10.jpg',
        title: 'Shringar',
        artist: 'Nidhi',
        price: '₹1,200',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/digiart12.jpg',
        title: 'Her',
        artist: 'Jaya',
        price: '₹1,300',
        category: 'Digital Art'
      },
      {
        image: 'assets/images/gallery/sclupture11.jpg',
        title: '',
        artist: 'Sia',
        price: '₹12,500',
        category: 'Sculptures'
      }
    ];

    this.currentPage = 1;
    this.itemsPerPage = 4;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.init();
  }

  init() {
    // Get DOM elements
    this.galleryGrid = document.querySelector('.gallery-grid');
    this.loadMoreBtn = document.getElementById('load-more');
    this.searchInput = document.getElementById('searchInput');
    this.filterButtons = document.querySelectorAll('.filter-button');

    if (this.galleryGrid) {
      // Remove loading placeholder
      const fallback = document.getElementById('gallery-fallback');
      if (fallback) {
        fallback.remove();
      }

      // Setup event listeners
      this.setupEventListeners();

      // Render gallery items
      this.renderGallery();
    }
  }

  setupEventListeners() {
    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.renderGalleryWithAnimation();
      });
    }

    // Filter functionality - Removed duplicate event listener
    

    // Load more functionality
    if (this.loadMoreBtn) {
      // Store reference to bound method for proper removal if needed
      this.handleLoadMore = this.loadMore.bind(this);
      this.loadMoreBtn.addEventListener('click', this.handleLoadMore);
    }
  }

  getFilteredItems() {
    return this.galleryItems.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.artist.toLowerCase().includes(this.searchQuery);
      const matchesCategory =
        this.currentFilter === 'all' ||
        item.category === this.currentFilter;
      return matchesSearch && matchesCategory;
    });
  }

  renderGalleryWithAnimation() {
    // Fade out current items
    const currentItems = this.galleryGrid.children;
    Array.from(currentItems).forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    // Render new items after fade out
    setTimeout(() => this.renderGallery(), 300);
  }

  renderGallery() {
    if (!this.galleryGrid) return;

    const filteredItems = this.getFilteredItems();
    const itemsToShow = filteredItems.slice(0, this.currentPage * this.itemsPerPage);

    this.galleryGrid.innerHTML = itemsToShow.map(item => this.createGalleryItem(item)).join('');

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

    // Observe cards and add quick buy functionality
    const cards = this.galleryGrid.querySelectorAll('.art-card');
    cards.forEach((card) => {
      observer.observe(card);

      // Handle quick buy button
      const quickBuyBtn = card.querySelector('.buy-button');
      if (quickBuyBtn) {
        quickBuyBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Buy button clicked - disabled');
        });
      }
    });

    // Update load more button visibility
    if (this.loadMoreBtn) {
      this.loadMoreBtn.style.display =
        itemsToShow.length >= filteredItems.length ? 'none' : 'inline-flex';
    }
  }

  createGalleryItem(item) {
    // Determine correct paths based on current page
    const isGalleryPage = window.location.pathname.includes('/pages/gallery.html');
    const imagePath = isGalleryPage ? `../${item.image}` : item.image;
    const fallbackImage = isGalleryPage ? '../assets/images/logo/altlogo.jpg' : 'assets/images/logo/altlogo.jpg';
    const authPath = isGalleryPage ? '../pages/auth.html?form=sign-in' : 'pages/auth.html?form=sign-in';
    
    return `
      <div class="art-card" data-category="${item.category}">
        <div class="art-card rounded-xl overflow-hidden shadow-lg bg-white">
          <div class="relative group">
            <img src="${imagePath}" alt="${item.title}" loading="lazy"
              class="w-full h-64 object-cover transition-opacity duration-300"
              onerror="this.src='${fallbackImage}'; this.alt='Image failed to load';">
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div class="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <a href="#" class="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors mb-2 block">
                  View Details
                </a>
                <a href="${authPath}" class="block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors buy-button">
                  Quick Buy
                </a>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-xl mb-2">${item.title}</h3>
            <p class="text-gray-600 mb-4">by ${item.artist}</p>
            <div class="flex justify-between items-center">
              <span class="bg-${item.category === 'Digital Art' ? 'purple' : item.category === 'Paintings' ? 'blue' : 'green'}-100 text-${item.category === 'Digital Art' ? 'purple' : item.category === 'Paintings' ? 'blue' : 'green'}-600 px-3 py-1 rounded-full text-xs">${item.category}</span>
              <span class="font-bold text-blue-600">${item.price}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  loadMore() {
    this.currentPage++;
    this.renderGallery();

    // After the first click, transform the button into a link to view all art
    if (this.loadMoreBtn) {
      // Replace button with link
      const linkElement = document.createElement('a');
      linkElement.href = 'pages/gallery.html';
      linkElement.className = 'text-blue-600 hover:text-blue-700 inline-flex items-center';
      linkElement.innerHTML = 'View All Art <i class="fas fa-arrow-right ml-2"></i>';

      // Replace the button with the link
      this.loadMoreBtn.parentNode.replaceChild(linkElement, this.loadMoreBtn);

      // Update reference to avoid issues
      this.loadMoreBtn = null;
    }
  }
}

// Make gallery data available globally
window.galleryItems = null;

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if gallery manager already exists
  if (typeof window.galleryManager === 'undefined') {
    window.galleryManager = new GalleryManager();
    
    // Check if we're on the gallery page
    const isGalleryPage = window.location.pathname.includes('/pages/gallery.html');
    if (isGalleryPage) {
      // Show more items per page on dedicated gallery page
      window.galleryManager.itemsPerPage = 20; // Show all items on gallery page
      window.galleryManager.renderGallery();
    }

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
        button.classList.add('active', 'bg-blue-600', 'text-white');
        const category = button.dataset.category;

        if (window.galleryManager) {
          window.galleryManager.currentFilter = category;
          window.galleryManager.currentPage = 1;
          window.galleryManager.renderGalleryWithAnimation();
        }
      });
    });
  }
});