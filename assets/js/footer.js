
// This file contains footer-specific functionality
// It's separated from main.js to improve organization and maintainability

document.addEventListener('DOMContentLoaded', function() {
  // Initialize newsletter subscription
  initializeNewsletter();
  
  // Initialize social media links
  initializeSocialLinks();
});

// Newsletter subscription functionality
function initializeNewsletter() {
  const newsletterForm = document.querySelector('footer form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button[type="submit"]');
      
      if (!emailInput.value || !validateEmail(emailInput.value)) {
        showNewsletterMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = 'Subscribing...';
      
      // Simulate API call
      setTimeout(() => {
        showNewsletterMessage('Thank you for subscribing!', 'success');
        emailInput.value = '';
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }, 1500);
    });
  }
}

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show newsletter feedback message
function showNewsletterMessage(message, type) {
  const footer = document.querySelector('footer');
  const messageEl = document.createElement('div');
  
  messageEl.className = `fixed bottom-24 right-8 py-3 px-6 rounded-lg text-white ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  } animate__animated animate__fadeIn`;
  
  messageEl.textContent = message;
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.classList.remove('animate__fadeIn');
    messageEl.classList.add('animate__fadeOut');
    setTimeout(() => {
      messageEl.remove();
    }, 500);
  }, 3000);
}

// Initialize social media link interactions
function initializeSocialLinks() {
  const socialLinks = document.querySelectorAll('footer .flex.space-x-4 a');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.2)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    link.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Handle quick links interactions
document.addEventListener('DOMContentLoaded', function() {
  const quickLinks = document.querySelectorAll('footer ul.space-y-4 a');
  
  quickLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(5px)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    link.addEventListener('mouseout', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(0)';
      }
    });
  });
});
