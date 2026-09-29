// ================================
// NAVIGATION
// ================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ================================
// MOBILE MENU
// ================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// ================================
// SCROLL REVEAL
// ================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);

      }

    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ================================
// FORM
// ================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = document.getElementById("interest").value;
  const location = document.getElementById("locationInput").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !interest || !location || !message) {

    formMessage.textContent =
      "Please complete all required fields.";

    formMessage.style.color = "#d8a0a0";

    return;
  }


  // Basic email validation
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {

    formMessage.textContent =
      "Please enter a valid email address.";

    formMessage.style.color = "#d8a0a0";

    return;
  }


  /*
    EMAIL SERVICE WILL BE CONNECTED HERE.

    GitHub Pages cannot send email directly.
    We will connect this form to a secure
    form/email service in the next step.
  */


  formMessage.textContent =
    "Thank you. Your request has been received.";

  formMessage.style.color = "#c8a96b";

  contactForm.reset();

});
