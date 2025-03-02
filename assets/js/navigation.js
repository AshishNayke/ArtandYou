
// Navigation functionality
// This file manages all navigation-related features

class NavigationManager {
  constructor() {
    this.menuButton = document.getElementById('menuToggle');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.closeMenuButton = document.getElementById('closeMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    console.log('NavigationManager: Initializing navigation');
    
    // Setup mobile menu toggle
    this.setupMobileMenu();
    
    // Highlight active nav item
    this.highlightActiveNavItem();
    
    // Setup smooth scrolling for anchor links
    this.setupSmoothScrolling();
  }
  
  setupMobileMenu() {
    if (this.menuButton && this.mobileMenu) {
      this.menuButton.addEventListener('click', () => {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    
    if (this.closeMenuButton && this.mobileMenu) {
      this.closeMenuButton.addEventListener('click', () => {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close menu when clicking on a link
    if (this.mobileMenu) {
      const mobileLinks = this.mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }
  
  highlightActiveNavItem() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    if (!this.navLinks) return;
    
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if the link href is in the current path
      if (currentPath.includes(href) && href !== '/' && href !== '#' && href !== 'index.html' && href !== '/index.html') {
        link.classList.add('text-blue-600', 'font-medium');
        link.classList.remove('text-gray-700');
      }
      
      // Special case for home page
      if ((currentPath === '/' || currentPath.includes('index.html')) && (href === 'index.html' || href === '/index.html' || href === '/')) {
        link.classList.add('text-blue-600', 'font-medium');
        link.classList.remove('text-gray-700');
      }
    });
  }
  
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      });
    });
  }
  
  // Public method to check if nav exists
  doesNavExist() {
    return true; // Navigation exists on every page
  }
}

// Initialize navigation manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Avoid duplicate initialization
  if (typeof window.navigationManager === 'undefined') {
    window.navigationManager = new NavigationManager();
  }
});
