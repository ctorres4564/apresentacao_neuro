// Neuroanatomy Presentation JavaScript

class NeuroanatomyPresentation {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 13; // 0: title, overview, 1-12: topics
        this.slides = document.querySelectorAll('.slide');
        this.slideCounter = document.getElementById('slide-counter');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        
        this.init();
    }
    
    init() {
        this.updateSlideCounter();
        this.updateButtonStates();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        
        // Show the first slide
        this.showSlide(0);
    }
    
    showSlide(slideIndex) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'entering', 'exiting');
        });
        
        // Validate slide index
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex >= this.totalSlides) slideIndex = this.totalSlides - 1;
        
        this.currentSlide = slideIndex;
        
        // Show current slide with animation
        const currentSlideElement = this.getSlideElement(slideIndex);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active', 'entering');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                currentSlideElement.classList.remove('entering');
            }, 250);
        }
        
        this.updateSlideCounter();
        this.updateButtonStates();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    getSlideElement(slideIndex) {
        if (slideIndex === 0) {
            return document.getElementById('slide-0');
        } else if (slideIndex === 1) {
            return document.getElementById('slide-overview');
        } else {
            return document.getElementById(`slide-${slideIndex - 1}`);
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideIndex) {
        // Convert topic numbers to slide indices
        if (slideIndex === 0) {
            // Go to title slide
            this.showSlide(0);
        } else if (slideIndex === 'overview') {
            // Go to overview slide
            this.showSlide(1);
        } else {
            // Go to specific topic (slideIndex 1-12 maps to slide 2-13)
            this.showSlide(slideIndex + 1);
        }
    }
    
    showOverview() {
        this.showSlide(1);
    }
    
    updateSlideCounter() {
        if (this.slideCounter) {
            let displayText = '';
            if (this.currentSlide === 0) {
                displayText = 'Início';
            } else if (this.currentSlide === 1) {
                displayText = 'Visão Geral';
            } else {
                displayText = `Tópico ${this.currentSlide - 1} / 12`;
            }
            this.slideCounter.textContent = displayText;
        }
    }
    
    updateButtonStates() {
        // Update previous button
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        
        // Update next button
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            
            // Update button text based on current slide
            if (this.currentSlide === 0) {
                this.nextBtn.textContent = 'Começar →';
            } else if (this.currentSlide === this.totalSlides - 1) {
                this.nextBtn.textContent = 'Fim';
            } else {
                this.nextBtn.textContent = 'Próximo →';
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowRight':
                case ' ':
                case 'PageDown':
                    event.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    event.preventDefault();
                    this.prevSlide();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    event.preventDefault();
                    this.showSlide(this.totalSlides - 1);
                    break;
                case 'o':
                case 'O':
                    event.preventDefault();
                    this.showOverview();
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.goToSlide(0);
                    break;
            }
        });
    }
    
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            endY = event.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only process horizontal swipes that are longer than vertical swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe right - go to previous slide
                    this.prevSlide();
                } else {
                    // Swipe left - go to next slide
                    this.nextSlide();
                }
            }
        });
    }
}

// Global functions for HTML onclick handlers
function nextSlide() {
    presentation.nextSlide();
}

function prevSlide() {
    presentation.prevSlide();
}

function goToSlide(slideIndex) {
    presentation.goToSlide(slideIndex);
}

function showOverview() {
    presentation.showOverview();
}

// Enhanced topic card interactions
function setupTopicCards() {
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach((card, index) => {
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ir para tópico ${index + 1}`);
        
        // Add keyboard event listener
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
        
        // Add hover effects for better UX
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Image lazy loading for better performance
function setupImageLazyLoading() {
    const images = document.querySelectorAll('.topic-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        // Only observe images that have data-src attribute
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Progress tracking
function setupProgressTracking() {
    const slides = document.querySelectorAll('.slide');
    const visitedSlides = new Set();
    
    function trackSlideVisit(slideIndex) {
        visitedSlides.add(slideIndex);
        
        // Calculate progress percentage
        const progressPercentage = (visitedSlides.size / slides.length) * 100;
        
        // Update progress indicator if needed
        const progressElement = document.querySelector('.progress-indicator');
        if (progressElement && visitedSlides.size > 1) {
            progressElement.style.background = `linear-gradient(90deg, 
                var(--color-primary) ${progressPercentage}%, 
                var(--color-secondary) ${progressPercentage}%)`;
        }
    }
    
    // Track initial slide
    trackSlideVisit(0);
    
    return trackSlideVisit;
}

// Presentation timer (optional feature)
function setupPresentationTimer() {
    const startTime = Date.now();
    
    function formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update timer every minute (optional - not displayed by default)
    setInterval(() => {
        const elapsed = Date.now() - startTime;
        console.log(`Tempo de apresentação: ${formatTime(elapsed)}`);
    }, 60000);
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create main presentation instance
    window.presentation = new NeuroanatomyPresentation();
    
    // Setup additional features
    setupTopicCards();
    setupSmoothScrolling();
    setupImageLazyLoading();
    setupPresentationTimer();
    
    // Setup progress tracking
    const trackProgress = setupProgressTracking();
    
    // Override showSlide to track progress
    const originalShowSlide = presentation.showSlide.bind(presentation);
    presentation.showSlide = function(slideIndex) {
        originalShowSlide(slideIndex);
        trackProgress(slideIndex);
    };
    
    // Add loading state management
    document.body.classList.add('presentation-loaded');
    
    // Add visual feedback for slide transitions
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.addEventListener('transitionend', () => {
            slide.classList.remove('entering', 'exiting');
        });
    });
    
    console.log('🧠 Apresentação de Neuroanatomia carregada com sucesso!');
    console.log('💡 Dicas de navegação:');
    console.log('   • Use as setas ← → para navegar');
    console.log('   • Pressione "O" para visão geral');
    console.log('   • Pressione "Esc" para voltar ao início');
    console.log('   • Use gestos de deslizar em dispositivos touch');
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        // Recalculate layouts if needed
        const currentSlideElement = presentation.getSlideElement(presentation.currentSlide);
        if (currentSlideElement) {
            currentSlideElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 250);
});

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any ongoing animations
        document.body.classList.add('paused');
    } else {
        // Resume animations
        document.body.classList.remove('paused');
    }
});

// Export for debugging (development only)
if (typeof window !== 'undefined') {
    window.NeuroPresentation = {
        goToTopic: (topicNumber) => {
            if (topicNumber >= 1 && topicNumber <= 12) {
                presentation.goToSlide(topicNumber);
            }
        },
        getCurrentSlide: () => presentation.currentSlide,
        getTotalSlides: () => presentation.totalSlides
    };
}