// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');
let currentActive = document.querySelector('.nav-link.active');

// Initialize indicator position
function updateIndicator(element) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const containerRect = element.parentElement.getBoundingClientRect();
    navIndicator.style.width = `${rect.width}px`;
    navIndicator.style.left = `${rect.left - containerRect.left}px`;
}

// Initialize on load
window.addEventListener('load', () => {
    updateIndicator(currentActive);
});

// Handle nav link clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.getAttribute('data-target');
        const section = document.getElementById(target);
        
        if (section) {
            const offset = 80;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentActive = link;
        updateIndicator(link);
    });
});

// Update active section on scroll
const sections = ['about', 'projects', 'skills', 'education', 'achievements'];
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollPosition = window.scrollY + 100;
            
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        const activeLink = document.querySelector(`.nav-link[data-target="${sectionId}"]`);
                        if (activeLink && !activeLink.classList.contains('active')) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            activeLink.classList.add('active');
                            currentActive = activeLink;
                            updateIndicator(activeLink);
                        }
                        break;
                    }
                }
            }
            
            isScrolling = false;
        });
        
        isScrolling = true;
    }
});

// Project card expand/collapse
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't toggle if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        card.classList.toggle('expanded');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animations for children
            if (entry.target.classList.contains('skill-category')) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.classList.add('visible');
                    }, index * 50);
                });
            }
            
            if (entry.target.classList.contains('card')) {
                const langItems = entry.target.querySelectorAll('.language-item');
                langItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
                
                const interestTags = entry.target.querySelectorAll('.interest-tag');
                interestTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.classList.add('visible');
                    }, index * 100);
                });
            }
            
            // Don't unobserve to allow re-triggering if needed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.05}s`;
    observer.observe(el);
});
document.querySelectorAll('.skill-category').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});
document.querySelectorAll('.education-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    observer.observe(el);
});
document.querySelectorAll('.achievement-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    observer.observe(el);
});
document.querySelectorAll('.card').forEach(el => observer.observe(el));

// Window resize handler for nav indicator
window.addEventListener('resize', () => {
    updateIndicator(currentActive);
});

// Smooth scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add passive event listeners for better performance
document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('touchmove', () => {}, { passive: true });
