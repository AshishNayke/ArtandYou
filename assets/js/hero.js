
// Hero section functionality
// This file manages all hero section features and animations

class HeroManager {
  constructor() {
    this.heroSection = document.getElementById('heroSection');
    this.init();
  }

  init() {
    console.log('HeroManager: Initializing hero section');
    
    if (!this.heroSection) {
      console.log('HeroManager: Hero section not found on this page');
      return;
    }

    // Initialize floating elements animation
    this.initFloatingElements();
    
    // Initialize any other hero-specific functionality
    this.setupHeroInteractions();
  }

  initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    if (floatingElements.length === 0) {
      return;
    }
    
    floatingElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 1;
      this.animateFloatingElement(element, speed);
    });
  }
  
  animateFloatingElement(element, speed) {
    // Random starting position
    const startX = Math.random() * 100; // percentage across the container
    const startY = Math.random() * 100; // percentage down the container
    
    element.style.left = `${startX}%`;
    element.style.top = `${startY}%`;
    
    // Animation function
    const animate = () => {
      const newX = startX + (Math.sin(Date.now() * 0.001 * speed) * 15);
      const newY = startY + (Math.cos(Date.now() * 0.001 * speed) * 15);
      
      element.style.transform = `translate(-50%, -50%) translate(${Math.sin(Date.now() * 0.0005) * 20}px, ${Math.cos(Date.now() * 0.0005) * 20}px)`;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  setupHeroInteractions() {
    // Add any interactive elements or event listeners specific to the hero section
    const heroButtons = this.heroSection.querySelectorAll('a');
    
    heroButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.classList.add('pulse');
      });
      
      button.addEventListener('mouseleave', () => {
        button.classList.remove('pulse');
      });
    });
  }
  
  // Public method to check if hero exists
  doesHeroExist() {
    return !!this.heroSection;
  }
}

// Initialize hero manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Avoid duplicate initialization
  if (typeof window.heroManager === 'undefined') {
    window.heroManager = new HeroManager();
  }
});
