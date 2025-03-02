
// Auth Manager - Handles authentication forms and logic for Art&You marketplace
const AuthManager = {
  // DOM elements
  elements: {
    signInTab: null,
    joinTab: null,
    signInForm: null,
    joinForm: null,
    signInButton: null,
    joinButton: null,
    // Form fields
    signInEmail: null,
    signInPassword: null,
    joinEmail: null,
    joinPassword: null,
    confirmPassword: null,
    firstName: null,
    lastName: null,
    termsCheckbox: null
  },
  
  // Initialize the auth manager
  init() {
    console.log('AuthManager: Initializing authentication system');
    
    // Get query parameters to determine which form to show
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    
    // Initialize DOM elements
    this.initElements();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Show the appropriate form based on URL parameter
    if (formType === 'join') {
      this.showJoinForm();
    } else {
      this.showSignInForm();
    }
  },
  
  // Initialize DOM elements
  initElements() {
    // Get tab elements
    this.elements.signInTab = document.getElementById('signInTab');
    this.elements.joinTab = document.getElementById('joinTab');
    
    // Get form containers
    this.elements.signInForm = document.getElementById('signInForm');
    this.elements.joinForm = document.getElementById('joinForm');
    
    // Get buttons
    this.elements.signInButton = document.getElementById('signInButton');
    this.elements.joinButton = document.getElementById('joinButton');
    
    // Get form fields
    this.elements.signInEmail = document.getElementById('signInEmail');
    this.elements.signInPassword = document.getElementById('signInPassword');
    this.elements.joinEmail = document.getElementById('joinEmail');
    this.elements.joinPassword = document.getElementById('joinPassword');
    this.elements.confirmPassword = document.getElementById('confirmPassword');
    this.elements.firstName = document.getElementById('firstName');
    this.elements.lastName = document.getElementById('lastName');
    this.elements.termsCheckbox = document.getElementById('terms');
  },
  
  // Initialize event listeners
  initEventListeners() {
    // Only add listeners if elements exist
    if (this.elements.signInTab) {
      this.elements.signInTab.addEventListener('click', () => this.showSignInForm());
    }
    
    if (this.elements.joinTab) {
      this.elements.joinTab.addEventListener('click', () => this.showJoinForm());
    }
    
    if (this.elements.signInButton) {
      this.elements.signInButton.addEventListener('click', () => this.handleSignIn());
    }
    
    if (this.elements.joinButton) {
      this.elements.joinButton.addEventListener('click', () => this.handleJoin());
    }
    
    // Add form validation for input fields
    if (this.elements.signInEmail) {
      this.elements.signInEmail.addEventListener('blur', (e) => this.validateEmail(e.target));
    }
    
    if (this.elements.joinEmail) {
      this.elements.joinEmail.addEventListener('blur', (e) => this.validateEmail(e.target));
    }
    
    if (this.elements.joinPassword) {
      this.elements.joinPassword.addEventListener('keyup', () => this.validatePasswordMatch());
    }
    
    if (this.elements.confirmPassword) {
      this.elements.confirmPassword.addEventListener('keyup', () => this.validatePasswordMatch());
    }
  },
  
  // Show sign in form
  showSignInForm() {
    // Update URL without refreshing
    this.updateUrl('sign-in');
    
    // Update UI
    this.elements.signInTab.classList.add('border-blue-600', 'text-blue-600');
    this.elements.joinTab.classList.remove('border-blue-600', 'text-blue-600');
    
    this.elements.signInForm.classList.remove('hidden');
    this.elements.joinForm.classList.add('hidden');
  },
  
  // Show join form
  showJoinForm() {
    // Update URL without refreshing
    this.updateUrl('join');
    
    // Update UI
    this.elements.joinTab.classList.add('border-blue-600', 'text-blue-600');
    this.elements.signInTab.classList.remove('border-blue-600', 'text-blue-600');
    
    this.elements.joinForm.classList.remove('hidden');
    this.elements.signInForm.classList.add('hidden');
  },
  
  // Update URL with form type
  updateUrl(formType) {
    const url = new URL(window.location);
    url.searchParams.set('form', formType);
    window.history.pushState({}, '', url);
  },
  
  // Handle sign in form submission
  handleSignIn() {
    // Get form values
    const email = this.elements.signInEmail.value;
    const password = this.elements.signInPassword.value;
    
    // Validate form
    if (!this.validateEmail(this.elements.signInEmail)) {
      this.showError(this.elements.signInEmail, 'Please enter a valid email address');
      return;
    }
    
    if (!password) {
      this.showError(this.elements.signInPassword, 'Please enter your password');
      return;
    }
    
    // For now, simulate successful authentication (would connect to backend in production)
    this.simulateAuth(email);
  },
  
  // Handle join form submission
  handleJoin() {
    // Get form values
    const firstName = this.elements.firstName.value;
    const lastName = this.elements.lastName.value;
    const email = this.elements.joinEmail.value;
    const password = this.elements.joinPassword.value;
    const confirmPassword = this.elements.confirmPassword.value;
    const termsAccepted = this.elements.termsCheckbox.checked;
    
    // Validate form
    let isValid = true;
    
    if (!firstName) {
      this.showError(this.elements.firstName, 'Please enter your first name');
      isValid = false;
    }
    
    if (!lastName) {
      this.showError(this.elements.lastName, 'Please enter your last name');
      isValid = false;
    }
    
    if (!this.validateEmail(this.elements.joinEmail)) {
      this.showError(this.elements.joinEmail, 'Please enter a valid email address');
      isValid = false;
    }
    
    if (!password || password.length < 8) {
      this.showError(this.elements.joinPassword, 'Password must be at least 8 characters');
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      this.showError(this.elements.confirmPassword, 'Passwords do not match');
      isValid = false;
    }
    
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // For now, simulate successful registration (would connect to backend in production)
    this.simulateAuth(email);
  },
  
  // Validate email format
  validateEmail(inputElement) {
    const email = inputElement.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      inputElement.classList.add('border-red-500');
      return false;
    } else {
      inputElement.classList.remove('border-red-500');
      return true;
    }
  },
  
  // Validate password match
  validatePasswordMatch() {
    const password = this.elements.joinPassword.value;
    const confirmPassword = this.elements.confirmPassword.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      this.elements.confirmPassword.classList.add('border-red-500');
      return false;
    } else {
      this.elements.confirmPassword.classList.remove('border-red-500');
      return true;
    }
  },
  
  // Show error on form field
  showError(element, message) {
    element.classList.add('border-red-500');
    
    // Check if error message already exists
    let errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = message;
    } else {
      // Create new error message
      errorElement = document.createElement('p');
      errorElement.classList.add('error-message', 'text-red-500', 'text-xs', 'mt-1');
      errorElement.textContent = message;
      element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
  },
  
  // Simulate authentication (would be replaced with actual backend auth in production)
  simulateAuth(email) {
    // Show loading state
    document.querySelector('.loading-spinner').style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
      // Store user info in localStorage (in a real app, you'd use cookies or more secure methods)
      const user = {
        email: email,
        name: email.split('@')[0],
        isAuthenticated: true,
        authToken: 'sample-token-' + Math.random().toString(36).substring(2)
      };
      
      localStorage.setItem('artAndYouUser', JSON.stringify(user));
      
      // Redirect to home page
      window.location.href = '../index.html';
    }, 1500);
  }
};

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  AuthManager.init();
});
