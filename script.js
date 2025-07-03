// === Smooth Scrolling for Navigation Links ===
// When a nav link is clicked, prevent the default jump behavior
// and scroll smoothly to the target section
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// === Section Reveal on Scroll ===
// Uses Intersection Observer to animate sections and project cards
// when they enter the viewport (fade-in effect)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 }); // Element is visible when 10% in viewport

// Observe all sections and project cards for animation
document.querySelectorAll("section, .project-card").forEach(el => observer.observe(el));


// === Scroll Spy Functionality ===
// Highlights the nav link corresponding to the section currently in view
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = "";

  // Loop through sections to find which is currently in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // Account for fixed header
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  // Update nav link styling to highlight the current section
  navLinks.forEach(link => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});


// === Scroll to Top Button ===
// Shows the button when user scrolls down 300px
// Scrolls to top when clicked
const toTopBtn = document.getElementById("toTopBtn");

window.onscroll = () => {
  toTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

// Scroll smoothly to top when the button is clicked
toTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// === Theme Toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const isDark = body.classList.contains("dark-theme");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const phrases = [
  "Web Developer",
  "UI/UX Designer",
  "Cybersecurity Enthusiast",
  "Python & Java Programmer"
];

let currentPhrase = 0;
let currentChar = 0;
const typeElement = document.getElementById("typewriter-text");

function type() {
  const current = phrases[currentPhrase];
  typeElement.textContent = current.slice(0, ++currentChar);

  if (currentChar === current.length) {
    setTimeout(erase, 2000);
  } else {
    setTimeout(type, 100);
  }
}

function erase() {
  const current = phrases[currentPhrase];
  typeElement.textContent = current.slice(0, --currentChar);

  if (currentChar === 0) {
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(type, 300);
  } else {
    setTimeout(erase, 50);
  }
}

document.addEventListener("DOMContentLoaded", type);

// === Scroll Reveal Animations ===
ScrollReveal({
  distance: '50px',
  duration: 1000,
  easing: 'ease-out',
  origin: 'bottom',
  reset: false, // change to true if you want animation to repeat
}).reveal(`#home, #about, #projects, #contact`, {
  interval: 200
});

ScrollReveal().reveal('.project-card', {
  interval: 200,
  origin: 'bottom',
  duration: 800,
  distance: '30px'
});

// === Mobile Hamburger Toggle ===
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

