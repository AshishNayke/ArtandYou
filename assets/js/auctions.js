
// This file contains auction-specific functionality and data
// It's separated from main.js to improve organization and maintainability

class AuctionManager {
  constructor() {
    this.auctionItems = [
      {
        id: 1,
        image: 'assets/images/auction/painting20.jpg',
        title: 'Twilight Moonshine',
        artist: 'Elena Mikhailov',
        description: 'An special flower which blooms specialy on twilight dark night under the shining moon',
        currentBid: '₹58,500',
        bidAmount: 18500,
        category: 'Paintings',
        endTime: this.randomEndTime(1, 5),
        bidHistory: [
          { username: 'artlover22', amount: '₹58,500', time: '2 hours ago' },
          { username: 'collector789', amount: '₹50,200', time: '5 hours ago' },
          { username: 'galleryowner', amount: '₹48,000', time: '1 day ago' }
        ]
      },
      {
        id: 2,
        image: 'assets/images/auction/painting23.jpg',
        title: 'True Self',
        artist: 'Alex Chen',
        description: 'A master piece where artist incourages everyone to accept our self how we are',
        currentBid: '₹22,000',
        bidAmount: 12000,
        category: 'Digital Art',
        endTime: this.randomEndTime(0, 2),
        bidHistory: [
          { username: 'digitcollector', amount: '₹22,000', time: '1 hour ago' },
          { username: 'nftlover', amount: '₹20,500', time: '3 hours ago' },
          { username: 'techartist', amount: '₹18,000', time: '6 hours ago' }
        ]
      },
      {
        id: 3,
        image: 'assets/images/auction/painting24.jpg',
        title: 'Casper',
        artist: 'Marco Visconti',
        description: 'The state of mind of the famous casper is shown in this painting',
        currentBid: '₹39,750',
        bidAmount: 29750,
        category: 'Sculptures',
        endTime: this.randomEndTime(3, 7),
        bidHistory: [
          { username: 'sculptcollector', amount: '₹39,750', time: '4 hours ago' },
          { username: 'artgallery88', amount: '₹35,500', time: '1 day ago' },
          { username: 'modernartlover', amount: '₹33,000', time: '2 days ago' }
        ]
      },
      {
        id: 4,
        image: 'assets/images/auction/painting26.jpg',
        title: 'Cosmic Vision',
        artist: 'Samantha Wu',
        description: 'An natural fenomena where frogs calling rains from heaven',
        currentBid: '₹41,800',
        bidAmount: 9800,
        category: 'Digital Art',
        endTime: this.randomEndTime(0, 1),
        bidHistory: [
          { username: 'spacefan', amount: '₹41,800', time: '30 minutes ago' },
          { username: 'galaxycollector', amount: '₹38,200', time: '2 hours ago' },
          { username: 'astronomyartist', amount: '₹37,500', time: '4 hours ago' }
        ]
      },
      {
        id: 5,
        image: 'assets/images/auction/painting3.jpg',
        title: 'Oranges and shine',
        artist: 'Thomas Greene',
        description: 'A masterful oil painting capturing the rich colors of autumn through oranges and sea that shine\'s',
        currentBid: '₹22,000',
        bidAmount: 22000,
        category: 'Paintings',
        endTime: this.randomEndTime(2, 6),
        bidHistory: [
          { username: 'natureartlover', amount: '₹22,000', time: '5 hours ago' },
          { username: 'landscapecollector', amount: '₹21,500', time: '8 hours ago' },
          { username: 'galleryowner', amount: '₹20,000', time: '1 day ago' }
        ]
      },
      {
        id: 6,
        image: 'assets/images/auction/digiart2.jpg',
        title: 'Van Gosh',
        artist: 'Isabella Fontana',
        description: 'Van Gosh in his own world by isabella ',
        currentBid: '₹31,200',
        bidAmount: 31200,
        category: 'Sculptures',
        endTime: this.randomEndTime(4, 8),
        bidHistory: [
          { username: 'modernartbid', amount: '₹31,200', time: '7 hours ago' },
          { username: 'sculptureexpert', amount: '₹30,000', time: '1 day ago' },
          { username: 'artinvestor', amount: '₹28,500', time: '2 days ago' }
        ]
      },
      {
        id: 7,
        image: 'assets/images/auction/painting4.jpg',
        title: 'sightly',
        artist: 'Jordan Mays',
        description: 'An intricate oil painting artist, with an intent of soaking eye in melancholy',
        currentBid: '₹14,500',
        bidAmount: 14500,
        category: 'Digital Art',
        endTime: this.randomEndTime(1, 3),
        bidHistory: [
          { username: 'techartbuyer', amount: '₹14,500', time: '3 hours ago' },
          { username: 'futureart', amount: '₹13,800', time: '6 hours ago' },
          { username: 'digitalcollector', amount: '₹12,500', time: '1 day ago' }
        ]
      },
      {
        id: 8,
        image: 'assets/images/auction/painting27.jpg',
        title: 'Being a Women',
        artist: 'Jaya',
        description: 'A vibrant acrylic painting bringing women problem and emotional state which always get niglacted',
        currentBid: '₹16,800',
        bidAmount: 16800,
        category: 'Paintings',
        endTime: this.randomEndTime(2, 5),
        bidHistory: [
          { username: 'coastalartlover', amount: '₹16,800', time: '4 hours ago' },
          { username: 'summercollector', amount: '₹16,000', time: '7 hours ago' },
          { username: 'holidaybuyer', amount: '₹15,200', time: '1 day ago' }
        ]
      }
    ];

    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.init();
    this.setupNextAuctionTimer();
  }

  randomEndTime(minDays, maxDays) {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);
    
    now.setDate(now.getDate() + randomDays);
    now.setHours(randomHours);
    now.setMinutes(randomMinutes);
    now.setSeconds(randomSeconds);
    
    return now;
  }

  init() {
    // Get DOM elements
    this.auctionGrid = document.querySelector('.auction-grid');
    this.searchInput = document.getElementById('searchInput');
    this.filterButtons = document.querySelectorAll('.filter-button');
    
    if (this.auctionGrid) {
      // Remove loading placeholder
      const fallback = document.getElementById('auction-fallback');
      if (fallback) {
        fallback.remove();
      }

      // Setup event listeners
      this.setupEventListeners();

      // Initialize auction timers
      this.startAllTimers();

      // Render auction items
      this.renderAuctions();
    }
  }

  setupEventListeners() {
    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.renderAuctionsWithAnimation();
      });
    }

    // Filter functionality
    if (this.filterButtons && this.filterButtons.length > 0) {
      this.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          this.filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
          button.classList.add('active', 'bg-blue-600', 'text-white');
          
          // Get filter category
          if (button.dataset.category) {
            this.currentFilter = button.dataset.category;
          } else if (button.dataset.status === 'ending-soon') {
            this.currentFilter = 'ending-soon';
          }
          
          this.currentPage = 1;
          this.renderAuctionsWithAnimation();
        });
      });
    }

    // Add modal event listeners
    document.addEventListener('click', (e) => {
      if (e.target.closest('.auction-item')) {
        const auctionId = parseInt(e.target.closest('.auction-item').dataset.id);
        this.openAuctionModal(auctionId);
      }
    });

    // Modal close button
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.closeModal();
      });
    });

    // Bid history toggles
    document.addEventListener('click', (e) => {
      if (e.target.closest('.bid-history-toggle')) {
        const content = e.target.closest('.bid-history-toggle').nextElementSibling;
        if (content) {
          content.classList.toggle('hidden');
        }
      }
    });

    // Place bid button in modal
    const placeBidBtn = document.getElementById('placeBidBtn');
    if (placeBidBtn) {
      placeBidBtn.addEventListener('click', () => {
        const bidAmountInput = document.getElementById('bidAmount');
        if (bidAmountInput && bidAmountInput.value) {
          this.placeBid(parseInt(bidAmountInput.value));
        } else {
          alert('Please enter a valid bid amount');
        }
      });
    }

    // Modal navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.navigateModal('prev');
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.navigateModal('next');
      });
    }
  }

  getFilteredItems() {
    const now = new Date();
    
    return this.auctionItems.filter(item => {
      // Search query filter
      const matchesSearch =
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.artist.toLowerCase().includes(this.searchQuery);
        
      // Category filter
      let matchesCategory = true;
      if (this.currentFilter === 'ending-soon') {
        // Show items ending in less than 24 hours
        const endingSoon = (item.endTime - now) / (1000 * 60 * 60) < 24;
        matchesCategory = endingSoon;
      } else if (this.currentFilter !== 'all') {
        matchesCategory = item.category === this.currentFilter;
      }
      
      return matchesSearch && matchesCategory;
    });
  }

  renderAuctionsWithAnimation() {
    // Fade out current items
    const currentItems = this.auctionGrid.children;
    Array.from(currentItems).forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    // Render new items after fade out
    setTimeout(() => this.renderAuctions(), 300);
  }

  renderAuctions() {
    if (!this.auctionGrid) return;

    const filteredItems = this.getFilteredItems();
    
    // Determine how many items to show based on page
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const itemsToDisplay = isHomePage ? 4 : this.itemsPerPage;
    
    // Get items for current page
    const itemsToShow = filteredItems.slice(0, itemsToDisplay);

    this.auctionGrid.innerHTML = itemsToShow.map(item => this.createAuctionItem(item)).join('');

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

    // Update timers for visible auctions
    const cards = this.auctionGrid.querySelectorAll('.auction-item');
    cards.forEach((card) => {
      observer.observe(card);
      
      // Set up timers for each auction item
      const id = parseInt(card.dataset.id);
      const auctionItem = this.auctionItems.find(item => item.id === id);
      
      if (auctionItem) {
        const timerElement = card.querySelector('.auction-countdown');
        this.updateTimer(auctionItem.endTime, timerElement);
      }
    });
  }

  createAuctionItem(item) {
    // Determine correct paths based on current page
    const isAuctionPage = window.location.pathname.includes('/pages/auction.html');
    const imagePath = isAuctionPage ? `../${item.image}` : item.image;
    const fallbackImage = isAuctionPage ? '../assets/images/logo/altlogo.jpg' : 'assets/images/logo/altlogo.jpg';
    
    return `
      <div class="art-card auction-item" data-id="${item.id}" data-category="${item.category}">
        <div class="rounded-xl overflow-hidden shadow-lg bg-white">
          <div class="relative group">
            <img src="${imagePath}" alt="${item.title}" loading="lazy"
              class="w-full h-64 object-cover transition-opacity duration-300"
              onerror="this.src='${fallbackImage}'; this.alt='Image failed to load';">
            <div class="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-2 rounded-full text-xs font-bold">
              LIVE
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div class="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <button class="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors mb-2 block mx-auto view-auction-btn">
                  View Auction
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-xl mb-2">${item.title}</h3>
            <p class="text-gray-600 mb-4">by ${item.artist}</p>
            <div class="flex justify-between items-center mb-4">
              <span class="bg-${item.category === 'Digital Art' ? 'purple' : item.category === 'Paintings' ? 'blue' : 'green'}-100 text-${item.category === 'Digital Art' ? 'purple' : item.category === 'Paintings' ? 'blue' : 'green'}-600 px-3 py-1 rounded-full text-xs">${item.category}</span>
              <div>
                <span class="text-gray-500 text-sm">Current Bid:</span>
                <span class="font-bold text-blue-600">${item.currentBid}</span>
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500 mb-1">Ends in:</div>
              <div class="auction-countdown flex justify-between bg-gray-100 p-2 rounded-lg text-center">
                <div><span class="hours font-bold">00</span>h</div>
                <div><span class="minutes font-bold">00</span>m</div>
                <div><span class="seconds font-bold">00</span>s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  openAuctionModal(auctionId) {
    const item = this.auctionItems.find(item => item.id === auctionId);
    if (!item) return;
    
    // Set current item for modal navigation
    this.currentModalItemId = auctionId;
    
    // Update modal content
    const modal = document.getElementById('auctionModal');
    const image = document.getElementById('auctionModalImage');
    const title = document.getElementById('auctionModalTitle');
    const artist = document.getElementById('auctionModalArtist');
    const description = document.getElementById('auctionModalDescription');
    const currentBid = document.getElementById('auctionModalCurrentBid');
    const timer = document.getElementById('auctionModalTimer');
    const bidHistoryList = document.getElementById('bidHistoryList');
    const bidAmountInput = document.getElementById('bidAmount');
    
    // Determine correct image path based on current page
    const isAuctionPage = window.location.pathname.includes('/pages/auction.html');
    const imagePath = isAuctionPage ? `../${item.image}` : item.image;
    
    // Set values
    image.src = imagePath;
    title.textContent = item.title;
    artist.textContent = `by ${item.artist}`;
    description.textContent = item.description;
    currentBid.textContent = item.currentBid;
    
    // Set minimum bid amount
    if (bidAmountInput) {
      bidAmountInput.min = item.bidAmount + 100;
      bidAmountInput.value = item.bidAmount + 100;
      bidAmountInput.placeholder = `Min bid: ${item.bidAmount + 100}`;
    }
    
    // Update bid history
    if (bidHistoryList) {
      bidHistoryList.innerHTML = item.bidHistory.map(bid => `
        <li class="py-2 flex justify-between">
          <span class="text-gray-600">${bid.username}</span>
          <div>
            <span class="font-medium">${bid.amount}</span>
            <span class="text-xs text-gray-500 ml-2">${bid.time}</span>
          </div>
        </li>
      `).join('');
    }
    
    // Start timer update for modal
    this.updateTimer(item.endTime, timer);
    
    // Show modal
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }
  
  closeModal() {
    const modal = document.getElementById('auctionModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }
  }
  
  navigateModal(direction) {
    if (!this.currentModalItemId) return;
    
    const filteredItems = this.getFilteredItems();
    const currentIndex = filteredItems.findIndex(item => item.id === this.currentModalItemId);
    
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    this.openAuctionModal(filteredItems[newIndex].id);
  }
  
  placeBid(amount) {
    if (!this.currentModalItemId) return;
    
    const item = this.auctionItems.find(item => item.id === this.currentModalItemId);
    if (!item) return;
    
    // Check if bid is high enough
    if (amount <= item.bidAmount) {
      alert('Your bid must be higher than the current bid!');
      return;
    }
    
    // Update bid
    item.bidAmount = amount;
    item.currentBid = `₹${amount.toLocaleString()}`;
    
    // Add to bid history
    const now = new Date();
    item.bidHistory.unshift({
      username: 'You',
      amount: `₹${amount.toLocaleString()}`,
      time: 'Just now'
    });
    
    // Update modal
    this.openAuctionModal(this.currentModalItemId);
    
    // Update auction grid
    this.renderAuctions();
    
    alert('Your bid has been placed successfully!');
  }
  
  startAllTimers() {
    // Update all auction timers every second
    setInterval(() => {
      this.auctionItems.forEach(item => {
        const timeLeft = item.endTime - new Date();
        if (timeLeft <= 0) {
          // Auction ended - could add handling code here
        }
      });
      
      // Update visible timers
      const auctionCountdowns = document.querySelectorAll('.auction-countdown');
      auctionCountdowns.forEach(timer => {
        const auctionItem = timer.closest('.auction-item');
        if (auctionItem) {
          const id = parseInt(auctionItem.dataset.id);
          const item = this.auctionItems.find(item => item.id === id);
          if (item) {
            this.updateTimer(item.endTime, timer);
          }
        }
      });
      
      // Update modal timer if open
      const modalTimer = document.getElementById('auctionModalTimer');
      if (modalTimer && this.currentModalItemId) {
        const item = this.auctionItems.find(item => item.id === this.currentModalItemId);
        if (item) {
          this.updateTimer(item.endTime, modalTimer);
        }
      }
    }, 1000);
  }
  
  updateTimer(endTime, timerElement) {
    if (!timerElement) return;
    
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
      // Auction ended
      timerElement.innerHTML = '<span class="text-red-600 font-bold">Auction Ended</span>';
      return;
    }
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update timer display
    const hoursElement = timerElement.querySelector('.hours');
    const minutesElement = timerElement.querySelector('.minutes');
    const secondsElement = timerElement.querySelector('.seconds');
    
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Add warning class if ending soon (less than 1 hour)
    if (timeLeft < 1000 * 60 * 60) {
      timerElement.classList.add('text-red-600');
    } else {
      timerElement.classList.remove('text-red-600');
    }
  }
  
  setupNextAuctionTimer() {
    // Set a fixed date for the next special auction
    const nextAuctionDate = new Date();
    nextAuctionDate.setDate(nextAuctionDate.getDate() + 7); // One week from now
    nextAuctionDate.setHours(20, 0, 0, 0); // 8 PM
    
    // Update the countdown every second
    setInterval(() => {
      const now = new Date();
      const timeLeft = nextAuctionDate - now;
      
      if (timeLeft <= 0) {
        // Reset to next week if time has passed
        nextAuctionDate.setDate(nextAuctionDate.getDate() + 7);
      } else {
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update countdown display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
      }
    }, 1000);
  }
}

// Initialize auctions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if auction manager already exists
  if (typeof window.auctionManager === 'undefined') {
    window.auctionManager = new AuctionManager();
  }
  
  // Handle modal closing on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('auctionModal');
      if (modal && modal.classList.contains('open')) {
        window.auctionManager.closeModal();
      }
    }
  });
  
  // Close modal when clicking outside content
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('auctionModal');
    if (modal && modal.classList.contains('open')) {
      if (e.target === modal) {
        window.auctionManager.closeModal();
      }
    }
  });
});

