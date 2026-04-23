// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Lightbox functionality
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

// Add fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0s";
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all cards and gallery
document.querySelectorAll(".card, .gallery").forEach((el) => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// Floating hearts animation (subtle)
function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "💜";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = 20 + Math.random() * 20 + "px";
  heart.style.opacity = "0.7";
  heart.style.pointerEvents = "none";
  heart.style.animation = "floatUp 8s linear forwards";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 3000);

// CSS for floatUp animation (added via JS for dynamic creation)
const style = document.createElement("style");
style.textContent = `
@keyframes floatUp {
    0% { transform: translateY(0); opacity: 0.7; }
    100% { transform: translateY(-110vh); opacity: 0; }
}
`;
document.head.appendChild(style);
