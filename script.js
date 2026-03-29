/**
 * HostelNest Nepal - Student Housing Platform
 * JavaScript for Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initCountUpAnimation();
    initSearchTabs();
    initFilterTags();
    initFavoriteButtons();
    initViewToggle();
    initSearchForm();
    initScrollReveal();
    initPopup();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Count Up Animation for Numbers
 */
function initCountUpAnimation() {
    const countElements = document.querySelectorAll('.stat-number[data-count]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetCount = parseFloat(element.getAttribute('data-count'));
                    animateCount(element, targetCount);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });
        
        countElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        countElements.forEach(element => {
            const targetCount = parseFloat(element.getAttribute('data-count'));
            animateCount(element, targetCount);
        });
    }
}

/**
 * Animate Counter from 0 to target
 */
function animateCount(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    const isDecimal = target % 1 !== 0;
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (target - startValue) * easeOutQuart;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

/**
 * Search Tabs Functionality
 */
function initSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Filter Tags Functionality
 */
function initFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Visual feedback
            if (this.classList.contains('active')) {
                this.style.background = 'var(--primary-color)';
                this.style.color = 'var(--white)';
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });
}

/**
 * Favorite Buttons Functionality
 */
function initFavoriteButtons() {
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--accent-pink)';
                
                // Add animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });
}

/**
 * Budget Calculator Functionality (NPR)
 */
function initBudgetCalculator() {
    const inputs = document.querySelectorAll('.calc-input input');
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateBudget);
    });
    
    // Initial calculation
    calculateBudget();
}

function calculateBudget() {
    const rent = parseFloat(document.getElementById('rentInput')?.value) || 0;
    const food = parseFloat(document.getElementById('foodInput')?.value) || 0;
    const transport = parseFloat(document.getElementById('transportInput')?.value) || 0;
    const utilities = parseFloat(document.getElementById('utilitiesInput')?.value) || 0;
    const personal = parseFloat(document.getElementById('personalInput')?.value) || 0;
    
    const total = rent + food + transport + utilities + personal;
    const discount = total * 0.1;
    const final = total - discount;
    
    const totalEl = document.getElementById('totalBudget');
    const finalEl = document.getElementById('finalBudget');
    
    if (totalEl) totalEl.textContent = `Rs. ${total.toLocaleString()}`;
    if (finalEl) finalEl.textContent = `Rs. ${final.toLocaleString()}`;
    
    // Update chart ring
    const chartRing = document.querySelector('.chart-ring');
    if (chartRing && total > 0) {
        const percentages = [
            (rent / total) * 100,
            (food / total) * 100,
            (transport / total) * 100,
            (utilities / total) * 100,
            (personal / total) * 100
        ];
        
        let cumulative = 0;
        const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];
        
        chartRing.style.background = `conic-gradient(
            ${colors[0]} 0deg ${percentages[0] * 3.6}deg,
            ${colors[1]} ${percentages[0] * 3.6}deg ${(percentages[0] + percentages[1]) * 3.6}deg,
            ${colors[2]} ${(percentages[0] + percentages[1]) * 3.6}deg ${(percentages[0] + percentages[1] + percentages[2]) * 3.6}deg,
            ${colors[3]} ${(percentages[0] + percentages[1] + percentages[2]) * 3.6}deg ${(percentages[0] + percentages[1] + percentages[2] + percentages[3]) * 3.6}deg,
            ${colors[4]} ${(percentages[0] + percentages[1] + percentages[2] + percentages[3]) * 3.6}deg 360deg
        )`;
    }
}

/**
 * View Toggle Functionality
 */
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-toggle button');
    const listingsGrid = document.querySelector('.listings-grid, .hostels-grid');
    
    if (!viewBtns.length || !listingsGrid) return;
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            
            if (view === 'list') {
                listingsGrid.classList.add('list-view');
            } else {
                listingsGrid.classList.remove('list-view');
            }
        });
    });
}

/**
 * Search Form Functionality
 */
function initSearchForm() {
    const searchBtn = document.querySelector('.btn-search');
    const locationInput = document.getElementById('locationInput');
    const priceRange = document.getElementById('priceRange');
    const roomType = document.getElementById('roomType');
    const moveInDate = document.getElementById('moveInDate');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchData = {
                location: locationInput?.value || '',
                priceRange: priceRange?.value || '',
                roomType: roomType?.value || '',
                moveInDate: moveInDate?.value || ''
            };
            
            // Get active filter tags
            const activeFilters = [];
            document.querySelectorAll('.filter-tag.active').forEach(tag => {
                activeFilters.push(tag.getAttribute('data-filter'));
            });
            
            // Simulate search (in real app, this would make API call)
            console.log('Searching with:', searchData, 'Filters:', activeFilters);
            
            // Show feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                
                // Scroll to listings
                const listingsSection = document.getElementById('search');
                if (listingsSection) {
                    listingsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);
        });
    }
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.hostel-card, .feature-card, .testimonial-card, .deal-card, .neighborhood-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('revealed');
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Sort Options Functionality
 */
function initSortOptions() {
    const sortSelect = document.getElementById('sortBy');
    const listingsGrid = document.querySelector('.listings-grid');
    const hostelCards = Array.from(listingsGrid.querySelectorAll('.hostel-card'));
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            
            hostelCards.sort((a, b) => {
                switch (sortBy) {
                    case 'price-low':
                        return getPrice(a) - getPrice(b);
                    case 'price-high':
                        return getPrice(b) - getPrice(a);
                    case 'rating':
                        return getRating(b) - getRating(a);
                    default:
                        return 0;
                }
            });
            
            hostelCards.forEach(card => {
                listingsGrid.appendChild(card);
            });
        });
    }
}

function getPrice(card) {
    const priceEl = card.querySelector('.current-price');
    return priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g, '')) : 0;
}

function getRating(card) {
    const ratingEl = card.querySelector('.hostel-rating span');
    return ratingEl ? parseFloat(ratingEl.textContent) : 0;
}

/**
 * Keyboard Accessibility
 */
function initKeyboardNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('tabindex', '0');
        
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('tabindex', '0');
    });
}

/**
 * Debounce Function for Performance
 */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Export functions
window.HostelNest = {
    initMobileMenu,
    initSmoothScroll,
    initHeaderScroll,
    initCountUpAnimation,
    initSearchTabs,
    initFilterTags,
    initFavoriteButtons,
    initViewToggle,
    initSearchForm,
    initPopup
};

/**
 * Modern Login/Signup Popup
 */
function initPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const popupClose = document.getElementById('popupClose');
    const switchBtns = document.querySelectorAll('.auth-switch-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFooterText = document.getElementById('loginFooterText');
    const signupFooterText = document.getElementById('signupFooterText');
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginPassword = document.getElementById('loginPassword');
    const signupPassword = document.getElementById('signupPassword');
    const signupConfirm = document.getElementById('signupConfirm');

    if (!popupOverlay) return;

    // Open popup functions
    function openPopup(tab) {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (tab === 'signup') {
            switchToSignupForm();
        } else {
            switchToLoginForm();
        }
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function switchToLoginForm() {
        // Update switch buttons
        switchBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === 'login') {
                btn.classList.add('active');
            }
        });
        
        // Update forms
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        
        // Update footer text
        if (loginFooterText) loginFooterText.parentElement.style.display = 'block';
        if (signupFooterText) signupFooterText.parentElement.style.display = 'none';
    }

    function switchToSignupForm() {
        // Update switch buttons
        switchBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === 'signup') {
                btn.classList.add('active');
            }
        });
        
        // Update forms
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        
        // Update footer text
        if (loginFooterText) loginFooterText.parentElement.style.display = 'none';
        if (signupFooterText) signupFooterText.parentElement.style.display = 'block';
    }

    // Event listeners - Open popup
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup('login');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup('signup');
        });
    }

    // Event listener - Close popup
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }

    // Close on overlay click
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    // Switch button clicking
    switchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.mode === 'login') {
                switchToLoginForm();
            } else {
                switchToSignupForm();
            }
        });
    });

    // Footer links
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignupForm();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLoginForm();
        });
    }

    // Password toggle visibility
    if (loginToggle && loginPassword) {
        loginToggle.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            this.classList.toggle('active');
        });
    }

    if (signupToggle && signupPassword) {
        signupToggle.addEventListener('click', function() {
            const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            signupPassword.setAttribute('type', type);
            this.classList.toggle('active');
        });
    }

    // Form validation - Login
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login (replace with actual API call)
            console.log('Login attempt:', { email, password });
            alert('Login functionality would connect to your backend!');
        });
    }

    // Form validation - Signup
    const signupFormSubmit = document.getElementById('signupFormSubmit');
    if (signupFormSubmit) {
        signupFormSubmit.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            if (!name || !email || !phone || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            if (!agreeTerms) {
                alert('Please agree to the Terms and Privacy Policy');
                return;
            }
            
            // Simulate signup (replace with actual API call)
            console.log('Signup attempt:', { name, email, phone, password });
            alert('Signup functionality would connect to your backend!');
        });
    }

    // Social login buttons
    const socialBtns = document.querySelectorAll('.auth-social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Apple';
            console.log(provider + ' login clicked');
            alert(provider + ' login would connect to OAuth!');
        });
    });
}
