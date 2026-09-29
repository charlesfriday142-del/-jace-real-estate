// ======================================
// JACE REAL ESTATE - WEBSITE JAVASCRIPT
// ======================================


// ======================================
// NAVIGATION
// ======================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ======================================
// MOBILE MENU
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

}


// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

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


// ======================================
// CONTACT FORM + FORMSPREE
// ======================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
      contactForm.querySelector(".submit-button");


    // -------------------------------
    // GET FORM VALUES
    // -------------------------------

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const interest =
      document.getElementById("interest").value;

    const location =
      document.getElementById("locationInput").value.trim();

    const message =
      document.getElementById("message").value.trim();


    // -------------------------------
    // REQUIRED FIELD CHECK
    // -------------------------------

    if (
      !name ||
      !email ||
      !phone ||
      !interest ||
      !location ||
      !message
    ) {

      formMessage.textContent =
        "Please complete all required fields.";

      formMessage.style.color = "#d8a0a0";

      return;
    }


    // -------------------------------
    // EMAIL VALIDATION
    // -------------------------------

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      formMessage.textContent =
        "Please enter a valid email address.";

      formMessage.style.color = "#d8a0a0";

      return;
    }


    // -------------------------------
    // SHOW SENDING
    // -------------------------------

    submitButton.disabled = true;

    submitButton.innerHTML =
      "SENDING...";

    formMessage.textContent = "";


    // -------------------------------
    // SEND TO FORMSPREE
    // -------------------------------

    const formData =
      new FormData(contactForm);


    try {

      const response = await fetch(
        contactForm.action,
        {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        }
      );


      // -------------------------------
      // SUCCESS
      // -------------------------------

      if (response.ok) {

        formMessage.textContent =
          "Thank you. Your request has been received. Our team will get back to you shortly.";

        formMessage.style.color =
          "#c8a96b";


        contactForm.reset();


        submitButton.disabled = false;

        submitButton.innerHTML =
          'Submit Request <span>→</span>';

      }


      // -------------------------------
      // ERROR FROM FORMSPREE
      // -------------------------------

      else {

        const data = await response.json();

        throw new Error(
          data.error || "Submission failed."
        );

      }


    }

    // -------------------------------
    // CONNECTION ERROR
    // -------------------------------

    catch (error) {

      console.error(error);

      formMessage.textContent =
        "Something went wrong. Please try again.";

      formMessage.style.color =
        "#d8a0a0";


      submitButton.disabled = false;

      submitButton.innerHTML =
        'Submit Request <span>→</span>';

    }

  });

}
