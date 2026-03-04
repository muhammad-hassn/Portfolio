// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Neural Network Background
const canvas = document.getElementById('neural-bg');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;
const connectionDistance = 150;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.classList.contains('dark') ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)';
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();

        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const opacity = 1 - (dist / connectionDistance);
                ctx.strokeStyle = document.documentElement.classList.contains('dark') ?
                    `rgba(59, 130, 246, ${opacity * 0.15})` :
                    `rgba(59, 130, 246, ${opacity * 0.08})`;
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animate);
}

init();
animate();

// Typed.js Animation
const typed = new Typed('#typed', {
    strings: ['AI & ML Engineer', 'Django Developer', 'Machine Learning Enthusiast', 'Software Engineering Student'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000
});

// GSAP Entrance Animations
gsap.to('.headline-fade', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.5
});

// Scroll Reveal Animations (Excluding projects as requested)
const sections = document.querySelectorAll('section:not(#projects)');
sections.forEach(section => {
    gsap.from(section.querySelectorAll('h2, .glass, .skill-category-card, .group'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('[data-width]');
skillBars.forEach(bar => {
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        onEnter: () => {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
});

// Project Section Antigravity Particles - REMOVED AS REQUESTED
// function initProjectParticles() {
//     const container = document.getElementById('project-particles');
//     if (!container) return;
//     ...
// }
// initProjectParticles();

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filter) {
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'none';
        } else {
            const categories = card.getAttribute('data-categories').toLowerCase();
            if (categories.includes(filter.toLowerCase())) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'none';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg'));
        btn.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg');

        const filter = btn.getAttribute('data-filter');
        filterProjects(filter);
    });
});

// Initial state
const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
if (allBtn) {
    allBtn.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg');
    // Ensure they are visible
    projectCards.forEach(card => card.style.display = 'block');
}

// Hover Effect for Project Cards (Disabled tilt as requested)
projectCards.forEach(card => {
    // Whole-card Click Navigation
    card.addEventListener('click', (e) => {
        // Don't trigger if a button/link inside the card was clicked
        if (e.target.closest('a') || e.target.closest('button')) return;

        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});
