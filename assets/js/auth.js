// Simple Authentication Utility
const authUtils = {
  // Just a placeholder - auth is completely disabled
  checkAuth() {
    return false;
  },

  // Empty function, no modals
  showAuthModal() {
    // Do nothing
  },

  // No protection or authentication
  protectAction(callback) {
    // Just run the callback without any auth check
    if (callback) callback();
  }
};

// Reset all buttons to do nothing when clicked
document.addEventListener('DOMContentLoaded', () => {
  // Handle all buttons with a more robust selector
  const actionButtons = document.querySelectorAll('.bid-button, .buy-button, #galleryModalBuy, .action-button, .post-button');

  actionButtons.forEach(button => {
    if (button) {
      // Remove any existing event listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add a simple no-op event listener
      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked - no action');
        // No notification shown
      });
    }
  });

  // Add click handlers after DOM is fully loaded
  setTimeout(() => {
    // Try again with any dynamically created elements
    const lateButtons = document.querySelectorAll('.bid-button, .buy-button, #galleryModalBuy, .action-button, .post-button');
    lateButtons.forEach(button => {
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Button clicked - no action');
        });
      }
    });
  }, 1000);
});
// Authentication manager for Art&You platform
// Handles authentication-related functionality

// Define the AuthManager as a global object
window.authManager = {
  // Initialize authentication functionality
  init: function() {
    console.log('AuthManager: Initializing authentication');
    this.setupEventListeners();
    this.checkAuthStatus();
  },

  // Setup event listeners for auth-related elements
  setupEventListeners: function() {
    // Safely add event listeners using utility functions
    if (typeof safeAddEventListener === 'function') {
      // For login button in navigation
      safeAddEventListener('loginBtn', 'click', function() {
        window.location.href = 'pages/auth.html?form=sign-in';
      });
      
      // For join button in navigation
      safeAddEventListener('joinBtn', 'click', function() {
        window.location.href = 'pages/auth.html?form=join';
      });
    }
  },
  
  // Check if user is authenticated (simulated for demo)
  checkAuthStatus: function() {
    // In a real implementation, you would check local storage, cookies, or session
    const isAuthenticated = localStorage.getItem('auth_token') !== null;
    
    if (isAuthenticated) {
      this.updateUIForAuthenticatedUser();
    } else {
      this.updateUIForGuest();
    }
    
    return isAuthenticated;
  },
  
  // Update UI elements based on authentication status
  updateUIForAuthenticatedUser: function() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
      // Replace login/join buttons with user menu
      const username = localStorage.getItem('username') || 'User';
      authButtons.innerHTML = `
        <div class="relative group">
          <button class="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <span>${username}</span>
            <i class="fas fa-user-circle text-xl"></i>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Collection</a>
            <a href="#" id="logoutBtn" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      `;
      
      // Add logout functionality
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.logout();
        });
      }
    }
  },
  
  // Update UI for guest users
  updateUIForGuest: function() {
    // This is already the default state in your HTML
  },
  
  // Handle user login
  login: function(username, password) {
    // In a real implementation, you would:
    // 1. Send credentials to your backend API
    // 2. Receive and store token/session information
    // 3. Update UI based on successful authentication
    
    // Simulated login for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          localStorage.setItem('auth_token', 'simulated_token_' + Date.now());
          localStorage.setItem('username', username);
          this.updateUIForAuthenticatedUser();
          resolve({ success: true, username: username });
        } else {
          reject({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  },
  
  // Handle user registration
  register: function(username, email, password) {
    // Simulated registration for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && email && password) {
          localStorage.setItem('auth_token', 'simulated_token_' + Date.now());
          localStorage.setItem('username', username);
          this.updateUIForAuthenticatedUser();
          resolve({ success: true, username: username });
        } else {
          reject({ success: false, error: 'Invalid registration data' });
        }
      }, 1000);
    });
  },
  
  // Handle user logout
  logout: function() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.updateUIForGuest();
    window.location.href = 'index.html';
  }
};

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.authManager) {
    window.authManager.init();
  }
});
