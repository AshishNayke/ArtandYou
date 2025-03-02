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