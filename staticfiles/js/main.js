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

// Scroll Reveal Animations
const sections = document.querySelectorAll('section');
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

// Project Section Antigravity Particles
function initProjectParticles() {
    const container = document.getElementById('project-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'absolute bg-primary/20 rounded-full blur-xl pointer-events-none';
        const size = Math.random() * 100 + 50;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        container.appendChild(p);

        gsap.to(p, {
            y: '-=100',
            x: `+=${Math.random() * 40 - 20}`,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 5
        });
    }
}
initProjectParticles();

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filter) {
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, clearProps: "all" });
        } else {
            const categories = card.getAttribute('data-categories').toLowerCase();
            if (categories.includes(filter.toLowerCase())) {
                card.style.display = 'block';
                gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, clearProps: "all" });
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

// Hover Tilt Effect for Project Cards
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

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            boxShadow: '0 0px 0px 0px rgba(0,0,0,0)'
        });
    });
});
