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
