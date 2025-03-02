// Main.js is now cleaned up from auction functionality
// Auction functionality is now in auctions.js

// Gallery Management now fully handled in gallery.js

// Utility functions
window.utils = {
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    formatTimeRemaining: (endTime) => {
        const total = new Date(endTime) - new Date();
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return { total, hours, minutes, seconds };
    }
};

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    const loadingSpinner = document.querySelector('.loading-spinner');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const backToTopButton = document.getElementById('backToTop');

    // Ensure spinner hides even if load takes too long
    setTimeout(() => {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) spinner.style.display = 'none';
    }, 3000);

    if (loadingSpinner) {
        window.addEventListener('load', function() {
            document.querySelector('.loading-spinner').style.display = 'none';
        });
    }

    // Mobile Menu Handler
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenuBtn = document.getElementById('closeMenu');
        const menuLinks = mobileMenu?.querySelectorAll('a');

        const handleClose = () => {
            mobileMenu?.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuLinks?.forEach((link, index) => {
                link.style.transitionDelay = '0s';
            });
        };

        const handleOpen = () => {
            mobileMenu?.classList.add('active');
            document.body.classList.add('menu-open');
            menuLinks?.forEach((link, index) => {
                link.style.transitionDelay = `${0.2 + index * 0.1}s`;
            });
        };

        menuToggle?.addEventListener('click', () => {
            if (mobileMenu?.classList.contains('active')) {
                handleClose();
            } else {
                handleOpen();
            }
        });

        closeMenuBtn?.addEventListener('click', handleClose);

        // Close mobile menu on link click
        menuLinks?.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const menuLinks = mobileMenu.querySelectorAll('a');
                menuLinks.forEach((link, i) => {
                    setTimeout(() => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateX(30px)';
                    }, i * 100);
                });

                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }, menuLinks.length * 100 + 100);
            });
        });


        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                handleClose();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && mobileMenu?.classList.contains('active')) {
                handleClose();
            }
        });
    });

    // Back to top button
    if (backToTopButton) {
        const handleScroll = () => {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.classList.add('hidden');
            }
        };

        window.addEventListener('scroll', handleScroll);

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (!img.src && img.dataset.src) {
            img.src = img.dataset.src;
        }

        img.onerror = () => {
            // Only replace with altlogo if the original source wasn't already altlogo
            if (!img.src.includes('altlogo.jpg')) {
                img.src = '../assets/images/logo/altlogo.jpg';
                img.alt = 'Image failed to load';
            }
        };

        img.onload = () => {
            img.classList.remove('loading-skeleton');
        };
    });


    // Gallery Management fully handled in gallery.js

    // Work in Progress Popup
    function showWorkInProgressPopup() {
        const popup = document.createElement('div');
        popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-8 py-4 rounded-lg shadow-xl z-50 animate__animated animate__fadeIn';
        popup.innerHTML = `
            <div class="text-xl font-bold mb-2">Work in Progress</div>
            <div class="text-gray-600">This feature is currently under development.</div>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add('animate__fadeOut');
            setTimeout(() => popup.remove(), 500);
        }, 2000);
    }

    // Add click handlers for interactive elements
    document.addEventListener('click', (e) => {
        const target = e.target;

        // No sign in message for quick buy and place bid buttons
        if (target.classList.contains('buy-button') || target.classList.contains('bid-button')) {
            e.preventDefault();
            // Notification removed
            return;
        }

        // No work in progress message for art card interactions
        if (target.closest('.art-card') || target.closest('.auction-item') || target.closest('.artist-card')) {
            e.preventDefault();
            // Work in progress message removedessPopup();
        }
    });

    // Search and Filter Functionality now handled in gallery.js

    // Auction System moved to auctions.js

    // Back to Top Button
    class BackToTop {
        constructor() {
            this.button = document.getElementById('backToTop');
            this.init();
        }

        init() {
            window.addEventListener('scroll', utils.throttle(() => this.toggleButton(), 100));
            this.button?.addEventListener('click', (e) => this.scrollToTop(e));
        }

        toggleButton() {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }

        scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Newsletter Subscription
    class Newsletter {
        constructor() {
            this.form = document.querySelector('.newsletter-form');
            this.init();
        }

        init() {
            this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        async handleSubmit(e) {
            e.preventDefault();
            const email = this.form.querySelector('input[type="email"]').value;
            const submitButton = this.form.querySelector('button[type="submit"]');

            // Validate email
            if (!this.validateEmail(email)) {
                this.showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="loading-spinner mx-auto"></div>';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Success
                this.showMessage('Thank you for subscribing!', 'success');
                this.form.reset();
            } catch (error) {
                this.showMessage('An error occurred. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
            }
        }

        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[s@]+$/.test(email);
        }

        showMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${type} animate__animated animate__fadeIn`;
            messageElement.textContent = message;

            this.form.appendChild(messageElement);

            setTimeout(() => {
                messageElement.remove();
            }, 3000);
        }
    }


    // Initialize smooth scroll animations
    const initSmoothScrolling = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        document.querySelectorAll('.art-card, .artist-card, .auction-item').forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    };

    // Initialize everything when DOM is loaded
    // Gallery manager initialized in gallery.js
    new BackToTop();
    new Newsletter();

    initSmoothScrolling();


    // Initialize smooth fade-in animations
    const initFadeInAnimations = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            el.classList.add('fade');
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.8s ease-in-out';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(el);
        });
    };

    // Initialize everything when DOM is loaded
    initFadeInAnimations();

    // Gallery arrangement now handled in gallery.js

    // Auction items arrangement is now handled in auctions.js

    // Artist cards arrangement is now handled in artists.js

    // Add fade-in class to elements on scroll
    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.5 });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
        observer1.observe(element);
    });


    // Navigation and Mobile Menu
    class Navigation {
        constructor() {
            this.mobileMenuButton = document.querySelector('[aria-label="Menu"]');
            this.mobileMenu = document.querySelector('.mobile-menu');
            this.header = document.querySelector('nav');
            this.lastScroll = 0;
            this.init();
        }

        init() {
            // Mobile menu toggle
            this.mobileMenuButton?.addEventListener('click', () => this.toggleMobileMenu());

            // Close menu button
            const closeMenuBtn = document.getElementById('closeMenu');
            closeMenuBtn?.addEventListener('click', () => this.closeMobileMenu());

            // Hide header on scroll down, show on scroll up
            window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 100));

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024) {
                    this.closeMobileMenu();
                }
            });

            // Handle mobile menu links
            const mobileMenuLinks = this.mobileMenu?.querySelectorAll('a');
            mobileMenuLinks?.forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }

        toggleMobileMenu() {
            const isOpening = !this.mobileMenu.classList.contains('active');
            this.mobileMenu.classList.toggle('active');
            document.body.style.overflow = isOpening ? 'hidden' : '';

            // Animate menu items
            const menuItems = this.mobileMenu.querySelectorAll('a');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = isOpening ? `${0.1 * index}s` : '0s';
            });
        }

        closeMobileMenu() {
            this.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                this.header.classList.remove('scroll-up');
                return;
            }

            if (currentScroll > this.lastScroll && !this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-up');
                this.header.classList.add('scroll-down');
            } else if (currentScroll < this.lastScroll && this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-down');
                this.header.classList.add('scroll-up');
            }

            this.lastScroll = currentScroll;
        }

    }
    new Navigation();

    // Initialize animation observer for all cards
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all cards for animation
    document.querySelectorAll('.art-card, .auction-item, .artist-card').forEach(card => {
        animationObserver.observe(card);
    });
});
// Modal functionality
class Modal {
    constructor() {
        this.modal = document.getElementById('itemModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalArtist = document.getElementById('modalArtist');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalPrice = document.getElementById('modalPrice');
        this.modalBidInfo = document.getElementById('modalBidInfo');
        this.modalAction = document.getElementById('modalAction');
        this.currentItems = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        document.querySelector('.modal-close').onclick = () => this.close();
        document.querySelector('.prev-btn').onclick = () => this.navigate(-1);
        document.querySelector('.next-btn').onclick = () => this.navigate(1);
    }

    open(items, index = 0) {
        this.currentItems = items;
        this.currentIndex = index;
        this.updateContent();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.currentItems.length) % this.currentItems.length;
        this.updateContent();
    }

    updateContent() {
        const item = this.currentItems[this.currentIndex];
        this.modalImage.src = item.image;
        this.modalTitle.textContent = item.title;
        this.modalArtist.textContent = `by ${item.artist}`;
        this.modalDescription.textContent = item.description || '';

        if (item.type === 'auction') {
            this.modalPrice.innerHTML = `Current Bid: <strong>${item.currentBid}</strong>`;
            this.modalBidInfo.style.display = 'block';
            this.modalBidInfo.innerHTML = `<div>Starting Bid: ${item.startingBid}</div>
                                    <div>Active Bids: ${item.activeBids}</div>`;
            this.modalAction.textContent = 'Place Bid';
        } else {
            this.modalPrice.innerHTML = item.price ? `Price: <strong>${item.price}</strong>` : '';
            this.modalBidInfo.style.display = 'none';
            this.modalAction.textContent = item.type === 'gallery' ? 'Purchase' : 'View Profile';
        }
    }
}

const modal = new Modal();

// Initialize modal triggers
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const auctionItems = document.querySelectorAll('.art-card');
    const artistCards = document.querySelectorAll('.artist-card');

    galleryItems.forEach((item, index) => {
        item.onclick = () => modal.open(galleryData, index);
    });

    auctionItems.forEach((item, index) => {
        item.onclick = () => modal.open(auctionItems, index);
    });

    artistCards.forEach((item, index) => {
        item.onclick = () => modal.open(artistData, index);
    });
});

// Modal Management
class ModalManager {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal?.querySelector('.modal-close');
        this.prevBtn = this.modal?.querySelector('.prev-btn');
        this.nextBtn = this.modal?.querySelector('.next-btn');
        this.init();
    }

    init() {
        if (!this.modal) return;

        this.closeBtn.onclick = () => this.close();

        window.onclick = (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        };

        if (this.prevBtn) {
            this.prevBtn.onclick = () => this.navigateGallery('prev');
        }

        if (this.nextBtn) {
            this.nextBtn.onclick = () => this.navigateGallery('next');
        }
    }

    open() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    navigateGallery(direction) {
        // Navigation logic to be implemented
        console.log('Navigate:', direction);
    }
}

// Make sure to handle clicks properly
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const target = e.target;
        const artCard = target.closest('.art-card');
        const viewDetailsBtn = target.closest('button[class*="view-details"]');
        const buyButton = target.closest('.buy-button');
        const bidButton = target.closest('.bid-button');


        if (viewDetailsBtn || (artCard && target.tagName !== 'BUTTON')) {
            const modalType = getModalType(artCard);
            const modalManager = new ModalManager(modalType);
            modalManager.open();
            return;
        }


        if (buyButton) {
            handleBuyButton(buyButton);
            return;
        }


        if (bidButton) {
            handleBidButton(bidButton);
            return;
        }
    });
});

// Initialize modal managers
const galleryModal = new ModalManager('galleryModal');
const auctionModal = new ModalManager('auctionModal');
// Artist modal initialization moved to artists.js

// No popup for work in progress
function showWorkInProgressPopup() {
    // Function intentionally empty to disable work in progress notifications
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for art cards and view-details buttons
    document.addEventListener('click', (e) => {
        const target = e.target;
        const artCard = target.closest('.art-card');
        const viewDetailsBtn = target.closest('button[class*="view-details"]');
        const buyButton = target.closest('.buy-button');
        const bidButton = target.closest('.bid-button');


        // Handle defined functionality first
        if (buyButton) {
            e.preventDefault();
            console.log('Buy button clicked - disabled');
            return;
        }


        if (bidButton) {
            e.preventDefault();
            console.log('Bid button clicked - disabled');
            return;
        }


        if (viewDetailsBtn) {
            const modalManager = new ModalManager(getModalType(artCard));
            modalManager.open();
            return;
        }


        // No work in progress message for undefined functionality
        if (artCard && !buyButton && !bidButton && !viewDetailsBtn) {
            // Work in progress message removed
        }
    });

    function handleBuyButton(button) {
        // Function intentionally empty to disable sign in requirement notification
    }

    function handleBidButton(button) {
        // Function intentionally empty to disable sign in requirement notification
    }

    function getModalType(artCard) {
        if (artCard.classList.contains('auction-item')) return 'auctionModal';
        if (artCard.classList.contains('artist-card')) return 'artistModal';
        return 'galleryModal';
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.onscroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        };

        backToTopButton.onclick = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }
});
// Component initialization is now handled in the individual component files
// This avoids duplicate component registration and initialization errors
// Bid functionality now handled in auctions.js