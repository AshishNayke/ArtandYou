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
  } else if (formParam === 'sign-in') {
    showForm('signInForm');
  } else {
    // Default to sign in if no valid parameter
    showForm('signInForm');
  }

  // Hide loading spinner when page is ready
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.add('fade-out');
    setTimeout(() => {
      loadingSpinner.style.display = 'none';

      // Add fade-in to the currently visible form
      const currentForm = document.getElementById('signInForm').classList.contains('hidden')
        ? document.getElementById('joinForm')
        : document.getElementById('signInForm');

      if (currentForm) {
        currentForm.classList.add('form-fade-in');
        setTimeout(() => {
          currentForm.classList.remove('form-fade-in');
        }, 500);
      }
    }, 500);
  }
});

// Initialize auth forms and tab navigation
function initAuthForms() {
  // Get DOM elements
  const signInTab = document.getElementById('signInTab');
  const joinTab = document.getElementById('joinTab');
  const signInForm = document.getElementById('signInForm');
  const joinForm = document.getElementById('joinForm');
  const signInButton = document.getElementById('signInButton');
  const joinButton = document.getElementById('joinButton');

  // Setup tab navigation
  if (signInTab && joinTab) {
    signInTab.addEventListener('click', () => {
      showForm('signInForm');
    });

    joinTab.addEventListener('click', () => {
      showForm('joinForm');
    });
  }

  // Add sign in functionality
  if (signInButton) {
    signInButton.addEventListener('click', handleSignIn);
  }

  // Add join functionality
  if (joinButton) {
    joinButton.addEventListener('click', handleJoin);
  }
}

// Show the specified form and update tab states
function showForm(formId) {
  const signInTab = document.getElementById('signInTab');
  const joinTab = document.getElementById('joinTab');
  const signInForm = document.getElementById('signInForm');
  const joinForm = document.getElementById('joinForm');

  if (!signInForm || !joinForm || !signInTab || !joinTab) {
    console.error('AuthManager: Form elements not found');
    return;
  }

  // Update tab states
  if (formId === 'signInForm') {
    signInTab.classList.add('border-blue-600', 'text-blue-600');
    joinTab.classList.remove('border-blue-600', 'text-blue-600');

    // Fade out join form if visible
    if (!joinForm.classList.contains('hidden')) {
      joinForm.classList.add('form-fade-out');
      setTimeout(() => {
        joinForm.classList.add('hidden');
        joinForm.classList.remove('form-fade-out');

        // Fade in sign in form
        signInForm.classList.remove('hidden');
        signInForm.classList.add('form-fade-in');
        setTimeout(() => {
          signInForm.classList.remove('form-fade-in');
        }, 500);
      }, 250);
    } else {
      // Just show sign in form with fade in
      signInForm.classList.remove('hidden');
      signInForm.classList.add('form-fade-in');
      setTimeout(() => {
        signInForm.classList.remove('form-fade-in');
      }, 500);
    }
  } else {
    joinTab.classList.add('border-blue-600', 'text-blue-600');
    signInTab.classList.remove('border-blue-600', 'text-blue-600');

    // Fade out sign in form if visible
    if (!signInForm.classList.contains('hidden')) {
      signInForm.classList.add('form-fade-out');
      setTimeout(() => {
        signInForm.classList.add('hidden');
        signInForm.classList.remove('form-fade-out');

        // Fade in join form
        joinForm.classList.remove('hidden');
        joinForm.classList.add('form-fade-in');
        setTimeout(() => {
          joinForm.classList.remove('form-fade-in');
        }, 500);
      }, 250);
    } else {
      // Just show join form with fade in
      joinForm.classList.remove('hidden');
      joinForm.classList.add('form-fade-in');
      setTimeout(() => {
        joinForm.classList.remove('form-fade-in');
      }, 500);
    }
  }
}

// Handle sign in form submission
function handleSignIn() {
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  // Simple validation
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  // Email validation using the utility function
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // Show loading spinner
  showLoadingSpinner();

  // Simulate authentication (for demo purposes)
  setTimeout(() => {
    // Store user info in localStorage
    const userInfo = {
      email: email,
      name: email.split('@')[0],
      isAuthenticated: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('artAndYouUser', JSON.stringify(userInfo));

    // Redirect to home page
    window.location.href = '../index.html';
  }, 1500);
}

// Handle join form submission
function handleJoin() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('joinEmail').value;
  const password = document.getElementById('joinPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsCheckbox = document.getElementById('terms');

  // Simple validation
  if (!firstName || !lastName || !email || !password) {
    alert('Please fill in all required fields');
    return;
  }

  // Email validation using the utility function
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (!termsCheckbox.checked) {
    alert('You must agree to the terms and privacy policy');
    return;
  }

  // Show loading spinner
  showLoadingSpinner();

  // Simulate account creation (for demo purposes)
  setTimeout(() => {
    // Store user info in localStorage
    const userInfo = {
      email: email,
      name: firstName + ' ' + lastName,
      isAuthenticated: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('artAndYouUser', JSON.stringify(userInfo));

    // Redirect to home page
    window.location.href = '../index.html';
  }, 1500);
}

// Show loading spinner
function showLoadingSpinner() {
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
    loadingSpinner.classList.remove('fade-out');
  }
}

// Helper function to show notifications (from original code)
function showNotification(message, type = 'info') {
  // For now just use alert, but this could be enhanced with a nice toast/notification system
  alert(message);
}

// Helper function to generate a mock user ID (from original code)
function generateMockId() {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}
// Authentication Manager
window.authManager = {
  init: function() {
    console.log('AuthManager: Initializing authentication page');

    // Check if we're on the auth page
    const authForms = document.querySelector('.auth-forms');
    if (!authForms) {
      console.log('AuthManager: Form elements not found');
      return;
    }

    // Initialize form elements
    const signInForm = document.getElementById('signInForm');
    const joinForm = document.getElementById('joinForm');
    const signInTab = document.getElementById('signInTab');
    const joinTab = document.getElementById('joinTab');

    if (!signInForm || !joinForm || !signInTab || !joinTab) {
      console.log('AuthManager: Required form elements not found');
      return;
    }

    // Determine which form to show based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form') || 'sign-in';

    this.showForm(formType, signInForm, joinForm, signInTab, joinTab);
    this.initFormToggles(signInForm, joinForm, signInTab, joinTab);
    this.initFormSubmission(signInForm, joinForm);
  },

  showForm: function(formType, signInForm, joinForm, signInTab, joinTab) {
    if (!signInForm || !joinForm || !signInTab || !joinTab) return;

    if (formType === 'join') {
      // Show join form, hide sign-in form
      signInForm.classList.add('hidden');
      joinForm.classList.remove('hidden');

      // Update tabs
      signInTab.classList.remove('border-blue-600');
      joinTab.classList.add('border-blue-600');
    } else {
      // Show sign-in form, hide join form
      signInForm.classList.remove('hidden');
      joinForm.classList.add('hidden');

      // Update tabs
      signInTab.classList.add('border-blue-600');
      joinTab.classList.remove('border-blue-600');
    }
  },

  initFormToggles: function(signInForm, joinForm, signInTab, joinTab) {
    if (!signInTab || !joinTab) return;

    signInTab.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('sign-in', signInForm, joinForm, signInTab, joinTab);
      history.replaceState(null, '', 'auth.html?form=sign-in');
    });

    joinTab.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForm('join', signInForm, joinForm, signInTab, joinTab);
      history.replaceState(null, '', 'auth.html?form=join');
    });
  },

  initFormSubmission: function(signInForm, joinForm) {
    // Sign In form submission
    const signInButton = document.getElementById('signInButton');
    if (signInButton) {
      signInButton.addEventListener('click', () => {
        const email = document.getElementById('signInEmail')?.value;
        const password = document.getElementById('signInPassword')?.value;

        if (!email || !password) {
          this.showError('Please fill in all fields');
          return;
        }

        // In a real application, this would be an API call
        // For demonstration, we'll create a mock user
        const user = {
          name: email.split('@')[0],
          email: email,
          isAuthenticated: true
        };

        // Store user in localStorage
        localStorage.setItem('artAndYouUser', JSON.stringify(user));

        // Redirect to homepage
        window.location.href = '../index.html';
      });
    }

    // Join form submission
    const joinButton = document.getElementById('joinButton');
    if (joinButton) {
      joinButton.addEventListener('click', () => {
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('joinEmail')?.value;
        const password = document.getElementById('joinPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        const termsChecked = document.getElementById('terms')?.checked;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
          this.showError('Please fill in all fields');
          return;
        }

        if (password !== confirmPassword) {
          this.showError('Passwords do not match');
          return;
        }

        if (!termsChecked) {
          this.showError('Please accept the terms and conditions');
          return;
        }

        // In a real application, this would be an API call
        // For demonstration, we'll create a mock user
        const user = {
          name: firstName + ' ' + lastName,
          email: email,
          isAuthenticated: true
        };

        // Store user in localStorage
        localStorage.setItem('artAndYouUser', JSON.stringify(user));

        // Redirect to homepage
        window.location.href = '../index.html';
      });
    }
  },

  showError: function(message) {
    alert(message); // Simple error display for now
  }
};

// Initialize authentication when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.authManager.init();
});
