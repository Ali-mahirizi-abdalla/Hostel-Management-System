// ========================================
// ADVANCED 3D FORM INTERACTIONS & EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    init3DForms();
});

function init3DForms() {
    enable3DMouseTracking();
    initializeFormProgress();
    initializeInputInteractions();
    initializeFormGlow();
    initializeFormValidationUI();
    initializePasswordStrengthMeter();
    setupScrollParallax();
}

// ========================================
// 1. 3D MOUSE TRACKING
// ========================================

function enable3DMouseTracking() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        form.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ========================================
// 2. FORM PROGRESS INDICATOR
// ========================================

function initializeFormProgress() {
    const form = document.querySelector('form[action*="book"]');
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Create progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-state-progress';
    progressContainer.style.cssText = `
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
    `;

    inputs.forEach((input, index) => {
        const dot = document.createElement('div');
        dot.className = 'form-state-dot';
        dot.id = `progress-${index}`;
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #e0e0e0;
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        progressContainer.appendChild(dot);

        input.addEventListener('input', function() {
            updateFormProgress(inputs);
        });

        input.addEventListener('change', function() {
            updateFormProgress(inputs);
        });
    });

    if (form.firstChild) {
        form.insertBefore(progressContainer, form.firstChild);
    }
}

function updateFormProgress(inputs) {
    let completed = 0;
    inputs.forEach((input, index) => {
        const dot = document.getElementById(`progress-${index}`);
        if (input.value.trim()) {
            completed++;
            dot.classList.add('completed');
            dot.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            dot.style.transform = 'translateZ(5px) scale(1.1)';
        } else {
            dot.classList.remove('completed');
            dot.style.background = '#e0e0e0';
            dot.style.transform = 'translateZ(0)';
        }
    });

    const form = document.querySelector('form[action*="book"]');
    if (form) {
        if (completed === inputs.length) {
            form.classList.add('active-form');
        } else {
            form.classList.remove('active-form');
        }
    }
}

// ========================================
// 3. ENHANCED INPUT INTERACTIONS
// ========================================

function initializeInputInteractions() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        // Focus event
        input.addEventListener('focus', function() {
            formGroup.classList.add('focused');
            addInputGlow(this);
        });

        // Blur event
        input.addEventListener('blur', function() {
            if (!this.value) {
                formGroup.classList.remove('focused');
            }
            removeInputGlow(this);
        });

        // Input event for real-time feedback
        input.addEventListener('input', function() {
            addInputFeedback(this);
        });

        // Custom validation effect
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#dc3545';
            this.style.animation = 'shake 0.4s ease-in-out';
        });
    });
}

function addInputGlow(input) {
    input.style.boxShadow = `
        0 20px 40px rgba(102, 126, 234, 0.25),
        0 0 20px rgba(102, 126, 234, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6)
    `;
    
    // Add glow animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-glow]')) {
        style.setAttribute('data-glow', 'true');
        style.textContent = `
            @keyframes inputPulse {
                0%, 100% {
                    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.25),
                                0 0 20px rgba(102, 126, 234, 0.1),
                                inset 0 1px 0 rgba(255, 255, 255, 0.6);
                }
                50% {
                    box-shadow: 0 20px 50px rgba(102, 126, 234, 0.35),
                                0 0 30px rgba(102, 126, 234, 0.2),
                                inset 0 1px 0 rgba(255, 255, 255, 0.8);
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function removeInputGlow(input) {
    input.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
}

function addInputFeedback(input) {
    if (input.type === 'email' && input.value) {
        if (input.checkValidity()) {
            input.style.borderColor = '#28a745';
            input.style.background = 'linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%)';
        } else {
            input.style.borderColor = '#dc3545';
            input.style.background = 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)';
        }
    }
}

// ========================================
// 4. FORM GLOW EFFECT
// ========================================

function initializeFormGlow() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('focusin', function() {
            this.classList.add('active-form');
            addFormGlow(this);
        });

        form.addEventListener('focusout', function() {
            this.classList.remove('active-form');
        });
    });
}

function addFormGlow(form) {
    form.style.boxShadow = `
        0 0 20px rgba(102, 126, 234, 0.2),
        0 0 40px rgba(102, 126, 234, 0.1),
        inset 0 0 20px rgba(102, 126, 234, 0.05)
    `;
}

// ========================================
// 5. FORM VALIDATION UI
// ========================================

function initializeFormValidationUI() {
    const form = document.querySelector('form[action*="book"]');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
                input.style.background = 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)';
                
                // Add validation error message
                showFieldError(input, 'This field is required');
            } else {
                input.style.borderColor = '#28a745';
                input.style.background = 'linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%)';
                removeFieldError(input);
            }
        });

        if (!isValid) {
            e.preventDefault();
            showNotification('❌ Please fill in all required fields', 'error');
        }
    });
}

function showFieldError(input, message) {
    removeFieldError(input);
    const errorMsg = document.createElement('small');
    errorMsg.className = 'field-error';
    errorMsg.textContent = message;
    errorMsg.style.cssText = `
        display: block;
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        animation: slideDown 0.3s ease;
        font-weight: 600;
    `;
    input.parentElement.appendChild(errorMsg);
}

function removeFieldError(input) {
    const error = input.parentElement.querySelector('.field-error');
    if (error) error.remove();
}

// ========================================
// 6. PASSWORD STRENGTH METER
// ========================================

function initializePasswordStrengthMeter() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;

    const strengthMeter = document.createElement('div');
    strengthMeter.id = 'passwordStrength';
    strengthMeter.style.cssText = `
        height: 6px;
        background: #e0e0e0;
        border-radius: 3px;
        margin-top: 8px;
        overflow: hidden;
        transform: translateZ(5px);
    `;

    const strengthBar = document.createElement('div');
    strengthBar.id = 'strengthBar';
    strengthBar.style.cssText = `
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #dc3545 0%, #ffc107 50%, #28a745 100%);
        border-radius: 3px;
        transition: all 0.3s ease;
    `;

    strengthMeter.appendChild(strengthBar);
    passwordInput.parentElement.appendChild(strengthMeter);

    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthMeter(strength);
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    return Math.min(strength, 100);
}

function updateStrengthMeter(strength) {
    const bar = document.getElementById('strengthBar');
    if (!bar) return;

    bar.style.width = strength + '%';

    let color = '#dc3545'; // Red
    if (strength >= 50) color = '#ffc107'; // Yellow
    if (strength >= 75) color = '#28a745'; // Green

    bar.style.background = `linear-gradient(90deg, #dc3545 0%, #ffc107 50%, ${color} 100%)`;
}

// ========================================
// 7. PARALLAX SCROLL EFFECT
// ========================================

function setupScrollParallax() {
    window.addEventListener('scroll', function() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const rect = form.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const formTop = rect.top + scrolled;

            if (formTop < scrolled + window.innerHeight && formTop + rect.height > scrolled) {
                const offset = (scrolled - formTop) * 0.05;
                form.style.backgroundPosition = `0 ${offset}px`;
            }
        });
    });
}

// ========================================
// 8. FORM SHAKE ANIMATION
// ========================================

function shakeForm(form) {
    form.style.animation = 'formShake 0.4s ease-in-out';
    setTimeout(() => {
        form.style.animation = '';
    }, 400);
}

// Add shake animation style if not present
if (!document.querySelector('style[data-shake]')) {
    const style = document.createElement('style');
    style.setAttribute('data-shake', 'true');
    style.textContent = `
        @keyframes formShake {
            0%, 100% { transform: perspective(1200px) translateX(0); }
            25% { transform: perspective(1200px) translateX(-10px) rotateZ(-1deg); }
            75% { transform: perspective(1200px) translateX(10px) rotateZ(1deg); }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// 9. ENHANCED BUTTON EFFECTS
// ========================================

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mousedown', function(e) {
        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Add ripple animation if not present
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// 10. FORM SUBMISSION ANIMATION
// ========================================

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const originalSubmit = form.onsubmit;
    
    form.addEventListener('submit', function(e) {
        // Don't animate validation errors
        if (!e.defaultPrevented) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span class="spinner-3d"></span> Submitting...';
                submitBtn.disabled = true;
            }
        }
    });
});

// ========================================
// 11. UTILITY: Enhanced Notification
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #dc3545 0%, #ff6b6b 100%)' : 
                    'linear-gradient(135deg, #17a2b8 0%, #20c997 100%)'}
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        max-width: 300px;
        border-left: 4px solid rgba(255, 255, 255, 0.3);
        transform: perspective(1000px) rotateX(0deg);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

console.log('✅ 3D Form System initialized successfully!');
