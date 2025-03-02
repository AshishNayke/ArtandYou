// Auth Page Manager
// Handles authentication forms, animations, and validation

document.addEventListener('DOMContentLoaded', function() {
  console.log('AuthManager: Initializing authentication page');

  // Initialize the auth forms with proper transitions
  initAuthForms();

  // Check URL parameters to determine which form to show initially
  const urlParams = new URLSearchParams(window.location.search);
  const formParam = urlParams.get('form');

  // Show the appropriate form based on URL parameter
  if (formParam === 'join') {
    showForm('joinForm');
  } else {
    showForm('signInForm');
  }

  // Hide loading spinner when page is ready
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.add('fade-out');
    setTimeout(() => {
      loadingSpinner.style.display = 'none';
    }, 500);
  }
});

function initAuthForms() {
  // Safely get form elements using utility functions
  const signInTab = document.getElementById('signInTab');
  const joinTab = document.getElementById('joinTab');
  const signInForm = document.getElementById('signInForm');
  const joinForm = document.getElementById('joinForm');
  const signInButton = document.getElementById('signInButton');
  const joinButton = document.getElementById('joinButton');

  // Add active class to the sign in tab by default
  if (signInTab) {
    signInTab.classList.add('border-blue-600', 'text-blue-600');
  }

  // Add tab click handlers safely
  if (signInTab) {
    signInTab.addEventListener('click', function() {
      showForm('signInForm');
    });
  }

  if (joinTab) {
    joinTab.addEventListener('click', function() {
      showForm('joinForm');
    });
  }

  // Add form submission handlers
  if (signInButton) {
    signInButton.addEventListener('click', function() {
      handleSignIn();
    });
  }

  if (joinButton) {
    joinButton.addEventListener('click', function() {
      handleJoin();
    });
  }
}

// Show the selected form with fade animation
function showForm(formId) {
  const signInTab = document.getElementById('signInTab');
  const joinTab = document.getElementById('joinTab');
  const signInForm = document.getElementById('signInForm');
  const joinForm = document.getElementById('joinForm');

  // Reset all tabs
  if (signInTab) signInTab.classList.remove('border-blue-600', 'text-blue-600');
  if (joinTab) joinTab.classList.remove('border-blue-600', 'text-blue-600');

  // Fade out both forms first
  if (signInForm) {
    signInForm.classList.add('form-fade-out');
    signInForm.classList.remove('form-fade-in');
  }

  if (joinForm) {
    joinForm.classList.add('form-fade-out');
    joinForm.classList.remove('form-fade-in');
  }

  // After a short delay, hide previous form and show the selected one
  setTimeout(() => {
    if (formId === 'signInForm') {
      // Update tab appearance
      if (signInTab) signInTab.classList.add('border-blue-600', 'text-blue-600');

      // Show sign in form
      if (signInForm) {
        signInForm.classList.remove('hidden', 'form-fade-out');
        signInForm.classList.add('form-fade-in');
      }

      // Hide join form
      if (joinForm) {
        joinForm.classList.add('hidden');
      }
    } else {
      // Update tab appearance
      if (joinTab) joinTab.classList.add('border-blue-600', 'text-blue-600');

      // Show join form
      if (joinForm) {
        joinForm.classList.remove('hidden', 'form-fade-out');
        joinForm.classList.add('form-fade-in');
      }

      // Hide sign in form
      if (signInForm) {
        signInForm.classList.add('hidden');
      }
    }
  }, 250);
}

// Handle sign in form submission
function handleSignIn() {
  const email = document.getElementById('signInEmail')?.value;
  const password = document.getElementById('signInPassword')?.value;
  const remember = document.getElementById('remember')?.checked;

  // Validate inputs
  if (!email || !password) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  // Show loading spinner
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
    loadingSpinner.classList.remove('fade-out');
  }

  // Simulate API call
  setTimeout(() => {
    // In a real app, this would be an API call

    // Mock successful authentication
    const userData = {
      isAuthenticated: true,
      name: email.split('@')[0],
      email: email,
      id: generateMockId(),
      profileImage: null,
      preferences: {}
    };

    // Store user data in localStorage
    localStorage.setItem('artAndYouUser', JSON.stringify(userData));

    // Hide loading spinner with animation
    if (loadingSpinner) {
      loadingSpinner.classList.add('fade-out');
      setTimeout(() => {
        loadingSpinner.style.display = 'none';

        // Redirect to homepage
        window.location.href = '../index.html';
      }, 500);
    }
  }, 1500);
}

// Handle join form submission
function handleJoin() {
  const firstName = document.getElementById('firstName')?.value;
  const lastName = document.getElementById('lastName')?.value;
  const email = document.getElementById('joinEmail')?.value;
  const password = document.getElementById('joinPassword')?.value;
  const confirmPassword = document.getElementById('confirmPassword')?.value;
  const terms = document.getElementById('terms')?.checked;

  // Validate inputs
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }

  if (!terms) {
    showNotification('Please agree to the terms', 'error');
    return;
  }

  // Show loading spinner
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
    loadingSpinner.classList.remove('fade-out');
  }

  // Simulate API call
  setTimeout(() => {
    // In a real app, this would be an API call

    // Mock successful registration
    const userData = {
      isAuthenticated: true,
      name: firstName + ' ' + lastName,
      email: email,
      id: generateMockId(),
      profileImage: null,
      preferences: {}
    };

    // Store user data in localStorage
    localStorage.setItem('artAndYouUser', JSON.stringify(userData));

    // Hide loading spinner with animation
    if (loadingSpinner) {
      loadingSpinner.classList.add('fade-out');
      setTimeout(() => {
        loadingSpinner.style.display = 'none';

        // Redirect to homepage
        window.location.href = '../index.html';
      }, 500);
    }
  }, 1500);
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
  // For now just use alert, but this could be enhanced with a nice toast/notification system
  alert(message);
}

// Helper function to generate a mock user ID
function generateMockId() {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}