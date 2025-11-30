// ========================================
// Hostel Management System - Main JavaScript
// ========================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeFormValidation();
    initializeFormEnhancements();
    initializeDatePicker();
    initializeRoomCards();
    initializeNavigation();
    initializeAnimations();
    initializeTheme();
}

// ========================================
// 1. FORM VALIDATION
// ========================================

function initializeFormValidation() {
    const bookingForm = document.querySelector('form[action*="book"]');
    if (bookingForm) {
        bookingForm.addEventListener('submit', validateBookingForm);
    }

    const loginForm = document.querySelector('form');
    if (loginForm && !bookingForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
}

function validateBookingForm(e) {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const checkin = document.getElementById('checkin')?.value;
    const checkout = document.getElementById('checkout')?.value;

    // Email validation
    if (email && !isValidEmail(email)) {
        e.preventDefault();
        showNotification('❌ Please enter a valid email address', 'error');
        return false;
    }

    // Phone validation
    if (phone && !isValidPhone(phone)) {
        e.preventDefault();
        showNotification('❌ Please enter a valid phone number', 'error');
        return false;
    }

    // Date validation
    if (checkin && checkout) {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        if (checkoutDate <= checkinDate) {
            e.preventDefault();
            showNotification('❌ Check-out date must be after check-in date', 'error');
            return false;
        }

        // Check if dates are in the future
        if (checkinDate < new Date()) {
            e.preventDefault();
            showNotification('❌ Check-in date must be in the future', 'error');
            return false;
        }
    }

    return true;
}

function validateLoginForm(e) {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!username || !password) {
        e.preventDefault();
        showNotification('❌ Please fill in all fields', 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ========================================
// 2. FORM ENHANCEMENTS
// ========================================

function initializeFormEnhancements() {
    // Add floating labels effect
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = '#667eea';
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.borderColor = '';
        });

        // Show filled state
        input.addEventListener('input', function() {
            if (this.value) {
                this.style.background = 'white';
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }
        });
    });

    // Character count for textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
        const charCounter = document.createElement('div');
        charCounter.style.cssText = `
            font-size: 12px;
            color: #999;
            margin-top: -8px;
            margin-bottom: 15px;
            text-align: right;
        `;
        textarea.parentElement.appendChild(charCounter);

        textarea.addEventListener('input', function() {
            charCounter.textContent = `${this.value.length} / 500`;
        });
    }
}

// ========================================
// 3. DATE PICKER ENHANCEMENTS
// ========================================

function initializeDatePicker() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        checkinInput.value = today;

        // Add date changed event
        checkinInput.addEventListener('change', function() {
            if (checkoutInput) {
                const checkinDate = new Date(this.value);
                const minCheckoutDate = new Date(checkinDate);
                minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
                checkoutInput.min = minCheckoutDate.toISOString().split('T')[0];
                checkoutInput.value = minCheckoutDate.toISOString().split('T')[0];

                // Calculate and display price
                calculateStayDuration();
            }
        });
    }

    if (checkoutInput) {
        checkoutInput.addEventListener('change', calculateStayDuration);
    }
}

function calculateStayDuration() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomtypeSelect = document.getElementById('roomtype');

    if (checkinInput?.value && checkoutInput?.value && roomtypeSelect?.value) {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

        // Price per night (you can adjust these)
        const prices = {
            'single': 50,
            'double': 80,
            'dorm': 30,
            'suite': 150
        };

        const pricePerNight = prices[roomtypeSelect.value] || 50;
        const totalPrice = nights * pricePerNight;

        // Display price if element exists
        let priceDisplay = document.getElementById('priceDisplay');
        if (!priceDisplay) {
            priceDisplay = document.createElement('div');
            priceDisplay.id = 'priceDisplay';
            priceDisplay.style.cssText = `
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                font-size: 18px;
                font-weight: 700;
                text-align: center;
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
                animation: slideDown 0.5s ease;
            `;
            checkoutInput.parentElement.parentElement.insertBefore(priceDisplay, checkoutInput.parentElement.nextSibling);
        }

        priceDisplay.innerHTML = `
            <div>📅 Total Stay: <strong>${nights} night${nights !== 1 ? 's' : ''}</strong></div>
            <div style="margin-top: 10px;">💰 Total Price: <strong>$${totalPrice.toFixed(2)}</strong></div>
            <div style="font-size: 14px; margin-top: 5px; opacity: 0.9;">$${pricePerNight}/night</div>
        `;
    }
}

// ========================================
// 4. ROOM CARDS INTERACTION
// ========================================

function initializeRoomCards() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Add animation delay
        item.style.animationDelay = `${index * 0.1}s`;

        // Add click to select room
        item.addEventListener('click', function() {
            const roomNumber = this.querySelector('h3')?.textContent;
            const status = this.querySelector('.room-status')?.textContent;
            
            if (status?.includes('AVAILABLE')) {
                showNotification(`✅ ${roomNumber} selected!`, 'success');
                this.style.borderColor = '#667eea';
                this.style.borderWidth = '2px';
            } else {
                showNotification(`❌ ${roomNumber} is not available`, 'error');
            }
        });

        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========================================
// 5. NAVIGATION & MOBILE MENU
// ========================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide navbar
            if (navbar) navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            if (navbar) navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Add shadow on scroll
        if (scrollTop > 50) {
            if (navbar) navbar.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
        } else {
            if (navbar) navbar.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        }
    });

    // Add smooth navbar transition
    if (navbar) {
        navbar.style.transition = 'all 0.3s ease';
    }
}

// ========================================
// 6. ANIMATIONS & EFFECTS
// ========================================

function initializeAnimations() {
    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-reveal attribute
    document.querySelectorAll('h2, table, form, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Parallax scroll effect for hero
    window.addEventListener('scroll', function() {
        const h1 = document.querySelector('h1');
        if (h1) {
            const scrollPosition = window.pageYOffset;
            h1.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// ========================================
// 7. THEME TOGGLE (Optional - Light/Dark)
// ========================================

function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// ========================================
// 8. NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 10px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)' : 
                    'linear-gradient(135deg, #17a2b8 0%, #20c997 100%)'}
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Add animation keyframes if not already present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ========================================
// 9. UTILITY FUNCTIONS
// ========================================

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getTimeRemaining(date) {
    const now = new Date();
    const end = new Date(date);
    const diff = end - now;

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

// ========================================
// 10. KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
    // Alt + B: Focus on booking form
    if (e.altKey && e.code === 'KeyB') {
        e.preventDefault();
        document.getElementById('name')?.focus();
        showNotification('🎯 Booking form focused', 'info');
    }

    // Alt + L: Go to login
    if (e.altKey && e.code === 'KeyL') {
        e.preventDefault();
        window.location.href = '/login/';
    }

    // Escape: Close notifications
    if (e.code === 'Escape') {
        document.querySelectorAll('.notification').forEach(n => n.remove());
    }
});

// ========================================
// 11. FORM AUTO-SAVE (Session Storage)
// ========================================

function initializeFormAutoSave() {
    const form = document.querySelector('form[action*="book"]');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    // Load saved values
    inputs.forEach(input => {
        const saved = sessionStorage.getItem(input.id);
        if (saved) input.value = saved;
    });

    // Save on change
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            sessionStorage.setItem(this.id, this.value);
        });
    });

    // Clear on submit
    form.addEventListener('submit', function() {
        inputs.forEach(input => sessionStorage.removeItem(input.id));
    });
}

// Call auto-save on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormAutoSave);
} else {
    initializeFormAutoSave();
}

// ========================================
// 12. PERFORMANCE MONITORING
// ========================================

function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page load time: ${pageLoadTime}ms`);
    }
}

window.addEventListener('load', logPerformanceMetrics);

console.log('✅ Hostel Management System initialized successfully!');
