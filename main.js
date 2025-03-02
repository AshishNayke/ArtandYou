
// Main application coordinator
// Individual components are managed in their respective files:
// - navigation.js - Navigation features
// - hero.js - Hero section features
// - gallery.js - Gallery features 
// - auctions.js - Auction features 
// - artists.js - Artist features
// - forum.js - Forum features
// - footer.js - Footer features

// This improves code organization and follows DRY principles

// Define global modal utilities that might be used by multiple components
window.getModalType = function(type) {
  switch(type) {
    case 'topic':
      return 'topicModal';
    case 'artist':
      return 'artistModal';
    case 'auction':
      return 'auctionModal';
    default:
      return null;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('Main.js: Application initialized');
  
  // Initialize global error handling
  window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    // Prevent error notifications in production
    // event.preventDefault();
  });
  
  // Initialize core app functionality
  initApp();
});

function initApp() {
  // Check for required components
  const requiredComponents = [
    { name: 'gallery', element: document.querySelector('.gallery-grid') },
    { name: 'auctions', element: document.querySelector('.auction-grid') },
    { name: 'artists', element: document.getElementById('featuredArtists') },
    { name: 'forum', element: document.querySelector('.forum-topics') }
  ];
  
  // Log component availability for debugging
  requiredComponents.forEach(component => {
    if (component.element) {
      console.log(`Main.js: ${component.name} component found`);
    } else {
      console.log(`Main.js: ${component.name} component not found in current page`);
    }
  });
  
  // Check for component managers - use safe checking to avoid errors
  
  // Navigation component is now managed in navigation.js
  if (typeof window.navigationManager !== 'undefined') {
    console.log('Main.js: navigation component found (managed by NavigationManager)');
  } else {
    console.log('Main.js: navigation component not found or not yet initialized');
  }
  
  // Hero component is now managed in hero.js
  if (typeof window.heroManager !== 'undefined' && typeof window.heroManager.doesHeroExist === 'function') {
    console.log('Main.js: hero component found (managed by HeroManager)');
  } else {
    console.log('Main.js: hero component not found or not yet initialized');
  }
  
  // Footer component is now managed in footer.js
  if (typeof window.footerManager !== 'undefined') {
    console.log('Main.js: footer component found (managed by FooterManager)');
  } else {
    console.log('Main.js: footer component not found or not yet initialized');
  }
  
  // Initialize utilities
  initUtilities();
}

function initUtilities() {
  // Initialize back to top button
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopButton.classList.remove('hidden');
      } else {
        backToTopButton.classList.add('hidden');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Initialize safeguard for null elements
  window.safeSetProperty = function(element, property, value) {
    if (element) {
      if (property.includes('.')) {
        const props = property.split('.');
        let obj = element;
        for (let i = 0; i < props.length - 1; i++) {
          if (!obj[props[i]]) return;
          obj = obj[props[i]];
        }
        obj[props[props.length - 1]] = value;
      } else {
        element[property] = value;
      }
    }
  };
}
