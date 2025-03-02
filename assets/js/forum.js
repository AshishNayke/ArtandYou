// This file contains forum-specific functionality and data
// It's separated from main.js to improve organization and maintainability

// Forum data is now in a single place, following DRY principles
if (typeof window.forumData === 'undefined') {
  window.forumData = {
    categories: [
      {
        id: 1, 
        name: "Painting Techniques", 
        icon: "fas fa-paint-brush", 
        color: "bg-blue-600",
        topicsCount: 64,
        description: "Discussions about various painting techniques and methods."
      },
      {
        id: 2, 
        name: "Digital Art", 
        icon: "fas fa-desktop", 
        color: "bg-purple-600",
        topicsCount: 89,
        description: "All things related to creating art with digital tools."
      },
      {
        id: 3, 
        name: "Art Business", 
        icon: "fas fa-chart-line", 
        color: "bg-green-600",
        topicsCount: 47,
        description: "Tips and discussions for selling art and managing art business."
      },
      {
        id: 4, 
        name: "Art History", 
        icon: "fas fa-university", 
        color: "bg-yellow-600",
        topicsCount: 32,
        description: "Conversations about art movements, historical artists, and contexts."
      },
      {
        id: 5, 
        name: "Photography", 
        icon: "fas fa-camera", 
        color: "bg-red-600",
        topicsCount: 76,
        description: "Discussions about photography techniques, equipment, and styles."
      },
      {
        id: 6, 
        name: "Sculpture", 
        icon: "fas fa-cubes", 
        color: "bg-indigo-600",
        topicsCount: 28,
        description: "Topics related to 3D art forms and sculpture techniques."
      }
    ],
    topics: [
      {
        id: 1,
        title: "Digital Art Tips for Beginners",
        content: "Looking for recommendations on digital art software and basic techniques for someone just starting out with digital art. I have experience with traditional media but want to make the transition to digital. What tablets, software, and learning resources would you recommend?",
        author: {
          name: "ArtNewbie01",
          avatar: "../assets/images/auction/digiart2.jpg"
        },
        categoryId: 2,
        tags: ["digital", "beginner", "resources", "tips"],
        created: "2023-09-15T14:32:00",
        views: 156,
        replies: 23,
        isSticky: true
      },
      {
        id: 2,
        title: "My Latest Oil Painting Collection",
        content: "Excited to share my recent work inspired by contemporary urban life. The collection consists of 8 pieces that explore the relationship between nature and city structures. I've used a limited color palette to create cohesion across the series.",
        author: {
          name: "BrushMaster",
          avatar: "../assets/images/auction/painting3.jpg"
        },
        categoryId: 1,
        tags: ["oils", "showcase", "urban", "nature"],
        created: "2023-09-14T09:45:00",
        views: 98,
        replies: 18,
        isSticky: false
      },
      {
        id: 3,
        title: "Art Market Trends 2025",
        content: "What are your predictions for the art market next year? NFTs still relevant? Traditional galleries making a comeback? How are independent artists adapting to changing economics? Let's share insights and prepare for what's coming.",
        author: {
          name: "ArtEconomist",
          avatar: "../assets/images/auction/painting4.jpg"
        },
        categoryId: 3,
        tags: ["market", "trends", "nft", "business"],
        created: "2023-09-13T16:20:00",
        views: 215,
        replies: 32,
        isSticky: false
      },
      {
        id: 4,
        title: "The Evolution of Impressionism",
        content: "I'm doing research on the evolution of impressionism from its early beginnings to its influence on modern art movements. Would love to discuss key artists, technical innovations, and historical context that shaped this revolutionary approach to painting.",
        author: {
          name: "ArtHistorian",
          avatar: "../assets/images/auction/painting20.jpg"
        },
        categoryId: 4,
        tags: ["impressionism", "history", "monet", "research"],
        created: "2023-09-12T11:15:00",
        views: 87,
        replies: 14,
        isSticky: false
      },
      {
        id: 5,
        title: "Portrait Photography Lighting Setup",
        content: "I'm struggling with lighting for portrait photography. Currently using a 3-point setup but not getting the dramatic shadows I want. Would appreciate advice on equipment, positioning, and techniques for more dramatic portrait lighting while maintaining detail.",
        author: {
          name: "ShutterBug",
          avatar: "../assets/images/auction/painting23.jpg"
        },
        categoryId: 5,
        tags: ["photography", "lighting", "portraits", "technique"],
        created: "2023-09-11T15:45:00",
        views: 112,
        replies: 19,
        isSticky: false
      },
      {
        id: 6,
        title: "Working with Clay for Beginners",
        content: "Just started working with clay and finding it both challenging and rewarding. What clay types would you recommend for beginners? Also looking for advice on basic tools, firing options (when you don't have a kiln), and simple project ideas to develop skills.",
        author: {
          name: "ClayNewbie",
          avatar: "../assets/images/auction/painting24.jpg"
        },
        categoryId: 6,
        tags: ["sculpture", "clay", "beginner", "techniques"],
        created: "2023-09-10T13:30:00",
        views: 76,
        replies: 11,
        isSticky: false
      },
      {
        id: 7,
        title: "Watercolor Techniques for Landscapes",
        content: "I'm trying to improve my landscape paintings in watercolor but struggling with depth and atmospheric perspective. Any tips for creating distance in landscapes? Specific techniques for clouds, mountains and reflections in water would be especially helpful.",
        author: {
          name: "WatercolorWanderer",
          avatar: "../assets/images/auction/painting26.jpg"
        },
        categoryId: 1,
        tags: ["watercolor", "landscape", "techniques", "depth"],
        created: "2023-09-09T10:20:00",
        views: 143,
        replies: 26,
        isSticky: false
      },
      {
        id: 8,
        title: "Pricing Your Art: Methods and Considerations",
        content: "One of the hardest things as an artist is knowing how to price your work. Let's discuss different pricing strategies, factors to consider (size, materials, time, experience, market), and how to increase prices as your career progresses. What's working for you?",
        author: {
          name: "ArtBizPro",
          avatar: "../assets/images/auction/painting27.jpg"
        },
        categoryId: 3,
        tags: ["pricing", "business", "strategy", "sales"],
        created: "2023-09-08T14:10:00",
        views: 187,
        replies: 29,
        isSticky: true
      }
    ]
  };
}

class ForumManager {
  constructor() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.currentPage = 1;
    this.perPage = 5;
    this.init();
  }

  init() {
    console.log('ForumManager: Initializing forum functionality');

    // Check if we're on a page with forum elements
    const forumTopics = document.querySelector('.forum-topics');
    const forumCategories = document.querySelector('.forum-categories');

    if (!forumTopics && !forumCategories) {
      console.log('ForumManager: No forum elements found on this page');
      return;
    }

    // Remove loading placeholders
    const topicsFallback = document.getElementById('forum-fallback');
    if (topicsFallback) {
      topicsFallback.remove();
    }

    // Setup search functionality
    this.setupSearch();

    // Setup filter buttons
    this.setupFilterButtons();

    // Render categories
    if (forumCategories) {
      this.renderCategories(forumCategories);
    }

    // Render topics
    if (forumTopics) {
      this.renderTopics(forumTopics);
    }

    // Setup topic modals and actions
    this.setupTopicActions();
  }

  setupSearch() {
    const searchInput = document.getElementById('forumSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderTopicsWithAnimation();
      });
    }
  }

  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.forum-filter-button');
    if (filterButtons && filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
          button.classList.add('active', 'bg-blue-600', 'text-white');

          // Get filter type (Recent, Popular, Unanswered, etc.)
          if (button.textContent.trim() === 'Recent') {
            this.currentFilter = 'recent';
          } else if (button.textContent.trim() === 'Popular') {
            this.currentFilter = 'popular';
          } else if (button.textContent.trim() === 'Unanswered') {
            this.currentFilter = 'unanswered';
          } else {
            this.currentFilter = 'all';
          }

          this.renderTopicsWithAnimation();
        });
      });
    }
  }

  renderTopicsWithAnimation() {
    const topicsContainer = document.querySelector('.forum-topics');
    if (!topicsContainer) return;

    // Fade out current items
    const currentItems = topicsContainer.children;
    Array.from(currentItems).forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    // Render new items after fade out
    setTimeout(() => this.renderTopics(topicsContainer), 300);
  }

  getFilteredTopics() {
    let filteredTopics = window.forumData.topics;

    // Apply search filter
    if (this.searchQuery) {
      filteredTopics = filteredTopics.filter(topic => 
        topic.title.toLowerCase().includes(this.searchQuery) || 
        topic.content.toLowerCase().includes(this.searchQuery) ||
        topic.author.name.toLowerCase().includes(this.searchQuery) ||
        topic.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
      );
    }

    // Apply type filter
    if (this.currentFilter === 'recent') {
      filteredTopics.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (this.currentFilter === 'popular') {
      filteredTopics.sort((a, b) => b.views - a.views);
    } else if (this.currentFilter === 'unanswered') {
      filteredTopics = filteredTopics.filter(topic => topic.replies === 0);
    }

    // Always put sticky topics at the top
    const stickyTopics = filteredTopics.filter(topic => topic.isSticky);
    const nonStickyTopics = filteredTopics.filter(topic => !topic.isSticky);

    return [...stickyTopics, ...nonStickyTopics];
  }

  // Function to format date in a relative way (e.g., "2 days ago")
  formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }

  getCategoryById(categoryId) {
    return window.forumData.categories.find(cat => cat.id === categoryId) || {
      name: 'Uncategorized',
      color: 'bg-gray-600',
      icon: 'fas fa-folder'
    };
  }

  renderTopics(container) {
    if (!container) return;

    const filteredTopics = this.getFilteredTopics();
    const paginatedTopics = filteredTopics.slice(
      (this.currentPage - 1) * this.perPage,
      this.currentPage * this.perPage
    );

    container.innerHTML = '';

    if (paginatedTopics.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-xl p-8 shadow-lg text-center">
          <i class="fas fa-search text-blue-600 text-5xl mb-4"></i>
          <h3 class="text-xl font-bold mb-2">No topics found</h3>
          <p class="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      `;
      return;
    }

    paginatedTopics.forEach(topic => {
      const category = this.getCategoryById(topic.categoryId);
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all topic-card fade-in';

      card.innerHTML = `
        <div class="flex items-start gap-4">
          <div class="hidden md:block">
            <img src="${topic.author.avatar}" alt="${topic.author.name}" class="w-12 h-12 rounded-full object-cover border-2 border-gray-200">
          </div>
          <div class="flex-1">
            <div class="flex items-center flex-wrap gap-2 mb-1">
              <span class="px-2 py-1 rounded-full text-xs text-white ${category.color}">
                <i class="${category.icon} mr-1"></i> ${category.name}
              </span>
              ${topic.isSticky ? `<span class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs"><i class="fas fa-thumbtack mr-1"></i> Pinned</span>` : ''}
              <span class="text-gray-500 text-sm ml-auto">${this.formatRelativeDate(topic.created)}</span>
            </div>

            <h3 class="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
              <a href="#" onclick="openTopicModal(${topic.id})">${topic.title}</a>
            </h3>

            <p class="text-gray-600 mb-4 line-clamp-2">${topic.content}</p>

            <div class="flex items-center flex-wrap gap-2 mb-3">
              ${topic.tags.map(tag => `<span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#${tag}</span>`).join('')}
            </div>

            <div class="flex justify-between items-center">
              <div class="flex gap-4 text-sm text-gray-500">
                <span><i class="fas fa-eye mr-1"></i> ${topic.views} views</span>
                <span><i class="fas fa-comment mr-1"></i> ${topic.replies} replies</span>
              </div>
              <div class="flex items-center gap-2">
                <img src="${topic.author.avatar}" alt="${topic.author.name}" class="w-6 h-6 rounded-full md:hidden">
                <span class="text-sm font-medium">by ${topic.author.name}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Initialize scroll animation observer for forum topics
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('loaded');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '20px'
    });

    // Observe all forum topic cards for animation
    const cards = container.querySelectorAll('.topic-card');
    cards.forEach((card) => {
      observer.observe(card);
    });

    this.updatePagination(filteredTopics.length);
  }

  updatePagination(totalItems) {
    const paginationContainer = document.querySelector('.forum-topics + .mt-12 .flex');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / this.perPage);

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
      <button class="w-10 h-10 rounded-full ${this.currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-colors" ${this.currentPage === 1 ? 'disabled' : `onclick="window.forumManager.changePage(${this.currentPage - 1})"`}>
        <i class="fas fa-chevron-left"></i>
      </button>
    `;

    // Page numbers
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      paginationHTML += `
        <button class="w-10 h-10 rounded-full ${this.currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-colors" onclick="window.forumManager.changePage(${i})">
          ${i}
        </button>
      `;
    }

    // Next button
    paginationHTML += `
      <button class="w-10 h-10 rounded-full ${this.currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} flex items-center justify-center transition-colors" ${this.currentPage === totalPages ? 'disabled' : `onclick="window.forumManager.changePage(${this.currentPage + 1})"`}>
        <i class="fas fa-chevron-right"></i>
      </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;
    this.renderTopicsWithAnimation();
  }

  renderCategories(container) {
    if (!container) return;

    container.innerHTML = '';

    window.forumData.categories.forEach(category => {
      const categoryElement = document.createElement('li');
      categoryElement.className = 'flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 transition-colors';

      categoryElement.innerHTML = `
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full ${category.color} text-white flex items-center justify-center mr-3">
            <i class="${category.icon}"></i>
          </div>
          <a href="#" class="hover:text-blue-600 transition-colors">
            ${category.name}
          </a>
        </div>
        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          ${category.topicsCount}
        </span>
      `;

      container.appendChild(categoryElement);
    });
  }

  setupTopicActions() {
    // Add click handlers for various forum actions
    document.addEventListener('click', function(e) {
      // Handle "New Topic" button
      if (e.target.closest('button') && e.target.closest('button').textContent.includes('New Topic')) {
        e.preventDefault();
        alert('New Topic feature is coming soon!');
      }
    });
  }
}

// Function to open topic modal
window.openTopicModal = function(topicId) {
  // Check if topic modal exists
  if (!document.getElementById('topicModal')) {
    // Since we don't have a topic modal implemented yet, just show an alert with the topic ID
    alert(`Topic ${topicId} details will be displayed in a modal. This feature is coming soon!`);
    return;
  }
  
  // If modal exists, proceed with modal display logic
  const topic = window.forumData.topics.find(t => t.id === topicId);
  if (!topic) return;
  
  // Update modal content
  const modal = document.getElementById('topicModal');
  modal.style.display = 'flex';
}

// Note: getModalType function is now defined in main.js for global access

// Initialize forum manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Avoid duplicate initialization
  if (typeof window.forumManager === 'undefined') {
    window.forumManager = new ForumManager();
  }
});